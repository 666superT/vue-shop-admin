import { login, getUserInfo } from '@/api/login'
import storage from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: storage.getItem('token') || ''
  },
  mutations: {
    SET_TOKEN(state, params) {
      state.token = params
      storage.setItem('token', params)
    }
  },
  actions: {
    async handleLogin({ commit }, params) {
      const res = await login(params)
      // console.log(res)
      commit('SET_TOKEN', res.token)
      return res
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      console.log(res)
    }
  }
}
