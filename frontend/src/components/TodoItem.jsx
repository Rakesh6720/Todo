import { useState } from "react";
export default function TodoItem({ todo }) {
  async function onDeleteHandler() {
    const response = await fetch(`http://localhost:8000/api/notes/${todo.id}`, {
      method: "DELETE",
    });

    const responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  }
  return (
    <div>
      <div>
        <h2>{todo.title}</h2>
      </div>

      <div>
        <p>{todo.content}</p>
      </div>
      <div>
        <p>{todo.date}</p>
      </div>
      <div>
        <button onClick={onDeleteHandler}>Delete</button>
      </div>
    </div>
  );
}
