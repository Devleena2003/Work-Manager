import { connectdb } from "@/app/helper/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const bcrypt_salt = "10";

export async function GET(request) {
  let users = [];
  try {
    await connectdb();
    users = await User.find().select("-password");
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "failed to get users",
      status: false,
    });
  }
  return NextResponse.json(users);
}
export async function POST(request) {
  //fetch user detail from request

  const { name, email, password, about, profileURL } = await request.json();

  //craete user object with user model

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });

  try {
    user.password = bcrypt.hashSync(user.password, parseInt(bcrypt_salt));

    console.log(user);
    await connectdb();
    const createdUser = await user.save();
    const response = NextResponse.json(user, {
      status: 201,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        message: "failed to create user",
        status: false,
      },
      {
        status: 500,
      }
    );
  }
}

export function DELETE(request) {
  console.log("delete api called");
  return NextResponse.json(
    {
      messgae: "deleted",
      status: true,
    },
    { status: 201, statusText: "deleted" }
  );
}
