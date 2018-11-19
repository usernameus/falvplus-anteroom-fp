import React from 'react';
import {Row, Col, Card,Menu,Dropdown,Button,Icon,Modal} from 'antd';
import styles from './Order.css';
import PayMethods from '../ui/PayMethod'
const Cookie = require('js-cookie');
function OrderStep2({order, currentChannel, qrUrl,PayMethod,Balance}) {
  return (order?
      <div className={styles.normal}>
        {order.orderStatus==0?
        <div>
        <div style={{fontSize:'20px',color:'#666666',marginBottom:'30px',marginTop:'30px'}}>请确认您的订单信息，确认无误请付款</div>
        <Row>
          <Col lg={{span:24}} >
            <Card className="userInfo" title="订单信息">
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>产品名称:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.address}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>姓名:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{Cookie.get('user_name')}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系电话:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.mobile}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系地址:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.address}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>需付金额:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.amountY}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>需求说明:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.needsSpec}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <PayMethods PayMethod={PayMethod} PaySum={order.amountY?Number(order.amountY).formatCurrency():''} Balance={Balance ? Balance.formatCurrency() : Balance}/>
        </div>:<div style={{width:'100%',textAlign:'center',fontSize:'28px'}}>正在进入会客室，请稍候...</div>}
      </div>
      :<div>订单不存在</div>
  );
}
export default OrderStep2;
