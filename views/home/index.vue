<template>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card class="box-card" shadow="hover">
          <div  class="user">
            <div class="imgdiv"><img  class="menuimg" img :src="userImage" style="width:100px;height:100px"/></div>
            <div class="userinfo">
              <p class="name">HYC</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info" >
            <p>上次登录时间:<span style="margin-left:20px" >{{nowdarintime}}</span></p>
            <p>上次地点:<span style="margin-left:50px" >{{nowlocation}}</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px ; height:460px"  shadow="hover">
            <div v-for="item in tableLabel" :key="item" class="divin">{{item}} </div>
            <div v-for="item in tableData1" :key="item.name" >
              <div class="divin divtwo">{{item.name}} </div>
              <div class="divin divtwo">{{item.todayBuy}} </div>
              <div class="divin divtwo">{{item.monthBuy}} </div>
              <div class="divin divtwo">{{item.totalBuy}} </div>
            </div>
        </el-card>
      </el-col>
      <el-col style="margin-top:20px" :span="16">
        <div class="num numflex" >
            <el-card v-for="item in countData" :key="item.name" :body-style="{display:flex,padding:0}" shadow="hover">
              <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
              <div class="detail">
                <p class="num">￥{{item.value}}</p>
                <p class="txt">{{item.name}}</p>
              </div>
            </el-card>
        </div>
        <el-card style="height:240px" shadow="hover">
          <div style="height:240px" ref="echarts">

          </div>
        </el-card>
        <div class="graph">
          <el-card style="height:240px" shadow="hover">
            <div style="height:240px" ref="userEchars"></div>
          </el-card>
          <el-card style="height:240px" shadow="hover">
            <div style="height:240px" ref="videoEchars"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
</template>
<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'
export default {
  name: "VueHome",
  data() {
    return {
            userImage:require('../../src/assets/image/user1.png'),
            tableData1:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableLabel:{
          name:'品牌',
          todayBuy:'近日购买',
          monthBuy:'本月购买',
          totalBuy:'总购买'
        },
        nowdatin:{
          time:'2020-03-04',
          location:'广州'
        },
        nowdarintime:'2020-03-04',
        nowlocation:'广州',
        countData: [
          {
            name: "今日支付订单",
            value:"1234" ,
            icon: "success",
            color:"#2ec7c9" 
          },
          {
            name: "今日收藏订单",
            value: "210",
            icon: "star-on",
            color:"#ffb980 " 
          },
          {
            name:"今日未支付订单" ,
            value:"1434" ,
            icon: "s-goods",
            color: "#5ab1ef"
          },
          {
            name: "本月支付订单",
            value:"1934" ,
            icon: "success",
            color:"#2ec7c9" 
          },
          {
            name: "本月收藏订单",
            value: "5210",
            icon: "star-on",
            color:"#ffb980 " 
          },
          {
            name:"本月未支付订单" ,
            value:"134" ,
            icon: "s-goods",
            color: "#5ab1ef"
          },
        ],
        }
        
  },
  mounted(){
    getData().then(res=>{
      // const { code, data } = res.data
      // console.log(code,data)
      // console.log(res.data.)
      if(res.code === 20000){
        this.tableData1=res.data.tableData
        // console.log(res.data.tableData)
        const order=res.data.orderData
        const xDate=order.date
        const keyArr=Object.keys(order.data[0])
        const series=[]
        keyArr.forEach(key=>{
          series.push({
            name:key,
            data:order.data.map(item =>item[key]),
            type:'line'
          })
        })
        const option = {
          xAxis:{
            data:xDate
          },
          yAxis:{},
          legend:{
            data:keyArr
          },
          series
        }
        console.log(option,"op")
        const E=echarts.init(this.$refs.echarts)
        E.setOption(option)
        const userOption={
          legend:{
            textStyle:{
              color:"#333", //提示颜色
            },
          },
        grid:{
          left:"20%"
        },
        tooltip:{
           trigger:"item"
        },
           xAxis:{
            type:"category",
            data:res.data.userData.map(item=>item.date),
            axisLine:{ //刻标颜色
               lineStyle:{
                 color:"#17b3a3",
               } 
            },
            axisLabel:{ //刻度标签颜色
              interval:0,
              color:"#333",
            }
          },
          yAxis:[
            {
              type:"value",
              axisLine:{
              lineStyle:{
                color:"#17b3a3"
              }
            }
            }
          ],
          color:["#2ec7c9","#b6a2de"],
          series:[
            {
              name:'新增用户',
              data:res.data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:res.data.userData.map(item=>item.active),
              type:'bar'
            }
          ],
        }
        const U = echarts.init(this.$refs.userEchars)
        U.setOption(userOption)
        // console.log(order)
      }
      //饼图
       const videooption={
          tooltip:{
            trigger:"item",
          },
          color:[
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#elbb22",
            "#39c362",
            "#3ed1cf",
          ],
          series:[
            {
              data:res.data.videoData,
              type:'pie',
                 label: {
                    normal: {
                    position: "inside"
                        }
                      }
            }
          ],
        }
        console.log("V",videooption,res)
        const V =echarts.init(this.$refs.videoEchars)
        V.setOption(videooption)
    })
  }
}
</script>
<style scoped>
      .icon{
        float: left;
      }
      .detail{
        float: left;
        height: 80px;

      }
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
      border-bottom:1px dashed #000
    }
      .menimg{
        flex: 1 1 0;
        margin-left: 70px;
        width: 150px !important;
        height: 100px !important;
      }
      .imgdiv{
        width: 100px;
        margin-left: 10px;
      }
      .userinfo{
        margin-block-end: 0em !important ;
        margin-right: 180px;
      }
      .login-info p{
        margin-top: 10px;

      }
      .divin{
        border-bottom:1px solid rgb(105, 105, 114);
        width: 85px;
        margin-bottom: 10px;
        display: inline-block;
        margin-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }
      .divtwo{
        color: black !important;
        /* margin-left: 8px; */
      }
</style>
