import { remoteSolvers } from './api-client.js';

function buildInputs(props, vars) {
  let result = {};
  for (const [varKey, varEntry] of Object.entries(vars)) {
    result[varKey] = props.get(varKey).value[varEntry];
  }
  return result;
}

function buildMirrorInputs(props, vars) {
  let result = {};
  for (const [varKey, varEntry] of Object.entries(vars)) {
    let entry = varEntry;
    switch (varEntry) {
      case 'max':
        entry = 'min';
      case 'min':
        entry = 'max';
    }
    result[varKey] = props.get(varKey).value[entry];
  }
  return result;
}

const ct = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/1', buildMirrorInputs(props, vars));
      props.set('ct', result);
      return result;
    },
    mirror: () => {},
  },
  2: {
    normal: () => {},
    mirror: () => {},
  },
  3: {
    normal: () => {},
    mirror: () => {},
  },
  4: {
    normal: () => {},
    mirror: () => {},
  },
  5: {
    normal: () => {},
    mirror: () => {},
  },
};

export const core = {
  ct: ct,
  cr: {},
  S: {},
  AR: {},
  TR: {},
  Afin: {},
  Cna: {},
  AoA: {},
  Cn: {},
  Ct: {},
  Cl: {},
  Cd: {},
  Fl: {},
  Fd: {},
  Sigma: {},
  t: {},
  v: {},
  m: {},
  mT: {},
  N: {},
  LEsw: {},
  TEsw: {},
  Xfin: {},
  Kn: {},
  M: {},
  V: {},
  C1: {},
  Wn: {},
  Zeta: {},
  Tp: {},
  Fn: {},
  Ft: {},
};
