import React, {PropTypes} from 'react';
import { connect } from 'dva';
import {Button, Row, Col} from 'antd';
import styles from './Profile.less';

function Profile({profile,fhome}) {
  const {realName, picUrl, firm,lawyerDesc,majors,certificate,contactsPhone,contacts,address,callPrice} = profile;
  const {headerData}=fhome;
  const {webTypes,hideData}=headerData;
  return (
    <div className="profilepanel">
      {hideData=='hideProfile'? <p style={{textAlign:'center',paddingTop:'80px',paddingBottom:'80px',fontSize:'28px'}}>该页面律师设置了访问权限，您无法访问</p>:
    <Row>
      <Col xs={24} sm={4}>
        <img src={picUrl} className={styles.profile_picture} style={{margin:'0px auto',display:'block'}}/>
      </Col>
      <Col xs={24} sm={{span: 19,offset:1}}>
        <p className={styles.lawyer_name}>{realName} {webTypes==0?<span>律师</span>:<span></span>}</p>
        {/*<p className={styles.lawyer_name}>{phone}</p>*/}
        <div>
          {webTypes==0?<div>执业机构:{firm}</div>:<div>联系人:{contacts}</div>}
          {webTypes==0?'':<div>联系电话:{contactsPhone}</div>}
          <div>地&nbsp;&nbsp;&nbsp;&nbsp;址：{address}</div>
          <div>电话咨询价格：￥{callPrice}元/次</div>
        </div>
        <div className={styles.lawyer_advantage_one}>

          <div>
            <div className={styles.lawyer_advantage}>业务专长</div>
            {majors && majors.length > 0 ?  majors.map((m,index)=>{
              return <span key={index} className={styles.lawyer_adv_con} style={{marginRight: '1em'}}>{m.values}</span>
            }) : ''}
          </div>
          <div style={{display:'none'}}>
            <div  className={styles.lawyer_advantage}>执业特点</div>
            <p className={styles.lawyer_adv_con}></p>
          </div>
          <div>
            <div className={styles.lawyer_adv_con} dangerouslySetInnerHTML={{__html: lawyerDesc}}></div>
          </div>
        </div>
      </Col>
    </Row>}
    </div>
  );
}

Profile.propTypes = {
  loading: PropTypes.bool
}

function mapStateToProps ({ profile,fhome}) {
  return { profile,fhome }
}
export default connect(mapStateToProps)(Profile);
