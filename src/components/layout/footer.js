import React from 'react'
import {Row,Col} from 'antd'
import styles from './main.less'
import { config } from '../../utils'

const Footer = ({onConsultClick,oAaboutuser,onPhoneconse,onAddarticles,onAdduserDetails,role}) => {

  const colProps = {span: role == '9' ? 6 : 8}

  return <div>
    <div className={styles.footer + ' ' + styles.mtoor} style={{textAlign: 'center'}}>
      <span ><a href="https://www.falvplus.com" target="_blank">法仆网</a>©2017 技术支持</span>
    </div>
    <div style={{textAlign: 'center'}}>
      <Row className={styles.mfooterr}>
        <Col {...colProps} onClick={onConsultClick}>{window.location.pathname === "/anteroom" ?
          <img src="//theme.lj110.com/default/m/huikeshi2.png"/> :
          <img src="//theme.lj110.com/default/m/huikeshi1.png"/>}</Col>
        <Col {...colProps} onClick={onPhoneconse}> {window.location.pathname === "/phoneOrder" ?
          <img src="//theme.lj110.com/default/m/dianhua2.png"/> :
          <img src="//theme.lj110.com/default/m/dianhua1.png"/>}</Col>
        {role == '9' ? <Col {...colProps} onClick={oAaboutuser}>{window.location.pathname === "/addActivity" ?
          <img src="//theme.lj110.com/default/m/activity_show.png"/> :
          <img src="//theme.lj110.com/default/m/activity_hide.png"/>}</Col> : ''}
        {role == '9' ? <Col {...colProps} onClick={onAddarticles}>{window.location.pathname === "/addArticle" ?
          <img src="//theme.lj110.com/default/m/tianjiawenji2.png"/> :
          <img src="//theme.lj110.com/default/m/tianjiawenji1.png"/>}</Col> : ''}
        {role !== '9' ? <Col {...colProps} onClick={onAdduserDetails}>{window.location.pathname === "/userDetails" ?
          <img src="//theme.lj110.com/default/m/gerenzhongxin 2.png"/> :
          <img src="//theme.lj110.com/default/m/gerenzhongxin1.png"/>}</Col> : ''}
      </Row>
    </div>
  </div>
}

export default Footer
