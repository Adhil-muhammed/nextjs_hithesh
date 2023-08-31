"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const navigate = useRouter();

  const onLogOut = async () => {
    try {
      await axios.get("api/user/logout");
      navigate.push("/login");
    } catch (error: any) {
      console.log("error: ", error?.message);
    }
  };

  return (
    <div className="text-center  flex flex-col justify-center items-center min-h-screen">
      <h1> Profile page</h1>
      <button
        className="p-2 bg-purple-600 mt-3 rounded-md text-white hover:bg-purple-700"
        onClick={onLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default ProfilePage;
