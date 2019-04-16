import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import router from '../router'
import successfulData from './successful_login.json'
import unsuccessfulData from './unsuccessful_login.json'

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({
    state: {
        status: { loggedIn: false }
    },
    mutations: {
        loginSuccess(state) {
            state.status = { loggedIn: true }
        },
        loginFailure(state) {
            state.status = {}
        },
        logout(state) {
            state.status = {}
        }
    },
    actions: {
        login({ commit }, { username, password }) {

            console.log(username, password)

            let user = {
                username: 'Johnny',
                password: 'password',
                access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTUyNTU1MDEsImV4cCI6MTU4Njc5MTQ5OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.A6NEUAXtGoa8ZbyqEp-UWK31UDSq5NzYSayPRvt9Xl4'
            }

            let success = successfulData.success.OK && successfulData.success.headers.XCSRFToken && 
                            successfulData.success.data[0].access_token === user.access_token && 
                            successfulData.success.data[0].GivenName === user.username;
            let fail = unsuccessfulData.success.OK;

            if (!success || fail) {
                    commit('loginFailure')
            } else if (success) {
                    commit('loginSuccess')
                    Vue.cookie.set('token', successfulData.success.data[0].access_token)

                    router.replace({ name: "secure" })
            }
        },
        logout({ commit }) {
            Vue.cookie.delete('token')
            commit('logout')
        }

    },
    getters: {
        isLoggedIn: state => state.status.loggedIn
    }
})
