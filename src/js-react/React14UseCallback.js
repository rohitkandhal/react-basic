// https://dmitripavlutin.com/dont-overuse-react-usecallback/

// The React useCallback Hook returns a memoized callback function.
// This allows us to isolate resource intensive functions so that they will not automatically run on every render.

// useMemo returns a memoized value and useCallback returns a memoized function.

// One reason to use useCallback is to prevent a component from re-rendering unless its props have changed.


// UseCallBack solves referential integrity problem
function factory() {
  return (a, b) => a + b;
}
const sum1 = factory();
const sum2 = factory();
sum1(1, 2); // => 3
sum2(1, 2); // => 3
sum1 === sum2; // => false
sum1 === sum1; // => true

// The functions sum1 and sum2 share the same code source but they are different function objects

// An object (including a function object) equals only to itself.

// ************************************************
// Purpose of useCallback
function MyComponent() {
  // handleClick is re-created on each render
  const handleClick = () => {
    console.log('Clicked!');
  };
  // ...
}

// handleClick is a different function object on every rendering of MyComponent.

// when you need to maintain a single function instance between renderings:
// A functional component wrapped inside React.memo() accepts a function object prop
// When the function object is a dependency to other hooks, e.g. useEffect(..., [callback])
// When the function has some internal state, e.g. when the function is debounced or throttled.

// given the same dependency values deps, the hook returns the same function instance between renderings (aka memoization):

import { useCallback } from 'react';
function MyComponent() {
  // handleClick is the same function object
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);
  // ...
}

// handleClick variable has always the same callback function object between renderings of MyComponent.