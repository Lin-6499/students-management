<template>
  <div class="setting">
    <el-button type="default" style="border-radius: 10px">
    <icon-svg name="layout" width="20px" height="20px" @click="userLogout"/>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {ArrowDown} from "@element-plus/icons-vue";
import IconSvg from "@/access/svg.vue";

const stuInfoStore = useStuInfoStore();
const {stuInfo,userLogout} = stuInfoStore
</script>

<style scoped>
.setting{
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
}
</style>
