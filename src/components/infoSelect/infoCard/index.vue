<template>
  <el-card class="infoCard" >
    <template #header>
      <span>基本信息</span>
      <el-switch v-model="root" style="margin-left: 10px"/>
    </template>
    <el-form :disabled="root" :model="userInfo" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="8">
<!--          学号-->
          <el-form-item :label="roleType">
            <el-input v-model="userInfo.user_id" />
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="userInfo.nation"/>
          </el-form-item>
          <el-form-item label="身份证件类型">
            <el-input v-model="userInfo.id_card_type"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="userInfo.remark"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名 ">
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <el-form-item label="姓名拼音">
            <el-input v-model="nameToPinyin"/>
          </el-form-item>
          <el-form-item label="身份证件号">
            <el-input v-model="userInfo.id_card_no"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="userInfo.phone"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-input :placeholder="userInfo.gender" />
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="userInfo.political_status"/>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="userInfo.birth_date.split('T')[0]"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card class="infoCard" style="margin-top: 10px!important;">
    <template #header>
      <span>学籍信息</span>
    </template>
    <el-form :disabled="root" :model="userInfo" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="学年">
            <el-input v-model="userInfo.enrollment_year" />
          </el-form-item>
          <el-form-item label="专业信息">
            <el-input v-model="userInfo.professional"/>
          </el-form-item>
          <el-form-item label="学制">
            <el-input v-model="userInfo.schooling_length"/>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-input v-model="userInfo.current_status"/>
          </el-form-item>
          <el-form-item label="辅导员">
            <el-input v-model="counselorInfo.counselor_name"/>
          </el-form-item>
        </el-col>
<!--        -->
        <el-col :span="8">
          <el-form-item label="年级">
            <el-input v-model="userInfo.enrollment_year" />
          </el-form-item>
          <el-form-item label="专业方向">
            <el-input />
          </el-form-item>
          <el-form-item label="培养层次">
            <el-input v-model="userInfo.training_level"/>
          </el-form-item>
          <el-form-item label="是否在校">
            <el-input v-model="isAtSchool"/>
          </el-form-item>
          <el-form-item label="辅导员联系方式">
            <el-input v-model="counselorInfo.counselor_phone"/>
          </el-form-item>
        </el-col>
<!--        -->
        <el-col :span="8">
          <el-form-item label="院系信息">
            <el-input v-model="userInfo.department" />
          </el-form-item>
          <el-form-item label="班级信息">
            <el-input v-model="userInfo.class_name"/>
          </el-form-item>
          <el-form-item label="学籍状态">
            <el-input v-model="userInfo.academic_status"/>
          </el-form-item>
          <el-form-item label="报道状态">
            <el-input v-model="userInfo.registration_status"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ref, watch} from "vue";
// 汉字转拼音
import {pinyin} from 'pinyin-pro'
defineOptions({
  name: 'infoCard',
})
const root = ref(true)
const stuInfoStore = useStuInfoStore()
const RoleType ={
  student:"学号",
  counselor:"工号",
}

const userInfo = stuInfoStore.stuInfo;
const counselorInfo = stuInfoStore.counselorInfo;
const isAtSchool = userInfo.is_at_school?"在校":"走读"
const nameToPinyin = pinyin(userInfo.username,{toneType:'none'})
watch(root,()=>{
  console.log('root change',userInfo)
})

const roleType =RoleType[userInfo.role_type as keyof typeof RoleType]
</script>


<style scoped lang="scss">

:deep(.el-input__inner){
  width: 240px;
}
:deep(.el-input) {
  width: 240px;
}


</style>
