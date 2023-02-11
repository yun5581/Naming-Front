import VisitorService from "./services/visitorservice.js";
import { useAppSelector } from "../../redux/store";
import axios from "axios";



export const PostDefinition = async(definition) => {
  try{
    const response = await VisitorService.postVisitor(nickname);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error, "방문자 이름입력 실패");
  }
};

