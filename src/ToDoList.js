import { useState } from "react";

export default function ToDoList(props) {
  const [value, setValue] = useState("");
  const [items, updateItems] = useState([]);

  function addItemToList() {
    const checkIfValueExists = (valueToCheck) => {
      let itemExists = false;
      items.forEach((item) => {
        if (item.id === valueToCheck || item.name === valueToCheck) {
          itemExists = true;
        }
      });
      return itemExists;
    };

    if (!!value) {
      if (!checkIfValueExists(value)) {
        let newId = Math.floor(Math.random() * 1000);
        while (checkIfValueExists(newId))
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
        updateItems([
          ...items,
          {
            name: value,
            id: newId,
            timeStamp: datetime
          }
        ]);
        props?.setCount(1 + props?.count);
      }
      setValue("");
    }
  }

  function deleteItemFromList(event) {
    const itemToDeleteId = event.target.getAttribute("name");
    updateItems(items.filter((item) => item.id != itemToDeleteId));
  }

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addItemToList}> ADD </button>
      <hr />
      {items.map((item) => {
        const key = `${item.name}-${item.id}`;
        console.log(item.id);
        return (
          <div key={key} style={{ margin: 5 }}>
            <span>{item.name}</span>
            <button
              name={item.id}
              onClick={deleteItemFromList}
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
