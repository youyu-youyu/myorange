import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import HomeContainer from '@/components/tabar/HomeContainer.vue'
import ProjectContainer from '@/components/tabar/ProjectContainer.vue'
import HomeSurprise from '@/components/twopage/HomeSurprise.vue'
import ShopContainer from '@/components/tabar/ShopContainer.vue'
import UserContainer from '@/components/tabar/UserContainer.vue'
import EverydaySign from '../components/twopage/EverydaySign.vue'
import BitVCin from '@/components/threepage/BitVCin.vue'
import orderInfo from '@/components/threepage/orderInfo.vue'
import BitVCon from '@/components/threepage/BitVCon.vue'
import MyAddress from '@/components/threepage/MyAddress.vue'
import AddAddress from '@/components/fourpage/AddAddress.vue'
import BitVC from '@/components/twopage/BitVC.vue'
import CoinRecord from '@/components/twopage/CoinRecord.vue'
import BitRecord from '@/components/twopage/BitRecord.vue'
import GiftRecord from '@/components/twopage/ProjectRecord.vue'
import MyOrder from '@/components/twopage/MyOrder.vue'
import ShopRecord from '@/components/twopage/ShopRecord.vue'
import TicketRecord from '@/components/twopage/TicketRecord.vue'
import Discount from '@/components/twopage/Discount.vue'
import HomeLocation from '@/components/twopage/HomeLocation.vue'
import ShopCarDetail from '@/components/twopage/ShopCarDetail.vue'
import ProjectBag from '@/components/twopage/ProjectBag.vue'
import ReCharge from '@/components/twopage/ReCharge.vue'
import ProjectTicketsBag from "@/components/twopage/ProjectTicketBag";

Vue.use(Router)
Vue.use(Vuex)
export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      name: 'HomeContainer',
      component: HomeContainer,
      meta: {showTabbar: true}
    },
    {
      path: '/homesurprise',
      name: 'HomeSurprise',
      component: HomeSurprise

    },
    {
      path: '/project',
      name: 'ProjectContainer',
      component: ProjectContainer,
      meta: {showTabbar: true}
    },
    {
      path: '/shop',
      name: 'ShopContainer',
      component: ShopContainer,
      meta: {showTabbar: true}
    },
    {
      path: '/user',
      name: 'UserContainer',
      component: UserContainer,
      meta: {showTabbar: true}
    },
    {
      path: '/everydaysign',
      name: 'EverydaySign',
      component: EverydaySign,
      meta: {showTabbar: true}
    },
    {
      path: '/bitvcin',
      name: 'BitVCin',
      component: BitVCin
    },
    {
      path: '/bitvcout',
      name: 'BitVCon',
      component: BitVCon
    },
    {
      path: '/myaddress',
      name: 'MyAddress',
      component: MyAddress
    },
    {
      path: '/addaddress',
      name: 'AddAddress',
      component: AddAddress
    },

    {
      path: '/bitvc',
      name: 'BitVC',
      component: BitVC
    },
    {
      path: '/coinrecord',
      name: 'CoinRecord',
      component: CoinRecord
    },
    {
      path: '/bitrecord',
      name: 'BitRecord',
      component: BitRecord
    },
    {
      path: '/projectrecord',
      name: 'GiftRecord',
      component: GiftRecord
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/orderinfo',
      name: 'orderInfo',
      component: orderInfo
    },
    {
      path: '/ticketrecord',
      name: 'TicketRecord',
      component: TicketRecord
    },
    {
      path: '/shoprecord',
      name: 'ShopRecord',
      component: ShopRecord
    },
    {
      path: '/discount',
      name: 'Discount',
      component: Discount
    },
    {
      path: '/homelocation',
      name: 'HomeLocation',
      component: HomeLocation
    },
    {
      path: '/shop/car/detail',
      name: 'ShopCarDetail',
      component: ShopCarDetail
    },
    {
      path: '/project/bag',
      name: 'ProjectBag',
      component: ProjectBag
    },
    {
      path: '/project/tickets/bag',
      name: 'ProjectTicketsBag',
      component: ProjectTicketsBag
    },
    {
      path: '/recharge',
      name: 'ReCharge',
      component: ReCharge
    }
  ],
  linkActiveClass: 'mui-active'//覆盖默路由高亮的类，默认的类叫router-link-active
})


// WEBPACK FOOTER //
// ./src/router/index.js
