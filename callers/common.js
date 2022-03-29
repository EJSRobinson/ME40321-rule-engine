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

export function updateMax(props, key, update) {
  update = Math.round(update * 10000) / 10000;
  let entry = props.get(key);
  if (!entry.hard) {
    if (update > entry.value.max || entry.value.max === null) {
      entry.value.max = update;
      props.set(key, entry);
      console.log(`---> Set ${key} max to ${update}`);
    }
  }
}
export function updateMin(props, key, update) {
  update = Math.round(update * 10000) / 10000;
  let entry = props.get(key);
  if (!entry.hard) {
    if (update < entry.value.min || entry.value.min === null) {
      entry.value.min = update;
      props.set(key, entry);
      console.log(`---> Set ${key} min to ${update}`);
    }
  }
}

export function updateVal(props, key, update) {
  let entry = props.get(key);
  if (!entry.hard) {
    entry.value.val = update;
    props.set(key, entry);
    console.log(`---> Set ${key} val to ${update}`);
  }
}
