import { useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<TaskFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.length - completedTasks;

  return {
    tasks: filteredTasks,
    filter,
    search,
    totalTasks: tasks.length,
    activeTasks,
    completedTasks,
    setFilter,
    setSearch,
    addTask,
    toggleTask,
    deleteTask,
  };
}