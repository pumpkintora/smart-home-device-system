export default function AuthGuard({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  const userAuthenticeted = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      {loginStatus && (
        <button onClick={userAuthenticeted}>Check if authenticated</button>
      )}
      {children}
    </>
  );
}
