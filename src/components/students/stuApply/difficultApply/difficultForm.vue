<template>
  <el-card class="difficult" v-if="isDifficult">
    <template #header>
      <div style="display: flex;align-content: center;justify-content: center;">
        <span style="font-weight: bold;font-size: large">贫困申请表</span>
      </div>
    </template>
    <el-form label-width="auto" :model="form" @submit.prevent="submitForm" :rules="rules">
      <el-form-item label="学号" >
        <el-input :placeholder="user_id" disabled/>
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input :placeholder="real_name" disabled/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input :placeholder="gender" disabled/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input :placeholder="birth_date.split('T')[0]" disabled/>
      </el-form-item>
      <el-form-item label="身份证件号">
        <el-input :placeholder="id_card_no" disabled/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input :placeholder="phone" disabled/>
      </el-form-item>
      <el-form-item label="家庭收入" prop="income">
        <el-input v-model="form.income"/>
      </el-form-item>
      <el-form-item label="困难情况说明" prop="description">
        <el-input
          type="textarea"
          maxlength="300"
          show-word-limit
          style="width: 400px"
          :autosize="{minRows:4,maxRows:6}"
          v-model="form.description"
        />
      </el-form-item>
      <el-form-item label="上传证明材料">
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :show-file-list="true"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-change="handleFileChange"
          :limit="maxLimit"
          drag
        >
          <icon-svg name="plus" width="25" height="25"/>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img style="object-fit: contain;max-width: 100%;max-height:100%" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-button type="primary" native-type="submit" style="margin-left: 10px">提交</el-button>
    </el-form>
    <template #footer><span style="color: red;font-size: 13px">*以上信息我们将严格保密</span></template>
  </el-card>
  <difficultSteps :data="difficultData" v-if="!isDifficult" style="display: flex;justify-content: center;"/>
</template>
<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ref, reactive,onBeforeMount} from "vue";
import IconSvg from "@/access/svg.vue";
import {ElMessageBox,ElMessage, type UploadUserFile} from "element-plus";
import request from "@/utils/request.ts";
import {validateIncome,validateDescription} from "@/components/students/stuApply/difficultApply/formRules.ts";
import {studentsAPI} from "@/api/studentsAPI";
import DifficultSteps from "@/components/students/stuApply/difficultApply/difficultSteps.vue";
defineOptions({
  name:"Dform"
})
const isDifficult = ref<boolean>(true);
const rules = reactive({
  income: [
    { required: true, message: '请输入家庭年收入', trigger: 'blur' },
    { validator: validateIncome, trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入申请理由', trigger: 'blur' },
    { validator: validateDescription, trigger: 'blur' }
  ]
})
const form = reactive({
  income:"",
  description:"",
})
interface difficultData {
  id:number,
  student_id:string,
  family_income:string,
  description:string,
  proof_files:string,
  status:number,
  reviewer_id:number,
  reviewer_at:string,
  created_at:string,
  updated_at:string
}
const maxLimit = ref(3);
const fileList = ref<UploadUserFile[]>([])
const {stuInfo} = useStuInfoStore();
const {user_id,real_name,gender,birth_date,id_card_no,phone} = stuInfo.userInfo
const dialogVisible = ref(false);
const dialogImageUrl = ref<string>("");
const difficultData = ref<difficultData>()
onBeforeMount(() => {
  cardChange()
})
const cardChange = async () => {
  const result = await studentsAPI.requestGetDifficulty()
  if(result.result === null){
    return
  }
  difficultData.value = result.result
  isDifficult.value=false
}

const handlePictureCardPreview=(uploadFile:UploadUserFile)=>{
  dialogImageUrl.value = uploadFile.url || ''
  dialogVisible.value = true
}

const handleFileChange = (_: any, uploadFiles: UploadUserFile[]) => {
  const processed = uploadFiles.map(file => {
    if (file.status === 'ready' && !file.url && file.raw) {
      return { ...file, url: URL.createObjectURL(file.raw) }
    }
    return file
  })
  if (processed.length > maxLimit.value-1) {
    ElMessageBox.confirm(`最多上传 ${maxLimit.value} 个文件`,{
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    fileList.value = processed.slice(0, maxLimit.value) // 截断
    // 释放多余文件内存...
  } else {
    fileList.value = processed
  }
  console.log('fileList', fileList.value)
}
const submitForm = async () => {
  const formData = new FormData();
  formData.append('income', form.income);
  formData.append('description', form.description);
  fileList.value.forEach((item) => {
    if (item.raw){
      formData.append('files', item.raw);
    }
  })
  try {
    const res:any = await request.post("/students/apply/difficult", formData);
    ElMessage.success(res.message)
    await cardChange()
  }catch(err) {
    ElMessage.error(err.message);
  }
}
</script>
<style scoped>
:deep(.el-input){
  width:300px;
}
:deep(.el-upload-dragger){
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.difficult{
  box-shadow: 0 0 5px #5e5b5b;
  border-radius: 10px;
}

</style>
