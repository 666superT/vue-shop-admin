/**
 * 过滤出合适的路由数组
 * @param {*} menus
 */
export default function filtersMenus(menus) {
  // console.log(menus)
  console.log(generateMenu(menus))
}

/**
 * 去除没用的children
 */
const generateMenu = (menu) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].child && menu[i].child.length <= 0) {
      delete menu[i].children
    }
    if (menu[i].child && menu[i].child.length > 0) {
      generateMenu(menu[i].child)
    }
  }
  return menu
}
