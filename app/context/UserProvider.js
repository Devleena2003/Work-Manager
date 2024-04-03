"use client";

import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { currentUser } from "../services/userService";
import { toast } from "react-toastify";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function load() {
      try {
        const tempUser = await currentUser();
        console.log(tempUser);
        setUser({ ...tempUser });
      } catch (e) {
        console.log(e);
        toast.error("error in loading current user");
        setUser(undefined);
      }
    }
    if (!user) load();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
