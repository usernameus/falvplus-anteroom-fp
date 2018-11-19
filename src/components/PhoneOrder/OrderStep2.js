import React from 'react';
import {Row, Col, Card,Menu,Dropdown,Button,Icon,Modal} from 'antd';
import styles from './Order.css';
import PayMethods from '../ui/PayMethod'
function OrderStep2({order, currentChannel, qrUrl,PayMethod,Balance}) {
  return (order && order.data?
    <div className={styles.normal}>
      <div style={{fontSize:'20px',color:'#666666',marginBottom:'30px',marginTop:'30px'}}>请确认您的订单信息，确认无误请付款</div>
      <Row>
        <Col lg={{span:24}} >
          <Card className="userInfo" title="订单信息">
            <Row>
              <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>姓名:</Col>
              <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.orderName}</Col>
            </Row>
            <Row>
              <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系电话:</Col>
              <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.mobile}</Col>
            </Row>
            <Row>
              <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系地址:</Col>
              <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.address}</Col>
            </Row>
            <Row>
              <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>需付金额:</Col>
              <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.amountY}</Col>
            </Row>
            <Row>
              <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>需求说明:</Col>
              <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.needsSpec}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <PayMethods PayMethod={PayMethod}PaySum={order.data.amountY?Number(order.data.amountY).formatCurrency():''}Balance={Balance ? Balance.formatCurrency() : Balance}/>
      <Row>
        <Col lg={{span:24}} style={{marginTop:'30px'}}>
          <Card title="电话咨询小贴士">
            <div style={{marginTop:'20px'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>1</div>
              电话咨询收费模式是一次性收取，每次电话咨询时长在半小时左右。</div>
            <div style={{marginTop:'20px'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>2</div>
              填写联系方式便于律师主动联系，请保持手机的畅通。</div>
            <div style={{marginTop:'20px'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>3</div>
              律师平时工作繁忙，请耐心等待律师回复。</div>
          </Card>
      </Col></Row>
    </div>
      :<div>订单不存在</div>
  );
}



export default OrderStep2;
