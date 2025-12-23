export const counselorRouters=[
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
        component:()=>import("@/components/counselor/home/index.vue"),
        meta:{
          title:'首页',
          hidden:false,
        }
      }
    ]
  },
  {
    path:'/approval',
    name:'Approval',
    component: ()=>import("@/layout/layout.vue"),
    meta: {
      title:'审批处理',
      hidden:false,
    },
    children: [
      {
        path:'/difficultApproval',
        name:'difficultApproval',
        component: ()=> import("@/components/counselor/approval/difficultApproval/index.vue"),
        meta:{
          title:'贫困生审批',
          hidden:false,
        }
      }
    ]
  },
  {
    path:'/record',
    name:'Record',
    component: ()=> import("@/layout/layout.vue"),
    meta:{
      title:'奖惩与考勤记录',
      hidden:false
    },
    children:[
      {
        path: '/attendance',
        name:'Attendance',
        component: ()=> import("@/components/counselor/attendance/index.vue"),
        meta:{
          title:'考勤记录',
          hidden:false
        }
      }
    ]
  }
]
