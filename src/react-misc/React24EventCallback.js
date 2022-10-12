import { useState, useLayoutEffect } from 'react';

function React24EventCallback() {
  const [state, setState] = useState(0)

  const onClick = () => {
    console.log('handler start')
    setState(state => state + 1)
    console.log('handler end' + state)
  }

  console.log('render ' + state)
  return <div>
    <button onClick={onClick}>click me</button>
  </div>
}

// Solution
// render 0
// handler start
// handler end
// render 1

// Key Concept is that setState is an async call.

//   const onClick = () => {
//     console.log('handler start')  // num  1
//     setState(state => state + 1)   // num 3
//     console.log('handler end' + state) // num 2
//   }
