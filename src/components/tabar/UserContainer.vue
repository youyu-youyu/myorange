<template>
  <div class="UserContainer" style="
    min-height: 1100px;">
    <div class="ticket_top">
      <!--      <div class="user_top_inner">-->
      <ul class="mui-table-view">
        <li class="mui-media user_bottom">
          <router-link to="/modifyuserinfo">
            <img class="modify-img mui-pull-left" v-bind:src=userPhoto>
          </router-link>

          <div class="mui-media-body user_top_body">
            <router-link to="/modifyuserinfo">
              <div class="user-name">
                {{userName}}
              </div>
              <div class="mui-ellipsis user_left">ID：{{userId}}</div>
            </router-link>
            <div>
              <router-link to="/physicalcard">
                <button class="">实体卡</button>
              </router-link>
            </div>
          </div>
          <div class="user_top_right">
            <img src="../../assets/user/diamond.png" style="width: 10px;">
            <span style="line-height: 10px">{{rankName}}</span>
          </div>
        </li>
      </ul>
      <div class="user_top_flex">
        <div class="item">
          <p class="item1">{{parseInt(userTotalMoney)}}</p>
          <p class="item1">预存款</p>
        </div>
        <div class="item">
          <p class="item1">{{userTotalCoin}}</p>
          <p class="item1">游戏币</p>
        </div>
        <div class="item">
          <router-link to="/lotteryrecord">
            <p class="item1">{{userTotalLottery}}</p>
            <p class="item1">彩票</p>
          </router-link>
        </div>
        <div class="item item_none">
          <p class="item1">{{userTotalScore}}</p>
          <p class="item1">积分</p>
        </div>
      </div>
      <div class="user_top_bottom">
        <!--        <router-link to="/bitvc" class="item">-->
        <router-link to="" class="item">
          <div class="item_item"><img src="../../assets/user/yubi.png" style="width: 30px"></div>
          <div class="item_item user_item_txt ">余币宝</div>
          <div class="item_item user_item_txt user_item_num">0</div>
        </router-link>
        <router-link to="/discount" class="item">
          <div class="item_item item_1"><img src="../../assets/user/youxibi.png" style="width: 30px"></div>
          <div class="item_item user_item_txt ">优惠券</div>
          <div class="item_item user_item_txt user_item_num">{{coupons}}张</div>
        </router-link>
      </div>
    </div>
    <div class="mui-content content-top">
      <div class="mui_content_user_top">我们服务</div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/coinrecord">
            <img src="../../assets/user/chongzhijilu.png"/>
            <div class="mui-media-body user_body">充值记录</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/bitrecord">
            <img src="../../assets/user/bit.png"/>
            <div class="mui-media-body user_body">充币记录</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/projectrecord">
            <img src="../../assets/user/wodexiangmu.png"/>
            <div class="mui-media-body">我的项目</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <!--          <router-link to="/shoprecord">-->
          <router-link to="">
            <img src="../../assets/user/shangpinjilu.png"/>
            <div class="mui-media-body">商品记录</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/ticketrecord">
            <img src="../../assets/user/wodemenpiao.png"/>
            <div class="mui-media-body">我的门票</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/myorder">
            <img src="../../assets/user/wodedingdan.png"/>
            <div class="mui-media-body">我的商城订单</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mui-content">
      <div class="mui_content_user_top">第三方服务</div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/shop">
            <!-- <span class="mui-icon mui-icon-home"></span> -->
            <img src="../../assets/user/weishangcheng.png"/>
            <div class="mui-media-body">微商城</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/orderingorder">
            <img src="../../assets/user/chanyin.png"/>
            <div class="mui-media-body">我的餐饮订单</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <!--          <router-link to="/meituan">-->
          <router-link to="">
            <img src="../../assets/user/meituan.png"/>
            <div class="mui-media-body">美团充值记录</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mui-content">
      <div class="mui_content_user_top">休闲驿站</div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="fortuneWheel()">
          <a href="#">
            <img src="../../assets/user/zhuanpan.png"/>
            <div class="mui-media-body">幸运大转盘</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../assets/user/zajindan.png"/>
            <div class="mui-media-body">砸金蛋</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../assets/user/xiaomiebingdu.png"/>
            <div class="mui-media-body">消灭病毒</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import "../css/user.less";

  import global_msg from "../js/global";

  export default {
    data() {
      return {
        userName: "",
        userPhoto: "",
        userId: "",
        rankName: "",

        userTotalScore: "",
        userTotalLottery: "",
        userTotalMoney: "",
        userTotalCoin: "",
        coupons: ""

      }

    },
    beforeCreate() {

    },
    mounted() {
      this.getPersonMessage();
    },

    methods: {
      //接收个人基本信息
      getPersonMessage() {
        let basicInfoData = this.$store.state.userInfoData;
        this.userName = basicInfoData.userName;
        this.userPhoto = basicInfoData.userPhoto;
        this.userId = basicInfoData.userId;
        this.userTotalScore = basicInfoData.userScore;
        this.rankName = basicInfoData.rankName
        //接收个人账户信息
        let accountInfoData = this.$store.state.userAccountData;
        this.userTotalLottery = accountInfoData.userTotalLottery;
        if (this.userTotalLottery < 0) {
          this.userTotalLottery = 0
        }
        this.userTotalMoney = accountInfoData.userMoney;
        if (this.userTotalMoney < 0) {
          this.userTotalMoney = 0
        }
        this.userTotalCoin = accountInfoData.userCoin;
        if (this.userTotalCoin < 0) {
          this.userTotalCoin = 0
        }
        this.coupons = accountInfoData.coupons;
      },
      //幸运大转盘游戏
      fortuneWheel() {
        document.location = "http://game.020orange.com?userName="
          + this.userName + "&userPhoto=" + this.userPhoto + "&coin=" + this.userTotalCoin +
          "&userId=" + this.userId + "&shopId=" + this.$store.state.selectedShopData.shopId
      }
    }

  }
</script>


<!--// WEBPACK FOOTER //-->
<!--// src/components/tabar/UserContainer.vue-->
