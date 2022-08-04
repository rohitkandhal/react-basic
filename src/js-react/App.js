// In order to reuse component, we need another wrapping component to hold multiple instances of one component.
import '../styles/App.css';
import { React6CommentList } from './React6FormsWithApiRequest';

export default function App() {
  return (
    <div className="App">

      {/* {Array.from(Array(5)).map((val, index) => {
        // Make sure you use map and not forEach because forEach does not return anything
        return <React1 key={index + 1} name={index + 1} />
      })} */}

      {/* <React3CommentList /> */}

      {/* <React4Forms /> */}

      {/* <React5UncontrolledComponent /> */}

      <React6CommentList />
    </div>
  )
}