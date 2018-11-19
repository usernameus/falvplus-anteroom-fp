import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'
// import { lawyerMenu } from '../../utils'
const Cookie = require('js-cookie');
const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.child && (Cookie.get('webType')==item.menuType || item.menuType!='1')) {
      return (
        <Menu.SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
          {
            item.child.map(items => {
            return (
              <Menu.Item key={items.key}>
                <Link to={parentPath + items.key}>
                  {items.icon ? <Icon type={items.icon} /> : ''}
                  {siderFold && topMenus.indexOf(items.key) >= 0 ? '' : items.name}
                </Link>
              </Menu.Item>
            )
            })
          }
        </Menu.SubMenu>
      )
    }else if(!item.hidden){
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus ({ siderFold, darkTheme, location, isNavbar, handleClickNavMenu, navOpenKeys, changeOpenKeys }) {
  const menuItems = getMenus(menu, siderFold,"/admin/")
  // const lawyerMenuItems = getMenus(lawyerMenu, siderFold,"/admin/")
  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  // 菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}>
      {menuItems}
    </Menu>
  )
}

export default Menus
