import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

// import HomeContainer from '@/components/tabar/HomeContainer.vue'
// const HomeContainer = ()=>import("@/components/tabar/HomeContainer.vue")
// const ProjectContainer = ()=>import("@/components/tabar/ProjectContainer.vue")
// const HomeSurprise = ()=>import("@/components/twopage/HomeSurprise.vue")
// // import ProjectContainer from '@/components/tabar/ProjectContainer.vue'
// // import HomeSurprise from '@/components/twopage/HomeSurprise.vue'
// import ShopContainer from '@/components/tabar/ShopContainer.vue'
// import UserContainer from '@/components/tabar/UserContainer.vue'
// import EverydaySign from '../components/twopage/EverydaySign.vue'
// import BitVCin from '@/components/threepage/BitVCin.vue'
// import orderInfo from '@/components/threepage/orderInfo.vue'
// import BitVCon from '@/components/threepage/BitVCon.vue'
// import MyAddress from '@/components/threepage/MyAddress.vue'
// import AddAddress from '@/components/fourpage/AddAddress.vue'
// import BitVC from '@/components/twopage/BitVC.vue'
// import CoinRecord from '@/components/twopage/CoinRecord.vue'
// import BitRecord from '@/components/twopage/BitRecord.vue'
// import GiftRecord from '@/components/twopage/ProjectRecord.vue'
// import MyOrder from '@/components/twopage/MyOrder.vue'
// import ShopRecord from '@/components/twopage/ShopRecord.vue'
// import TicketRecord from '@/components/twopage/TicketRecord.vue'
// import Discount from '@/components/twopage/Discount.vue'
// import HomeLocation from '@/components/twopage/HomeLocation.vue'
// import ShopCarDetail from '@/components/twopage/ShopCarDetail.vue'
// import ProjectBag from '@/components/twopage/ProjectBag.vue'
// import ReCharge from '@/components/twopage/ReCharge.vue'
// import ProjectTicketsBag from "@/components/twopage/ProjectTicketBag";

Vue.use(Router)
Vue.use(Vuex)
// Vue.component('mideaHeader', () => {
//
//   System.import('./component/header/header.vue')
//
// })
export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      name: 'HomeContainer',
      component: resolve => require(['@/components/tabar/HomeContainer.vue'], resolve),//懒加载
      meta: {showTabbar: true}
    },
    {
      path: '/homesurprise',
      name: 'HomeSurprise',
      component: resolve => require(['@/components/twopage/HomeSurprise.vue'], resolve),//懒加载

    },
    {
      path: '/project',
      name: 'ProjectContainer',
      component: resolve => require(['@/components/tabar/ProjectContainer.vue'], resolve),//懒加载
      meta: {showTabbar: true}
    },
    {
      path: '/shop',
      name: 'ShopContainer',
      component: resolve => require(['@/components/tabar/ShopContainer.vue'], resolve),//懒加载
      meta: {showTabbar: true}
    },
    {
      path: '/user',
      name: 'UserContainer',
      component: resolve => require(['@/components/tabar/UserContainer.vue'], resolve),//懒加载
      meta: {showTabbar: true}
    },
    {
      path: '/everydaysign',
      name: 'EverydaySign',
      component: resolve => require(['../components/twopage/EverydaySign.vue'], resolve),//懒加载
      meta: {showTabbar: true}
    },
    {
      path: '/bitvcin',
      name: 'BitVCin',
      component: resolve => require(['@/components/threepage/BitVCin.vue'], resolve),//懒加载
    },
    {
      path: '/bitvcout',
      name: 'BitVCon',
      component: resolve => require(['@/components/threepage/BitVCon.vue'], resolve),//懒加载
    },
    {
      path: '/myaddress',
      name: 'MyAddress',
      component: resolve => require(['@/components/threepage/MyAddress.vue'], resolve),//懒加载
    },
    {
      path: '/addaddress',
      name: 'AddAddress',
      component: resolve => require(['@/components/fourpage/AddAddress.vue'], resolve),//懒加载
    },

    {
      path: '/bitvc',
      name: 'BitVC',
      component: resolve => require(['@/components/twopage/BitVC.vue'], resolve),//懒加载
    },
    {
      path: '/coinrecord',
      name: 'CoinRecord',
      component: resolve => require(['@/components/twopage/CoinRecord.vue'], resolve),//懒加载
    },
    {
      path: '/bitrecord',
      name: 'BitRecord',
      component: resolve => require(['@/components/twopage/BitRecord.vue'], resolve),//懒加载
    },
    {
      path: '/projectrecord',
      name: 'GiftRecord',
      component: resolve => require(['@/components/twopage/ProjectRecord.vue'], resolve),//懒加载
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: resolve => require(['@/components/twopage/MyOrder.vue'], resolve),//懒加载
    },
    {
      path: '/orderinfo',
      name: 'orderInfo',
      component: resolve => require(['@/components/threepage/orderInfo.vue'], resolve),//懒加载
    },
    {
      path: '/ticketrecord',
      name: 'TicketRecord',
      component: resolve => require(['@/components/twopage/TicketRecord.vue'], resolve),//懒加载
    },
    {
      path: '/shoprecord',
      name: 'ShopRecord',
      component: resolve => require(['@/components/twopage/ShopRecord.vue'], resolve),//懒加载
    },
    {
      path: '/discount',
      name: 'Discount',
      component: resolve => require(['@/components/twopage/Discount.vue'], resolve),//懒加载
    },
    {
      path: '/homelocation',
      name: 'HomeLocation',
      component: resolve => require(['@/components/twopage/HomeLocation.vue'], resolve),//懒加载
    },
    {
      path: '/shop/car/detail',
      name: 'ShopCarDetail',
      component: resolve => require(['@/components/twopage/ShopCarDetail.vue'], resolve),//懒加载

    },
    {
      path: '/project/bag',
      name: 'ProjectBag',
      component: resolve => require(['@/components/twopage/ProjectBag.vue'], resolve),//懒加载
    },
    {
      path: '/project/tickets/bag',
      name: 'ProjectTicketsBag',
      component: resolve => require(['@/components/twopage/ProjectTicketBag'], resolve),//懒加载
    },
    {
      path: '/recharge',
      name: 'ReCharge',
      component: resolve => require(['@/components/twopage/ReCharge.vue'], resolve),//懒加载
    }
  ],
  linkActiveClass: 'mui-active'//覆盖默路由高亮的类，默认的类叫router-link-active
})


// WEBPACK FOOTER //
// ./src/router/index.js
