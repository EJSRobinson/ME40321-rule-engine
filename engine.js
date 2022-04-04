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
let relations = new Relations(Callers);

let propsMap = getAll();
let finals = getAll();

function checkRange(variable, property, mirror) {
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

function checkQuant(limit, prop, mirror) {
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

function checkDefined(targetMap, vars, mirror) {
  let result = true;
  for (const [varName, limit] of Object.entries(vars)) {
    if (result) {
      let property = targetMap.get(varName);
      switch (property.value.typeName) {
        case 'quant':
          result = checkQuant(limit, property, mirror);
          break;
        case 'range':
          result = checkRange(limit, property, mirror);
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

function checkDefinedNormal(targetMap, vars) {
  return checkDefined(targetMap, vars, false);
}

function checkDefinedMirror(targetMap, vars) {
  return checkDefined(targetMap, vars, true);
}

function wait(pause) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, pause);
  });
}

function displayAll(target, dps) {
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

function correctMinMaxErrors(targetMap) {
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

function calculateEnvelope(targetMap) {
  return new Promise(async (resolve, reject) => {
    let updates = 1;
    while (updates > 0) {
      updates = 0;
      for (const [propName, prop] of Object.entries(relations.rules)) {
        for (const [entryKey, entry] of Object.entries(prop.relations)) {
          if (entry.enabled) {
            console.log(`--> Checking ${propName}-${entryKey}`);
            if (checkDefinedNormal(targetMap, entry.vars)) {
              let result = await entry.solve.normal(targetMap, entry.vars);
              if (result) {
                updates += 1;
              }
            }
            if (checkDefinedMirror(targetMap, entry.vars)) {
              let result = await entry.solve.mirror(targetMap, entry.vars);
              if (result) {
                updates += 1;
              }
            }
          }
          await wait();
        }
      }
      console.log(`--*> Updates: ${updates}`);
      console.log('***Pass End***');
    }
    resolve();
  });
}

function optimiseForDrag(targetMap) {
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
        min: targetMap.get('S').value.min,
        max: targetMap.get('S').value.max,
      },
      cr: {
        min: targetMap.get('cr').value.min,
        max: targetMap.get('cr').value.max,
      },
      ct: {
        min: targetMap.get('ct').value.min,
        max: targetMap.get('ct').value.max,
      },
      TEsw: {
        min: targetMap.get('TEsw').value.min,
        max: targetMap.get('TEsw').value.max,
      },
    };
    let Rs = materials[inputs['Mat']].surfaceRoughness;
    inputs['Mat'] = Rs;
    let result = await remoteSolvers('/optimiseDrag', inputs);
    resolve(result);
  });
}

function setFinalDimensions(targetMap, dimensions) {
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

async function main() {
  await setAssumptions(propsMap);
  await setTests(propsMap);
  await calculateEnvelope(propsMap);
  await correctMinMaxErrors(propsMap);
  displayAll(propsMap, 4);
  let dimensions = await optimiseForDrag(propsMap);
  await setAssumptions(finals);
  // await setTests(finals);
  await setFinalDimensions(finals, dimensions);
  await calculateEnvelope(finals);
  displayAll(finals, 4);
}
main();
