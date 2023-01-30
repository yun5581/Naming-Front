import axios from "axios";

export const http = axios.create({
  // baseURL: " http://127.0.0.1:8000", // (test) local 서버용 
  baseURL: "https://kj273456.pythonanywhere.com",
});

http.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("token")) ?? false;

http.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;


