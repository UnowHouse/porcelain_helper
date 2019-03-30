import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import authority from './modules/authority'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    authority,
  }
})

export default store
