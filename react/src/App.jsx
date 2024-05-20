import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskDescription.trim() && taskDueDate) {
      const newTask = {
        description: taskDescription,
        dueDate: taskDueDate,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskDescription("");
      setTaskDueDate("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span>
              {task.description} - {task.dueDate}
            </span>

            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
