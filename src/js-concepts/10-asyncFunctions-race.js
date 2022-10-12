// Your race() should accept AsyncFunc array, and return a new function which triggers its own callback when any async function is done or an error occurs.


function race(funcs) {

  let isFinished = false;

  return function (callback, input) {

    funcs.forEach(func => {
      func((err, data) => {
        if (!isFinished) {
          isFinished = true;
          callback(err, data);
        }
      })
    })
  };
}

const async1 = (callback) => {
  setTimeout(() => callback(undefined, 1), 300)
}

const async2 = (callback) => {
  setTimeout(() => callback(undefined, 2), 100)
}

const async3 = (callback) => {
  setTimeout(() => callback(undefined, 3), 200)
}

const first = race(
  [
    async1,
    async2,
    async3
  ]
)

first((error, data) => {
  console.log(data) // 2, since 2 is the first to be given
}, 1)