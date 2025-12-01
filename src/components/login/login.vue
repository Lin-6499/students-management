<template>
  <div class="login-main">
    <el-row>
      <el-col :span="12" :xs="0" class="login-log"></el-col>
      <el-col :span="12" :xs="24" >
        <el-form class="login-form">
          <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="账号登陆" name="account">
              <Account/>
            </el-tab-pane>
            <el-tab-pane label="扫码登陆" name="second">
              <img src="@/access/createqr.jfif" style="margin:10px 40px">
            </el-tab-pane>
            <el-tab-pane label="统一认证" name="third"></el-tab-pane>
          </el-tabs>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from "vue";
import Account from "@/components/login/Item/account.vue";

const activeName = ref("account")
</script>
<style scoped>
.login-main {
  width: 100vw;
  height: 100vh;
  background: url("@/access/kdback.png") no-repeat;
  background-position: 0 20vh;
  background-size: 100% 50vh;
}
.login-log {
  height: 100vh;

}
.login-form {
  position: relative;
  width: 60%;
  padding: 50px;
  top: 20vh;
  left: 10vw;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 2px 2px rgba(71, 255, 240, 0.81);

  h1{
    font-size: 20px;
    margin: 20px;
  }
}

</style>
