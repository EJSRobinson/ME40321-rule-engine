import { remoteSolvers } from './api-client.js';

const ct = {
  1: {
    normal: async () => {
      let inputs = {
        var1: 10,
        var2: 5,
        var3: 14,
      };
      const result = await remoteSolvers('/ct/1', inputs);
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

async function test() {
  let response = await core.ct[1].normal();
  console.log(response);
}

test();
