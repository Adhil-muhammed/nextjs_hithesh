"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";

const initSignup = {
  email: "",
  password: "",
};

interface LoggedUser {
  email: string;
  password: string;
}

export default function page() {
  const navigate = useRouter();
  const [user, setUser] = useImmer(initSignup);

  const toLogin = async (user: LoggedUser) => {
    const res = await axios.post("/api/user/login", user);
    return res?.data;
  };

  const handleLogin = useMutation({
    mutationFn: toLogin,
    mutationKey: ["LoggedData"],
    onSuccess: () => {
      navigate.push("/profile");
    },
  });

  const onLogin = async () => {
    handleLogin.mutate(user);
  };

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
        <LoadingButton
          variant={"outlined"}
          loading={handleLogin?.isLoading}
          loadingIndicator={<CircularProgress variant="indeterminate" />}
          onClick={onLogin}
        >
          Login
        </LoadingButton>
        <Button variant="outlined">
          <Link href={"/signup"}>visit sigUp page</Link>
        </Button>
      </div>
    </div>
  );
}
