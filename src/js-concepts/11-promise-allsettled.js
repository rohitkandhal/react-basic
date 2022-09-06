// Different from Promise.all() which rejects right away once an error occurs,
//  Promise.allSettled() waits for all promises to settle.

function allSettled(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    let finalResult = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).
        then(currPromiseResult => {

          finalResult[index] = { status: 'fulfilled', value: currPromiseResult };

        }).catch(err => {

          finalResult[index] = { status: 'rejected', reason: err };

        }).finally(() => {
          completedCount++;

          if (completedCount === promises.length) {
            resolve(finalResult)
          }
        });
    });
  });
}