export default{
    state:{
        isCollapse:false, //后台展开与否
        tabList:[
            {
                path:'/home',
                name:'Vuehome',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null
    },
    mutations:{
        CollapseMenu(state){
            state.isCollapse= !state.isCollapse;
        },
        selectMenu(state,val){
            if(val.path!== '/home')
            {
                state.currentMenu = val;
                const result=state.tabList.findIndex(item=>item.name === val.name);
                if(result === -1){
                    state.tabList.push(val)
                }else{
                    state.currentMenu=null
                }
            }
        },
        closeTag(state,val){
            const result = state.tabList.findIndex(item => item.path === val.path);
            state.tabList.splice(result,1)
        }
        
    }
}