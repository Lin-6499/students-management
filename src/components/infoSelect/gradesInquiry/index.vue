<template>
  <el-card><Query :updateGrades="handleFilterChange"/></el-card>
  <el-card style="margin-top: 5px"><TableCard :grades="filterGrades"/></el-card>
</template>
<script setup lang="ts">
import TableCard from "@/components/infoSelect/gradesInquiry/Item/tableCard.vue";
import {useCourseStore} from "@/stores/useCourseStore.ts";
import {ref, computed, reactive} from "vue";
import type {getGradesResult, grade} from "@/stores/type/courseInfoType.ts";
import Query from "@/components/infoSelect/gradesInquiry/Item/Query.vue";
defineOptions({
  name: 'gradesInquiry',
})
interface filter{
  semester:string,
  courseName:string,
  isPass:string,
  exam:string,
}
const currentFilter = ref<filter>({
  semester: '',
  courseName: '',
  isPass: '',
  exam: ''
})
const courseStore = useCourseStore();
const originalGrades  = ref<grade[]>([])

async function getGradesAll() {
  try {
    const data:getGradesResult = await courseStore.getGrades()
    originalGrades .value = data.grades
  }catch (error) {
    console.log(error)
  }
}
const filterGrades=computed(()=>{
  return originalGrades .value.filter(item => {
    if (currentFilter.value.semester&&item.semester!==currentFilter.value.semester) {
      return false
    }
    if (currentFilter.value.exam&&item.nature!==currentFilter.value.exam) {
      return false
    }
    if (currentFilter.value.courseName&&item.course_name!==currentFilter.value.courseName) {
      return false
    }
    if (currentFilter.value.isPass=="false"&&Number(item.score)>=60) {
      return false
    }else if (currentFilter.value.isPass=="true"&&Number(item.score)<60) {
      return false
    }
    return true
  })
})
const handleFilterChange = (newFilter: filter) => {
  console.log("筛选")
  currentFilter.value = {...newFilter};
};
getGradesAll()
</script>


<style scoped>

</style>
