import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const JWT_KEY = "asdfghjkl";
  const { email, password } = await request.json();
  try {
    //1. match email
    const user = await User.findOne({ email: email });
    if (user == null) {
      throw new Error("user not found");
    }

    //2. match password
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("password mismatch");
    }

    //3. generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      JWT_KEY
    );

    //4. create nextresponse--cookie
    const response = NextResponse.json({
      message: "Login success",
      success: true,
      user: user,
    });

    response.cookies.set("authToken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });
    console.log(token);

    console.log(user);

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
