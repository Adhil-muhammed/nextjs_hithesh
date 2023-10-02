"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import { useImmer } from "use-immer";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

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

  if (createUser?.isLoading) {
    return (
      <Stack className="flex h-screen justify-center items-center">
        <CircularProgress variant="indeterminate" />
      </Stack>
    );
  }

  return (
    <>
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
          <LoadingButton
            variant={"outlined"}
            loading={createUser?.isLoading}
            loadingIndicator={<CircularProgress variant="indeterminate" />}
            onClick={onSignup}
          >
            signUp
          </LoadingButton>
        </div>
        <Link href={"/login"} className="flex- justify-center ite">
          <Button variant="outlined" className="px-12">
            visit login page
          </Button>
        </Link>
      </div>
    </>
  );
};
export default SignUPPage;
