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

function handleUpdateMax(props, entry, key, update) {
  entry.value.max = update;
  entry.fixed.max = true;
  props.set(key, entry);
  console.log(`---> Set ${key} max to ${update}`);
}

function handleUpdateMin(props, entry, key, update) {
  entry.value.min = update;
  entry.fixed.min = true;
  props.set(key, entry);
  console.log(`---> Set ${key} min to ${update}`);
}

export function updateMax(props, key, update) {
  let updateMade = false;
  let entry = props.get(key);
  if (!entry.fixed.max) {
    if (update > entry.value.max || entry.value.max === null) {
      updateMade = true;
      if (entry.limits.hasOwnProperty('max')) {
        if (update < entry.limits.max) {
          handleUpdateMax(props, entry, key, update);
        } else {
          handleUpdateMax(props, entry, key, entry.limits.max);
        }
      } else {
        handleUpdateMax(props, entry, key, update);
      }
    }
  }
  return updateMade;
}
export function updateMin(props, key, update) {
  let updateMade = false;
  let entry = props.get(key);
  if (!entry.fixed.min) {
    if (update < entry.value.min || entry.value.min === null) {
      updateMade = true;
      if (entry.limits.hasOwnProperty('min')) {
        if (update > entry.limits.min) {
          handleUpdateMin(props, entry, key, update);
        } else {
          handleUpdateMin(props, entry, key, entry.limits.min);
        }
      } else {
        handleUpdateMin(props, entry, key, update);
      }
    }
  }
  return updateMade;
}

export function updateVal(props, key, update) {
  let updateMade = false;
  let entry = props.get(key);
  if (!entry.fixed.val) {
    entry.value.val = update;
    if (alwaysFixedProps.includes(key)) {
      entry.fixed.val = true;
    }
    props.set(key, entry);
    console.log(`---> Set ${key} val to ${update}`);
    updateMade = true;
  }
  return updateMade;
}
