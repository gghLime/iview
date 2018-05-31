
/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    formType: 'login',
    userId: ''
  },
  mutations: {
    loginFormChange(state, str) {
      state.formType = str
    },
    setUserId(state, str) {
      state.setUserId = str
    }
  }
})
