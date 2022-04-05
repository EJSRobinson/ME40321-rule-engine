import { Engine } from './engine.js';

let rs = new Engine();

let context = {
  CnaComp: {
    max: 0.01,
    min: 0.01,
  },
  Xcomp: {
    max: 1,
    min: 1,
  },
  Xfin: {
    max: 1.3,
    min: 1.3,
  },
  Aref: {
    max: 0.0177,
    min: 0.0177,
  },
  AoA: {
    max: 0.0872,
    min: 0.0872,
  },
  M: {
    max: 0.8,
    min: 0.7,
  },
  Alt: {
    max: 3500,
    min: 3000,
  },
  t: {
    max: 0.003,
    min: 0.003,
  },
};

for (const [propName, limits] of Object.entries(context)) {
  rs.addContext(propName, limits);
}

setTimeout(() => {
  rs.addConstraint('Kn', {
    max: 2.5,
    min: 1.5,
  });
}, 1000);
