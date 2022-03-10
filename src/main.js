import Vue from 'vue'
import App from './App.vue'
// Vue.forceUpdate();
import {
  Button,
  Radio, Container, Main, Header, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, 
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router'
import './css/index.less'
import store from '../src/store'
import http from 'axios'
import '../api/mock.js'
Vue.config.productionTip = false
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
// Vue.use(MessageBox)
router.beforeEach((to,from,next)=>{
  store.commit('user/getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'VueLogin'){
    next({name : 'VueLogin'})
  }else{
    next()
  }
})
Vue.prototype.$http = http
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
