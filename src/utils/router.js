/**
 * 过滤出合适的路由数组
 * @param {*} menus
 */
export default function filtersMenus(menus) {
  // console.log('过滤器前==》', menus)
  const menu = generateMenu(menus)
  console.log('过滤器后=>', menu)
  // const routes = handleGetRoutes(menu)
  // console.log(routes)

  return menu
}

/**
 * 去除没用的children
 */
const generateMenu = (menus) => {
  for (let i = 0; i < menus.length; i++) {
    if ((menus[i].child && menus[i].child.length <= 0) || !menus[i].icon) {
      delete menus[i].child
    }
    if (menus[i].child && menus[i].child.length > 0 && menus[i].icon) {
      generateMenu(menus[i].child)
    }
  }
  return menus
}

/**
 * 把过滤好的数组过滤成路由信息
 */
// function handleGetRoutes() {}
