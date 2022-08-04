// Uncontrolled components
// When form data is handled by DOM itself, then use uncontrolled components

// When writing an uncontrolled component you use a ref to get form values from the DOM directly instead of writing an event handler for every state update.

// Use defaultValue to initialize uncontrolled components
// Use value to initialize controlled components

import { useRef } from "react";


export default function React5UncontrolledComponent() {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(inputRef.current);    // Returns the component | <input type="text" name="username" id="username">
    console.log(inputRef.current.value);    // Returns the value of text | "abc"
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username"
          defaultValue="init value"   // Don't use value here 
          ref={inputRef}    // SET REF LIKE THIS
        ></input>
      </div>

      <button type="submit">Submit</button>
    </form >
  );
};