// N is 3
// TR is 2
// AR is 2
// Flat Plate Profile
const assumptions = {
  N: {
    min: 3,
    max: 3,
  },
  TR: {
    min: 0.5,
    max: 0.5,
  },
  AR: {
    min: 2,
    max: 2,
  },
  Ta: {
    max: 300,
    min: 273,
  },
  TEsw: {
    max: 0,
    min: 0,
  },
  RowA: {
    max: 1.225,
  },
  XCog: {
    max: 1,
    min: 0.9,
  },
  CnaComp: {
    max: 0.3,
    min: 0.3,
  },
  Xcomp: {
    max: 0.95,
    min: 0.95,
  },
  Xfin: {
    max: 1.6,
    min: 1.4,
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
  Arf: {
    val: 'flatPlateF',
  },
  Mat: {
    val: 'aluminium',
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

export function setAssumptions(props) {
  return new Promise(async (resolve, reject) => {
    for (const [propName, limits] of Object.entries(assumptions)) {
      let prop = props.get(propName);
      for (const [limit, value] of Object.entries(limits)) {
        prop.value[limit] = value;
        prop.fixed.max = true;
        prop.fixed.min = true;
      }
      props.set(propName, prop);
    }
    resolve();
  });
}
