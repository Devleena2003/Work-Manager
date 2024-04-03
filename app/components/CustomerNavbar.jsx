"use client";
import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { logOut } from "../services/userService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CustomerNavbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  async function dologout() {
    try {
      const result = await logOut();
      console.log(result);
      context.setUser(undefined);
      router.push("/");
    } catch (e) {
      console.log(e);
      toast.error("logout failed");
    }
  }
  return (
    <nav className="bg-blue-600 h-16 py-2 px-36 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="/">Work Manager</a>
        </h1>
      </div>

      <div>
        <ul className="flex space-x-5">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-200">
                  Home
                </Link>
              </li>

              <li>
                <Link href={"/add-task"} className="hover:text-blue-200">
                  Add Tasks
                </Link>
              </li>

              <li>
                <Link href={"/show-task"} className="hover:text-blue-200">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-3">
          {context.user && (
            <>
              <li>
                <Link href={"#!"}>{context.user.name}</Link>
              </li>
              <li>
                <button onClick={dologout}>Logout</button>
              </li>
            </>
          )}
          {!context.user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
