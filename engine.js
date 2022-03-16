// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations-core.js';
import { getAll } from 'me40321-database';

const functionsCore = {
  testfunc: () => {
    return 1;
  },
};

let relations = new Relations(functionsCore);

let propsMap = getAll();

function displayState() {
  let pairs = [];
  let trueCount = 0;
  for (const [key, value] of propsMap.entries()) {
    if (checkDefined([key])) {
      trueCount += 1;
      pairs.push([key, true]);
    } else {
      pairs.push([key, false]);
    }
  }
  console.table(pairs);
  console.log(`${parseInt((trueCount / pairs.length) * 100)}% Defined`);
}

function checkDefined(vars) {
  let result = true;
  for (let i = 0; i < vars.length; i++) {
    let property = propsMap.get(vars[i].name);
    switch (property.value.typeName) {
      case 'quant':
        switch (vars[i].perm) {
          case 'max':
            if (property.value.max === null) {
              result = false;
            }
          case 'min':
            if (property.value.min === null) {
              result = false;
            }
          case 'any':
            if (property.value.max === null && property.value.min === null) {
              result = false;
            }
        }
      case 'range':
        switch (vars[i].perm) {
          case 'max':
            if (property.value.max.length >= 1) {
              result = false;
            }
          case 'min':
            if (property.value.min.length >= 1) {
              result = false;
            }
          case 'any':
            if (property.value.max.length >= 1 && property.value.min.length >= 1) {
              result = false;
            }
        }
      case 'qual':
      case 'list':
        if (property.value.val === null) {
          result = false;
        }
    }
  }
  return result;
}

setInterval(() => {
  for (const [propName, prop] of Object.entries(relations.rules)) {
    for (const [entryKey, entry] of Object.entries(prop.relations)) {
      if (entry.enbaled) {
        checkDefined(entry.vars);
      }
    }
  }
  // displayState();
}, 1500);

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
