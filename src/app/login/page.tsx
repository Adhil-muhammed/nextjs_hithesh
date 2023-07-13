"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useRouter } from "next/navigation";

const initSignup = {
  email: "",
  password: "",
};

export default function page() {
  const [user, setUser] = useImmer(initSignup);

  const onLogin = async () => {};

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setUser((draft: any) => {
      draft[name] = value;
    });
  };

  return (
    <div className="text-center  flex flex-col justify-center items-center min-h-screen py-2 gap-3">
      <h1 className="text-white text-2xl">Login</h1>
      <label htmlFor="userName">Email</label>
      <input
        className="text-gray-900 p-2 rounded-md"
        type="text"
        name="email"
        placeholder="email"
        value={user?.email}
        onChange={onChange}
      />
      <label htmlFor="userName">PassWord</label>
      <input
        className="text-gray-900 p-2 rounded-md"
        type="text"
        name="password"
        placeholder="password"
        value={user?.password}
        onChange={onChange}
      />
      <div className="flex flex-col gap-3">
        <button className="p-2 border-slate-50 rounded-md bg-slate-700 text-white">
          Login
        </button>
        <Link href={"/signup"}>visit sigUp page</Link>
      </div>
    </div>
  );
}
