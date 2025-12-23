<template>
  <el-card class="Screening">
    <span>办理状态</span>
    <el-select
      v-model="selectStatus"
      multiple
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      :loading="false"
      style="width: 240px"
    >
      <el-option value="1" label="已审批"/>
      <el-option value="0" label="待审批"/>
      <el-option value="-1" label="已驳回"/>
    </el-select>
    <span>搜索</span>
    <el-select
      v-model="selectName"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="姓名"
      :remote-method="remoteMethod"
      :loading="false"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
<!--    <el-button @click="filterTableList">筛选</el-button>-->
  </el-card>
  <el-card style="height: 50vh;max-height: 90vh;margin-top: 10px">
    <template #header>
      <span>申请列表</span>
    </template>
    <el-table border :data="filterTableList">
      <el-table-column label="姓名">
        <template #default="scope">
          <span>{{scope.row.real_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批状态">
        <template #default="scope">
          <el-tag style="margin-left: 10px" :type="tagType(scope.row.status)">{{getStatus(scope.row.status)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template #default="scope">
          <span>{{beijingTime(scope.row.updated_at)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleCheck(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <approval-view v-model="isShow" :propShow="changeShow" :showInfo="stuInfo" :updataData="getDifficultInfo"/>
</template>
<script setup lang="ts">
import {ref,onMounted,computed} from "vue";
import {beijingTime} from "@/utils/clock.ts";
import {counselorAPI} from "@/api/counselorAPI";
import ApprovalView from "@/components/counselor/approval/difficultApproval/approvalView.vue";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
interface difficultList {
  real_name: string;
  status: string;
  updated_at: string;
}
const isShow = ref(false);
const selectStatus = ref<string[]>([]);
const selectName = ref<string[]>([]);
const list = ref<string[]>([])
const tableList = ref<difficultList[]>([])
const loading = ref(false);
const options = ref<string[]>([])
const stuInfoStore = useStuInfoStore()
const stuInfo = ref({
  real_name: "",
  student_id:"",
  family_income:"",
  description:"",
  proof_files:"",
  gender:"",
  id_card_no:"",
  phone:"",
  birth_date:"",
})

const filterTableList = computed(() => {
  return tableList.value.filter((item:difficultList) => {
    if (selectStatus.value && selectStatus.value.length > 0) {
      if (!selectStatus.value.includes(String(item.status))) {
        console.log(item.status)
        return false
      }
    }
    if (selectName.value && selectName.value.length > 0) {
      if (!selectName.value.includes(item.real_name)) {
        return false
      }
    }
    return true;
  })
})
const getStatus = (status: number) => {
  switch (status) {
    case 1: return  "已审批";
    case -1: return "已驳回";
    case 0: return "待审批";
  }
}
const changeShow = (show: boolean) => {
  isShow.value = show;
}

onMounted(()=>getDifficultInfo())
const getDifficultInfo = async ()=>{
  const result = await counselorAPI.requestDifficultyList({
    user_id:String(stuInfoStore.stuInfo.userInfo.id)
  })
  list.value = [] // 或直接 map 生成新数组
  tableList.value = result.difficultyList;
  result.difficultyList.forEach((item:difficultList) => {
    list.value.push(item.real_name)
  })
}
const tagType = (status: number) => {
  switch (status) {
    case 1: return "success";
    case 0: return "info";
    case -1: return "danger";
  }
}
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}
function handleCheck(row) {
  isShow.value=true
  stuInfo.value = {...stuInfo.value,...row}
  console.log('change',stuInfo.value)
}
</script>


<style scoped>
.Screening{
  *{
    margin-left: 10px;
  }
}
</style>
