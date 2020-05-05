<template>
  <div class="homesurprise">
    <backbar title="每日精选"></backbar>
    <div class="detailMargin backAddFont">
      <div class="mu-sub-header detailTitle">丽江慢生活体验七日之旅丽江慢生活体验七日之旅</div>
      <div class="mu-card-title-container">
        <div class="mu-card-title">央视财经 &nbsp;&nbsp; 02月17日</div>
        <div class="mu-card-sub-title">
          <a>
            <span class="mui-icon-extra mui-icon-extra-custom"></span>
          </a>&nbsp;&nbsp;40万
        </div>
      </div>
      <div class="mu-content-block detailContent">
        <br />一周的时间，不需要观赏太多的景点，放慢脚步，
        第一天抵达丽江古城后小小休整下，就可以开始逛古城了。
        <br />
        <br />逛逛当地特色的商店，尝尝地道的小吃，到了夜晚
        <br/>听清脆悦耳的小桥流水；淘些自己爱的民族特色的小玩意儿，小首饰；
        第三天早晨在客栈醒来，早餐过后租一辆自行车骑行至拉市海
        <div class="mu-card-media">
          <img src="http://lc-GDylhkFz.cn-n1.lcfile.com/6e44dc8c7e74a0f10c19.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import backbar from "../public/backBar.vue";
  export default {
    data() {
      return {};
    },
    methods: {
      //时间格式处理
    },
    components: {
      backbar
    }
  };
</script>
<style lang="less" scoped>
  .backAddFont {
    width: 90%;
    margin: 0 auto;
    padding-top: 50px;
  }
  .detailTitle {
    // text-align: center;
    font-size: 25px;
  }
  .detailTitle {
    line-height: 40px;
  }
  .mu-card-media {
    img {
      width: 100%;
      margin: 30px auto;
    }
  }
  .mu-card-title-container {
    display: flex;
    color: #a0acac;
    justify-content: space-between;
    line-height: 70px;
  }
  .mui-icon-extra-custom {
    font-size: 20px;
    color: #e0e0ee;
  }
  .homesurprise {
    background-color: #fff;
  }
</style>



// WEBPACK FOOTER //
// src/components/twopage/HomeSurprise.vue
