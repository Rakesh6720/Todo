import { useState } from "react";
export default function CreateTodoItem() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }

  function contentChangeHandler(event) {
    setContent(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" onChange={titleChangeHandler} value={title} />
      <label htmlFor="content">Content</label>
      <textarea rows={5} value={content} onChange={contentChangeHandler} />
      <button type="submit">Add Todo</button>
    </form>
  );
}
