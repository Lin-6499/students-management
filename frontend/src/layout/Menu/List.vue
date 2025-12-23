<template>

    <template v-for="item in routeList" :key="item.path">
      <!--  没有子路由   -->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="toRouter">
          <template #title>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>
      <!--   有且只有一个子路由   -->
      <template v-if="item.children&&item.children.length==1">
        <el-menu-item v-if="item.children[0]&&!item.children[0].meta.hidden" :index="item.children[0].path " @click="toRouter">
          <template #title>
            <span>{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>
      </template>
      <!--   不止一个子路由且个数不为一   -->
      <el-sub-menu v-if="item.children&&item.children.length>1" :index="item.path">
        <template #title>
          <span>{{item.meta.title}}</span>
        </template>
        <List :routeList="item.children"/>
      </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import {useRouter,useRoute} from "vue-router";
defineOptions({
  name:'List'
})
let router = useRouter();
const toRouter = (vc:any)=>{
  console.log('vc',vc)
  router.push(vc.index)
}
const {routeList}=defineProps(['routeList'])
console.log('List.vue 收到的 routeList:', routeList)
</script>

<style scoped>

</style>
