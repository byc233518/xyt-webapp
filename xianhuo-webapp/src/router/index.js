import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component(resolve) {
        require(['../views/list'], resolve)
      },
    },
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
  ],
})

export default routers
