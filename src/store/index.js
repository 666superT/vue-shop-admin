import { createStore } from 'vuex'
import login from './modules/login'
import getters from './getters'
import permission from './modules/permission'

export default createStore({
  getters,
  modules: {
    login,
    permission
  }
})
