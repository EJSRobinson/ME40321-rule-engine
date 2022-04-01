const sets = {
  Kn: {
    max: 5,
    min: 1.5,
  },
};

export function setTests(props) {
  return new Promise(async (resolve, reject) => {
    for (const [propName, limits] of Object.entries(sets)) {
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
