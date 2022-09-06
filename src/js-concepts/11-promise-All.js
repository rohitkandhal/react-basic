// ************************
// Multiple approaches to implement Promise.all

// This approach works
function promiseAll2UsingIterative(funcs) {
  return new Promise((resolve, reject) => {

    let results = [];
    let completedCount = 0;

    if (funcs.length === 0) {
      resolve(results);
      return;
    }

    funcs.forEach((func, index) => {
      Promise.resolve(func).then(result => {
        results[index] = result;
        completedCount++;

        if (completedCount === funcs.length) {
          resolve(results);
        }
      }).catch(err => reject(err));
    })
  });
}

function promiseAll1UsingRecursion(funcs) {
  if (funcs.length === 0) {
    return Promise.resolve([])
  }

  const [first, ...rest] = funcs;

  // Calling promise.resolve on 
  // The Promise.resolve() method "resolves" a given value to a Promise.
  return Promise.resolve(first).then(firstResult => {
    return promiseAll1UsingRecursion(rest).then(restResults => {
      return [firstResult, ...restResults];
    })
  })
}

function promiseAll3UsingReducer(promises) {
  return promises.reduce((accumulator, currPromise) => {

    return accumulator.then(accumulatedResults => {

      return Promise.resolve(currPromise).then(currPromiseResult => {

        return [...accumulatedResults, currPromiseResult]
      })
    })
  }, Promise.resolve([]))
}