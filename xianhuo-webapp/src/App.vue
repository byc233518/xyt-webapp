<template>
  <div>
    <div id="app">
      <router-view/>
    </div>
    <tabbar>
    <tabbar-item link="/index">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item selected link="/list">
      <span slot="label">列表页</span>
    </tabbar-item>
    <!--<tabbar-item link="/home">-->
      <!--<span slot="label">个人页</span>-->
    <!--</tabbar-item>-->
  </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem,
    },
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #666666;
    font-size: .28rem;
  }
  .weui-tabbar {
    position: fixed !important;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
</style>
