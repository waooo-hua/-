<template>
    <div class="manage">
        <el-dialog
         :title="operateType === 'add' ? '新增用户' : '更新用户'"
         :visible.sync="isShow"
        >
        <common-form
        :formLabel="operateFromLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
        v-on:spot="spot"
        > 
        </common-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm ">确定</el-button>
        </div>
        </el-dialog>
        <div class="manage-header">
          <el-button type="primary" @click="addUser">新增</el-button>
        <div>
          <el-input
        style="flex:0;width:180px"
        :placeholder="'输入姓名' "
        v-model="searchname"    
      ></el-input>
          <el-button type="primary"  @click="getListl(searchname)">搜索</el-button>
        </div>
        </div>
        <common-table
          :tableData="tableData"
          :tableLabel="tableLabel"
          :config="config"
          @changepage="getList()"
          @edit="editUser"
          @del="delUser"
          >
        </common-table>
    </div>
</template>
<script>
import CommonForm from '../../src/components/CommonForm.vue'
import CommonTable from '../../src/components/CommonTable.vue'
import { getUser } from '../../api/data.js'
export default {
  name: 'VueUser',
  components:{
    CommonForm,
    CommonTable 
  },
  data() {
      return {
        searchname:'',
        arrobj:{
          name:''
        },
        operateType:'add',
        isShow:false,
        fromLabel:[
            {
            model:'keyword',
            label:'',
            type:'input'
          },   
        ],
        searchForm:{
          keyword:''
        },
        operateFromLabel:[
          {
            model:'name',
            label:'姓名',
            type:'input'
          },
           {
            model:'age',
            label:'年龄',
            type:'input'
          },
           {
            model:'sex',
            label:'性别',
            type:'select',
            opts:[
              {
                label:'男',
                value:1
              },
              {
                label:'女',
                value:0
              }
            ]
          },
          {
            model:'birth',
            label:'出生日期',
            type:'date'
          },
          {
            model:'addr',
            label:'地址',
            type:'input'
          },

                  ],
        operateForm:{
            name:'',
            addr:'',
            age:'',
            birth:'',
            sex:''
        },
        tableData:[],
        tableLabel:[
          {
          prop:"name",
          label:"姓名"
          },
          {
          prop:"age",
          label:"年龄"
          },
          {
          prop:"sexLabel",
          label:"性别"
          },
          {
          prop:"birth",
          label:"出生日期",
          width:200
          },
          {
          prop:"addr",
          label:"地址",
          width:320
          },
        ],
        config:{
          page:2,
          total:30
        }
      }
  },
  methods:{
    delUser(row){
      this.$confirm("此操作将永久删除该文件,是否继续?","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        const id=row.id
        this.$http.post("/user/del",{
          params:{ id }
        }).then(()=>{
          this.$message({
            type:'success',
            message:'删除成功'
          })
        }).then(()=>{
          const mockList=this.tableData
          this.tableData = mockList.filter(user => {
          if (row.name === user.name) return false
          return true })
          // this.getList()
        })
      })
      // console.log("RRRRRow",row)
    },
    editUser(row){
      console.log("RRRRRRRRRRow",row)
      this.operateType= 'edit'
      this.operateForm=row
      // this.$forceUpdate
      this.isShow=true
      console.log(this.operateForm,"op")
    },
    confirm(){
      if(this.operateType === 'add'){
        this.$http.post('/user/add',this.operateForm).then(res=>{
          console.log(res)
          this.isShow=false
          this.getList()
        })
      }
      else if(this.operateType === 'update'){
        this.$http.post('/user/update',this.operateForm).then(res=>{
          console.log("成功的res",res.data)
          this.getList()
          this.isShow=false
          this.$message({
            type:'success',
            message:'修改成功'
          })
        })
        // this.isShow=false
      }
       this.isShow=false
    },
    addUser(){
        this.isShow = true
        this.operateType = 'add',
        this.operateForm={
            name:'',
            addr:'',
            age:'',
            birth:'',
            sex:''
        }
    },
    spot(data){
      this.operateForm=data;
      console.log(data);
    },
    getList(name ) {
      console.log(name)
      this.config.loading=true;
      // name = name ? nmae?'' 
      // name ? (this.confirm.page =1) : ''
      // name=!name ? name : ''
      // if(name === '')
      // {
        getUser({
          name
        }).then(res => {
        console.log("成功")
        console.log(res.list,"res")
        this.tableData=res.list.map(item => {
          item.sexLabel=item.sex === 0? "女":"男";
          return item;
        });
        console.log(this.tableData)
        this.config.total=res.count;
        this.config.loading=false;
        // this.isShow="true"
      });
      
    },
    getListl(name){
    if(name === '') this.getList();
    else 
    {
    const mockList=this.tableData
    this.tableData = mockList.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    }
    }
  },
  created(){
    this.getList()
  }
};
</script>
<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
