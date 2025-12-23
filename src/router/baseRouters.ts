export const baseRouters=[
  {
    path:'/login',
    name:'Login',
    component: () => import("@/components/students/login/login.vue"),
    meta:{
      title:'登陆',
      hidden:true,
    }
  },
  {
    path:'/',
    redirect:'/home',
  }
]
