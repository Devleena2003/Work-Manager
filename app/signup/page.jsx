"use client";
import React, { useState } from "react";
import signupSvg from "../assets/signup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "../services/userService";
import { useRouter } from "next/navigation";

const metadata = {
  title: "Work Manager-Sign Up",
};
const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const doSignUp = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Name is required", {
        position: "top-center",
      });
      return;
    }
    if (data.email.trim() === "" || data.email == null) {
      toast.warning("Email is required", {
        position: "top-center",
      });
      return;
    }
    if (data.password.trim() === "" || data.password == null) {
      toast.warning("Passowrd is required", {
        position: "top-center",
      });
      return;
    }

    try {
      const result = await signUp(data);
      console.log(result);
      toast.success("User is registered", {
        position: "top-center",
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error("Sign Up Error", {
        position: "top-center",
      });
    }
  };
  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5">
        <div className="py-5">
          <div className="flex justify-center m-5">
            <Image
              src={signupSvg}
              style={{
                width: "50%",
              }}
            />
          </div>
          <h1 className="text-3xl text-center">Sign Up</h1>
          <form action="#" className="mt-5" onSubmit={doSignUp}>
            <div className="mt-4">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-400"
                placeholder="Enter your name"
                name="user_name"
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
                value={data.name}
              />
            </div>

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
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
                value={data.email}
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
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
                value={data.password}
              />
            </div>
            <div className="mt-3 text-center">
              <button
                type="submit"
                className="px-2 py-3 bg-green-600 rounded hover:bg-green-400"
              >
                Signup
              </button>
              <button
                onClick={resetForm}
                type="button"
                className="px-2 ms-3 py-3 bg-red-600 rounded hover:bg-red-400"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
