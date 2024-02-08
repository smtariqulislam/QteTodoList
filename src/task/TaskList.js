import { useEffect, useState } from "react";
import TaskAdd from "./TaskAdd";
import TaskFilter from "./TaskFilter";
import "./tasks.css";

const TaskList = () => {
  const priorityColors = {
    low: "#4caf50",
    medium: "#ff9800",
    high: "#f44336",
  };
  // Function to toggle the completion status of a task
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [taskInput, setTaskInput] = useState(""); // State for task input
  const [priorityInput, setPriorityInput] = useState("low"); // State for priority input
  const [filter, setFilter] = useState("all"); // State for filter

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      //   console.log("helo");
    }
  }, [tasks]);

  // Function to add a new task
  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        priority: priorityInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setPriorityInput("low");
    }
  };

  // Function to edit an existing task
  const handleEditTask = (id, newText) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: newText };
        }
        return task;
      })
    );
  };

  // Function to delete a task
  // const handleDeleteTask = (id) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  // Function to delete a task
  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Function to toggle the completion status of a task
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  // Filter tasks based on priority
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    }
    return task.priority === filter;
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="bg-secondary text-center">
      <TaskAdd
        handleAddTask={handleAddTask}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        priorityInput={priorityInput}
        setPriorityInput={setPriorityInput}
        handleKeyDown={handleKeyDown}
      />
      <TaskFilter filter={filter} setFilter={setFilter} />

      <ul className="list-group task-list p-2">
        {filteredTasks.map((task, i) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`task-text`}
              onClick={() => handleToggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              <h5>
                {i + 1}. {task.text}
              </h5>
            </span>
            <span
              className={` task-status ${
                task.completed ? "text-success" : "text-danger"
              }`}
            >
              {task.completed ? "Completed" : "Incomplete"}
            </span>
            <span className="d-flex align-items-center">
              <span
                className="priority-indicator"
                style={{
                  backgroundColor: priorityColors[task.priority],
                }}
              >
                {task.priority}
              </span>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-success m-2"
                onClick={() => {
                  const newText = prompt(
                    "Enter new text for the task:",
                    task.text
                  );
                  if (newText !== null) {
                    handleEditTask(task.id, newText);
                  }
                }}
              >
                Edit
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="task-count text-white p-4">
        Total Tasks: {tasks.length}, Completed Tasks:
        {tasks.filter((task) => task.completed).length}
      </div>
    </div>
  );
};

export default TaskList;
