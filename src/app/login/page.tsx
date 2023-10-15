"use client";
import React from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
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
  Container,
  TextField,
  Typography,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";

const initSignup = {
  email: "",
  password: "",
};

interface LoggedUser {
  email: string;
  password: string;
}

const defaultTheme = createTheme();

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

export default function page() {
  const navigate = useRouter();
  const [user, setUser] = useImmer(initSignup);
  const [isSHowPassword, setIsSHowPassword] = useImmer(false);

  const toLogin = async (user: LoggedUser) => {
    const res = await axios.post("/api/user/login", user);
    return res?.data;
  };

  const handleLogin = useMutation({
    mutationFn: toLogin,
    mutationKey: ["LoggedData"],
    onSuccess: () => {
      navigate.push("/");
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputProps={{
                autocomplete: "new-email",
                form: {
                  autocomplete: "off",
                },
              }}
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={isSHowPassword ? "text" : "password"}
              id="password"
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "new-password",
                  // autocomplete: "off",
                },
              }}
              onChange={onChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onClick={onHandleShowPassword}
                />
              }
              label="show"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="bg-sky-600"
              onClick={onLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
