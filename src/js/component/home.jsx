import React, { useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((t, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul className="todo-list">
        {" "}
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder="Add a task"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}{" "}
            
			<button onClick={() => deleteTodo(index)} className="delete-button">
			✖
            </button>
			
          </li>
        ))}
      </ul>
      <div className="task-count">{todos.length} tasks</div>
    </div>
  );
};

export default Home;
