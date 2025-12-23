<template>
  <el-card  style="display: flex;justify-content: center;">
    <el-steps direction="vertical" :active="active"  process-status="finish" finish-status="success" :space="150">
      <el-step title="提交申请" icon="edit">
      </el-step>
      <el-step  icon="Avatar" :status="processStatus">
        <template #title>
          <span>{{processStatus==='error'?'辅导员审批未通过':(isPass?'辅导员审批通过':'待辅导员审批')}}</span>
        </template>
        <template #description>
          <el-button v-if="processStatus==='error'">返回</el-button>
        </template>
      </el-step>
      <el-step icon="Flag" >
        <template #title>
          <span>开始休假</span>
        </template>
        <template #description>
          <el-button v-if="isPass" @click="checkNote">查看假条</el-button>
        </template>
      </el-step>
    </el-steps>
  </el-card>
  <el-dialog v-model="checkRecord" style="padding: 20px">
    <template #title >
      <div class="dialog-title">
        <el-text>正在休假中</el-text>
      </div>
    </template>
    <el-card class="dialog-content">
      <div>
        <el-text>请假类型：</el-text><span>{{data.type}}</span>
        <el-text style="margin-left: 20px">是否离校：</el-text><span>{{data.is_at_school?'是':'否'}}</span>
      </div>
      <div><el-text>销假规则：</el-text><span style="color: rgb(239,199,0)">离校请假需要销假，非离校请假无需销假</span></div>
<!--      <div><el-text>实际休假时间：</el-text><span>{{beijingTime(data.start_at) }}</span></div>-->
    </el-card>
    <el-card >
      <template #header>
        <span style="font-weight: bold;font-size: 23px">请假申请</span>
      </template>
      <div><el-text>开始时间：</el-text><span>{{beijingTime(data.start_at)}}</span></div>
      <div><el-text>结束时间：</el-text><span>{{beijingTime(data.end_at)}}</span></div>
      <div><el-text>请假原因：</el-text><span>{{data.content}}</span></div>
      <div><el-text>发起位置：</el-text><span>{{data.address}}</span></div>
    </el-card>
    <el-card>
      <div><el-text>审批人：</el-text><span>{{stuInfoStore.stuInfo.counselorInfo.counselor_name}}</span></div>
    </el-card>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {beijingTime} from "../../../../utils/clock.ts";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
const {data} = defineProps(['data'])
const isPass = ref<boolean>(false);
const active = ref<number>(1);
const checkRecord = ref();
const  stuInfoStore=useStuInfoStore()
const processStatus = ref<string>("finish");
onMounted(()=>{
  isPass.value=(data.status!==null&&data.status === '1');
  active.value=((data.status!==null&&(data.status==='0'))?1:((data.status==='1')?3:1));
  processStatus.value = (data.status==="-1")?"error":((active.value===1)?"finish":"success");
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
