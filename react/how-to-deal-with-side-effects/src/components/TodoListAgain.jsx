import { useState, useEffect, useMemo } from "react";
import {
  initialTodosAgain,
  createTodo,
  getVisibleTodos,
} from "../utilities/todosAgain";

export default function TodoListAgain() {
  const [todos, setTodos] = useState(initialTodosAgain);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState("");
  // const [visibleTodos, setVisibleTodos] = useState([]);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, showActive);
  }, [todos, showActive]);

  function handleAddClick() {
    setText("");
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <section>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
