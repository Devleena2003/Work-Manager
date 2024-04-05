import { Task } from "@/app/models/tasks";
import { NextResponse } from "next/server";
import { connectdb } from "@/app/helper/db";

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    console.log("Connecting to database...");
    await connectdb();
    console.log("Connected to database.");

    const tasks = await Task.find({
      userId: userId,
    });

    console.log("Tasks found:", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(new Error("Failed to fetch tasks"));
  }
}
