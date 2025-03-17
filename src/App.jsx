import React, { useEffect, useState } from 'react';
import service from './service.js';
import { useNavigate } from 'react-router-dom';


function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  async function getTodos() {

    
    
    const todos = await service.getTasks();

 
    setTodos(todos || []); // Ensure todos is an array
  }

  async function createTodo(e) {
    e.preventDefault();
  
    if (newTodo.trim() === "") return;
    await service.addTask(newTodo);
    setNewTodo(""); // Clear input
    await getTodos(); // Refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos(); // Refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); // Refresh tasks list
  }

  async function editTodo(id) {
    await service.EditTask(id);
    await getTodos(); // Refresh tasks list
  }
  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log("User ID not found in localStorage");
        return;
      }
      const result = await service.getTasks();
      if (result) {
        setTodos(result);
      }
    };

    fetchTasks();
  }, []);


  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={todo.isComplete}
                    onChange={(e) => updateCompleted(todo, e.target.checked)}
                  />
                  <label>{todo.nameT}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                  {/* <button onClick={() => editTodo(todo.id)}>📝</button> */}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default App;