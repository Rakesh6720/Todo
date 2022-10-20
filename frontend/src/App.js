import { useState, useEffect } from "react";
import CreateTodoItem from "./components/CreateTodoItem";
import TodosList from "./components/TodosList";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/api/notes");
      const data = await response.json();
      setTodos(data);
    };

    sendRequest();
  }, []);

  if (!todos) {
    return <h1>Loading Todos...</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Todo List</h1>
      <TodosList todos={todos} />
      <CreateTodoItem />
    </div>
  );
}

export default App;
