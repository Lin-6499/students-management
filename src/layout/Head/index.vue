<template>
  <div class="setting">
    <el-button type="default" style="border-radius: 10px" @click="logout">
    <icon-svg name="layout" width="20px" height="20px" />
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ArrowDown} from "@element-plus/icons-vue";
import IconSvg from "@/access/svg.vue";

const stuInfoStore = useStuInfoStore();
const {userLogout} = stuInfoStore
const logout = async () =>{
  await userLogout();
}
</script>

<style scoped>
.setting{
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
}
</style>
