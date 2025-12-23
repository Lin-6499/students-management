<template>
  <div class="common-layout" style="height: 100vh">
    <el-container style="height: 100vh">
      <el-aside width="180px" style="background: skyblue" class="hidden-xs-only">
        <Menu :routeList="StuInfoStore.routerList"/>
      </el-aside>
      <el-container>
        <el-header style="background: #9cbcda">
          <Head/>
        </el-header>
        <el-main class="Main main-scroll-container" >
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop :right="100" :bottom="100" target=".main-scroll-container"/>
  </div>
</template>


<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import Menu from "@/layout/Menu/index.vue"
import Head from "@/layout/Head/index.vue";
const StuInfoStore = useStuInfoStore();
</script>


<style scoped>
.Main{
  background: rgba(221, 221, 221, 0.45);
  padding: 10px;
  overflow-y: auto;
}
</style>
