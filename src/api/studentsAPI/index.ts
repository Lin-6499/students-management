import request from "@/utils/request.ts";
import type {scheduleData} from "@/api/type/resType.ts";

enum API{
  ADDRECORDS_URL = '/students/apply/addRecords',
  SCHEDULE_URL ='/students/info/getSchedule',
  GRADES_URL ='/students/info/getGradesInquiry',
  COURSELIST_URL ='/students/info/getCourseList',
  GETLOCATION_URL ='/students/info/getLocation',
  GETRECORDS_URL ='/students/info/selectRecords',
  GETDIFFICULTY_URL ='/students/info/selectDifficulty',
  DELETERECORDS_URL = '/students/apply/deleteRecords'
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
// 获取定位
export const requestLocation =(data:any):any=>request.get(API.GETLOCATION_URL,{
  params:data
})
const requestAddRecords = (data:any):any=>request.post(API.ADDRECORDS_URL,data)
const requestGetRecords = ():any=>request.get(API.GETRECORDS_URL)
const requestGetDifficulty = ():any=>request.get(API.GETDIFFICULTY_URL)
const requestDeleteRecords = ():any=>request.delete(API.DELETERECORDS_URL)

export const studentsAPI = {requestDeleteRecords,requestGetDifficulty,requestLocation,requestGetRecords,requestSchedule,requestGrades,requestAddRecords,requestCourseList};
