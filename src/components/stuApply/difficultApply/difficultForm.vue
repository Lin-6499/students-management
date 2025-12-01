<template>
  <el-card class="difficult">
    <template #header>
      <div style="display: flex;align-content: center;justify-content: center;">
        <span style="font-weight: bold;font-size: large">贫困申请表</span>
      </div>
    </template>
    <el-form label-width="auto" :model="form" @submit.prevent="submitForm" :rules="rules">
      <el-form-item label="学号" >
        <el-input :placeholder="stuInfo.user_id" disabled/>
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input :placeholder="stuInfo.real_name" disabled/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input :placeholder="stuInfo.gender" disabled/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input :placeholder="stuInfo.birth_date.split('T')[0]" disabled/>
      </el-form-item>
      <el-form-item label="身份证件号">
        <el-input :placeholder="stuInfo.id_card_no" disabled/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input :placeholder="stuInfo.phone" disabled/>
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
</template>
<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ref, reactive} from "vue";
import IconSvg from "@/access/svg.vue";
import {ElMessageBox,ElMessage, type UploadUserFile} from "element-plus";
import request from "@/utils/request.ts";
import {validateIncome,validateDescription} from "@/components/stuApply/difficultApply/formRules.ts";
defineOptions({
  name:"dform"
})
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
const maxLimit = ref(3);
const fileList = ref<UploadUserFile[]>([])
// const familyIncome = ref<string>("");
// const description = ref<string>("");
const {stuInfo} = useStuInfoStore();
const dialogVisible = ref(false);
const dialogImageUrl = ref<string>("");
const checkFile = () => {
  fileList.value.forEach((item) => {
    console.log(item.name,item.raw)
  })
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
    const res:any = await request.post("/apply/difficult", formData);
    ElMessage.success(res.message)
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
