// To Share Code between React components, there are three techniques
// 1. “render prop”  technique for sharing code using a prop whose value is a function.
// 2. "higher order functions"
// 3. "Custom hooks"

// a higher-order component is a function that takes a component and returns a new component.

function ARandomInnerComponent(props) {
  return (
    <>
      <h4>An Inner Component</h4>
      <p>It's name is {props.name}</p>
    </>
  )
}

function wrapperHigherOrderFunction(InnerComponent, valueForWrapper) {
  function OuterComponent(propsToInnerComponent) {
    return (
      <>
        <h3>Outer Component - {valueForWrapper}</h3>
        <InnerComponent {...propsToInnerComponent}></InnerComponent>
      </>
    )
  }

  return OuterComponent;
}

const Outer1 = wrapperHigherOrderFunction(ARandomInnerComponent, "Outer 1")    // It returns a component
const Outer2 = wrapperHigherOrderFunction(ARandomInnerComponent, "Outer 2")    // It returns a component

export default function React8HigherOrderFunction() {
  return (
    <>
      <Outer1 name="Inner component name - 1" />
      <Outer2 name="Inner component name - 2" />
    </>
  )
}