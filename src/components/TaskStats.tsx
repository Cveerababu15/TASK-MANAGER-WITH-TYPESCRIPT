interface TaskStatsProps {
    total: number;
    active: number;
    completed: number;
  }
  
  function TaskStats({
    total,
    active,
    completed,
  }: TaskStatsProps) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <strong>{total}</strong>
        </div>
  
        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <strong>{active}</strong>
        </div>
  
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <strong>{completed}</strong>
        </div>
      </div>
    );
  }
  
  export default TaskStats;