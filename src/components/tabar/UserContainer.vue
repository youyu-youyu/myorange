<template>
  <div class="UserContainer" style="
    min-height: 1100px;">
    <div class="ticket_top">
      <!--      <div class="user_top_inner">-->
      <ul class="mui-table-view">
        <li class=" user_bottom">
          <router-link to="/modifyuserinfo">
            <img class="mui-media-object mui-pull-left" v-bind:src=userPhoto>
          </router-link>
          <div class="mui-media-body user_top_body">
            {{userName}}
            <div>
              <div class="mui-ellipsis user_left">ID：{{userId}}</div>
              <router-link to="/physicalcard">
                <button class="">实体卡</button>
              </router-link>
            </div>
          </div>
          <div class="user_top_right">
            <img src="../../assets/user/diamond.png" style="width: 10px;">
            <span style="line-height: 10px">钻石会员</span>
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
        <router-link to="/bitvc" class="item">
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
          <router-link to="/shoprecord">
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
            <div class="mui-media-body">我的订单</div>
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
          <a href="#">
            <img src="../../assets/user/chanyin.png"/>
            <div class="mui-media-body">餐饮</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/meituan">
            <img src="../../assets/user/meituan.png"/>
            <div class="mui-media-body">美团</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mui-content">
      <div class="mui_content_user_top">休闲驿站</div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
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

  export default {
    data() {
      return {
        userName: "",
        userPhoto: "",
        userId: "",

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
      let basicInfoData = this.$store.state.userInfoData;
      this.userName = basicInfoData.userName;
      this.userPhoto = basicInfoData.userPhoto;
      this.userId = basicInfoData.userId;
      this.userTotalScore = basicInfoData.userScore;

      let accountInfoData = this.$store.state.userAccountData;
      this.userTotalLottery = accountInfoData.userTotalLottery;
      this.userTotalMoney = accountInfoData.userMoney;
      this.userTotalCoin = accountInfoData.userCoin;
      this.coupons = accountInfoData.coupons;
    },

    methods: {}

  }
</script>


<!--// WEBPACK FOOTER //-->
<!--// src/components/tabar/UserContainer.vue-->
