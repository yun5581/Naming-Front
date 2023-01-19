import { http } from "../http.js";
import axios from "axios";
import { persistor } from "../../index";

const UserService = {
  // 로그아웃
  logout: () => {
    console.log("로그아웃 되었습니다.");
    persistor.purge();
    window.localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/"; // url 수정 필요
  },

  //로그인
  getUser: (id, password) =>
    axios.post("http://localhost:4000/accounts/", { // url 수정 필요 
      loginId: id,
      password: password
    }),

  // 회원가입
  postUser: (name,id, password) =>
    axios.post("http://localhost:4000/accounts/signup/", { // url 수정 필요
        firstname: name,
        loginId: id,
        password: password
    })
};

export default UserService;