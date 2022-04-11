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
  Arf: {
    val: 'flatPlateF',
  },
  Mat: {
    val: 'aluminium',
  },
  AoA: {
    max: (5 * Math.PI) / 180,
    min: (5 * Math.PI) / 180,
  },
  //Context
};

export function setAssumptions(props) {
  return new Promise(async (resolve, reject) => {
    for (const [propName, limits] of Object.entries(assumptions)) {
      let prop = props.get(propName);
      for (const [limit, value] of Object.entries(limits)) {
        prop.value[limit] = value;
        if (limit === 'max') {
          prop.fixed.max = true;
        }
        if (limit === 'min') {
          prop.fixed.min = true;
        }
      }
      props.set(propName, prop);
    }
    resolve();
  });
}
