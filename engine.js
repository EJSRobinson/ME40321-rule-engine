// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations-core.js';
import { core as Callers } from './callers-core.js';
import { getAll } from 'me40321-database';
import { setAssumptions } from './assumptions-core.js';
import { setTests } from './test-sets.js';
import { materials } from 'me40321-database/materials-core.js';
import { remoteSolvers } from './api-client.js';
export class Engine {
  constructor() {
    this.relations = new Relations(Callers);
    this.context = {};
    this.dimensionSets = [];
    this.activeConstrains = [];
    this.finalDimensions = {};
    this.init();
  }

  async init() {
    this.propsMap = await getAll();
    this.finals = await getAll();
  }

  checkRange(variable, property, mirror) {
    let result = true;
    switch (variable) {
      case 'max':
        if (!mirror) {
          if (property.value.max.length >= 1) {
            result = false;
          }
        } else {
          if (property.value.min.length >= 1) {
            result = false;
          }
        }
        break;
      case 'min':
        if (!mirror) {
          if (property.value.min.length >= 1) {
            result = false;
          }
        } else {
          if (property.value.max.length >= 1) {
            result = false;
          }
        }
        break;
      case 'any':
        if (property.value.max.length >= 1 && property.value.min.length >= 1) {
          result = false;
        }
        break;
    }
  }

  checkQuant(limit, prop, mirror) {
    if (mirror) {
      if (limit === 'max') {
        return !(prop.value['min'] === null);
      } else {
        return !(prop.value['max'] === null);
      }
    } else {
      return !(prop.value[limit] === null);
    }
  }

  checkDefined(targetMap, vars, mirror) {
    let result = true;
    for (const [varName, limit] of Object.entries(vars)) {
      if (result) {
        let property = targetMap.get(varName);
        switch (property.value.typeName) {
          case 'quant':
            result = this.checkQuant(limit, property, mirror);
            break;
          case 'range':
            result = this.checkRange(limit, property, mirror);
            break;
          case 'qual':
          case 'list':
            if (property.value.val === null) {
              result = false;
              break;
            }
        }
      }
    }
    return result;
  }

  checkDefinedNormal(targetMap, vars) {
    return this.checkDefined(targetMap, vars, false);
  }

  checkDefinedMirror(targetMap, vars) {
    return this.checkDefined(targetMap, vars, true);
  }

