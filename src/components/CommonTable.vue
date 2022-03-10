<template>
    <div class="common-table" style="height:90%">
        <!-- <p>你妈妈吗</p> -->
        <el-table :data="tableData" style="height:85%" height="900" stripe >
            <el-table-column 
                show-overflow-tooltip
                v-for="item in tableLabel" :key="item.prop"
                :label="item.label"
                :width="item.width ? item.width :125"
            >
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>   
                <el-table-column label="操作" min-width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>   
        <!-- <el-pagination
        class="pager"
        layout="prev ,pager ,next"
        :total="config.page"
        @current-change="changePage"
        :current-page="config.page"
        :page-size="20"
        ></el-pagination>  -->
        <el-pagination
        class="pager"
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
    </div> 
    
</template>
<script>
// :current-page.sync="config.page"
export default {
    name:'CommonTable',
    props: {
        tableData:Array,
        tableLabel:Array,
        config:Object
    },
    data(){
        return{

        }
    },
    methods:{
        handleEdit(row){
            this.$emit('edit',row)
        },
        handleDelete(row){
            this.$emit('del',row)
        },
        changePage(page){
            this.$emit('changepage',page)
        }
        
    }
}
</script>
<style lang="less" scoped>
    .common-table{
        // height: calc(100%-62px);
        background-color:#fff ;
        position: relative;
        .pager{
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
</style>
