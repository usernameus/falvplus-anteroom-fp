import React,{Component} from 'react';
import { Card, Col, Row } from 'antd';
import styles from './customersProfile.less'
class Data extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      customerInfo,
      contactInfo
    } = this.props;
    return (
      <div className={styles.contactsProfiles}>
        <Row>
          <Col span="12">
            <Card title="基本信息" bordered={false}>
              <div>
                <p>姓名:{contactInfo.contactName}</p>
                <p>对应客户:<a href={'/admin/crm/' + customerInfo.id}>{customerInfo.customerName}</a></p>
                <p>部门:{contactInfo.depart}</p>
                <p>职务:{contactInfo.jobTitle}</p>
              </div>
            </Card>
            <Card title="联系信息" bordered={false}>
              <p>手机: {contactInfo.phone}</p>
              <p>电话: {contactInfo.tel}</p>
              <p>QQ: {contactInfo.qq}</p>
              <p>微信: {contactInfo.weixinNo}</p>
              <p>邮箱: {contactInfo.email}</p>
              <p>传真: {contactInfo.fax}</p>
              <p>网址: {contactInfo.url}</p>
              <p>地址: {contactInfo.address}</p>
              <p>邮编: {contactInfo.post}</p>
            </Card>
            <Card title="其他信息" bordered={false}>
              <p>性别: {contactInfo.sex ? (contactInfo.sex == 1 ? '男' : '女') : ''}</p>
              <p>生日: {contactInfo.birthday > 0 ? new Date(contactInfo.birthday).format('yyyy年MM月dd日'):''}</p>
              <p>备注:</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Data;
