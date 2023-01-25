import React, { useState } from "react";
import { TodosStore } from "../../store/todo";
import "./style.scss";
const Todo = ({ id, title, completed }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  const editHandler = (todo) => {
    TodosStore.editTodo(todo);
    setIsEdit(true);
    setEditingTodo({ id, title, completed });
  };
  const saveHandler = (todo) => {
    TodosStore.saveTodo(todo);
    setEditingTodo({});
    setIsEdit(false);
  };
  return (
    <div className="container">
      <input
        type={"checkbox"}
        checked={completed}
        onChange={() => {
          TodosStore.toggleTodo(id);
        }}
      />
      {isEdit && TodosStore.editingTodo.id ? (
        <input
          value={editingTodo.title}
          onChange={(e) => {
            setEditingTodo({ ...editingTodo, title: e.target.value });
          }}
        />
      ) : (
        <p>{title}</p>
      )}
      <span>
        <button
          onClick={() =>
            isEdit && TodosStore.editingTodo.id
              ? saveHandler(editingTodo)
              : editHandler({ id, title, completed })
          }
        >
          {isEdit && TodosStore.editingTodo.id ? "save" : "edit"}
        </button>
        <button onClick={() => TodosStore.deleteTodo(id)}>delete</button>
      </span>
    </div>
  );
};

export default Todo;
