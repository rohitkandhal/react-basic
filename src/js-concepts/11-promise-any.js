// Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfils, returns a single promise that resolves with the value from that promise

function any(promises) {
  if (promises.length === 0) {
    return [];
  }

  return new Promise((resolve, reject) => {
    let errors = [];

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(currResult => {
          resolve(currResult);    // Resolve first promise that's successful
        })
        // eslint-disable-next-line no-loop-func
        .catch(err => {
          // For errors save errors in errors
          errors[i] = err;

          if (errors.length === promises.length) {
            reject(new AggregateError("No promise resolved", errors))
          }
        });
    }
  });
}