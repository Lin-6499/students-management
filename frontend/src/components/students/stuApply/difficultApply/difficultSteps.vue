<template>
  <el-card  style="display: flex;justify-content: center;">
    <el-steps direction="vertical" :active="active"  process-status="finish" finish-status="success" :space="150">
      <el-step icon="edit">
        <template #title>
          <span>提交申请</span>
        </template>
      </el-step>
      <el-step  icon="Avatar" :status="processStatus">
        <template #title>
          <span>{{processStatus==='error'?'辅导员审批未通过':(isPass?'辅导员审批通过':'待辅导员审批')}}</span>
        </template>
      </el-step>
      <el-step icon="Flag" >
        <template #title>
          <span>审批通过</span>
        </template>
      </el-step>
    </el-steps>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
const {data} = defineProps(['data'])
const isPass = ref<boolean>(false);
const active = ref<number>(1);
const checkRecord = ref();
const processStatus = ref<string>("finish");
defineOptions({
  name: "difficultSteps",
})
onMounted(()=>{
  isPass.value=(data.status!==null&&data.status === 1);
  active.value=((data.status!==null&&(data.status=== 0))?1:((data.status=== 1)?3:1));
  processStatus.value = (data.status===-1)?"error":((active.value===1)?"finish":"success");
  console.log('process',processStatus.value)
  console.log('status',data.status)
})

const checkNote = ()=>{
  //显示假条 销假
  checkRecord.value=123
}
</script>


<style scoped>
.dialog-title{
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  .el-text{
    font-size: 25px;
    color: #afb2b3;
    font-weight: bold;
  }
}

.el-text{
  font-size: 20px;
  color: #999;
  font-weight: bold;
}
.el-dialog .el-card:not(:last-child){
  margin-bottom: 10px;
}
.el-card div:not(:last-child){
  margin-bottom: 20px;
}
.el-card{
  span{
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
