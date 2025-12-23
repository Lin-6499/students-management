<template>
  <div>
    <router-view v-slot="{Component}">
<!--      <el-backtop :right="100" :bottom="100" />-->
      <transition name="fade" mode="out-in">
        <component :is="Component" v-if="flag"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from 'vue'
import {useStuInfoStore} from "@/stores/useStuInfoStore.ts";
defineOptions({
  name:'Main'
})
const stuInfoStore = useStuInfoStore()

const flag = ref(false)
watch(()=>stuInfoStore.refresh,()=>{
  flag.value=false
  nextTick(()=>{
    flag.value=true
  })
})
</script>


<style scoped>

</style>
