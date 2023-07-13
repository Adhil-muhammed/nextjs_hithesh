"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useRouter } from "next/navigation";

const initSignup = {
  email: "",
  userName: "",
  password: "",
};

const SignUPPage = () => {
  const [user, setUser] = useImmer(initSignup);
  console.log("user: ", user);

  const onSignup = async () => {};

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setUser((draft: any) => {
      draft[name] = value;
    });
  };

  return (
    <div className="text-center  flex flex-col justify-center items-center min-h-screen py-2 gap-3">
      <h1 className="text-white text-2xl">singup</h1>
      <label htmlFor="userName">Username</label>
      <input
        className="text-gray-900"
        type="text"
        name="userName"
        placeholder="username"
        value={user?.userName}
        onChange={onChange}
      />
      <label htmlFor="userName">Email</label>
      <input
        className="text-gray-900"
        type="text"
        name="email"
        placeholder="email"
        value={user?.email}
        onChange={onChange}
      />
      <label htmlFor="userName">PassWord</label>
      <input
        className="text-gray-900"
        type="text"
        name="password"
        placeholder="password"
        value={user?.password}
        onChange={onChange}
      />
      <div className="flex flex-col gap-3">
        <button className="p-2 border-slate-50 rounded-md bg-slate-700 text-white">
          signUp
        </button>
        <Link href={"/login"}>visit login page</Link>
      </div>
    </div>
  );
};
export default SignUPPage;
