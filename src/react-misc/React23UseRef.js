import { useRef, useLayoutEffect } from 'react';

export default function React23UseRef() {
  const ref = useRef(false)

  // it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render.
  useLayoutEffect(() => {
    console.log(1)
    ref.current = true
  })

  return <button autoFocus
    onFocus={() => {
      console.log('on focus', !!ref.current)
    }}>
    button
  </button>
}

// Solution 'on focus' false
// 1

// First button will be rendered
// Then autofocus will cause button to get focus
// As button gets focus, it's onFocus handler will be called
// This will trigger DOM mutation, calling useLayoutEffect function