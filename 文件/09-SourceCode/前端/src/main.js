// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from './store'
import axios from 'axios'
import '@/mock/mock.js'
import './assets/css/global.css'
import ElementuI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWeixin, faQq, faWeibo, faAlipay } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { MessageBox } from 'element-ui'
library.add(faWeixin, faQq, faWeibo, faAlipay, faUser, faLock, faEnvelope);

Vue.config.productionTip = false
Vue.use(ElementuI)
Vue.prototype.$confirm = MessageBox.confirm


router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来的
  // next 是一个函数，表示放行
  // next() 放行  next('/login) 强制跳转到登录页
  // 如果用户访问的是登录页，直接放行

console.log(from);
console.log(to.path);
  // 从sessionStorage中获取保存的token值
  //const tokenStr = router.$store.state.loginstatus;
  console.log(store.state.loginstatus);
  const tokenStr = store.state.loginstatus;
  console.log(tokenStr);
  if (to.path === '/UserLogin'||to.path==='/a') return next()
  //else if (to.path === '/MainPage') return next()
  else{
  if(tokenStr==3){
    
    if(to.path==='/users'||to.path==='/trains'||to.path==='/manseats'||to.path==='/manplatform'){
     
      return next('/UserLogin')
    }
    else{
      return next()
    }
  }
  else if(tokenStr==6){
    console.log(1);
    if(to.path==='/users'){
      return next()
    }
    else{
      return next('/UserLogin')
    }
  }
  else if(tokenStr==9){
    if(to.path==='/trains'||to.path==='/manseats'||to.path==='/manplatform'){
      return next()
    }
    else{
      return next('/UserLogin')
    }
  }
  // 如果token的值不存在，强制跳转到登录页
  else if (!tokenStr){
    if(to.path==='/MainPage'){
      return next()
    }
    else{
      return next('/UserLogin')
    }
  } 
}
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  FontAwesomeIcon,
  render: h => h(App),
  store,
  components: { App },
  template: '<App/>'
})
