import {infoSelect, stuApplyList} from "@/router/MenuList.ts";
// 学生路由
export const studentsRoutes=[
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
        component:()=>import("@/components/students/home/index.vue"),
        meta:{
          title:'首页',
          hidden:false,
        }
      }
    ]
  },
  {
    path:'/info',
    component:()=>import("@/layout/layout.vue"),
    meta:{
      title:'个人信息',
      hidden:true,
    },
    children: [
      {
        path: "/info/user-info",
        name: "User-Info",
        component: ()=>import("@/components/students/infoSelect/infoCard/index.vue"),
        meta:{
          title: "学生卡片",
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
// 辅导员路由
