import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'


Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        name:'VueMain',
        component:()=>import('../views/Main.vue'),
        children:[
            {
                path:'/home',
                name:'VueHome',
                component:()=>import('../views/home')
            },
            {
                path:'/user',
                name:'VueUser',
                component:()=>import('../views/User')
            },
            {
                path:'/mall',
                name:'mall',
                component:()=>import('../views/mall')
            },
            {
                path:'/page1',
                name:'page1',
                component:()=>import('../views/other/pageOne.vue')
            },
            {
                path:'/page2',
                name:'page2',
                component:()=>import('../views/other/pageTwo.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'VueLogin',
        component:()=>import('../views/login/login.vue')
    }
]
const router=new VueRouter({
    mode:'history',
    routes

})
export default router