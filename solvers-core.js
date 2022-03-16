import { remoteSolvers } from './api-client.js';

const ct = {
  1: {
    normal: remoteSolvers('/test'),
    mirror: remoteSolvers('/test'),
  },
  2: {
    normal: remoteSolvers('/test'),
    mirror: remoteSolvers('/test'),
  },
  3: {
    normal: remoteSolvers('/test'),
    mirror: remoteSolvers('/test'),
  },
  4: {
    normal: remoteSolvers('/test'),
    mirror: remoteSolvers('/test'),
  },
  5: {
    normal: remoteSolvers('/test'),
    mirror: remoteSolvers('/test'),
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
