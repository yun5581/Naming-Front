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
    //window.location.href = "https://naming-likelion.vercel.app/"; //url 수정 필요
  },
  //회원가입
  postUser: (id, password, name) =>
    // axios.post('http://127.0.0.1:8000/accounts/signup/', { // (test) local 서버용
    axios.post("https://kj273456.pythonanywhere.com/accounts/signup/", {
      firstName: name,
      username: id,
      password: password,
    }),

  // 로그인
  getUser: (id, password) =>
    // axios.post("http://127.0.0.1:8000/accounts/login/", { // (test) local 서버용
    axios.post("https://kj273456.pythonanywhere.com/accounts/login/", {
      username: id,
      password: password,
    }),
  // 커스텀 정보 전달
  submitCustom: (firstName, color, shadow, shadowColor, border) =>
    // http.post("http://127.0.0.1:8000/dictionary/",{ // (test) local 서버용
    http.post("https://kj273456.pythonanywhere.com/dictionary/", {
      firstName: firstName,
      color: color,
      shadow: shadow,
      shadowColor: shadowColor,
      border: border,
    }),
  getDictionary: (dictionaryId, consonant) => {
    axios.get(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/?consonant=${consonant}`
    );
  },
  removeDictionary: (dictionaryId, id) => {
    http.delete(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/${id}`
    );
  },

  getNames: (keyword) => {
    axios.get(
      `https://kj273456.pythonanywhere.com/dictionary/search/?keyword=${keyword}`
    );
  },
};

export default UserService;
