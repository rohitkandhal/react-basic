// const join = (a, b, c) => {
//   return `${a}_${b}_${c}`
// }

// const curriedJoin = curry(join)
// curriedJoin(1, 2, 3) // '1_2_3'
// curriedJoin(1)(2, 3) // '1_2_3'
// curriedJoin(1, 2)(3) // '1_2_3'

// currying with multiple args
// https://javascript.info/currying-partials#advanced-curry-implementation

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// Part 2, curry with placeholder
function curryWithPlaceholder(fn) {
  // Don't use arrow function inside this
  function curried(...args) {
    // 1. Remove extra args
    const sanitizedArgs = args.slice(0, fn.length);

    // 2. check if there are placeholders
    const hasPlaceholder = sanitizedArgs.some(arg => arg === curryWithPlaceholder.placeholder);

    // 3. If no placeholder and args matches length then call
    if (!hasPlaceholder && sanitizedArgs.length === fn.length) {
      return fn.apply(this, sanitizedArgs);
    }

    // 4. We need to merge placeholders with actual values
    return function nextCurried(...nextArgs) {
      return curried.apply(this, mergeArgs(sanitizedArgs, nextArgs))
    }
  }
  return curried;

  function mergeArgs(oldArgs, newArgs) {
    // oldArgs has placeholders
    // for each placeholder, you pick from the newArgs
    let result = [];


    oldArgs.forEach(oldArg => {
      if (oldArg === curryWithPlaceholder.placeholder && newArgs.length > 0) {
        result.push(newArgs.shift());
      } else {
        result.push(oldArg);
      }
    });
    result = result.concat(newArgs);

    return result;
  }
}

curryWithPlaceholder.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curryWithPlaceholder(join)
const _ = curryWithPlaceholder.placeholder

console.log(curriedJoin(1, 2, 3)) // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'