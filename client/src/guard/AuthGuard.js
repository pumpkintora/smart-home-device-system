import React from "react";
import { Navigate } from "react-router-dom";
import { authAxiosInstance as axios } from "../utils/axios";
import LoginPage from "../page/Login";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../redux/userSlice";

export default function AuthGuard({ children }) {
  const authenticated = useSelector(state => state.authenticated)
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    axios
      .get("isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(setAuthenticated(response.data.authenticated));
      })
      .catch(err => {
        console.log(err)
        dispatch(setAuthenticated(err.response.data.authenticated));
      })
  }, [authenticated]);
  
  if (!authenticated) return <LoginPage />;
  return <>{children}</>;
}
