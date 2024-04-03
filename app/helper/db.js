import mongoose from "mongoose";
import { User } from "../models/user";

const MONGO_URL =
  "mongodb+srv://devleena2003:next-api@cluster0.uvxzxok.mongodb.net/?retryWrites=true&w=majority";
export const connectdb = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URL, {
      dbName: "work-manager",
    });

    console.log("db connected");

    // const user = new User({
    //   name: "test name",
    //   email: "test@gmail.com",
    //   password: "test",
    //   about: "this is test",
    // });
    // await user.save();

    // console.log("user created");
  } catch (err) {
    console.log("failed", err);
  }
};
