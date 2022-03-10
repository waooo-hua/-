<template>
    <header class="header">
        <div class="l-item">
        <el-button plain icon="el-icon-menu" size="mini" class="elb" @click="handleMenu"></el-button>    
        <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path:item.path }">{{item.label}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>
        <div class="">
            <el-dropdown trigger="click" size="mini">
                <div class="gr">
                    <img :src="userImage" alt="" class="user" >
                </div>
                  <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                 </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<style  scoped>
    /* h3{
        margin-left: 5px;
       float: left; 
    }
    .elb{
        float: left;
        margin-top: 18px;
    }
    .gr{
        margin-left: 200px;
        right: 0px;
        top: 20px;
        
    } */
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-item{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .elb{
        margin-right: 30px;
        height: 30px;
        
    }
    .user{
        width: 30px;
        border-radius: 50%;
    }
</style>
<script>

import { mapState } from 'vuex'
export default {
    name:'CommonHeader',
    data(){
        return {
            userImage:require('../assets/image/user1.png')
        }
    }   ,
    methods:{
        handleMenu(){
            this.$store.commit('CollapseMenu')
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    }
}
</script>
