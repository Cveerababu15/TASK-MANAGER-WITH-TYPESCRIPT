import AddTask from "./components/AddTask";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

function App() {
  const {
    tasks,
    filter,
    search,
    totalTasks,
    activeTasks,
    completedTasks,
    setFilter,
    setSearch,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  return (
    <main className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div>
            <span className="eyebrow">PERSONAL PRODUCTIVITY</span>
            <h1>Task Manager</h1>
            <p>Organize your work. Stay focused. Get things done.</p>
          </div>

          <div className="task-count">
            <strong>{activeTasks}</strong>
            <span>active</span>
          </div>
        </header>

        {/* Add Task */}
        <section className="card add-task-card">
          <AddTask onAddTask={addTask} />
        </section>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Active</span>
            <strong>{activeTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </section>

        {/* Filters */}
        <section className="card">
          <TaskFilters
            filter={filter}
            search={search}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
          />
        </section>

        {/* Task List */}
        <section className="card task-section">
          <div className="section-header">
            <div>
              <h2>Your Tasks</h2>
              <p>
                {tasks.length === 0
                  ? "You have no tasks here."
                  : `${tasks.length} task${
                      tasks.length !== 1 ? "s" : ""
                    }`}
              </p>
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
