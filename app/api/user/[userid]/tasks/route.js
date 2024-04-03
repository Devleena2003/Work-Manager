import { Task } from "@/app/models/tasks";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    const tasks = await Task.find({
      userId: userId,
    });
    return NextResponse.json(tasks);
  } catch (err) {
    console.log(err);
  }
}
