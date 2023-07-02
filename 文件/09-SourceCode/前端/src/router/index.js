// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main_Page from '@/components/MainPage'
import User_Login from "@/components/UserLogin"
import User_Page from "@/Pages/UserPage"
import Users from "@/components/User/Users.vue"
import Welcome from '@/components/Welcome.vue'
import PayInfo from "@/components/User/PayInfo.vue"
import PayMain from "@/components/User/PayMain.vue"
import PayMain1 from "@/components/User/PayMain1.vue"
import SelectSit from "@/components/User/SelectSit.vue"
import Trains from "@/components/User/Trains.vue"
import Man_seat from "@/components/User/man_seat.vue"
import Man_platform from "@/components/User/man_platform.vue"
import PayAll from "@/components/User/PayAll.vue"
import PayingOrder from "@/components/User/PayingOrder.vue"
import PayedOrder from "@/components/User/PayedOrder.vue"
import InvalidOrder from "@/components/User/InvalidOrder.vue"
import UserMain from "@/components/User/UserMain.vue"
import UserMessage from "@/components/User/UserMessage.vue"
import Message from "@/components/User/Message.vue"
import Recharge from "@/components/User/Recharge.vue"
import a from "@/components/User/a.vue"
import test from "@/components/test.vue"
import traininf from "@/components/train/traininf.vue"
import traininf1 from "@/components/train/traininf1.vue"
import trainlist from "@/components/train/trainlist.vue"
import trainlist1 from "@/components/train/trainlist1.vue"
Vue.use(VueRouter)
const routes = [
  
  { path: '/MainPage', component: Main_Page },
  { path: '/UserLogin', component: User_Login },
  { path: '/trainlist', component: trainlist },
  { path: '/trainlist1', component: trainlist1 },
  { path: '/traininf', component: traininf },
  { path: '/traininf1', component: traininf1 },
  {path: '/UserPage',
  component:User_Page,
  redirect: '/welcome',
  children: [
    {path:'/welcome',component:Welcome},
  {path:'/users',component:Users},
  {path:'/trains',component:Trains},
  {path:"/manseats",component:Man_seat},
  {path:"/manplatform",component:Man_platform}
]
  },
  {
    path:'/payinfo',component:PayInfo
  },
  {
    path:'/paymain',component:PayMain
  },
  {
    path:'/a',component:a
  },
  {
    path:'/paymain1',component:PayMain1
  },
  {
    path:'/selectsit',component:SelectSit
  },
  {
    path:'/payall',component:PayAll,
    children: [
      {path:'/payingorder',component:PayingOrder},
      {path:'/payedorder',component:PayedOrder},
      {path:'/usermain',component:UserMain},
      {path:'/usermessage',component:UserMessage},
      {path:'/message',component:Message},
      {path:'/recharge',component:Recharge},
      {path:'/invalidorder',component:InvalidOrder}      
  ]
  },
  {
    path:'/test',component:test
  }
  
  
];

const router = new VueRouter({
  routes
});


export default router;
