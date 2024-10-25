import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  let count = todos.length == 1? "task" : "tasks"

  const getTodos = async () => {
    const response = await fetch('https://playground.4geeks.com/todo/users/victorfuentes');

    if (response.ok) {
      const data = await response.json();
      setTodos(data.todos);  
    } 
  };

  useEffect(() => {
    const checkCreateUser = async () => {
      const response = await fetch('https://playground.4geeks.com/todo/users/victorfuentes');

      if (response.status < 200 || response.status >= 300) {
        const createUserResponse = await fetch(
          'https://playground.4geeks.com/todo/users/victorfuentes',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([]),  
          }
        );
        
        if (createUserResponse.ok) {
          console.log("User created!");
        }
      }
      await getTodos();
    };

    checkCreateUser();
  }, []);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTodo = {
        label: inputValue.trim(),
        is_done: false,
      };

      const response = await fetch(`https://playground.4geeks.com/todo/todos/victorfuentes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),  
      });

      if (response.ok) {
        setInputValue("");  
        await getTodos();  
      }
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await getTodos(); 
    } 
  };


  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul className="todo-list">
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder="Add a task"
          />
        </li>
        {todos.map((item) => (
          <li key={item.id}>
            {item.label}
            <button
              onClick={() => deleteTodo(item.id)}
              className="delete-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <div className="task-count">{todos.length} {count}</div>
    </div>
  );
};

export default Home;