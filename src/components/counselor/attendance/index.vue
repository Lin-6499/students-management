<template>
  <el-card>
    <el-table :data="recordsList">
      <el-table-column label="姓名" >
        <template #default="scope">
          <span>{{scope.row.real_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template #default="scope">
          <span>{{beijingTime(scope.row.apply_at)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" >
        <template #default="scope">
          <span><el-text truncated >{{scope.row.content}}</el-text></span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="tagStatus(scope.row.status)">{{getStatus(scope.row.status)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="请假类型">
        <template #default="scope">
          <el-tag :type="tagType(scope.row.type)">{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="showDetail(scope.row)">详细</el-button>
          <el-button type="primary" @click="passClick(scope.row.student_id)">同意</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <detailed-view v-model="isShow" :detailInfo="detailInfo" :refreshData="getRecordsData"/>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {counselorAPI} from "@/api/counselorAPI";
import {beijingTime} from "@/utils/clock.ts";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import DetailedView from "@/components/counselor/attendance/detailedView.vue";
interface recordsData{
  real_name:string,
  student_id:string,
  apply_at:string,
  start_at:string,
  end_at:string,
  content:string,
  status:string,
  type:string
}
const detailInfo = ref<recordsData>()
const isShow = ref(false)
const getStatus = (status: string) => {
  switch (status) {
    case "1": return  "已审批";
    case "-1": return "已驳回";
    case "0": return "待审批";
  }
}
const passClick = async (student_id:string) => {
  await counselorAPI.requestReviewRecords({
    student_id:student_id,
    status:"1"
  })
  await getRecordsData()
}
const stuStore = useStuInfoStore()
const recordsList = ref<recordsData[]>([])
onMounted(() => {
  getRecordsData()
})
const showDetail = (row) => {
  isShow.value=true
  detailInfo.value = {...detailInfo.value,...row}
  console.log('detail',detailInfo.value)
}

const tagType = (type: string)=>{
  switch(type){
    case '其他': return 'info'
    case '病假': return 'warning'
    case '事假': return 'primary'
  }
}
const tagStatus = (status: string)=>{
  switch(status){
    case '0': return 'info'
    case '-1': return 'warning'
    case '1': return 'primary'
  }
}
const getRecordsData=async ()=>{
  const result = await counselorAPI.requestRecordsList({
    user_id:String(stuStore.stuInfo.userInfo.id)
  })
  recordsList.value = []
  recordsList.value = result.records
  isShow.value=false
  console.log('852',recordsList.value)
}
</script>


<style scoped>

</style>
