<template>
  <div>
    <div id="app">
      <transition :name="slideDirection">
        <router-view class="Router"/>
      </transition>
    </div>
    <!--<tabbar>-->
    <!--<tabbar-item link="/index">-->
    <!--<span slot="label">首页</span>-->
    <!--</tabbar-item>-->
    <!--<tabbar-item selected link="/list">-->
    <!--<span slot="label">列表页</span>-->
    <!--</tabbar-item>-->
    <!--<tabbar-item link="/home">-->
    <!--<span slot="label">个人页</span>-->
    <!--</tabbar-item>-->
    <!--</tabbar>-->
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
    data() {
      return {
        slideDirection: 'slide-right', // 默认动态路由变化为slide-right
      }
    },
    computed: {
      direction() {
        return this.$store.getters.getDirection.direction
      },
    },
    watch: {
      /* eslint-disable */
//      '$route'(to, from) {
//        console.log(to, from)
//        const toDepth = to.path.split('/').length
//        const fromDepth = from.path.split('/').length
//        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//
//      },
      'direction'(oldVal, newVal) {
        this.slideDirection = newVal === 'forward' ? 'slide-right' : 'slide-left'
      }
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

  .Router {
    position: absolute;
    width: 100%;
    transition: all .3s ease;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
