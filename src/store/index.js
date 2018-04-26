import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict:debug,
    // plugins:debug ? [createLogger()] : []
})

