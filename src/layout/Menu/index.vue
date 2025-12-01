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
<!--  菜单列表  -->
<!--  <el-menu-->
<!--    default-active="2"-->
<!--    class="el-menu-vertical-demo"-->
<!--  >-->
<!--    <el-sub-menu index="1">-->
<!--      <template #title>-->
<!--        <span>学生申请</span>-->
<!--      </template>-->
<!--      <el-menu-item v-for="item in stuApplyList" :index="item.url" :key="'1-'+item.id" @click="toRouter">{{item.meta.title}}</el-menu-item>-->
<!--    </el-sub-menu>-->
<!--    <el-menu-item index="2">-->
<!--      <template #title>-->
<!--        <span>信息查询</span>-->
<!--      </template>-->

<!--    </el-menu-item>-->
<!--    <el-menu-item index="3" disabled>-->

<!--    </el-menu-item>-->
<!--    <el-menu-item index="4">-->

<!--    </el-menu-item>-->
<!--  </el-menu>-->

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
const {real_name,avatar,user_id} = useStuInfo.stuInfo

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
