import type { TaskFilter } from "../types/task";

interface TaskFiltersProps {
  filter: TaskFilter;
  search: string;
  onFilterChange: (filter: TaskFilter) => void;
  onSearchChange: (value: string) => void;
}

function TaskFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="filters">
      <div className="search-wrapper">
        <span className="search-icon">⌕</span>

        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
        />
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${
            filter === "all" ? "active" : ""
          }`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>

        <button
          className={`filter-btn ${
            filter === "active" ? "active" : ""
          }`}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>

        <button
          className={`filter-btn ${
            filter === "completed" ? "active" : ""
          }`}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;