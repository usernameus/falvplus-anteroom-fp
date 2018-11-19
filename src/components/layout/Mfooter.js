import React from 'react'
import styles from './main.less'
import {Row, Col} from 'antd';
import { config } from '../../utils'

const Footer = ({onConsultClicks,oAaboutuser,onPhoneconse,onAddarticles,onAdduserDetails,role}) => {
  const colProps = {
    span: role == '9' ? 6 : 8
  }
  return <div style={{textAlign: 'center'}} className={styles.mtoor}>
  <Row className={styles.mfooterr}>
      <Col {...colProps} onClick={onConsultClicks}>{window.location.pathname.parsePath().startWith('/anteroom') ? <img src="//theme.lj110.com/default/m/huikeshi2.png"/> :<img src="//theme.lj110.com/default/m/huikeshi1.png"/>}</Col>
      <Col {...colProps} onClick={onPhoneconse}> {window.location.pathname==="/phoneOrder"? <img src="//theme.lj110.com/default/m/dianhua2.png"/> :<img src="//theme.lj110.com/default/m/dianhua1.png"/>}</Col>
      {role == '9'?<Col {...colProps} onClick={oAaboutuser}>{window.location.pathname==="/addActivity"? <img src="//theme.lj110.com/default/m/activity_show.png"/> :<img src="//theme.lj110.com/default/m/activity_hide.png"/>}</Col>:''}
      {role == '9'?<Col {...colProps} onClick={onAddarticles}>{window.location.pathname==="/addArticle"? <img src="//theme.lj110.com/default/m/tianjiawenji2.png"/> :<img src="//theme.lj110.com/default/m/tianjiawenji1.png"/>}</Col>:''}
      {role !== '9'?<Col {...colProps} onClick={onAdduserDetails}>{window.location.pathname==="/userDetails"? <img src="//theme.lj110.com/default/m/gerenzhongxin 2.png"/> :<img src="//theme.lj110.com/default/m/gerenzhongxin1.png"/>}</Col>:''}
  </Row>
</div>
}

export default Footer
