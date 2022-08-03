// In order to reuse component, we need another wrapping component to hold multiple instances of one component.
import '../styles/App.css';
import React1 from './React1';

export default function App() {
  return (
    <div className="App">
      {/* Make sure you use map and not forEach because forEach does not return anything */}
      {Array.from(Array(5)).map((val, index) => {
        return <React1 key={index + 1} name={index + 1} />
      })}
    </div>
  );
}