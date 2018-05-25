import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Router.prototype.goBack = function () {
//   console.log('back')
//   this.isBack = true
//   window.history.go(-1)
// }
/*eslint-disable*/
Vue.use(Router)

const routers = new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: '',
    //   component(resolve) {
    //     require(['../views/list'], resolve)
    //   },
    // },
    {
      path: '/index',
      name: 'index',
      component(resolve) {
        require(['../views/index'], resolve)
      },
    },
    {
      path: '/list',
      name: 'list',
      component(resolve) {
        require(['../views/list'], resolve)
      },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component(resolve) {
        require(['../views/detail'], resolve)
      },
    },
    {
      path: '/home',
      name: 'home',
      component(resolve) {
        require(['../views/home'], resolve)
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component(resolve) {
        require(['../views/admin'], resolve)
      },
    },
    {
      path: '/servicecenter',
      name: 'servicecenter',
      component(resolve) {
        require(['../views/servicecenter'], resolve)
      },
    },
    {
      path: '/servicecenter/train',
      name: 'servicecenterTrain',
      component(resolve) {
        require(['../views/servicecenter/train'], resolve)
      },
    },
    {
      path: '/servicecenter/jobhunting',
      name: 'servicecenterJobhunting',
      component(resolve) {
        require(['../views/servicecenter/jobhunting'], resolve)
      },
    },
    {
      path: '/publishjob',
      name: 'publishjob',
      component(resolve) {
        require(['../views/publishjob'], resolve)
      },
    },
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require(['../views/login'], resolve)
      },
    },
    {
      path: '/getWxFile',
      name: 'login',
      component(resolve) {
        require(['../views/getWxFile'], resolve)
      },
    },
    // {
    //   path: '/publishjob',
    //   name: 'publishjob',
    //   component(resolve) {
    //     require(['../views/publishjob'], resolve)
    //   },
    // },
  ],
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

routers.beforeEach(function (to, from, next) {

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    const url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }

  window.scrollTo(0,0)
})

export default routers
