import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskList({
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>

        <h3>No tasks found</h3>

        <p>
          Try adding a new task or changing your search/filter.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;