import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8888", //base url 수정 필요 (test code)
});

http.defaults.withCredentials = true;

const token = JSON.parse(localStorage.getItem("token")) ?? false;

http.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;