<template>
  <el-card class="notice-card" >
    <el-icon color="skyblue" :size="15"><Bell/></el-icon>
    <span >当前时间：{{time}}</span>
  </el-card>
  <el-card class="stu-card">
    <el-row :gutter="0" style="width: 100%;display: flex;align-items: center">
      <el-col span="4"><img :src="info.avatar" alt="avatar"/></el-col>
      <el-col span="20">
        <el-row>
          <span>{{info.real_name}}</span>
          <span style="display:flex;font-size: 13px;align-items:flex-end;margin-left:10px;color: darkgrey!important;">{{info.user_id}}</span>
          <span style="display:flex;font-size: 13px;align-items:flex-end;margin-left:10px">
            {{info.enrollment_year}}——{{info.department}}——{{info.professional}}——{{info.class_name}}
          </span>
        </el-row>
        <el-row style="margin-top: 10px">
          <span style="display: flex;align-items: end"><icon-svg name="circle"/></span>
          <span style="display: flex;align-items:center;font-size: 13px;">已修学分</span>
          <span style="display: flex;align-items:center;color: black!important;margin-left: 5px;font-size: 12px">{{info.earned_credits}}</span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="class-schedule">
    <el-table :data="scheduleData" border>
      <el-table-column label="">
        <template #header>
          <div style="display: flex; flex-direction: row; gap: 10px;">
            <span>学年</span>
            <el-select  size="small" style="width: 130px" filterable v-model="semester">
              <el-option
                v-for="item in academicYear"
                :label="item.label"
                :key="item.label"
                :value="item.value"
              />
            </el-select>
            <span>周次</span>
            <el-select  size="small" style="width: 100px" filterable v-model="weekTime">
              <el-option
                v-for="item in weekTimeList"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              />
            </el-select>
          </div>
        </template>
        <el-table-column prop="period" label="节次" width="100" />
        <el-table-column prop="Monday" label="周一" />
        <el-table-column prop="Tuesday" label="周二" />
        <el-table-column prop="Wednesday" label="周三" />
        <el-table-column prop="Thursday" label="周四" />
        <el-table-column prop="Friday" label="周五" />
        <el-table-column prop="Saturday" label="周六" />
        <el-table-column prop="Sunday" label="周日" />
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import {ref, computed, watch, reactive} from 'vue'
import {clock} from "@/utils/clock.ts";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import IconSvg from "@/access/svg.vue";
import type {CheckboxValueType} from "element-plus";
import {useCourseStore} from "@/stores/useCourseStore.ts";
import {academicYear} from "@/utils/usually.ts";

const time = ref(clock())
const info = useStuInfoStore().stuInfo
const courseStore = useCourseStore()
const weekTime=ref<number>(1)
const semester=ref<string>("2024-2025-1")
const scheduleData = ref<scheduleType[]>([]);
// 初始加载
loadSchedule();

async function loadSchedule() {
  try {
    const data = await courseStore.getSchedule({
      weekTime: weekTime.value,
      semester: semester.value
    });
    console.log('课表',data);
    scheduleData.value = data.schedule; // ✅ 直接赋值数组
  } catch (error) {
    console.error('加载课表失败', error);
    scheduleData.value = []; // 保证是数组
  }
}
watch([weekTime,semester],()=>{
  if(weekTime.value&&semester.value){
    loadSchedule();
  }
})

interface scheduleType{
  period: string ,
  Monday: string,
  Tuesday: string,
  Wednesday: string,
  Thursday: string,
  Friday: string,
  Saturday: string,
  Sunday: string
}



const weekTimeList:any = []
for (let i = 1; i <= 16; i++) {
  weekTimeList.push(
    {
      label:`第${i}周`,
      value: i,
    }
  )
}

setInterval(()=>{
  time.value = clock();
}, 1000)

</script>


<style scoped lang="scss">
*{
  span{
    color: #5e5b5b;
  }
}
.notice-card {
  :deep(.el-card__body) {
    padding: 8px 12px; /* 不要设为 0，留出空间 */
    display: flex;
    align-items: center;
    /* 移除 height: 10px！ */
  }
  color: #5e5b5b;
  font-size: 14px;
  max-height: 40px;
}
.stu-card {
  display: flex;
  margin-top: 10px;
  height: 100px;
  width: auto;
  align-items: center;
  :deep(.el-card__body) {
    padding: 0;
    display: flex;
    align-items: center;
    /* 移除 height: 10px！ */
  }
  :deep(img){
    max-height: 60px;
    height: auto;
    object-fit: contain;
    //margin-left: 20px;
  }
  :deep(.el-col){
    margin-left: 20px;
  }
}
.class-schedule{
  margin-top: 20px;
}
/* 如果你想让文字靠右，可以这样 */
.notice-title :deep(span) {
  margin-left: 8px;
}
</style>
