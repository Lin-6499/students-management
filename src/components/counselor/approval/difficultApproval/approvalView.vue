<template>
  <el-dialog width="40%">
    <el-form  label-width="auto" size="large" disabled>
      <el-form-item label="姓名">
        <el-input :placeholder="showInfo.real_name"/>
      </el-form-item>
      <el-form-item label="学号">
        <el-input :placeholder="showInfo.student_id"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input :placeholder="showInfo.gender"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input :placeholder="showInfo.birth_date"/>
      </el-form-item>
      <el-form-item label="身份证件号">
        <el-input :placeholder="showInfo.id_card_no"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input :placeholder="showInfo.phone"/>
      </el-form-item>
      <el-form-item label="家庭收入">
        <el-input :placeholder="showInfo.family_income"/>
      </el-form-item>
      <el-form-item label="困难情况说明">
        <el-input
          type="textarea"
          maxlength="300"
          show-word-limit
          style="width: 400px"
          :autosize="{minRows:4,maxRows:6}"
          :placeholder="showInfo.description"/>
      </el-form-item>
      <el-form-item label="证明材料">
        <el-image  v-for=" (item,index) in fileList" :initial-index="index" :preview-src-list="fileList" style="object-fit: contain;margin-right: 5px;max-width: 100px;max-height:100px" :src="item" alt="Preview Image" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="btn" style="text-align: right;margin-top: 10px">
        <el-button type="primary" @click="handleAgree(propShow)">同意</el-button>
        <el-button type="danger" @click="handleRefuse(propShow)">拒绝</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {counselorAPI} from "@/api/counselorAPI";
const {showInfo,propShow,updataData}=defineProps(['showInfo','propShow','updataData'])
defineOptions({
  name: 'approvalView'
})
const fileList = computed(() => {
  const urls = JSON.parse(showInfo.proof_files || '[]') as string[]
  return urls.map(item => "http://localhost:3001"+item )
})
const nowDate = ()=>{
  return (new Date().getFullYear())+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate())+' '+(new Date().getHours())+':'+(new Date().getMinutes())+':'+(new Date().getSeconds())
}
const handleAgree = async (funShow:any) => {
  funShow(false)
  await counselorAPI.requestReviewDifficult({
    status:1,
    review_at:nowDate(),
    student_id:showInfo.student_id,
  })
  // 刷新页面
  updataData()
}
const handleRefuse = async (funShow:any) => {
  funShow(false)
  await counselorAPI.requestReviewDifficult({
    status:-1,
    review_at:nowDate(),
    student_id:showInfo.student_id,
  })
  // 刷新页面
  updataData()
}
</script>


<style scoped>
.btn :deep(.el-form-item__content) {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 50px;
}
:deep(.el-input){
  width:300px;
}
:deep(.el-upload-dragger){
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form{
  border: rgba(221, 221, 221, 0.45) 1px solid;
  padding: 5px;
}
</style>
