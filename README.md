# React + TypeScript Task Manager

A simple Task Manager built with **React + TypeScript** to learn and practically apply important React and TypeScript concepts in a single project.

The main goal of this project is not to build a complex application. The goal is to understand **how React and TypeScript work together in a clean, practical project**.

---

## 1. Project Goal

I already had a basic understanding of TypeScript and React.

Instead of continuing with more theory or another tutorial, I decided to build one small project and use the concepts while developing it.

The project follows this approach:

```text
Learn a concept
      ↓
Understand why it is needed
      ↓
Implement it in the project
      ↓
Test it
      ↓
Move to the next concept
```

The project is intentionally simple so that the focus remains on understanding the code and architecture.

---

# 2. Technologies Used

* React
* TypeScript
* Vite
* HTML
* CSS
* React Hooks
* Browser Local Storage
* Git
* GitHub

---

# 3. Project Setup

The project was created using Vite.

```bash
npm create vite@latest react-typescript-task-manager
```

Selected:

```text
Framework: React
Variant: TypeScript
```

Then installed the dependencies:

```bash
cd react-typescript-task-manager
npm install
```

Started the development server:

```bash
npm run dev
```

This gave us a basic React + TypeScript application.

---

# 4. Cleaning the Default Vite Project

The default Vite files were removed or simplified because they were not required for our Task Manager.

The project was then organised into a cleaner structure.

```text
src/
├── components/
├── hooks/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

The idea was to separate:

```text
components → UI
hooks      → application logic
types      → TypeScript definitions
App.tsx    → main application composition
```

---

# 5. Creating the Task Type

The first important step was defining what a task looks like.

Created:

```text
src/types/task.ts
```

```ts
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type TaskFilter = "all" | "active" | "completed";
```

## Why?

Instead of allowing task objects to have any structure, TypeScript defines the expected structure.

A valid task looks like:

```ts
const task: Task = {
  id: 1,
  title: "Learn React with TypeScript",
  completed: false,
};
```

The `TaskFilter` union type restricts the filter to:

```text
"all"
"active"
"completed"
```

This prevents accidental invalid values.

---

# 6. Creating the TaskItem Component

Created:

```text
src/components/TaskItem.tsx
```

The component receives a task through props.

```tsx
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
}

export default TaskItem;
```

## Important Concept — Typed Props

The props are explicitly typed:

```ts
interface TaskItemProps {
  task: Task;
}
```

This creates a contract for the component.

The component expects:

```tsx
<TaskItem task={task} />
```

where `task` must follow the `Task` interface.

---

# 7. Creating the Task State

The next step was making the application dynamic.

We used:

```tsx
const [tasks, setTasks] = useState<Task[]>([]);
```

`Task[]` means:

> The state contains an array of Task objects.

For example:

```tsx
const [tasks, setTasks] = useState<Task[]>([
  {
    id: 1,
    title: "Learn React with TypeScript",
    completed: false,
  },
]);
```

This combines React state with TypeScript type safety.

---

# 8. Creating the Add Task Component

Created:

```text
src/components/AddTask.tsx
```

The component receives a callback:

```ts
interface AddTaskProps {
  onAddTask: (title: string) => void;
}
```

This means:

```text
onAddTask
    ↓
accepts a string
    ↓
returns nothing
```

The form manages the input using state.

```tsx
const [title, setTitle] = useState("");
```

When the form is submitted:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!title.trim()) return;

  onAddTask(title.trim());
  setTitle("");
}
```

---

# 9. React Event Typing

One important React + TypeScript concept used in the form was event typing.

For form submission:

```ts
React.FormEvent<HTMLFormElement>
```

For an input change:

```ts
React.ChangeEvent<HTMLInputElement>
```

For a button click:

```ts
React.MouseEvent<HTMLButtonElement>
```

The general idea is:

```text
React Event
     ↓
TypeScript describes the event
     ↓
Safer event handling
```

---

# 10. Parent → Child and Child → Parent Communication

The project demonstrates normal React data flow.

The parent provides data:

```text
App
 ↓
TaskItem
```

The child can notify the parent using a callback:

```text
TaskItem
 ↓
callback
 ↓
App
 ↓
setTasks()
```

