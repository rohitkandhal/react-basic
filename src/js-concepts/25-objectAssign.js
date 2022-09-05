function objectAssign(target, ...sources) {
  if (target == null) {
    throw new Error("Not supported")
  }

  target = Object(target)

  for (let source of sources) {
    if (source == null) {
      continue;
    }

    merge(Object.keys(source), source);
    merge(Object.getOwnPropertySymbols(source), source);
  }

  return target;

  function merge(keys, source) {
    for (let key of keys) {
      target[key] = source[key];

      if (target[key] != source[key]) {
        throw new Error("Unexpected Error")
      }
    }
  }
}