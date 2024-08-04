import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVER_API || "http://localhost:3001", // user management server
});

const businessLogicAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BUSINESS_SERVER_API || "http://localhost:3002", // business logic server
});


authAxiosInstance.defaults.withCredentials = true;
authAxiosInstance.defaults.headers["x-access-token"] = localStorage.getItem("token");

businessLogicAxiosInstance.defaults.withCredentials = true;
businessLogicAxiosInstance.defaults.headers["x-access-token"] = localStorage.getItem("token");


// businessLogicAxiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Log out the user
//       localStorage.removeItem('authToken'); // Or however you store the JWT
//       /* eslint-disable-next-line no-restricted-globals */
//       history.push('/login'); // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

export { authAxiosInstance, businessLogicAxiosInstance };
