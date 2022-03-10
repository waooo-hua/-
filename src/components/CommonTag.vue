<template>
    <div class="tab" style="padding:15px">
        <el-tag size="small" v-for="(tag,index) in tags" :key="tag.name" :closable="tag.path !== '/home' "
        style="margin-right:15px;cursor:pointer;"
        :effect="$route.path === tag.path ? 'dark' : 'plaun'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)">
        {{tag.label}}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default{
    name:'CommonTag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    },
    methods:{
        ...mapMutations({
            close:'closeTag'
        }),
        changeMenu(item){
            this.$router.push({path: item.path})
        },
        handleClose(tag,index){
            // let len=this = this.tags.length - 1
            if(tag.path !== this.$route.path){
                return;
            }
            if(index === this.tags.length - 1){
                this.$router.push({
                    path:this.tags[this.tags.length - 1 -1].path
                })
            }else{
                this.$router.push({
                    path:this.tags[this.tags.length - 1].path
                })
            }
            this.close(tag);
        },

    }
}
</script>
<style  scoped>
/* .tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
} */
</style>
