// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations-core.js';
import { core as Callers } from './callers-core.js';
import { getAll } from 'me40321-database';
import { setAssumptions } from './assumptions-core.js';
import { materials } from 'me40321-database/materials-core.js';
import { remoteSolvers } from './api-client.js';
export default class Engine {
  constructor() {
    this.relations = new Relations(Callers);
    this.context = [];
    this.dimensionSets = [];
    this.activeConstrains = [];
    this.roundConstraintController = {
      upper: 0,
      lower: 0,
    };
    this.finalDimensions = {};
    this.readyToFinishFlag = false;
    this.init();
  }

  async init() {
    this.propsMap = await getAll();
    this.lastRoundResult = await getAll();
    this.finals = await getAll();
  }

  // * DEBUG FUNCTIONS *
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

  displayConstraints() {
    let rows = [];
    for (let i = 0; i < this.activeConstrains.length; i++) {
      let markers = '';
      if (this.roundConstraintController.upper % this.activeConstrains.length === i) {
        markers += '<-U';
      }
      if (this.roundConstraintController.lower % this.activeConstrains.length === i) {
        markers += '<-L';
      }
      rows.push([this.activeConstrains[i].propKey, markers]);
    }
    console.table(rows);
  }

  displayDimensionSets() {
    let rows = [['LIM', 'S', 'cr', 'ct', 'TEsw']];
    for (let i = 0; i < this.dimensionSets.length; i++) {
      rows.push([
        this.dimensionSets[i].limit,
        this.dimensionSets[i].valueSet.S.toPrecision(4),
        this.dimensionSets[i].valueSet.cr.toPrecision(4),
        this.dimensionSets[i].valueSet.ct.toPrecision(4),
        this.dimensionSets[i].valueSet.TEsw.toPrecision(4),
      ]);
    }
    console.table(rows);
  }

  // * CHECKING IF DEFINED FUNCTIONS *
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

  // * MAIN CALCULATOR *

  calculateAll(targetMap) {
    return new Promise(async (resolve, reject) => {
      let updates = 1;
      while (updates > 0) {
        updates = 0;
        for (const [propName, prop] of Object.entries(this.relations.rules)) {
          for (const [entryKey, entry] of Object.entries(prop.relations)) {
            if (entry.enabled) {
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
        console.log(`-> No. of Updates: ${updates}`);
        console.log('---> Pass Ends');
      }
      resolve();
    });
  }

  // * PROCESSING FUNCTIONS *

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

  filterUnpopulatedProps(targetMap) {
    return new Promise((resolve, reject) => {
      let result = new Map();
      for (let [propName, prop] of targetMap) {
        switch (prop.value.typeName) {
          case 'quant':
          case 'range':
            if (prop.value.max !== null || prop.value.min !== null) {
              result.set(propName, prop);
            }
            break;
          case 'list':
          case 'qual':
            if (prop.value.val !== null) {
              result.set(propName, prop);
            }
            break;
        }
      }
      resolve(result);
    });
  }

  // * SET ACTIVE CONSTRAINTS / SET CONTEXT *

  setContext(targetMap) {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.context.length; i++) {
        let cont = this.context[i];
        let prop = targetMap.get(cont.propKey);
        for (const [limit, value] of Object.entries(cont.value)) {
          prop.value[limit] = value;
          prop.fixed[limit] = true;
        }
        targetMap.set(cont.propKey, prop);
      }
      resolve();
    });
  }

  setSingleConstraint(targetMap, i) {
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
    console.log(`Setting ${this.activeConstrains[i].propKey}`);
    targetMap.set(this.activeConstrains[i].propKey, prop);
  }

  setRoundConstraints(targetMap) {
    return new Promise(async (resolve, reject) => {
      let lowerConstLim = this.roundConstraintController.lower % this.activeConstrains.length;
      let upperConstLim = this.roundConstraintController.upper % this.activeConstrains.length;
      console.log(lowerConstLim);
      console.log(upperConstLim);
      if (lowerConstLim <= upperConstLim) {
        for (let i = lowerConstLim; i <= upperConstLim; i++) {
          this.setSingleConstraint(targetMap, i);
        }
      } else {
        for (let i = 0; i <= upperConstLim; i++) {
          this.setSingleConstraint(targetMap, i);
        }
        for (let i = lowerConstLim; i < this.activeConstrains.length; i++) {
          this.setSingleConstraint(targetMap, i);
        }
      }
      resolve();
    });
  }

  // * ROUND CONTROL *

