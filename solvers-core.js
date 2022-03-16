function testFunc() {
  return 1;
}
function testFunc2() {
  return 0;
}

const ct = {
  1: {
    normal: testFunc,
    mirror: testFunc2,
  },
  2: {
    normal: function () {},
    mirror: function () {},
  },
  3: {
    normal: function () {},
    mirror: function () {},
  },
  4: {
    normal: function () {},
    mirror: function () {},
  },
  5: {
    normal: function () {},
    mirror: function () {},
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
