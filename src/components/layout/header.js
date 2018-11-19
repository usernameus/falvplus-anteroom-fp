import React from 'react'
import { Menu, Icon, Popover,Button,Badge } from 'antd'
import styles from './main.less'
import Menus from './menu'
import NewsInfo from '../profile/newsInfo'

const SubMenu = Menu.SubMenu

function Header ({user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover,
  navOpenKeys, changeOpenKeys,list, types, onChangeTab, onPageChange,pagination,onShowNews,newsNo,loadMore,success,role}) {
  let handleClickMenu = e => {
    if(e.key === 'logout') {
      logout();
    }else if(e.key === 'anteroom' ){
      window.location.href = '/anteroom';
    }
    else if(e.key === 'Index' ){
      window.location.href = '/';
    }
  }
  //新消息提醒
  const NewsInfoProps={
    role,
    list,
    newsNo,
    success,
    pagination,
    types,
    loadMore,
    onChangeTab,
    onShowNews,
    onPageChange,
  }
  const {redDotNumber,conRedDotNumber,channelNumber}=newsNo;
  const text = <span>新消息提醒</span>;
  const content = (
    <NewsInfo {...NewsInfoProps}/>
  );
  let newsVisible;
  const showNews = () => {
    newsVisible=true;
  }
  const hideNews = () => {
    newsVisible=false;
  }
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                   overlayClassName={styles.popovermenu}
                   trigger='click' content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type='bars' />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>

          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      {list?
        <Popover placement="bottom"  title={text} content={content} overlayStyle={{height:'600px',overflow: 'auto'}}>
          <div className={styles.newsInfo} style={{
            lineHeight:'46px',position:'absolute',right:'125px'
          }}>
            <Badge count={redDotNumber+conRedDotNumber+channelNumber}><span style={{fontSize:'15px'}}>消息</span></Badge>
          </div>
        </Popover>
        :''}
      <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
        <SubMenu style={{
          float: 'right',width:'125px'
        }} title={<span style={{fontSize:'18px',}}> <Icon type='user' />
          {user.name} </span>}>
          <Menu.Item key='anteroom'>
            <a style={{fontSize:'18px'}}>会客室</a>
          </Menu.Item>
          <Menu.Item key='Index'>
            <a style={{fontSize:'18px'}}>前台首页</a>
          </Menu.Item>
          <Menu.Item key='logout'>
            <a style={{fontSize:'18px'}}>退出</a>
          </Menu.Item>
        </SubMenu>
      </Menu>

    </div>
  )
}

export default Header