  async startRound() {
    console.log('* Starting Round *');
    this.displayConstraints();
    await setAssumptions(this.propsMap);
    await this.setContext(this.propsMap);
    await this.setRoundConstraints(this.propsMap);
    await this.calculateAll(this.propsMap);
    await this.correctMinMaxErrors(this.propsMap);
    this.displayAll(this.propsMap, 4);
    let dimensionsVars = {
      cr: 'max',
      ct: 'max',
      S: 'max',
      TEsw: 'max',
    };
    this.roundConstraintController.upper += 1;
    if (this.checkDefinedNormal(this.propsMap, dimensionsVars)) {
      this.roundConstraintController.lower = this.roundConstraintController.upper;
      this.finishRound(true);
    } else {
      this.finishRound(false);
    }
  }

  async finishRound(roundSuccess) {
    if (roundSuccess) {
      this.dimensionSets.push({
        limit: 'max',
        valueSet: {
          S: this.propsMap.get('S').value.max,
          cr: this.propsMap.get('cr').value.max,
          ct: this.propsMap.get('ct').value.max,
          TEsw: this.propsMap.get('TEsw').value.max,
        },
      });
      this.dimensionSets.push({
        limit: 'min',
        valueSet: {
          S: this.propsMap.get('S').value.min,
          cr: this.propsMap.get('cr').value.min,
          ct: this.propsMap.get('ct').value.min,
          TEsw: this.propsMap.get('TEsw').value.min,
        },
      });
    }
    console.log('* Finished Round *');
    this.lastRoundResult = new Map(this.propsMap);
    this.propsMap = await getAll();
    await this.wait(5000);
    if (this.roundConstraintController.lower >= this.activeConstrains.length) {
      this.finishSet();
    } else {
      this.startRound();
    }
  }

  // * SET CONTROL *

  startSet() {
    console.log('*-*-* Starting Set *-*-*');
    this.startRound();
  }

  async finishSet() {
    this.displayDimensionSets();
    this.roundConstraintController.lower = 0;
    this.roundConstraintController.upper = 0;
    this.readyToFinishFlag = await this.checkReadyToFinish();
    console.log('*-*-* Finished Set *-*-*');
  }

  // * FINISH FUNCTION *

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

  checkReadyToFinish() {
    return new Promise(async (resolve, reject) => {
      let dimensionsVars = {
        t: 'max',
        Aref: 'max',
        Ta: 'max',
        Alt: 'max',
        M: 'max',
        AoA: 'max',
        Mat: 'val',
        Arf: 'val',
        Cn: 'max',
      };
      if (
        this.checkDefinedNormal(this.lastRoundResult, dimensionsVars) &&
        this.dimensionSets.length > 0
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
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
        Mat: materials[targetMap.get('Mat').value.val].surfaceRoughness,
        Arf: targetMap.get('Arf').value.val,
        Cn: targetMap.get('Cn').value.max,
        S: {
          min: finalEnv.S.min,
          max: finalEnv.S.max,
        },
        cr: {
          min: finalEnv.cr.min,
          max: finalEnv.cr.max,
        },
        ct: {
          min: finalEnv.ct.min,
          max: finalEnv.ct.max,
        },
        TEsw: {
          min: finalEnv.TEsw.min,
          max: finalEnv.TEsw.max,
        },
      };
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

  // * API FUNCTIONS *
  async finish() {
    return new Promise(async (resolve, reject) => {
      console.log('-> Finishing');
      let finalEnv = await this.finaliseEnvelope();
      await this.correctMinMaxErrors(this.lastRoundResult);
      this.displayAll(this.lastRoundResult, 4);
      let dimensions = await this.optimiseForDrag(this.lastRoundResult, finalEnv);
      await setAssumptions(this.finals);
      await this.setContext(this.finals);
      await this.setFinalDimensions(this.finals, dimensions);
      await this.calculateAll(this.finals);
      await this.correctMinMaxErrors(this.finals);
      this.displayAll(this.finals, 4);
      resolve();
    });
  }

  addContextSet(list) {
    console.log(`-> Added Context Set of ${list.length} Items`);
    for (let i = 0; i < list.length; i++) {
      this.context.push({
        propKey: list[i].propKey,
        value: list[i].value,
      });
    }
  }

  addConstraintsSet(list) {
    console.log(`-> Added Constraints Set of ${list.length} Items`);
    for (let i = 0; i < list.length; i++) {
      this.activeConstrains.push({
        propKey: list[i].propKey,
        value: list[i].value,
      });
    }
    this.startSet();
  }

  getFinals() {
    return new Promise(async (resolve, reject) => {
      resolve(this.filterUnpopulatedProps(this.finals));
    });
  }

  getCurrent() {
    return new Promise(async (resolve, reject) => {
      resolve(this.filterUnpopulatedProps(this.lastRoundResult));
    });
  }

  getReadyToFinish() {
    return this.readyToFinishFlag;
  }

  reset() {
    console.log('>> SYSTEM RESET <<');
    this.context = [];
    this.dimensionSets = [];
    this.activeConstrains = [];
    this.roundConstraintController = {
      upper: 0,
      lower: 0,
    };
    this.finalDimensions = {};
    this.readyToFinishFlag = false;
    this.init();
  }
}
