import { Task } from "@/app/models/tasks";
import { NextResponse } from "next/server";
import { connectdb } from "@/app/helper/db";

export async function GET(requets, { params }) {
  const { taskId } = params;
  try {
    await connectdb();
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
    await connectdb();
    const updatedTask = await task.save();
    return NextResponse.json(updatedTask);
  } catch (err) {
    console.log(err);
  }
}
export async function DELETE(request, { params }) {
  try {
    const { taskId } = params;
    await connectdb();
    const deleteTask = await Task.deleteOne({
      _id: taskId,
    });
    return NextResponse.json(deleteTask);
  } catch (err) {
    console.log(err);
  }
}
