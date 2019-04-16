import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router'
import successfulData from './successful_login.json'
import unsuccessfulData from './unsuccessful_login.json'

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(VueJwtDecode)

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

            let decodedJwt = VueJwtDecode.decode(successfulData.success.data[0].access_token)
            let user = {
                access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTU0MjYzODYsImV4cCI6MTU4Njk2MjM4NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.tFRXHG9JKat1Y-S_5Ptoxcmt_eWVWQWe7DiS7kk2ca4'
            }

            let success = successfulData.success.OK && successfulData.success.headers.XCSRFToken && 
                            successfulData.success.data[0].access_token === user.access_token &&
                            decodedJwt.GivenName === username
            let fail = unsuccessfulData.success.OK

            if (!success || fail) {
                commit('loginFailure')
            } else if (success) {

                if (Date.now() / 1000 > decodedJwt.exp) {
                    commit('loginFailure')
                    return
                }
                
                let expireDate = new Date(decodedJwt.exp*1000).toUTCString()

                commit('loginSuccess')
                Vue.cookie.set('token', successfulData.success.data[0].access_token, {expires: expireDate}) // Set secure: true in real app when using https
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
