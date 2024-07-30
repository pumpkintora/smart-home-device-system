import React from "react";
import { authAxiosInstance as axios } from "../utils/axios";

export default function Register(params) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const register = () => {
    axios.post("http://localhost:3001/register", {
      username,
      password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="registration">
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <label>password</label>
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />{" "}
      <br />
      <button onClick={register}> Register</button>
    </div>
  );
}
