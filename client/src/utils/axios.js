import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: "http://localhost:3001", // user management server
});

const businessLogicAxiosInstance = axios.create({
  baseURL: "http://localhost:3002", // business logic server
});

businessLogicAxiosInstance.defaults.withCredentials = true;
businessLogicAxiosInstance.defaults.headers["x-access-token"] = localStorage.getItem("token");

export { authAxiosInstance, businessLogicAxiosInstance };
