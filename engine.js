// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations-core.js';
import { core as Callers } from './callers-core.js';
import { getAll } from 'me40321-database';

let relations = new Relations(Callers);

let propsMap = getAll();

// function displayState() {
//   let pairs = [];
//   let trueCount = 0;
//   for (const [key, value] of propsMap.entries()) {
//     if (checkDefined([key])) {
//       trueCount += 1;
//       pairs.push([key, true]);
//     } else {
//       pairs.push([key, false]);
//     }
//   }
//   console.table(pairs);
//   console.log(`${parseInt((trueCount / pairs.length) * 100)}% Defined`);
// }

function checkQuant(variable, property, mirror) {
  switch (variable) {
    case 'max':
      if (!mirror) {
        if (property.value.max === null) {
          result = false;
        }
      } else {
        if (property.value.min === null) {
          result = false;
        }
      }
      break;
    case 'min':
      if (!mirror) {
        if (property.value.min === null) {
          result = false;
        }
      } else {
        if (property.value.max === null) {
          result = false;
        }
      }
      break;
    case 'any':
      if (property.value.max === null && property.value.min === null) {
        result = false;
      }
      break;
  }
}

function checkRange(variable, property, mirror) {
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

function checkDefined(vars, mirror) {
  let result = true;
  for (let i = 0; i < vars.length; i++) {
    let property = propsMap.get(vars[i].name);
    switch (property.value.typeName) {
      case 'quant':
        checkQuant(vars[i].perm, property, mirror);
        break;
      case 'range':
        checkRange(vars[i].perm, property, mirror);
        break;
      case 'qual':
      case 'list':
        if (property.value.val === null) {
          result = false;
        }
        break;
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

function startCheckLoop() {
  setInterval(async () => {
    for (const [propName, prop] of Object.entries(relations.rules)) {
      for (const [entryKey, entry] of Object.entries(prop.relations)) {
        if (entry.enbaled) {
          if (checkDefinedNormal(entry.vars)) {
            await entry.solve.normal(propsMap, entry.vars);
          }
          if (checkDefinedMirror(entry.vars)) {
            await entry.solve.mirror(propsMap, entry.vars);
          }
        }
      }
    }
    // displayState();
  }, 1500);
}

// startCheckLoop()

async function test() {
  let entry = relations.rules['ct'].relations['1'];
  await entry.solve.normal(propsMap, entry.vars);
  await entry.solve.mirror(propsMap, entry.vars);
  console.log(propsMap.get('ct'));
}

// propsMap.set('cr', { value: { typeName: 'quant', max: 150, min: 145 } });
// propsMap.set('S', { value: { typeName: 'quant', max: 130, min: 125 } });
// propsMap.set('Afin', { value: { typeName: 'quant', max: 16250, min: 16000 } });
// test();

// let counter = 0;
// let sets = [
//   'Aref',
//   'ct',
//   'cr',
//   'S',
//   'TEsw',
//   'Kn',
//   'M',
//   'AoA',
//   'XCog',
//   't',
//   'm',
//   'Alt',
//   'N',
//   'CnaComp',
//   'Xcomp',
// ];
// setInterval(() => {
//   let prop = propsMap.get(sets[counter]);
//   prop.value.max = 1;
//   propsMap.set(sets[counter], prop);
//   counter = counter + 1;
//   if (counter === sets.length) {
//     counter = 0;
//   }
// }, 3000);

//Run through relations
//For each, check if required variables are defined
//Run Solvers where possible
//Run checks
//Respond to checks
//Loop until all solved
//Run Optimisation (if needed)
