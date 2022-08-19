// an iterator is an object which defines a sequence and potentially a return value upon its termination.
// Arrays must be allocated in their entirety, but iterators are consumed only as necessary
// iterators can express sequences of unlimited size, such as the range of integers between 0 and Infinity.
// Its final return value is the size of the sequence it created, tracked by the variable iterationCount

// {
//   next: {
//     value:
//     done:
//   }
// }

// Usage
const iterator = makeRangeIterator(1, 10, 2);

let result = iterator.next();
while (!result.done) {
  console.log("Iterator 1 ", result.value);
  result = iterator.next();
}

// **********

// Approach 1 - 
function makeRangeIterator(start, end, step) {
  let currVal = start;
  let iterationCount = 0;

  return {
    next: () => {
      let result;
      if (currVal < end) {
        result = { value: currVal, done: false }

        currVal += step;
        iterationCount++;
        return result;
      };

      return { value: iterationCount, done: true }
    }
  }
}

// Appraoch 2 - Using generators

const iterator2 = makeRangeIteratorUsingGenerator(2, 16, 3);

let result1 = iterator2.next();
while (!result1.done) {
  console.log("Generator", result1.value);
  result1 = iterator2.next();
}

function* makeRangeIteratorUsingGenerator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }

  return iterationCount;
}

