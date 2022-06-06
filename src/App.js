import "./styles.css";
import Header from "./Header";
import ToDoList from "./ToDoList";
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Header />
      <div>
        <span>Number of Items : </span>
        <b>{count}</b>
      </div>
      <ToDoList count={count} setCount={setCount} />
    </div>
  );
}
