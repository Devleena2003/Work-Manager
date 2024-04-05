import { Task } from "@/app/models/tasks";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectdb } from "@/app/helper/db";

export async function GET(request) {
  try {
    await connectdb();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request) {
  const { title, content, userId, status } = await request.json();

  //fetching logged in userid

  const JWT_KEY = "asdfghjkl";
  const authToken = request.cookies.get("authToken")?.value;
  // console.log(authToken);
  const data = jwt.verify(authToken, JWT_KEY);
  console.log(data._id);

  try {
    await connectdb();
    const task = new Task({
      title,
      content,
      userId: data._id,
      status,
    });
    await connectdb();
    const createdTask = await task.save();
    return NextResponse.json(createdTask, {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Failed to create task",
      status: false,
    });
  }
}
