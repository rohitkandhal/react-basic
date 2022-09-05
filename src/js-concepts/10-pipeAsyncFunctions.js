// You are asked to implement an async function helper, sequence() which chains up async functions, like what pipe() does.

// type Callback = (error: Error, data: any) => void

// type AsyncFunc = (
//    callback: Callback,
//    data: any
// ) => void

// Your sequence() should accept AsyncFunc array, and 
// chain them up by passing new data to the next AsyncFunc through data in Callback.

const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100)
}

// Expected
const asyncTimes4 = sequence(
  [
    asyncTimes2,
    asyncTimes2
  ]
)

asyncTimes4((error, data) => {
  console.log(data) // 4
}, 1)

function sequence(asyncArr) {
  // [Do it once] Convert all async functions to promisified version
  const promisifiedFuncs = asyncArr.map(promisify);

  return function (callback, input) {

    // Create new promise with input
    let resultPromise = Promise.resolve(input)

    // Chain all promises
    // NOTE - It's important we are setting new variable
    // otherwise it won't work.
    // resultProimse.then(promisifiedFunc) won't work
    for (let promisefiedFunc of promisifiedFuncs) {
      resultPromise = resultPromise.then(promisefiedFunc);
    }

    // Add all results
    resultPromise.then(data => {
      callback(null, data)
    }).catch(callback);

  }
}

function promisify(callback) {

  return function promisified(input) {

    return new Promise((resolve, reject) => {

      callback((err, data) => {
        if (err) {
          reject(err);
        }

        return resolve(data);
      }, input);

    })
  }
}

// Approach
// 1. Add a promisify function
// 2. Convert all async functions to promisified functions
// 3. Chain all promises
// 4. In the end call result callback or error callback