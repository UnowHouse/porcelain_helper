// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api/index.js'
import apiUrls from './api/apiUrls'


import {VTable,VPagination} from 'vue-easytable'

import './api/http'

import * as filters from './common/filter'
import utils from './common/utils'
import './assets/styles/main.css' // 引入布局样式
import 'vue-easytable/libs/themes-base/index.css'

Vue.prototype.apiUrls = apiUrls

Vue.use(api)

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)


Vue.use(utils)
Object.keys(filters).forEach(key => {
  
  Vue.filter(key, filters[key])
})
Vue.prototype.Filters = filters
Vue.prototype.utils = utils
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
