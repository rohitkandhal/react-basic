// create a pipe() function, which chains multiple functions together to create a new function.

const times = (y) => (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y

function pipe(funcs) {
  return function (arg) {
    return funcs.reduce((accumulator, currFun) => {
      return currFun(accumulator)
    }, arg)
  }
}

const multiples = pipe([
  times(2),
  times(3),
  times(2)
])
// x * 2 * 3

console.log(`5*2*3 = ${multiples(5)}`);