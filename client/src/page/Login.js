import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAxiosInstance as axios } from "../utils/axios";
import { setUser } from "../redux/userSlice";

export default function Login(params) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    axios
      .post("login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (!response.data.authenticated) {
          alert("Wrong credentials.");
        } else {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
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
