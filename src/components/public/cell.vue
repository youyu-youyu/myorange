<template>
  <div class="left_a_right">
    <div class="mui-pull-left">{{title}}</div>
    <div class="mui-pull-right left_a_right-right">{{rightTxt}}
      <span class="mui-icon mui-icon-forward"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cell",
    props: [
      "title",
      "rightTxt",
    ],
  }
</script>

<style lang="less" scoped>
  .left_a_right {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 25px 20px;
    line-height: 5px;

    .left_a_right-right {
      margin-top: -10px;
      color: #a8adac;
    }
  }

</style>



// WEBPACK FOOTER //
// src/components/public/cell.vue
