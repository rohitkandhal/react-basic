
import { memo, useState } from 'react';

// nesting children defeats memoization, unless the children are just plain text.
// const Memoized = React.memo(({ children }) => (<div>{children}</div>));
// Won't ever re-render
// <Memoized>bar</Memoized>
// Will re-render every time; the memoization does nothing
// <Memoized><b>bar</b></Memoized>

function _B() {
  console.log('B')
  return null
}

// B is a plain text, so it will never re-render
const B = memo(_B)

// When A has react component so it will re-render everytime
function _A({ children }) {
  console.log('A')
  return children
}

const A = memo(_A)

export default function React25UseMemo() {
  const [count, setCount] = useState(0)

  return <div>
    <button onClick={
      () => setCount(count => count + 1)
    }>
      click me
    </button>
    <A>
      <B />
    </A>
  </div>
}

// First A is rendered, then B
// For each subsequent clicks, A will be rendered again and again but B won't 
// because 