import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/models/user";
import { connectdb } from "@/app/helper/db";

export async function GET(request) {
  const JWT_KEY = "asdfghjkl";
  const authToken = request.cookies.get("authToken")?.value;
  if (!authToken) {
    return NextResponse.error(new Error("authToken is missing"));
  }
  console.log(authToken);
  const data = jwt.verify(authToken, JWT_KEY);
  console.log(data);
  await connectdb();
  const user = await User.findById(data._id).select("-password");
  return NextResponse.json(user);
}
