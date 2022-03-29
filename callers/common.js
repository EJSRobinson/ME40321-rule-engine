export function buildInputs(props, vars) {
  let result = {};
  for (const [varKey, varEntry] of Object.entries(vars)) {
    result[varKey] = props.get(varKey).value[varEntry];
  }
  return result;
}

export function buildMirrorInputs(props, vars) {
  let result = {};
  for (const [varKey, varEntry] of Object.entries(vars)) {
    let entry = varEntry;
    switch (varEntry) {
      case 'max':
        entry = 'min';
        break;
      case 'min':
        entry = 'max';
        break;
    }
    result[varKey] = props.get(varKey).value[entry];
  }
  return result;
}

const alwaysHardProps = ['ct', 'cr', 'S'];

export function updateMax(props, key, update) {
  let entry = props.get(key);
  if (!entry.hard.max) {
    if (update > entry.value.max || entry.value.max === null) {
      entry.value.max = update;
      if (alwaysHardProps.includes(key)) {
        entry.hard.max = true;
      }
      props.set(key, entry);
      console.log(`---> Set ${key} max to ${update}`);
    }
  }
}
export function updateMin(props, key, update) {
  let entry = props.get(key);
  if (!entry.hard.min) {
    if (update < entry.value.min || entry.value.min === null) {
      entry.value.min = update;
      if (alwaysHardProps.includes(key)) {
        entry.hard.min = true;
      }
      props.set(key, entry);
      console.log(`---> Set ${key} min to ${update}`);
    }
  }
}

export function updateVal(props, key, update) {
  let entry = props.get(key);
  if (!entry.hard.max) {
    entry.value.val = update;
    if (alwaysHardProps.includes(key)) {
      entry.hard.max = true;
    }
    props.set(key, entry);
    console.log(`---> Set ${key} val to ${update}`);
  }
}
