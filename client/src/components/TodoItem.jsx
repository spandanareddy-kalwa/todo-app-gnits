import { useState } from "react";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  // 1. Change todo.title to todo.text
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    const newText = text.trim();
    // 2. Change title to text in the payload
    if (newText && newText !== todo.text) {
      onUpdate(todo._id, { text: newText });
    } else {
      setText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? "not done" : "done"}`}
      />
      {isEditing ? (
        <input
          className="edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
      ) : (
        <div className="todo-text" onDoubleClick={() => setIsEditing(true)}>
          {/* 3. Render todo.text here */}
          <span className="title">{todo.text}</span>
          <span className="meta">
            Added{" "}
            {new Date(todo.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      )}
      {!isEditing && (
        <div className="actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete" onClick={() => onDelete(todo._id)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;