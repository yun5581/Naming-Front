import UserService from "./services/userservice";

// 로그아웃
export const Logout = () => {
  alert("로그아웃");
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
  userId,
  color,
  shadow,
  shadowColor,
  border
) => {
  try {
    const response = await UserService.submitCustom(
      userId,
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

//정의 삭제
export const deleteDictionary = async (consonant, contents) => {
  try {
    const response = await UserService.deleteDictionary(consonant, contents);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "정의 등록 실패");
  }
};

//자음으로 시작하는 정의들 모아서 보여주기
export const getDictionary = () => {
  try {
    const response = UserService.getDictionary();
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "정의 가져오기 실패");
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

//정의 좋아요
export const postLike = async () => {
  try {
    const response = await UserService.postLike();
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "좋아요 실패");
  }
};

//정의 좋아요 취소
export const deleteLike = async () => {
  try {
    const response = await UserService.deleteLike();
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error, "좋아요 취소 실패");
  }
};
