import React from "react";
import { Navigate } from "react-router-dom";
import { authAxiosInstance as axios } from "../utils/axios";

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  console.log(localStorage.getItem("token"))
  React.useEffect(() => {
    axios.get("isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setIsAuthenticated(response.data.authenticated);
    });
  }, [isAuthenticated])

  if (!isAuthenticated) return <Navigate to="/login" />
  return (<>{children}</>);

}
