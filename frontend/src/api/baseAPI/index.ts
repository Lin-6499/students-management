import type {loginReqData, loginResData, StuInfoData} from "@/api/type/resType.ts";
import request from "@/utils/request.ts";


enum API{
  LOGIN_URL= '/auth/login',
  LOGOUT_URL ='/auth/logout',
  INFO_URL ='/auth/userInfo',
}

export const requestLogin = (data:loginReqData) => request.post<loginResData>(API.LOGIN_URL,data);
export const requestLogout = ()=> request.post(API.LOGOUT_URL);
export const requestInfo = ()=> request.get<StuInfoData>(API.INFO_URL);
