<template>
  <el-table :data="grades">
    <el-table-column label="学年学期" prop="semester"/>
    <el-table-column label="课程" prop="course_name"/>
    <el-table-column label="课程学分" prop="course_credits"/>
    <!--      <el-table-column label="课程性质"/>-->
    <el-table-column label="综合成绩" prop="score"/>
    <el-table-column label="获得学分" prop="earned_credit"/>
    <el-table-column label="是否补考" prop="nature"/>
  </el-table>
</template>
<script setup lang="ts">
  defineOptions({
    name:"TableCard",
  })
  defineProps(['grades'])
</script>


<style scoped>

</style>
