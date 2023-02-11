import UserService from "./services/userservice";
import axios from "axios";

// 로그아웃
export const Logout = () => {
  UserService.logout();
};

// 회원가입
export const PostUser = async (id, password, name) => {
  try {
    const response = await UserService.postUser(id, password, name);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "회원가입 실패");
  }
};
// 로그인
export const GetUser = async (id, password) => {
  try {
    const response = await UserService.getUser(id, password);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data, "로그인 실패");
  }
};
// 커스텀 정보 저장
export const SubmitCustom = async (
  firstName,
  color,
  shadow,
  shadowColor,
  border
) => {
  try {
    const response = await UserService.submitCustom(
      firstName,
      color,
      shadow,
      shadowColor,
      border
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "커스텀 정보 저장 실패");
  }
};

//이름 검색 리스트 조회
export const getNames = (keyword) => {
  try {
    const response = UserService.getNames(keyword);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error, "이름 검색 리스트 조회 실패");
  }
};

//정의 좋아요 취소
export const deleteLike = async (dictionaryId, postId) => {
  try {
    const response = await UserService.deleteLike(dictionaryId, postId);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error, "좋아요 취소 실패");
  }
};

export const getDictionary = async (dictionaryId, consonant) => {
  try {
    const res = await axios.get(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/?consonant=${consonant}`
    );
    return Promise.resolve(res.data.data);
  } catch (error) {
    return error;
  }
};

export const removeDictionary = async (dictionaryId, id) => {
  try {
    const res = await UserService.delete(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/${id}`,
      {
        data: {
          id,
        },
      }
    );
  } catch (error) {
    return console.log(error);
  }
};