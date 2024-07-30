import { useNavigate } from "react-router-dom";
import { userAxiosInstance as axios } from "../utils/axios";

export default function Login(params) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (!response.data.auth) {
          alert("Wrong credentials.");
        } else {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
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
