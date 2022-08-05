// React has two phrases that run sequentially to update the UI.

// 1. Render Phase: when React compares a previous version of a Virtual DOM with an updated version to figure out what if any changes need to be made.
// 2. Commit Phase: when React actually changes the real DOM.

// React is very efficient about figuring out the minimal DOM operations to make in the "render phase" and batches them to make rendering the UI extremely performant
// the "render phase" does take work and consumes resources and should not take place if it isn't needed. 

// React.Memo when using function components.

// const MyComponent = React.memo(function MyComponent(props) {
//   /* render using props */
// });

// React.memo is a higher order component for function components and subsequently can only be used with function components.