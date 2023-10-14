"use client";

import React from "react";
import axios from "axios";
// import Link from "next/link";
import { useImmer } from "use-immer";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Link,
  Grid,
  Button,
  Avatar,
  Checkbox,
  TextField,
  Container,
  Typography,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";

const initSignup = {
  email: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
};

interface User {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const fetchData = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export const createUsers = async (user: User) => {
  const res = await axios.post("/api/user/signup", user);
  return res.data;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignUPPage = () => {
  const navigate = useRouter();
  const [user, setUser] = useImmer(initSignup);
  const [isSHowPassword, setIsSHowPassword] = useImmer(false);
  console.log("user: ", user);

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

  const onHandleShowPassword = (e: any) => {
    setIsSHowPassword(e.target.checked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="firstName Name"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="username"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isSHowPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={onHandleShowPassword}
                    />
                  }
                  label="show"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-sky-600"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignUPPage;
