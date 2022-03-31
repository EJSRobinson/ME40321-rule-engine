const sets = {
  Kn: {
    max: 5,
    min: 1.5,
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

export function setTests(props) {
  for (const [propName, limits] of Object.entries(sets)) {
    let prop = props.get(propName);
    for (const [limit, value] of Object.entries(limits)) {
      prop.value[limit] = value;
      prop.fixed.max = true;
      prop.fixed.min = true;
    }
    props.set(propName, prop);
  }
}
