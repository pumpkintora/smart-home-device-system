import { useNavigate } from "react-router-dom";
import { userAxiosInstance as axios } from "../utils/axios";

export default function Register(params) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
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
