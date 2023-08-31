"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

const initSignup = {
  email: "",
  username: "",
  password: "",
};

interface User {
  email: string;
  username: string;
  password: string;
}

// const fetchData = fetch("https://jsonplaceholder.typicode.com/posts").then(
//   (response) => response.json()
// );

const fetchData = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export const createUsers = async (user: User) => {
  const res = await axios.post("/api/user/signup", user);
  return res.data;
};

const SignUPPage = () => {
  const navigate = useRouter();
  const [user, setUser] = useImmer(initSignup);

  const userData = useQuery({
    queryKey: ["user"],
    queryFn: fetchData,
    enabled: true,
  });

  const createUser = useMutation({
    mutationFn: createUsers,
    onSuccess: (data, variables, context) => {
      navigate.push("/login");
    },
  });

  const onSignup = async () => {
    createUser?.mutate(user);
  };

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setUser((draft: any) => {
      draft[name] = value;
    });
  };

  if (createUser?.isPending) {
    return (
      <h1 className="flex flex-col justify-center items-center min-h-screen">
        Loding...
      </h1>
    );
  }

  return (
    <div className="text-center  flex flex-col justify-center items-center min-h-screen py-2 gap-3">
      <h1 className="text-white text-2xl">singup</h1>
      <label htmlFor="userName">Username</label>
      <input
        className="text-gray-900 p-2 rounded-md "
        type="text"
        name="username"
        placeholder="username"
        value={user?.username}
        onChange={onChange}
      />
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
        <button
          className="p-2 border-slate-50 rounded-md bg-slate-700 text-white"
          onClick={onSignup}
        >
          signUp
        </button>
        <Link href={"/login"}>visit login page</Link>
      </div>
    </div>
  );
};
export default SignUPPage;
