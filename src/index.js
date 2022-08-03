import ReactDOM from "react-dom/client";
import React from "react";
import './styles/index.css';    // to have subheading style
import App from "./js-react/App";

let rootDOM = document.getElementById('root');
const rootReact = ReactDOM.createRoot(rootDOM);

// ---------------------------
// 1. Simple JS
// ---------------------------
// const newElemHTML = document.createElement('h2');
// newElemHTML.textContent = "1. HTML elem";
// newElemHTML.className = "subheading";
// rootDOM.appendChild(newElemHTML);

// ---------------------------
// 2. Using React
// ---------------------------
// const newElem = React.createElement('h2', { className: 'subheading' }, '2. JS - React.createElement')
// rootReact.render(newElem)

// ---------------------------
// 3. Using JSX
// ---------------------------
// rootReact.render(<React1 />)

// Render multiple elements
// rootReact.render([newElem, <React1 />, <React1 name="Passed Argument" />])

// ---------------------------
// 4. React Virtual Dom
// You will notice that react will calculate the diff b/w what's already on the DOM
// and new dom. Here only H3 will be updated and rest will remain the same
// ---------------------------
// function renderElementLater() {
//   const element = (
//     <>
//       <h2 className="subheading">4. This is setInterval H2</h2>
//       <h3>{new Date().toLocaleTimeString()}</h3>
//     </>
//   );

//   rootReact.render(element);
// }

// setInterval(renderElementLater, 1000)

// ---------------------------
// 5. Load App
// ---------------------------

rootReact.render(<App ></App>)