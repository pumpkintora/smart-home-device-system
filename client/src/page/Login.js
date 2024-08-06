import React from "react";
// import { Link } from "react-router-dom";
import { Box, Stack, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../component/PasswordInput";
import {
  businessLogicAxiosInstance as bizAxios,
  authAxiosInstance as authAxios,
} from "../utils/axios";
import { setUser, setAuthenticated } from "../redux/userSlice";

export default function Login(params) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    authAxios
      .post("login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (!response.data.authenticated) {
          alert("Wrong credentials.");
        } else {
          localStorage.setItem("token", response.data.token);
          bizAxios.defaults.headers["x-access-token"] = response.data.token;
          dispatch(setUser(response.data.user));
          dispatch(setAuthenticated(response.data.authenticated));
          const decoded = jwtDecode(response.data.token);
          const currentTime = Date.now();
          navigate("/");
          const timerId = setTimeout(() => {
            alert("You have been logged out automatically.");
            navigate("/login");
          }, decoded.exp * 1000 - currentTime);
          localStorage.setItem("timerId", timerId);
        }
      });
  };

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <Box flexDirection={"column"} sx={{ width: "30%" }}>
        <Stack spacing={5} w={"100%"}>
          <Typography variant="h4">Hi, Welcome Back</Typography>
          <TextField
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={login}>
            LOGIN
          </Button>
          <Link href="register" textAlign={"right"} variant="body1">
            Don't have an account? Register here
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
