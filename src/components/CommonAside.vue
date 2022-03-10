<template>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo " text-color="#fff"  background-color="rgb(58, 58, 58)" active-text-color="#ffd04b"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <h3 style="">{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
  <el-menu-item @click="clickMenu(item)" class="hav" v-for="item in noChildren" :index="item.path" :key="item.path">
    <i :class="'el-icon-'+item.icon"></i>
    <span slot="title">{{item.label}}</span>
  </el-menu-item>
  <el-submenu  class="hav" v-for="item in hasChildren" :index="item.path" :key="item.path">
    <template slot="title">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </template>
    <el-menu-item-group v-for="(it,index) in item.children"  :key="it.path">
      <el-menu-item @click="clickMenu(it)" :index="index" class="el-menu1">{{it.label}}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>
<style lang="less" scoped>
   .el-menu{
       background-color: rgb(58, 58, 58);

   }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
      height: 100%;
      border: none;
      h3{
          color: rgb(190, 181, 181) !important;
          text-align:center;
          line-height:48px;
      }
  }
  .el-menu1{
    color: rgb(184 93 93) !important;
  }
</style>
<style scoped>
    .hav:hover{
        background-color: darkgrey;
    }
</style>
<script>
  export default {
    data() {
      return {
        menu:[
            {
                path:'/home',
                name:'VueHome',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
            {
                path:'/mall',
                name:'mall',
                label:'商品管理',
                icon:'video-play',
                url:'MallManage/MallManage'
            },
            {
                path:'/user',
                name:'VueUser',
                label:'用户管理',
                icon:'user',
                url:'UserManage/UserManage'
            },
            {
                label:'其他',
                icon:'location',
                children:[
                    {
                        path:'/page1',
                        name:'page1',
                        label:'页面1',
                        icon:'setting',
                        url:'Other/PageOne'
                    },
                    {
                        path:'/page2',
                        name:'page2',
                        label:'页面2',
                        icon:'setting',
                        url:'Other/PageTwo'
                    }
                ]
            }

        ]
      };
    },  
    computed:{
        noChildren(){
            return this.menu.filter(item=>!item.children)
        },
        hasChildren(){
            return this.menu.filter(item=>item.children)
        },
        isCollapse(){
        return this.$store.state.tab.isCollapse
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
          this.$router.push({
              name:item.name
          })
          this.$store.commit('selectMenu',item)
      }
    }
  }
</script>