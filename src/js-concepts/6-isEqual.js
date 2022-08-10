// Compare data types by value not the reference

// Objects are compared by their own, not inherited, enumerable properties
// const a = {a: 'bfe'}
// const b = {a: 'bfe'}

// isEqual(a, b) // true
// a === b // false

// const c = [1, a, '4']
// const d = [1, b, '4']

// isEqual(c, d) // true
// c === d // false

function isEqual(val1, val2, cache = new Set()) {
  if (val1 === null || val2 === null || typeof val1 !== 'object' || typeof val2 !== 'object') {
    return val1 === val2;
  }

  cache.add(val1);
  cache.add(val2);

  if (Object.keys(val1).length !== Object.keys(val2).length) {
    return false;
  }

  for (let key in val1) {
    if (cache.has(val1[key]) && cache.has(val2[key])) return true;

    if (!isEqual(val1[key], val2[key], cache)) {
      return false;
    }
  }

  return true;
}