import axios from "axios";

const userAxiosInstance = axios.create({
  baseURL: "http://localhost:3001", // user management server
});

const businessLogicAxiosInstance = axios.create({
  baseURL: "http://localhost:3002", // business logic server
});

businessLogicAxiosInstance.defaults.withCredentials = true;

export { userAxiosInstance, businessLogicAxiosInstance };
