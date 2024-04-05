"use client";
import React, { useState } from "react";
import loginsvg from "../assets/login.svg";
import Image from "next/image";
import { addTask } from "../services/taskServices";
import { toast } from "react-toastify";

const metadata = {
  title: "Work Manager-Add Task",
};

const AddTask = () => {
  document.title = metadata.title;
  const [task, setTask] = useState({
    title: " ",
    content: "",
    status: "none",
    userId: "65f1bc7f4156c428dda90649",
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log(task);
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Task added successfully", {
        position: "top-center",
      });

      setTask({
        title: " ",
        content: "",
        status: "none",
      });
    } catch (err) {
      console.log(err);
      toast.error("Task not added", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-sm">
        <div className="my-8 flex justify-center">
          <Image
            src={loginsvg}
            style={{
              width: "50%",
            }}
          />
        </div>
        <h1 className="text-3xl text-center">Add your task here</h1>

        <form action="#" onSubmit={handleAddTask}>
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
              id="task_title"
              name="task_title"
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
              value={task.title}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(e) => {
                setTask({ ...task, content: e.target.value });
              }}
              value={task.content}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
              name="task_status"
              onChange={(e) => {
                setTask({ ...task, status: e.target.value });
              }}
              value={task.status}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mt-4 flex  justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">
              Add Todo
            </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
