<template>
  <div class="record">
    <loading v-if="loading"></loading>
    <!-- 顶部滑动条 -->
    <div class=" record_slider">
      <div class="record-item">{{title1}}</div>
      <div class="record-item">{{title2}}</div>
      <div class="record-item">{{title3}}</div>
      <div class="record-item">{{title4}}</div>
      <div class="record-item">{{title5}}</div>
    </div>
  </div>
</template>
<script>
  // import backbar from "./backBar.vue";

  export default {
    props: {
      title1: String,
      title2: String,
      title3: String,
      title4: String,
      title5: String,
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {},
    components: {
      // backbar
    },
    mounted() {
      this.loading = true;
      setTimeout(this.loading = false, 30000)

    }
  };
</script>
<style lang="less" scoped>
  .record_slider {
    display: flex;
    margin-top: 50px;
    background: #bbbbbb;
    padding: 7px 0;
    font-size: 15px;
  }
  .record-item {
    /*flex: 1;*/
    text-align: center;
    width: 25%;
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/public/record.vue-->
