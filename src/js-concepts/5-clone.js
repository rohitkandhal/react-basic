
// 1. Deep clone

function cloneDeep(data, referencesMap = new Map()) {

  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (referencesMap.has(data)) {
    return referencesMap.get(data);
  }

  const result = Array.isArray(data) ? [] : {}

  referencesMap.set(data, result);

  const keys = [
    ...Object.getOwnPropertySymbols(data),
    ...Object.keys(data),
  ];

  for (const key of keys) {
    result[key] = cloneDeep(data[key], referencesMap);
  }

  return result;
}