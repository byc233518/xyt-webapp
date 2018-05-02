import Vue from 'vue'
import 'lodash'
import 'moment'
import BaiduMap from 'vue-baidu-map'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vux from './vux.install'
import './assets/style/index.css';

Vue.config.productionTip = false

Vue.use(vux)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'KMVMX2ByWjGDolZ1M8SYTmHQ',
})

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
