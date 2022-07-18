export default {
  token: (state) => state.login.token || '',
  userInfo: (state) => state.login.userInfo || '',
  isCollapse: (state) => state.login.isCollapse,
  menuList: (state) => state.permission.menuList
}
