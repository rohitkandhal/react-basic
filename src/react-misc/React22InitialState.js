// This is a React Quiz from BFE.dev
// https://bigfrontend.dev/react-quiz/lazy-initial-state

import { useState, useEffect } from 'react'

export default function React22InitialState() {
  const [state1, setState1] = useState(1);

  const [state2] = useState(() => {
    console.log('inside hook', 2); // One console statement
    return 2;
  });

  console.log('Console from main', state1);

  useEffect(() => {
    setState1(3);
  }, []);

  return null;
}

// Output
// inside hook 2
// Console from main 1
// Console from main 3

// Key takeaways
// 1. If you pass function to useState, then that function gets called right away.
// const [state2] = useState(() => {
//   console.log('inside hook', 2); // One console statement
//   return 2;
// });
// This will print inside hook 2 right away

// 2. Then component will try to render which will print state 1 i.e. 2

// 3. Once component is rendered, useEffect will be called
// this will call setState1. Updating state will cause component to render again and print Console from main 3