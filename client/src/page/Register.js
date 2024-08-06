import React from "react";
// import { Link } from "react-router-dom";
import { Box, Stack, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../component/PasswordInput";
import { authAxiosInstance as axios } from "../utils/axios";

export default function Register(params) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const register = () => {
    console.log(username,email,password)
    if (username === "" || email === "" || password === "") {
      alert("Please enter username, email, and password.");
      return;
    }
    axios
      .post("register", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
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
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={register}>
            REGISTER
          </Button>
          <Link href="/login" textAlign={"right"} variant="body1">
            Don't have an account? Login here
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
