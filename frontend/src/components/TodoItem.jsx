export default function TodoItem({ todo }) {
  async function onDeleteHandler() {
    const response = await fetch(`http://localhost:8000/api/notes/${todo.id}`, {
      method: "DELETE",
    });

    const responseData = await response.json();
    console.log(responseData);
    //window.location.reload();
  }
  return (
    <div
      style={{
        margin: 50,
        border: "1px solid black",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div>
        <h2 style={{ textDecoration: "underline" }}>{todo.title}</h2>
      </div>
      <div
        style={{
          padding: 25,
        }}
      >
        <p>{todo.content}</p>
      </div>
      <div style={{ margin: 15 }}>
        <p>{todo.date}</p>
      </div>
      <div style={{ margin: 15 }}>
        <button onClick={onDeleteHandler}>Delete</button>
      </div>
    </div>
  );
}