For example:

```ts
onDelete: (id: number) => void;
```

This means the child can tell the parent:

> Delete the task with this ID.

This is one of the most common patterns in React applications.

---

# 11. Adding Tasks

The parent component creates a new task:

```ts
function addTask(title: string) {
  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false,
  };

  setTasks((currentTasks) => [
    ...currentTasks,
    newTask,
  ]);
}
```

The important part is:

```ts
[
  ...currentTasks,
  newTask
]
```

Instead of modifying the existing array, a new array is created.

---

# 12. Completing and Deleting Tasks

For completing a task:

```ts
function toggleTask(id: number) {
  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}
```

For deleting:

```ts
function deleteTask(id: number) {
  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== id)
  );
}
```

## Important React Concept — Immutability

We should not directly mutate React state.

Avoid:

```ts
task.completed = true;
```

Avoid:

```ts
tasks.push(newTask);
```

Instead:

```text
Current state
     ↓
Create new array/object
     ↓
setState()
     ↓
React re-renders
```

Common methods:

```text
map()
→ create updated array

filter()
→ create array with selected items

spread (...)
→ create a new object/array
```

---

# 13. Filtering Tasks

The application supports:

```text
All
Active
Completed
```

The filter type is:

```ts
export type TaskFilter =
  | "all"
  | "active"
  | "completed";
```

The visible tasks are calculated based on the selected filter.

This demonstrates how TypeScript union types can be useful in real React applications.

---

# 14. Searching Tasks

Search state was added:

```tsx
const [search, setSearch] = useState("");
```

The task list is filtered based on the search value:

```ts
const matchesSearch = task.title
  .toLowerCase()
  .includes(search.toLowerCase());
```

Search and filtering are combined to determine which tasks should be displayed.

---

# 15. Derived Data

The application displays:

```text
Total
Active
Completed
```

These values are derived from the original `tasks` state.

For example:

```ts
const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const activeTasks =
  tasks.length - completedTasks;
```

We don't need separate state for these values.

## Important Concept

Prefer:

```text
Source state
     ↓
Derived values
```

instead of maintaining duplicate state.

This reduces unnecessary synchronization problems.

---

# 16. useMemo

`useMemo` was introduced for the filtered task calculation.

```tsx
const filteredTasks = useMemo(() => {
  return tasks.filter((task) => {
    // filtering logic
  });
}, [tasks, search, filter]);
```

## What does `useMemo` do?

It remembers a calculated value until one of its dependencies changes.

```text
tasks/search/filter change
        ↓
recalculate
```

Otherwise:

```text
same dependencies
        ↓
reuse previous value
```

`useMemo` should not automatically be used everywhere.

It is mainly useful when a calculation is expensive or when memoisation provides a meaningful performance benefit.

---

# 17. localStorage

The next requirement was persistence.

Without persistence:

```text
Refresh browser
      ↓
Tasks disappear
```

With localStorage:

```text
Task changes
     ↓
localStorage
     ↓
Refresh
     ↓
Tasks restored
```

Tasks are saved using:

```ts
localStorage.setItem(
  "tasks",
  JSON.stringify(tasks)
);
```

And loaded using:

```ts
const savedTasks =
  localStorage.getItem("tasks");

return savedTasks
  ? JSON.parse(savedTasks)
  : [];
```

---

# 18. useEffect

`useEffect` is used to synchronize the React state with localStorage.

```tsx
useEffect(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}, [tasks]);
```

The dependency:

```ts
[tasks]
```

means the effect runs when `tasks` changes.

The flow is:

```text
User changes task
       ↓
setTasks()
       ↓
tasks changes
       ↓
useEffect()
       ↓
localStorage updated
```

## Important Concept

`useEffect` is commonly used for side effects such as:

* API calls
* subscriptions
* browser APIs
* localStorage synchronization
* timers
* external systems

---

# 19. Custom Hook

As the application grew, too much logic was being placed inside `App.tsx`.

Instead of keeping everything there, we created:

```text
src/hooks/useTasks.ts
```

The custom hook manages:

```text
Task state
Add task
Delete task
Toggle task
Search
Filter
Statistics
localStorage
```

The component can simply use:

```tsx
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
```

