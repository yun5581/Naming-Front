import { http } from "../http.js";
import axios from "axios";
import { persistor } from "../../index";
import { initUser } from "../../redux/userSlice.js";
import { initDictionary } from "../../redux/dictionarySlice.js";

const UserService = {
  // 로그아웃
  logout: () => {
    //persistor.purge();
    window.localStorage.removeItem("token");
    // 유저 정보 초기화
    initUser();
    // 사전 정보 초기화 
    initDictionary();
    window.location.href = "http://localhost:3000/"; //url 수정 필요
  },
  //회원가입
    postUser: (id, password, name) =>
    axios.post('https://kj173456.pythonanywhere.com/accounts/signup/', { 
        firstName: name,
        username: id,
        password: password
  }),

  // 로그인
  getUser: (id, password) =>
    axios.post("https://kj173456.pythonanywhere.com/accounts/login/", {
      username: id,
      password: password
  }),
  // 커스텀 정보 전달 
  submitCustom:  (userId, color, shadow, shadowColor, border) =>
    http.post("https://kj173456.pythonanywhere.com/dictionary/",{ 
        userId: userId,
        color: color,
        shadow: shadow,
        shadowColor: shadowColor,
        border: border
    }
    )
};

export default UserService;