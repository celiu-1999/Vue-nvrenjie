import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'  // 动作
import mutations from './mutations'  // 变化

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mutations
  },
  actions
})
