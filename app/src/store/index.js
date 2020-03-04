import Vuex from 'vuex'
import Vue from 'vue'
import lists from './modules/list'
import tasks from './modules/task'

// load vuex
Vue.use(Vuex)

// create store
export default new Vuex.Store({
  modules: {
    lists,
    tasks
  }
})
