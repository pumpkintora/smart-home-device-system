import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { businessLogicAxiosInstance as bizAxios, authAxiosInstance as authAxios } from "../utils/axios";
import { setUser } from "../redux/userSlice";

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
          dispatch(setUser(response.data.user))
          navigate("/");
        }
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
