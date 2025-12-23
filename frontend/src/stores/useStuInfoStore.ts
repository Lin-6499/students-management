import {ref} from 'vue'
import { defineStore } from 'pinia'
import {useRouter} from "vue-router";
import type {resToken} from "@/stores/type/loginType.ts";
import {studentsRoutes} from "@/router/studentsRoutes.ts";
import type {counselorInfo, StuInfoData} from "@/api/type/resType.ts";
import {requestLogin,requestLogout,requestInfo} from "@/api/baseAPI";
import {resetRouter} from "@/router";
import {counselorRouters} from "@/router/counselorRouters.ts";

export const useStuInfoStore = defineStore('StuInfo', () => {
  const router = useRouter();
  const routerList =ref([]);
  const stuInfo=ref<StuInfoData>({
    userInfo:{
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
      remark: ""
    },
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
    console.log('login',result)
    // token本地化
    localStorage.setItem('token',result.token);
    token.value=localStorage.getItem('token');
  }
  // 获取学生信息
  async function getStuInfo(){
    console.log("获取用户信息")
    const result:StuInfoData = await requestInfo();
    // routerList.value = filterRoutesByRole(createRoutes,result.userInfo.role_type)
    stuInfo.value.userInfo={...stuInfo.value.userInfo,...result.userInfo}
    stuInfo.value.counselorInfo={...stuInfo.value.counselorInfo,...result.counselorInfo}
    resetRouter()
    const {role_type}=stuInfo.value.userInfo
    console.log('角色类型',role_type)
    let routesToUse: any[] = [];
    if (role_type=="student"){
      console.log('stu')
      studentsRoutes.forEach(route=> router.addRoute(route))
      routesToUse = studentsRoutes
    }else if(role_type=="counselor"){
      counselorRouters.forEach(route=>router.addRoute(route))
      routesToUse = counselorRouters
    }
    console.log('routerList',router)
    console.log('studentRouters',studentsRoutes)
    routerList.value = routesToUse;
    await router.push("/")
  }
  //退出登录
  async function userLogout() {
    //退出登录请求
    const result: any = await requestLogout()
    localStorage.removeItem('token')
    token.value=localStorage.getItem('token');
    stuInfo.value.userInfo.username="";
    if (result) {
      await router.push({ path: '/login' });
    }
  }


  return {token,stuInfo,userLogin,getStuInfo,userLogout,routerList,counselorInfo}
})

