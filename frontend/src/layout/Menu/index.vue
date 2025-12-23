<template>
  <div class="stu-title">
    <el-row style="width: 100%">
      <el-col :span="10" class="avatar-title">
        <el-avatar size="small" fit="cover" :src="avatar" style="width: 50px;height: 50px">
        </el-avatar>
      </el-col>
      <el-col :span="14" class="info-title">
        <el-row :span="6" style="min-height:30px">
          <span style="display:flex;align-items: flex-end">{{real_name}}</span>
        </el-row>
        <el-row :span="6" style="min-height:30px">
          <span style="display: flex;align-items: center">{{user_id}}</span>
        </el-row>
      </el-col>
    </el-row>
  </div>

  <el-menu :default-active="route.path">
    <List :routeList="routeList"/>
  </el-menu>


</template>


<script setup lang="ts">
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
import {useRouter,useRoute} from "vue-router";
import List from './List.vue'
defineOptions({
  name: "Menu",
})
defineProps(['routeList'])
const route = useRoute();
const useStuInfo = useStuInfoStore();
const {real_name,avatar,user_id} = useStuInfo.stuInfo.userInfo

</script>


<style scoped>
.stu-title{
  height: 80px;
  align-content: center;
  padding: 0 10px;
  *{
    width: 100%;
  }
  .info-title{

    span{
      font-size: 14px;
    }
  }
  .avatar-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}


</style>
