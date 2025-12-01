import request from "@/utils/request.ts";
import type {StuInfoData, loginReqData, loginResData} from "@/api/type/resType.ts";
enum API{
  LOGIN_URL= '/auth/login',
  INFO_URL ='/auth/stuInfo',
  LOGOUT_URL ='/auth/logout',

}


export const requestLogin = (data:loginReqData) => request.post<loginResData>(API.LOGIN_URL,data);
export const requestInfo = ()=> request.get<StuInfoData>(API.INFO_URL);
export const requestLogout = ()=> request.post(API.LOGOUT_URL);
