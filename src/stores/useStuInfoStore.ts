import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import {requestInfo, requestLogin, requestLogout} from "@/api/user";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import type {resResult, resToken} from "@/stores/type/loginType.ts";
import {createRoutes} from "@/router/routes.ts";
import type {counselorInfo, StuInfoData, userInfo} from "@/api/type/resType.ts";

export const useStuInfoStore = defineStore('StuInfo', () => {
  const router = useRouter();
  const routerList =ref(createRoutes)
  const stuInfo=ref<userInfo>({
    id: 0,
    user_id: 0,
    username: "",
    real_name: "",
    phone: "",
    avatar: "",
    role_type: "",
    class_name: "",
    department: "",
    professional: "",
    enrollment_year: 0,
    earned_credits: "",
    is_difficult: 0,
    is_top_up: 0,
    schooling_length: 0,
    training_level: "",
    academic_status: "",
    current_status: "",
    is_at_school: 0,
    registration_status: "",
    counselor_id: 0,
    age: 0,
    gender: "",
    id_card_type: "",
    id_card_no: "",
    political_status: "",
    birth_date: "",
    nation: "",
    remark: "",
    counselorInfo:{
      counselor_name: "",
      counselor_phone: ""
    }
  })
  const counselorInfo = ref<counselorInfo>({
    counselor_name: "",
    counselor_phone: ""
  })
  // const empty = stuInfo.value /********//////
  const token = ref(localStorage.getItem("token"));
  // const username = ref('');
  // const avatar = ref('');
  // 登陆操作
  async function userLogin(data:any){
    // 请求登陆
    const result:resToken = await requestLogin(data)
    console.log(result)
    // token本地化
    localStorage.setItem('token',result.token);
    token.value=localStorage.getItem('token');
  }
  // 获取学生信息
  async function getStuInfo(){
    console.log("获取用户信息")
    const result:StuInfoData = await requestInfo();
    stuInfo.value={...stuInfo.value,...result.userInfo}
    counselorInfo.value={...counselorInfo.value,...result.counselorInfo}
    console.log("result",stuInfo.value)
    console.log("counselor",result.counselorInfo)
    await router.push("/")
  }
  //退出登录
  async function userLogout() {
    //退出登录请求
    const result: any = await requestLogout()
    localStorage.removeItem('token')
    token.value=localStorage.getItem('token');
    router.push({ path: '/login' });
    // if (result.code == 200) {
    //   //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
    //   stuInfo.value=
    //   REMOVE_TOKEN()
    //   return 'ok'
    // } else {
    //   return Promise.reject(new Error(result.message))
    // }
  }
  async function getCourseList(className){

  }
  return {token,stuInfo,userLogin,getStuInfo,userLogout,routerList,counselorInfo}
})

