import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'
import Login from './components/login.vue'
import Secure from './components/secure.vue'
import Logout from './components/logout.vue'

Vue.use(Router)
Vue.use(VueCookie)

export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "login"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "/secure",
      name: "secure",
      component: Secure
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = Vue.cookie.get('token')

    if(authRequired && !loggedIn) return next('/login')

    next()
})

export default router
