// Use relations to call solvers

//IMPORT RELATIONS
//IMPORT VARS
import { Relations } from './relations.js';
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
  console.log(`${(trueCount / pairs.length) * 100}% Defined`);
}

function checkDefined(list) {
  let result = true;
  for (let i = 0; i < list.length; i++) {
    let property = propsMap.get(list[i]);

    if (property.value.typeName === 'quant') {
      if (property.value.max === null) {
        //Handle Min
        result = false;
      }
    }
    if (property.value.typeName === 'range') {
      if (property.value.max.length === 0) {
        //Handle Min
        result = false;
      }
    }
    if (property.value.typeName === 'qual') {
      if (property.value.val === null) {
        result = false;
      }
    }
    if (property.value.typeName === 'list') {
      if (property.value.val === null) {
        result = false;
      }
    }
  }
  return result;
}

setInterval(() => {
  for (const [propName, prop] of Object.entries(relations.rules)) {
    for (const [entryKey, entry] of Object.entries(prop)) {
      if (checkDefined(entry.vars)) {
        //console.log(entry.vars);
        const property = propsMap.get(propName);
        if (property.value.typeName === 'quant') {
          property.value.max = 1;
        }
        if (property.value.typeName === 'range') {
          property.value.max = [1];
        }
        if (property.value.typeName === 'qual') {
          property.value.val = '1';
        }
        if (property.value.typeName === 'list') {
          property.value.val = '1';
        }
        propsMap.set(propName, property);
      }
    }
  }
  displayState();
}, 1500);

let counter = 0;
let sets = ['ct', 'cr', 'S', 'TEsw', 'Kn'];
setInterval(() => {
  let prop = propsMap.get(sets[counter]);
  prop.value.max = 1;
  propsMap.set(sets[counter], prop);
  counter = counter + 1;
  if (counter === sets.length) {
    counter = 0;
  }
}, 3000);

//Run through relations
//For each, check if required variables are defined
//Run Solvers where possible
//Run checks
//Respond to checks
//Loop until all solved
//Run Optimisation (if needed)
