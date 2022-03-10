<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline" >
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label" >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="operateForm[item.model]"
        @change="changename"
        
      >{{form.name}}</el-input>
      <el-switch v-if="item.type === 'switch'" v-model="operateForm[item.model]" @change="changename"></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="operateForm[item.model]"
        @change="changename"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="operateForm[item.model]"
        @change="changename"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.val"
          :label="item.label"
          :value="item.value"
          @change="changename"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form:Object,
    inline: Boolean
  },

  data() {
    return{
      
      // operateForm:{
      //       name:'',
      //       addr:'',
      //       age:'',
      //       birth:'',
      //       sex:''
      //   },
      operateForm:this.form
    }
  },
  watch:{
      operateForm(val){
        this.$emit("spot",val)
      },
      form(val){
        this.operateForm=val
      }
    },
  methods:{
    changename(){
      // this.operateForm=this.props.form
      this.$emit("spot",this.operateForm)
    }
    // created() {
    //   this.operateForm=this.props.form
    //   this.componentKey+=1;
    // },
  }
};
</script>
