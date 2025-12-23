<template>
  <el-dialog  width="40%">
    <el-form label-width="auto" size="large" disabled>
      <el-form-item label="姓名">
        <el-input :placeholder="detailInfo.real_name"/>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-input :placeholder="beijingTime(detailInfo.apply_at)"/>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input :placeholder="beijingTime(detailInfo.start_at)"/>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input :placeholder="beijingTime(detailInfo.end_at)"/>
      </el-form-item>
      <el-form-item label="请假原因">
        <el-input type="textarea" style="width: 300px" :placeholder="detailInfo.content"/>
      </el-form-item>
      <el-form-item label="请假类型">
        <el-input :placeholder="detailInfo.type"/>
      </el-form-item>
    </el-form>
    <div class="btn" style="text-align: right;margin-top: 10px">
      <el-button type="primary" @click="passClick">通过</el-button>
      <el-button type="danger" @click="refuseClick">拒绝</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {beijingTime} from "@/utils/clock.ts";
import {counselorAPI} from "@/api/counselorAPI";
defineOptions({
  name:'detailedView',
})
const {detailInfo,refreshData,isShow}=defineProps(['isShow','detailInfo','refreshData'])
const passClick = async () => {
  await counselorAPI.requestReviewRecords({
    student_id:detailInfo.student_id,
    status:"1"
  })
  refreshData()
}
const refuseClick = async () => {
  await counselorAPI.requestReviewRecords({
    student_id:detailInfo.student_id,
    status:"-1"
  })
  refreshData()
}
</script>


<style scoped>
:deep(.el-input){
  width:300px;
}
.el-form{
  border: rgba(221, 221, 221, 0.45) 1px solid;
  padding: 5px;
}
:deep(.el-form-item__label){
  color: #2b2a2a;
}
.btn :deep(.el-form-item__content) {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 50px;
}
</style>
