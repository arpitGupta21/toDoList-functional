import React, { useState } from "react";
import { render } from "react-dom";

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: []
    };

    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.updateFieldValue = this.updateFieldValue.bind(this);
    this.checkIfValueExists = this.checkIfValueExists.bind(this);
  }

  checkIfValueExists = (valueToCheck) => {
    const { items } = this.state;
    let itemExists = false;
    items.forEach((item) => {
      if (item.id === valueToCheck || item.name === valueToCheck) {
        itemExists = true;
      }
    });
    return itemExists;
  };

  addItemToList() {
    const { items, value } = this.state;
    const { count, setCount } = this.props;
    if (!!value) {
      if (!this.checkIfValueExists(value)) {
        let newId = Math.floor(Math.random() * 1000);
        while (this.checkIfValueExists(newId))
          newId = Math.floor(Math.random() * 1000);
        var currentdate = new Date();
        var datetime =
          "Created On: " +
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " at " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();
        this.setState({
          items: [...items, { name: value, id: newId, timeStamp: datetime }],
          value: ""
        });
        setCount(1 + count);
      } else {
        this.setState({
          value: ""
        });
      }
    }
  }

  deleteItemFromList(event) {
    const { items } = this.state;
    const itemToDeleteId = event.target.getAttribute("name");
    this.setState({
      items: items.filter((item) => item.id !== itemToDeleteId)
    });
  }

  updateFieldValue(event) {
    const value = event.target.value;
    this.setState({
      value
    });
  }

  render() {
    const { value, items } = this.state;
    return (
      <>
        <input value={value} onChange={(e) => this.updateFieldValue(e)} />
        <button onClick={this.addItemToList}> ADD </button>
        <hr />
        {items.map((item) => {
          const key = `${item.name}-${item.id}`;
          return (
            <div key={key} style={{ margin: 5 }}>
              <span>{item.name}</span>
              <button
                name={item.id}
                onClick={this.deleteItemFromList}
                size={5}
                style={{ marginLeft: 5 }}
              >
                Delete
              </button>
              <div>{item.timeStamp}</div>
              <hr style={{ width: "50%" }} />
            </div>
          );
        })}
      </>
    );
  }
}
