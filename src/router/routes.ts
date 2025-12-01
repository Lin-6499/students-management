import {infoSelect, stuApplyList} from "@/router/MenuList.ts";

export const createRoutes=[
  {
    path:'/login',
    name:'Login',
    component: () => import("@/components/login/login.vue"),
    meta:{
      title:'登陆',
      hidden:true,
    }
  },
  {
    path:'/',
    name:'Layout',
    component: ()=> import("@/layout/layout.vue"),
    meta:{
      title:'',
      hidden:false,
    },
    redirect:'/home',
    children:[
      {
        path: '/home',
        name:'Home',
        component:()=>import("@/components/home/index.vue"),
        meta:{
          title:'首页',
          hidden:false,
          roles:['student']
        }
      }
    ]
  },
  {
    path:'/apply',
    component:()=>import("@/layout/layout.vue"),
    meta:{
      title:'学生申请',
      hidden:true,
      roles:['student']
    },
    redirect:'/apply/self-study',
    children:
      stuApplyList.map( item =>(
        {
          path: item.url,
          name: item.name,
          component: item.component,
          meta: item.meta,
        }
      ))
  },
  {
    path:'/info',
    component:()=>import("@/layout/layout.vue"),
    meta:{
      title:'学生申请',
      hidden:true,
      roles:['student']
    },
    redirect:'/apply/self-study',
    children:
      infoSelect.map( item =>(
        {
          path: item.url,
          name: item.name,
          component: item.component,
          meta: item.meta,
        }
      ))
  }

]