## Important Concept — Custom Hooks

A custom hook is a reusable function that can use React hooks.

Examples:

```text
useTasks()
useAuth()
useFetch()
useLocalStorage()
```

The goal is to keep reusable/stateful logic separate from presentation.

---

# 20. Component Separation

The application was divided into smaller components.

Current structure:

```text
src/
├── components/
│   ├── AddTask.tsx
│   ├── TaskFilters.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   └── TaskStats.tsx
│
├── hooks/
│   └── useTasks.ts
│
├── types/
│   └── task.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

Each component has a clear responsibility.

```text
AddTask
→ Add a task

TaskItem
→ Display and control one task

TaskList
→ Display the task collection

TaskFilters
→ Search and filter

TaskStats
→ Display statistics

useTasks
→ Manage task logic

task.ts
→ Define TypeScript types

App
→ Compose the application
```

---

# 21. Final Architecture

The overall flow is:

```text
                    App
                     │
             ┌───────┴────────┐
             │                │
         useTasks            UI
             │                │
      ┌──────┼──────┐    ┌────┼─────┐
      │      │      │    │    │     │
    State  Filter  Search AddTask Filters
      │                    │
      │                 TaskList
      │                    │
      │                 TaskItem
      │
      └── localStorage
```

The important separation is:

```text
UI
↓
Components

Logic
↓
Custom Hook

Data structure
↓
TypeScript types
```

---

# 22. React + TypeScript Concepts Practiced

### TypeScript

* Interfaces
* Union types
* Typed objects
* Typed arrays
* Function types
* Optional concepts through props
* `import type`
* Generic React state
* Type-safe component props

### React

* Components
* Props
* State
* `useState`
* `useEffect`
* `useMemo`
* Event handling
* Controlled inputs
* Forms
* Conditional rendering
* List rendering
* Callback props
* Parent-child communication
* Immutable state updates
* Custom hooks
* Component separation

### Browser API

* `localStorage`
* `JSON.stringify`
* `JSON.parse`

---

# 23. What I Learned

The main lesson from this project was that TypeScript is not something separate from React.

It is used directly in:

```text
Component props
      ↓
State
      ↓
Events
      ↓
Forms
      ↓
Functions
      ↓
API data
      ↓
Custom hooks
```

For example:

```tsx
useState<Task[]>([])
```

connects TypeScript directly with React state.

And:

```ts
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}
```

connects TypeScript directly with React component communication.

---

# 24. Project Development Flow

The project was built incrementally.

```text
1. Create React + TypeScript project
        ↓
2. Clean Vite starter files
        ↓
3. Create project folders
        ↓
4. Define Task interface
        ↓
5. Create TaskItem
        ↓
6. Add typed props
        ↓
7. Add useState
        ↓
8. Create AddTask
        ↓
9. Handle typed events
        ↓
10. Add tasks
        ↓
11. Complete / undo tasks
        ↓
12. Delete tasks
        ↓
13. Add filtering
        ↓
14. Add search
        ↓
15. Add statistics
        ↓
16. Add useMemo
        ↓
17. Add localStorage
        ↓
18. Add useEffect
        ↓
19. Create useTasks custom hook
        ↓
20. Split UI into reusable components
```

This approach allowed each concept to be learned while solving an actual requirement.

---

# 25. Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 26. Future Improvements

Possible future improvements include:

* Edit tasks
* Clear completed tasks
* Task priority
* Due dates
* Categories
* Dark mode
* Backend API
* MongoDB
* Authentication
* React Router
* Unit testing
* Deployment

These features are not required for the basic learning project.

---

# 27. Key Takeaways

The most important concepts from this project are:

```text
1. Type your data
2. Type your component props
3. Type your state
4. Type your events
5. Avoid direct state mutation
6. Keep derived data derived
7. Separate UI from application logic
8. Use custom hooks when logic grows
9. Keep components focused
10. Use React hooks for the correct purpose
```

The objective was not to build a large application.

The objective was to understand how **React + TypeScript work together in a clean project**.

---

## Author

**Veerababu Chakali**

Frontend / Full-Stack Developer

Technologies: React, TypeScript, JavaScript, Node.js, Express.js, MongoDB
