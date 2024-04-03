"use client";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "../services/userService";
import { useRouter } from "next/navigation";
import UserContext from "../context/UserContext";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [logindata, setloginData] = useState({
    email: "",
    password: "",
  });
  const doSignIn = async (e) => {
    e.preventDefault();
    console.log(logindata);

    if (logindata.email.trim() === "" || logindata.email == null) {
      toast.warning("Email is required", {
        position: "top-center",
      });
      return;
    }
    if (logindata.password.trim() === "" || logindata.password == null) {
      toast.warning("Passowrd is required", {
        position: "top-center",
      });
      return;
    }

    try {
      const result = await signIn(logindata);
      console.log(result);
      toast.success("Successfully logged in", {
        position: "top-center",
      });
      context.setUser(result.user);
      router.push("/profile");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-center",
      });
    }
  };
  const resetForm = () => {
    setloginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5">
        <div className="py-5"></div>
        <h1 className="text-3xl text-center">Log In</h1>
        <form action="#" onSubmit={doSignIn}>
          <div className="mt-4">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
              placeholder="Enter your email"
              id="user_email"
              onChange={(e) => {
                setloginData({
                  ...logindata,
                  email: e.target.value,
                });
              }}
              value={logindata.email}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
              placeholder="Enter your password"
              id="user_password"
              onChange={(e) => {
                setloginData({
                  ...logindata,
                  password: e.target.value,
                });
              }}
              value={logindata.password}
            />
          </div>
          <div className="mt-3 text-center">
            <button
              type="submit"
              className="px-3 py-3 bg-green-600 rounded hover:bg-green-400"
            >
              Login
            </button>
            <button
              onClick={resetForm}
              type="button"
              className="px-3 ms-3 py-3 bg-red-600 rounded hover:bg-red-400"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
