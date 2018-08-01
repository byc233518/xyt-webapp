import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import './styles/common.less';

Vue.use(VueRouter);
Vue.use(iView);

// Object.defineproperty(Vue.prototype, '$moment', { value: moment });
moment.locale('zh-cn')
Vue.prototype.$moment = moment;

// axios.post('http://39.108.77.185:8081/xinhuo/member/isLogin', {}).then((res) => {
//     if (res.data.__statusCode === "1") {
//         Vue.prototype.$user = res.data.data
//     } else {
//         location.href = 'http://localhost:8080/login.html'
//     }
// })

if(!localStorage.getItem('userinfo')) {
  location.href = `${location.origin}/login.html`
}

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
