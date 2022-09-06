// implement an async function helper, parallel() which works like Promise.all(). Different from sequence(), the async function doesn't wait for each other, rather they are all triggered together.

// type Callback = (error: Error, data: any) => void

// type AsyncFunc = (
//    callback: Callback,
//    data: any
// ) => void

// Your parallel() should accept AsyncFunc array, and return a new function
//  which triggers its own callback when all async functions are done or an error occurs.

const async1 = (callback) => {
  callback(undefined, 1)
}

const async2 = (callback) => {
  callback(undefined, 2)
}

const async3 = (callback) => {
  callback(undefined, 3)
}

const all = parallel(
  [
    async1,
    async2,
    async3
  ]
)

all((error, data) => {
  console.log(data) // [1, 2, 3]
}, 1)

function parallel(asyncFuncArr) {
  const promisifiedFuncs = asyncFuncArr.map(promisify);

  return function (callback, input) {
    const resultPromise = Promise.resolve(callback);

    const allPromises = promisifiedFuncs.map(func => resultPromise.then(func));

    return Promise.all(allPromises).then((res) => {
      callback(null, res)
    }).catch(callback);
  }
}

// 1. Promisify all functions
// 2. Use Promise.all()
// 3. When done attach the callback

function promisify(callback) {

  return new Promise((resolve, reject) => {
    callback((err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data);
    })
  })
}
