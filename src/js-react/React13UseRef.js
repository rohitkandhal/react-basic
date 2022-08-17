// Typeahead
import { useEffect, useState, useRef } from "react";
import { sample } from 'lodash';

const StarwarsHero = ({ id }) => {
  const [data, setData] = useState(null);

  // useRef is like a “box” that can hold a mutable value in its .current property
  const lastPromise = useRef();

  useEffect(() => {
    setData(null);

    // fire the api request
    const currentPromise = fetchStarwarsHeroData(id)
      .then(async data => {
        await delayRandomly();
        throwRandomly()
        return data;
      });

    // store the promise to the ref
    lastPromise.current = currentPromise;

    currentPromise.then(
      result => {
        // check if current promise is same in last ref
        if (currentPromise === lastPromise.current) {
          setData(result);
        }
      },
      e => {
        if (currentPromise === lastPromise.current) {
          console.warn('fetch failure', e)
        }
      }
    );
  }, [id]);

  return <div>{data ? data.name : <Spinner />}</div>;
};

// Will return a promise delayed by a random amount, picked in the delay array
const delayRandomly = () => {
  const timeout = sample([0, 200, 500, 700, 1000, 3000]);
  return new Promise(resolve =>
    setTimeout(resolve, timeout),
  );
};

// Will throw randomly with a 1/4 chance ratio
const throwRandomly = () => {
  const shouldThrow = sample([true, false, false, false]);
  if (shouldThrow) {
    throw new Error('simulated async failure');
  }
};

// useEffect(() => {
//   setData(null);
//   fetchStarwarsHeroData(id)
//     .then(async data => {
//       await delayRandomly();
//       return data;
//     })
//     .then(
//       result => setData(result),
//       e => console.warn('fetch failure', e),
//     );
// }, [id]);

// Another approach using AbortSignal and AbortController
const abortController = new AbortController();
// fire the request, with an abort signal, which will permit premature abortion
fetch(`https://swapi.co/api/people/${id}/`, {
  signal: abortController.signal,
});
// abort the request in-flight, the request will be marked as "cancelled" in devtools
abortController.abort();


// Store abort controller which will permit to abort
// the last issued request
const lastAbortController = useRef();
useEffect(() => {
  setData(null);
  // When a new request is going to be issued,
  // the first thing to do is cancel the previous request
  if (lastAbortController.current) {
    lastAbortController.current.abort();
  }
  // Create new AbortController for the new request and store it in the ref
  const currentAbortController = new AbortController();
  lastAbortController.current = currentAbortController;
  // Issue the new request, that may eventually be aborted
  // by a subsequent request
  const currentPromise = fetchStarwarsHeroData(id, {
    signal: currentAbortController.signal,
  }).then(async data => {
    await delayRandomly();
    throwRandomly();
    return data;
  });
  currentPromise.then(
    result => setData(result),
    e => console.warn('fetch failure', e),
  );
}, [id]);