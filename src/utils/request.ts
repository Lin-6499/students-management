import axios from "axios";
import {ElMessage} from "element-plus";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config)=>{
  const stuInfoStore = useStuInfoStore()
  if(stuInfoStore.token){
    config.headers.Authorization = `Bearer ${stuInfoStore.token}`;
  }
  return config;
})
// 响应拦截器
request.interceptors.response.use((response):any=>{
  console.log("响应数据",response.data);
  return response.data;
},(error)=>{
  console.log('错误',error)
  const status = error.response.status;//
  const message = error.response.data.message;
  switch (status) {
    case 401:
      console.log(message);
  }
  return Promise.reject(message)
})

export default request;
