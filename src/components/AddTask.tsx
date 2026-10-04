import { useState } from "react";

interface AddTaskProps {
  onAddTask: (title: string) => void;
}

function AddTask({ onAddTask }: AddTaskProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask(title.trim());
    setTitle("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
      />

      <button className="add-task-btn" type="submit">
        + Add Task
      </button>
    </form>
  );
}

export default AddTask;