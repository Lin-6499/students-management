// 学生申请表
export const stuApplyList = [
  {
    id: 1,
    url: "/apply/self-study",
    name: "Self-Study",
    component: ()=>import("@/components/stuApply/difficultApply/index.vue"),
    meta:{
      title: "贫困申请",
      hidden:false,
      roles:['student']
    }
  }
];

// 信息查询
export const infoSelect = [
  {
    id: 1,
    url: "/info/user-info",
    name: "User-Info",
    component: ()=>import("@/components/infoSelect/infoCard/index.vue"),
    meta:{
      title: "学生卡片",
      hidden:false,
      roles:['student']
    }
  },
  {
    id: 2,
    url: "/info/grades-inquiry",
    name: "Grades-Inquiry",
    component: ()=>import("@/components/infoSelect/gradesInquiry/index.vue"),
    meta:{
      title: "成绩查询",
      hidden:false,
      roles:['student']
    }
  }
]

