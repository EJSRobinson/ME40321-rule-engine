// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations-core.js';
import { core as Callers } from './callers-core.js';
import { getAll } from 'me40321-database';
import { setAssumptions } from './assumptions-core.js';
import { setTests } from './test-sets.js';

let relations = new Relations(Callers);

let propsMap = getAll();

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

function checkDefined(vars, mirror) {
  let result = true;
  for (const [varName, limit] of Object.entries(vars)) {
    if (result) {
      let property = propsMap.get(varName);
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

function checkDefinedNormal(vars) {
  return checkDefined(vars, false);
}

function checkDefinedMirror(vars) {
  return checkDefined(vars, true);
}

function wait(pause) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, pause);
  });
}

function displayAll() {
  let rows = [];
  for (const [key, prop] of propsMap.entries()) {
    switch (prop.value.typeName) {
      case 'quant':
        rows.push([key, prop.value.max, prop.value.min]);
        break;
      case 'list':
      case 'qual':
        rows.push([key, prop.value.val, prop.value.val]);
        break;
    }
  }
  console.table(rows);
}

async function startCheckLoop(pace) {
  while (true) {
    for (const [propName, prop] of Object.entries(relations.rules)) {
      for (const [entryKey, entry] of Object.entries(prop.relations)) {
        if (entry.enbaled) {
          console.log(`--> Checking ${propName}-${entryKey}`);
          // console.log(entry.vars);
          // displayAll();
          if (checkDefinedNormal(entry.vars)) {
            await entry.solve.normal(propsMap, entry.vars);
          }
          if (checkDefinedMirror(entry.vars)) {
            await entry.solve.mirror(propsMap, entry.vars);
          }
        }
        await wait(pace);
      }
    }
    displayAll();
    console.log('***Pass End***');
    await wait(5000);
  }
}

setAssumptions(propsMap);
setTests(propsMap);
startCheckLoop(100);

// const testInput = { cr: 'min', TR: 'min' };
// displayAll();
// console.log(checkDefined(testInput, false));

// propsMap.set('cr', { value: { typeName: 'quant', max: 150, min: 145 } });
// propsMap.set('S', { value: { typeName: 'quant', max: 130, min: 125 } });
// propsMap.set('Afin', { value: { typeName: 'quant', max: 16250, min: 16000 } });
// test();

//Run through relations
//For each, check if required variables are defined
//Run Solvers where possible
//Run checks
//Respond to checks
//Loop until all solved
//Run Optimisation (if needed)
