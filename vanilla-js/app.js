document.addEventListener("DOMContentLoaded", () => {
  const descriptionInput = document.getElementById("descriptionInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const addButton = document.getElementById("addButton");
  const allButton = document.getElementById("allButton");
  const completedButton = document.getElementById("completedButton");
  const pendingButton = document.getElementById("pendingButton");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filter = "all";

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });

    filteredTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${task.description} - ${task.dueDate}`;
      const toggleButton = document.createElement("button");
      toggleButton.textContent = task.completed ? "Undo" : "Complete";
      toggleButton.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });
      listItem.appendChild(span);
      listItem.appendChild(toggleButton);
      taskList.appendChild(listItem);
    });
  };

  addButton.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const dueDate = dueDateInput.value;
    if (description && dueDate) {
      tasks.push({ description, dueDate, completed: false });
      descriptionInput.value = "";
      dueDateInput.value = "";
      saveTasks();
      renderTasks();
    }
  });

  allButton.addEventListener("click", () => {
    filter = "all";
    renderTasks();
  });

  completedButton.addEventListener("click", () => {
    filter = "completed";
    renderTasks();
  });

  pendingButton.addEventListener("click", () => {
    filter = "pending";
    renderTasks();
  });

  renderTasks();
});
