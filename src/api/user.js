import UserService from "./services/userservice";

// 로그아웃
export const Logout = () => {
  alert("로그아웃");
  UserService.logout();
};

// 회원가입
export const PostUser = async (name, id, password) => {
  try {
    const response = await UserService.postUser(name,id, password);
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
export const SubmitCustom = async(userId, color, shadow, shadowColor, border) =>{
  try{
    const response = await UserService.submitCustom(userId, color, shadow, shadowColor, border);
    return Promise.resolve(response.data)
  } catch(error){
      return Promise.reject(error, "커스텀 정보 저장 실패");
  }
};



