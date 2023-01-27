import axios from "axios";

export const http = axios.create({
  baseURL: "https://kj173456.pythonanywhere.com", //base url 수정 필요 (test code)
});

http.defaults.withCredentials = true;

const token = localStorage.getItem("token") ?? false;
// const token = JSON.parse(localStorage.getItem("token")) ?? false;

http.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;