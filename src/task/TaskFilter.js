import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <div className="filter-container">
        <span className=" text-white">Filter by Priority:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
