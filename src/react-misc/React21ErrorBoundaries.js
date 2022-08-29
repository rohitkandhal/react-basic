// // https://reactjs.org/docs/react-component.html#error-boundaries
// // https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

// // Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

// // A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

// // Only use error boundaries for recovering from unexpected exceptions; don’t try to use them for control flow.

// //  getDerivedStateFromError(error)
// // This lifecycle is invoked after an error has been thrown by a descendant component. 
// // It receives the error that was thrown as a parameter and should return a value to update state.

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     logErrorToMyService(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// // Then you can use it as a regular component:

// <ErrorBoundary>
//   <MyWidget />
// </ErrorBoundary>

// // Only class components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.