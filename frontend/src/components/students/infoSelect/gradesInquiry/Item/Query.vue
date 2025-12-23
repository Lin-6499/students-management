<template>
  <el-form :model="gradesForm" :inline="true">
    <el-form-item
      label="学期"
    >
      <el-select
        filterable
        v-model="filter.semester"
        style="width: 130px"
      >
        <el-option v-for="item in academicYear" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item
      label="课程"
    >
      <el-select
        filterable
        style="width: 130px"
        v-model="filter.courseName"
      >
        <el-option v-for="item in courseList" :label="item.course_name" :value="item.course_name"/>
      </el-select>
    </el-form-item>
    <el-form-item
      label="是否及格"
    >
      <el-select
        filterable
        style="width: 130px"
        v-model="filter.isPass"
      >
        <el-option label="是" value="true"/>
        <el-option label="否" value="false"/>
      </el-select>
    </el-form-item>
    <el-form-item
      label="考试性质"
    >
      <el-select
        filterable
        style="width: 130px"
        v-model="filter.exam"
      >
        <el-option label="正考" value="正考"/>
        <el-option label="补考" value="补考"/>
        <el-option label="缓考" value="缓考"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateGrades(filter)">筛选</el-button>
      <el-button type="primary" @click="onReset">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {academicYear} from "@/utils/usually.ts";
import {requestCourseList} from "@/api/studentsAPI/index.ts";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import type {course, getCourseResult} from "@/stores/type/courseInfoType.ts";

defineOptions({
   name: 'Query',
 })
const {updateGrades}=defineProps(['updateGrades'])
const stuInfoStore = useStuInfoStore();
const {userInfo} = stuInfoStore.stuInfo;
const courseList = ref<course[]>([]);
const filter=reactive<any>({
  semester:"",
  courseName:"",
  isPass:"",
  exam:"",
})

const gradesForm = ref({})
getList()
async function getList(){
  const res:getCourseResult = await requestCourseList(userInfo.class_name)
  console.log('sb',res)
  courseList.value=res.courseList
}

const onReset = async () => {
  Object.keys(filter).forEach(key => {
    filter[key] = ""
  })
  updateGrades(filter);
}
</script>


<style scoped>

</style>
