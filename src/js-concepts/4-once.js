// force a function to be called only once, later calls only returns the result of first call.

function once(callback) {
  let result = undefined, isCalled = false;
  return function onced(...args) {
    if (isCalled === false) {
      result = callback.apply(this, args);
      isCalled = true
    }
    return result;
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