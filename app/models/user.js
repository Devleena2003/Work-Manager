import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email required"],
  },
  password: {
    type: String,
    require: [true, "password required"],
  },
  about: String,
  profileURL: String,
});

export const User =
  mongoose.models.Users || mongoose.model("Users", UserSchema);
