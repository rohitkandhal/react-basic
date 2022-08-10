// force a function to be called only once, later calls only returns the result of first call.

function once(callback) {
  let memo = undefined, hasEvaluated = false;
  return function onced(...args) {
    if (hasEvaluated === false) {
      memo = callback.apply(this, args);
      hasEvaluated = true
    }
    return memo;
  }
}

function func(num) {
  return num
}

const onced = once(func)
console.log(onced(1))
// 1, func called with 1
console.log(onced(2))
// 1, even 2 is passed, previous result is returned 