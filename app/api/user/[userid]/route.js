import { User } from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userid } = params;
  const user = await User.findById(userid);
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  const { userid } = params;
  try {
    await User.deleteOne({
      _id: userid,
    });
    return NextResponse.json({
      message: "user deleted",
      status: true,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message,
    });
  }
}

//update user

export async function PUT(request, { params }) {
  const { userid } = params;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user = await User.findById(userid);

    user.name = name;
    user.about = about;
    user.password = password;
    user.profileURL = profileURL;

    const updateduser = await user.save();
    return NextResponse.json(updateduser);
  } catch (err) {
    return NextResponse.json({
      message: "failed to update",
      status: false,
    });
  }
}