  wait(pause) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, pause);
    });
  }

  displayAll(target, dps) {
    const mult = 10 ** dps;
    let rows = [];
    for (const [key, prop] of target.entries()) {
      switch (prop.value.typeName) {
        case 'quant':
          rows.push([
            key,
            Math.round(prop.value.max * mult) / mult,
            Math.round(prop.value.min * mult) / mult,
          ]);
          break;
        case 'list':
        case 'qual':
          rows.push([key, prop.value.val, prop.value.val]);
          break;
      }
    }
    console.table(rows);
  }

  correctMinMaxErrors(targetMap) {
    return new Promise(async (resolve, reject) => {
      for (let [name, prop] of targetMap.entries()) {
        if (prop.value.typeName === 'quant' || prop.value.typeName === 'range') {
          const oldMax = JSON.parse(JSON.stringify(prop.value.max));
          if (oldMax < prop.value.min) {
            prop.value.max = JSON.parse(JSON.stringify(prop.value.min));
            prop.value.min = oldMax;
          }
        }
        targetMap.set(name, prop);
      }
      resolve();
    });
  }

  calculateEnvelope(targetMap) {
    return new Promise(async (resolve, reject) => {
      let updates = 1;
      while (updates > 0) {
        updates = 0;
        for (const [propName, prop] of Object.entries(this.relations.rules)) {
          for (const [entryKey, entry] of Object.entries(prop.relations)) {
            if (entry.enabled) {
              console.log(`--> Checking ${propName}-${entryKey}`);
              if (this.checkDefinedNormal(targetMap, entry.vars)) {
                let result = await entry.solve.normal(targetMap, entry.vars);
                if (result) {
                  updates += 1;
                }
              }
              if (this.checkDefinedMirror(targetMap, entry.vars)) {
                let result = await entry.solve.mirror(targetMap, entry.vars);
                if (result) {
                  updates += 1;
                }
              }
            }
          }
        }
        console.log(`--*> Updates: ${updates}`);
        console.log('***Pass End***');
      }
      resolve();
    });
  }

  optimiseForDrag(targetMap, finalEnv) {
    return new Promise(async (resolve, reject) => {
      let inputs = {
        t: targetMap.get('t').value.max,
        Aref: targetMap.get('Aref').value.max,
        Ta: targetMap.get('Ta').value.max,
        Alt: targetMap.get('Alt').value.max,
        M: targetMap.get('M').value.max,
        AoA: targetMap.get('AoA').value.max,
        Mat: targetMap.get('Mat').value.val,
        Arf: targetMap.get('Arf').value.val,
        Cn: targetMap.get('Cn').value.max,
        S: {
          min: finalEnv.S.max,
          max: finalEnv.S.min,
        },
        cr: {
          min: finalEnv.cr.max,
          max: finalEnv.cr.min,
        },
        ct: {
          min: finalEnv.ct.max,
          max: finalEnv.ct.min,
        },
        TEsw: {
          min: finalEnv.TEsw.max,
          max: finalEnv.TEsw.min,
        },
      };
      let Rs = materials[inputs['Mat']].surfaceRoughness;
      inputs['Mat'] = Rs;
      let result = await remoteSolvers('/optimiseDrag', inputs);
      resolve(result);
    });
  }

  setFinalDimensions(targetMap, dimensions) {
    return new Promise(async (resolve, reject) => {
      for (const [propName, value] of Object.entries(dimensions)) {
        let prop = targetMap.get(propName);
        prop.value.max = value;
        prop.value.min = value;
        prop.fixed.max = true;
        prop.fixed.min = true;
        targetMap.set(propName, prop);
      }
      resolve();
    });
  }

  async reset() {
    this.propsMap = await getAll();
    this.finals = await getAll();
    await setAssumptions(this.propsMap);
    await this.setContext(this.propsMap);
  }

  setContext(targetMap) {
    return new Promise(async (resolve, reject) => {
      for (const [propName, limits] of Object.entries(this.context)) {
        let prop = targetMap.get(propName);
        for (const [limit, value] of Object.entries(limits)) {
          prop.value[limit] = value;
          if (limit === 'max') {
            prop.fixed.max = true;
          }
          if (limit === 'min') {
            prop.fixed.min = true;
          }
        }
        targetMap.set(propName, prop);
      }
      resolve();
    });
  }

  setConstraints(targetMap) {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.activeConstrains.length; i++) {
        let prop = targetMap.get(this.activeConstrains[i].propKey);
        switch (prop.value.typeName) {
          case 'quant':
          case 'range':
            prop.value.max = this.activeConstrains[i].value.max;
            prop.value.min = this.activeConstrains[i].value.min;
            break;
          case 'list':
          case 'qual':
            prop.value.val = this.activeConstrains[i].value.val;
            break;
        }
        targetMap.set(this.activeConstrains[i].propKey, prop);
      }
      resolve();
    });
  }

  addContext(propKey, value) {
    this.context[propKey] = value;
  }

  addConstraint(propKey, value) {
    this.activeConstrains.push({
      propKey: propKey,
      value: value,
    });
    this.main();
  }

  async reset() {
    this.propsMap = await getAll();
    this.finals = await getAll();
    await setAssumptions(this.propsMap);
    await this.setContext(this.propsMap);
  }

  getFinals() {
    return this.finals;
  }

  async finishRound(limit) {
    this.dimensionSets.push({
      limit: limit,
      valueSet: {
        S: this.propsMap.get('S').value[limit],
        cr: this.propsMap.get('cr').value[limit],
        ct: this.propsMap.get('ct').value[limit],
        TEsw: this.propsMap.get('TEsw').value[limit],
      },
    });
    this.activeConstrains.pop();
    this.displayAll(this.propsMap, 4);
    console.log(this.dimensionSets);
    this.propsMap = await getAll();
  }

  async main() {
    await setAssumptions(this.propsMap);
    await this.setContext(this.propsMap);
    await this.setConstraints(this.propsMap);
    await this.calculateEnvelope(this.propsMap);
    await this.correctMinMaxErrors(this.propsMap);
    let dimensionsVars = {
      cr: 'max',
      ct: 'max',
      S: 'max',
      TEsw: 'max',
    };
    if (this.checkDefinedNormal(this.propsMap, dimensionsVars)) {
      this.finishRound('max');
    }
    if (this.checkDefinedMirror(this.propsMap, dimensionsVars)) {
      this.finishRound('min');
    }
  }

  async finaliseEnvelope() {
    return new Promise(async (resolve, reject) => {
      let finalEnv = {
        S: {
          max: 0,
          min: 0,
        },
        cr: {
          max: 0,
          min: 0,
        },
        ct: {
          max: 0,
          min: 0,
        },
        TEsw: {
          max: 0,
          min: 0,
        },
      };
      for (let i = 0; i < this.dimensionSets.length; i++) {
        let currentSet = this.dimensionSets[i];
        for (const [propName, propValue] of Object.entries(currentSet.valueSet)) {
          if (propValue > finalEnv[propName][currentSet.limit]) {
            finalEnv[propName][currentSet.limit] = propValue;
          }
        }
      }
      resolve(finalEnv);
    });
  }

  async finish() {
    let finalEnv = finaliseEnvelope();
    await this.calculateEnvelope(this.propsMap);
    await this.correctMinMaxErrors(this.propsMap);
    let dimensions = await this.optimiseForDrag(this.propsMap, finalEnv);
    await setAssumptions(this.finals);
    await this.setFinalDimensions(this.finals, dimensions);
    await this.calculateEnvelope(this.finals);
    this.displayAll(this.finals, 4);
  }

  showMe() {
    this.displayAll(this.propsMap, 4);
  }
}
