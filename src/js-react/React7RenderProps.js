// To Share Code between React components, there are three techniques
// 1. “render prop”  technique for sharing code using a prop whose value is a function.
// 2. "higher order functions"
// 3. "Custom hooks"

function Box(props) {
  return (
    <div>
      {props.render && props.render()}
    </div>
  )
}
export default function React7RenderProps() {
  return (
    <>
      < Box render={() => <h3>this is passed from render - 1</h3>} />
      < Box render={() => <h3>this is passed from render = 2</h3>} />
      < Box render={() => <h3>this is passed from render = 3</h3>} />
    </>
  )
}