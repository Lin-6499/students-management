import {defineStore} from "pinia";
import {studentsAPI} from "@/api/studentsAPI";
import {counselorAPI} from "@/api/counselorAPI";
import type {scheduleData} from "@/api/type/resType.ts";
import {reactive, ref} from 'vue'
import type {getGradesResult, scheduleType} from "@/stores/type/courseInfoType.ts";
export const useCourseStore = defineStore('courses', ()=>{
  const userSchedule = reactive<scheduleType[]>([])

  async function getStudentsSchedule(data: scheduleData) {
    try {
      const result = await studentsAPI.requestSchedule(data); // 类型应为 scheduleType[]
      console.log('result', result.schedule);
      userSchedule.splice(0, userSchedule.length, ...result.schedule);
      console.log('课表数据:', userSchedule);
      return result;
    } catch (error) {
      console.error('获取课表失败:', error);
      throw error;
    }
  }
  async function getCounselorSchedule(data: scheduleData) {
    try {
      const result = await counselorAPI.requestSchedule(data); // 类型应为 scheduleType[]
      console.log('result', result.schedule);
      userSchedule.splice(0, userSchedule.length, ...result.schedule);
      console.log('课表数据:', userSchedule);
      return result;
    } catch (error) {
      console.error('获取课表失败:', error);
      throw error;
    }
  }
  async function getGrades() {
    try{
      const result:getGradesResult = await studentsAPI.requestGrades()
      console.log('grades', result.grades)
      return  result
    }catch(error){
      console.log('error',error)
    }
  }
  return {getStudentsSchedule,getGrades,getCounselorSchedule}
})
