<template>
  <el-card v-if="isRecords">
    <el-form :model="recordsForm">
      <el-form-item label="请假类型" >
        <el-select v-model="recordsForm.type" style="width:300px">
          <el-option v-for="item in recordsTypes" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="请假时间">
        <el-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model="datetimerange"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="是否需要离校">
        <el-switch v-model="at_school"/>
      </el-form-item>
      <el-form-item label="请假原因">
        <el-input type="textarea" v-model="recordsForm.content" style="width: 300px" maxlength="300" show-word-limit/>
      </el-form-item>
      <el-form-item label="定位" style="width: 500px">
        <span style="color: rgba(163,161,161,0.92)" >{{address.fullAddress}}</span>
        <el-button circle @click="getAddress" class="btn" icon="Location"></el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitRecords">我要请假</el-button>
  </el-card>
<!--  如果已经申请了请假-->
  <RecordsSteps v-if="!isRecords" :data="recordsData"/>
</template>

<script setup lang="ts">
import {reactive, ref, watch, onBeforeMount} from "vue";
import {
  getCurrentPosition, getLocationByIP,
  isChrome
} from "@/components/students/stuApply/recordsApply/Composable.ts";
import { studentsAPI} from "@/api/studentsAPI";
import RecordsSteps from "@/components/students/stuApply/recordsApply/recordsSteps.vue";
const recordsTypes = ["事假", "病假", "其他"];
const address = ref<AddressTypes>({
  fullAddress: "",
})
const recordsData = ref({})
// 是否有记录 判断是否销假
const isRecords = ref<boolean>(true);
const datetimerange = ref()
const at_school = ref(false)
const recordsForm = reactive({
  content:"",
  start_at:"",
  end_at:"",
  type:"",
  is_at_school:"0",
  address:""
})
onBeforeMount(()=>{
  cardChange()
})
const cardChange = async () => {
  const result = await studentsAPI.requestGetRecords()
  if(result.result === null){
    return await getAddress()
  }
  recordsData.value = result.result
  isRecords.value=false
}
interface AddressTypes{
  fullAddress:string,
}
let debounceTimer: number | null = null;
const debouncedUpdate = () => {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    const val = datetimerange.value;
    if (val?.[0] && val?.[1]) {
      recordsForm.start_at = val[0];
      recordsForm.end_at = val[1];
    } else {
      recordsForm.start_at = '';
      recordsForm.end_at = '';
    }
    console.log('recordsForm', recordsForm);
  }, 1000);
};

// 2. 在 watch 中调用它
watch(
  datetimerange,
  () => {
    debouncedUpdate(); // 直接调用，timer 状态被正确维护
  },
  { immediate: false }
);
watch(at_school,(value, oldValue, onCleanup)=>{
  recordsForm.is_at_school=value?'1':'0'
})
const getAddress = async () => {
  try {
    if(isChrome()){
      const result = await getLocationByIP()
      address.value = await studentsAPI.requestLocation(result)
    }else {
      const prop= await getCurrentPosition()
      address.value= await studentsAPI.requestLocation({
        lng:prop.longitude,
        lat:prop.latitude,
      })
    }
    recordsForm.address = address.value.fullAddress
  }catch(err){
    address.value={fullAddress:'获取定位失败'}
  }
  console.log('prop', (address.value)!.fullAddress)
}
const submitRecords = async ()=>{

  const result = await studentsAPI.requestAddRecords(recordsForm)
  if(result.success === 'ok'){
    await cardChange()
  }
}
</script>


<style scoped>
 .el-form-item {
   width: 400px;
 }
 .btn{
   margin-left: 5px;
   color: #3e96ec;
   border: 2px solid rgb(96, 128, 230);
 }
</style>
