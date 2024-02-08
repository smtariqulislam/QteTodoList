import React from "react";

const TaskAdd = ({
  handleAddTask,
  taskInput,
  setTaskInput,
  priorityInput,
  setPriorityInput,
  handleKeyDown,
}) => {
  return (
    <div className="p-2">
      <div>
        <h1 className="text-white">Todo List</h1>
      </div>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button className="btn btn-primary mx-2" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskAdd;
