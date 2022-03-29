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
};

export function setAssumptions(props) {
  for (const [propName, limits] of Object.entries(assumptions)) {
    let prop = props.get(propName);
    for (const [limit, value] of Object.entries(limits)) {
      prop.value[limit] = value;
      prop.hard.max = true;
      prop.hard.min = true;
    }
    props.set(propName, prop);
  }
}
