import request from '@/utils/request'
import type {scheduleData} from "@/api/type/resType.ts";
enum API {
  SCHEDULE_URL ='/info/getSchedule',
  GRADES_URL ='/info/getGradesInquiry',
  COURSELIST_URL ='/info/getCourseList',
}
// 获取课表
export const requestSchedule = (data:scheduleData):any=> request.get(API.SCHEDULE_URL,{
  params:data
})
// 获取成绩列表
export const requestGrades = ()=> request.get(API.GRADES_URL)
// 罗列课程
export const requestCourseList =(data:any)=> request.get(API.COURSELIST_URL,{
  params:{
    className:data
  }
})
