import filtersMenus from '../../utils/router'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    filterRoutes({ commit }, menus) {
      // console.log(menus)
      filtersMenus(menus)
    }
  }
}
