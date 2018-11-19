import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './menu'

function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys,headerData }) {
  const menusProps = {
    siderFold,
    darkTheme: false,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  const hosturl = location.hostname;
  return (
    <div>
      <div>
        <a href="/" style={{display:'inline-block',textAlign:'center'}}>
        <img src={headerData.logoSrc}  style={{margin: '5px auto',width:'100%'}}/>
          {/*<p className={styles.Logo_title}>{headerData.Logo_titleText}</p>*/}
          {siderFold ? '' : <span style={{color:'#333333',fontSize:'1.5em',fontWeight:'700',textShadow:'2px 2px 3px #666666'}}>{headerData.Logo_titleText}</span>}
        </a>
      </div>
      <Menus {...menusProps} />
      {/*// {!siderFold ? <div className={styles.switchtheme}>*/}
        {/*<span><Icon type='bulb' />切换主题</span>*/}
        {/*<Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />*/}
      {/*</div> : ''}*/}
    </div>
  )
}

export default Sider
