import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({
  task,
  onDelete,
  onToggle,
}: TaskItemProps) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <button
          className="complete-btn"
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? "Mark task as active"
              : "Mark task as completed"
          }
        >
          {task.completed ? "✓" : ""}
        </button>

        <div className="task-info">
          <span className="task-title">{task.title}</span>

          <span className="task-status">
            {task.completed ? "Completed" : "In progress"}
          </span>
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;