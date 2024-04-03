"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Task } from "../models/tasks";
import { getTasksOfUser } from "../services/taskServices";
import { toast } from "react-toastify";

// export const metadata = {
//   title: "Work Manager-Show Tasks",
// };

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  async function loadTasks(userId) {
    try {
      const tasks = getTasksOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);
  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id != tasksId);
      setTasks(newTasks);
      toast.success("Your task has been deleted");
    } catch (e) {
      console.log(e);
      toast.error("error in deleting tasks!!");
    }
  }
  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-3">Your Tasks ({tasks.length})</h1>

        {tasks.map((task) => {
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />;
        })}
      </div>
    </div>
  );
};

export default ShowTasks;
