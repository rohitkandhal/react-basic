// a handy method to help retrieving data from an arbitrary object. if the resolved value from path is undefined, defaultValue is returned.

const obj = {
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
}


function get(source, path, defaultValue = undefined) {

  if (!path.length) return defaultValue;

  if (!Array.isArray(path)) {
    // It's a string
    path = path.replace(/\[/g, '.').replace(/\]/, '').split('.');
  }

  let obj = source;

  for (let i = 0; i < path.length; i++) {
    if (!obj || !obj[path[i]]) {
      return defaultValue;
    }
    // go deep inside
    obj = obj[path[i]]
  }

  return obj;
}

console.log(get(obj, 'a.b.c')) // [1,2,3]
console.log(get(obj, 'a.b.c.0')) // 1
console.log(get(obj, 'a.b.c[1]')) // 2
console.log(get(obj, ['a', 'b', 'c', '2'])) // 3
console.log(get(obj, 'a.b.c[3]')) // undefined
console.log(get(obj, 'a.c', 'bfe')) // 'bfe'
