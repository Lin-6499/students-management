<template>
  <el-form-item>
    <el-input type="text"  placeholder="用户名" v-model="defaultAccount.username" prefix-icon="User"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input type="password" placeholder="密码" v-model="defaultAccount.password" prefix-icon="Lock" show-password></el-input>
  </el-form-item>
  <el-form-item class="login-btn">
    <el-button type="primary" :loading="isLoading" @click="login">登陆</el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ElMessage, ElNotification} from "element-plus";
import {useRouter,useRoute} from "vue-router";
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const StuInfoStore = useStuInfoStore();
const defaultAccount = reactive({
  username: "zhaoyu",
  password: "111111"
})
const login = async ()=>{
  isLoading.value = true;
  try {
    await StuInfoStore.userLogin(defaultAccount);
    isLoading.value = false;
    let redirect: any = route.query.redirect;
    await router.push({path: redirect || '/'});
    ElNotification.success({
      title:"登陆成功！",
      message:`欢迎回来${StuInfoStore.stuInfo.userInfo.real_name}`
    })
  }catch(err){
    console.log("err",err)
    ElMessage.error(err)
  }
  isLoading.value = false;
}
</script>


<style scoped>
button{
  margin: 5px;
  width: 100%;
}
</style>
