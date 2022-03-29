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
      case 'min':
        entry = 'max';
    }
    result[varKey] = props.get(varKey).value[entry];
  }
  return result;
}

export function updateMax(props, key, update) {
  let entry = props.get(key);
  if (update > entry.value.max || entry.value.max === null) {
    entry.value.max = update;
  }
  props.set(key, entry);
  console.log(`---> Set ${key} max to ${update}`);
}

export function updateMin(props, key, update) {
  let entry = props.get(key);
  if (update < entry.value.min || entry.value.min === null) {
    entry.value.min = update;
  }
  props.set(key, entry);
  console.log(`---> Set ${key} min to ${update}`);
}

export function updateVal(props, key, update) {
  let entry = props.get(key);
  entry.value.val = update;
  props.set(key, entry);
  console.log(`---> Set ${key} val to ${update}`);
}
