import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TodosStore } from "./store/todo";
import Todo from "./components/Todo";
import "./app.scss";

const App = observer(() => {
  useEffect(() => {
    TodosStore.getTodos();
  }, []);
  return (
    <div>
      <div className="todo_container">
        {TodosStore.todos?.map((value) => (
          <Todo key={value.id} {...value} />
        ))}
      </div>
    </div>
  );
});

export default App;
