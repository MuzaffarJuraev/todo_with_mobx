import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TodosStore } from "./store/todo";
import Todo from "./components/Todo";
import "./app.scss";

const App = observer(() => {
  useEffect(() => {
    TodosStore.getTodos();
  }, []);
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <div className="input_container">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={() => TodosStore.setTodo(inputValue)}>Add</button>
      </div>
      <div className="todo_container">
        {TodosStore.todos?.map((value) => (
          <Todo key={value.id} {...value} />
        ))}
      </div>
    </div>
  );
});

export default App;
