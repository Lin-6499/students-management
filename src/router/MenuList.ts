/**
 * 对于不同用户菜单栏的显示也需要type控制
 */

// 学生申请表
export const stuApplyList = [
  {
    id: 1,
    url: "/apply/self-study",
    name: "Self-Study",
    component: ()=>import("@/components/students/stuApply/difficultApply/index.vue"),
    meta:{
      title: "贫困申请",
      hidden:false,
      roles:['student','counselor']
    }
  },
  {
    id: 2,
    url: "/apply/records",
    name: "Records",
    component: ()=>import("@/components/students/stuApply/recordsApply/index.vue"),
    meta:{
      title: "请假申请",
      hidden:false,
      roles:['student','counselor']
    }
  }
];

// 信息查询
export const infoSelect = [
  {
    id: 1,
    url: "/info/grades-inquiry",
    name: "Grades-Inquiry",
    component: ()=>import("@/components/students/infoSelect/gradesInquiry/index.vue"),
    meta:{
      title: "成绩查询",
      hidden:false,
      roles:['student']
    }
  }
]

