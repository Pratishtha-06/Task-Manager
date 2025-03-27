import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, toggleTask } from "./Redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks= useSelector((state)=>state.tasks.tasks);

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <span onClick={() => dispatch(toggleTask(task.id))}>{task.text} ({task.priority})</span>
          <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;