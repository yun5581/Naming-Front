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
  // 회원가입
    postUser: (id,name, password) =>
    axios.post('https://kj173456.pythonanywhere.com/accounts/signup/', { // url 수정 필요
        userId: id,
        firstName: name,
        password: password
  }),
  // 로그인
  getUser: (id, password) =>
    axios.post("https://kj173456.pythonanywhere.com/accounts/login/", { // url 수정 필요 
      userId: id,
      password: password
  }),

  // 커스텀 정보 전달 
  submitCustom:  (userId, color, shadow, shadowColor, border) =>
    axios.post("http://localhost:4000/dictionary/",{ //url 수정 필요
        userId: userId,
        color: color,
        shadow: shadow,
        shadowColor: shadowColor,
        border: border
    })
};

export default UserService;