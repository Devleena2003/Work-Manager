import { Task } from "@/app/models/tasks";
import { NextResponse } from "next/server";

export async function GET(requets, { params }) {
  const { taskId } = params;
  try {
    const task = await Task.findById(taskId);
    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
  }
}
export async function PUT(request, { params }) {
  try {
    const { taskId } = params;
    const { title, content, status } = await request.json();
    let task = await Task.findById(taskId);
    (task.title = title), (task.content = content), (task.status = status);

    const updatedTask = await task.save();
    return NextResponse.json(updatedTask);
  } catch (err) {
    console.log(err);
  }
}
export async function DELETE(request, { params }) {
  try {
    const { taskId } = params;
    const deleteTask = await Task.deleteOne({
      _id: taskId,
    });
    return NextResponse.json(deleteTask);
  } catch (err) {
    console.log(err);
  }
}
