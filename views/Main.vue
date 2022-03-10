<template>
    <!-- <div>我是Home页面</div> -->
    <el-container style="height:100%">
  <el-aside width="auto">
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header>
      <common-header />
    </el-header>
    <common-tag></common-tag>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
// import CommonTag from '../src/components/CommonTag.vue'
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'
import CommonTag from '../src/components/CommonTag.vue';
export default {
  name: 'VueHome',
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data() {
      return {}
  }
};
</script>
<style land="less" scoped>
  .el-header{
    background-color: black;
  }
  .el-main{
    padding-top: 0;
  }
</style>
