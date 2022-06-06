import "./styles.css";
import Header from "./Header";
import ToDoList from "./ToDoList";
import React, { useEffect, useState } from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.updateCount = this.updateCount.bind(this);
  }

  updateCount() {
    const { count } = this.state;
    this.setState({
      count: 1 + count
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <Header />
        <div>
          <span>Number of Items : </span>
          <b>{count}</b>
        </div>
        <ToDoList count={count} setCount={this.updateCount} />
      </div>
    );
  }
}
