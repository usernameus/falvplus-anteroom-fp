import React from 'react';
import {Row, Col, Card,Menu,Dropdown,Button,Icon} from 'antd';
import styles from './Order.css';

function OrderStep3({order}) {
  return (order && order.data?
      <div className={styles.normal}>
        <Row>
          <Col xl={{span:12, offset:12}} >
            <Card>
              <Row className={styles.payment_successful} >
                <Col span={12}><div className={styles.payment_success}>&#10004;</div>支付成功</Col>
              </Row>
              <Row>
                <Col span={5}>联系电话:</Col>
                <Col>{order.data.mobile}</Col>
              </Row>
              <Row>
                <Col span={5}>姓名:</Col>
                <Col>{order.data.orderName}</Col>
              </Row>
              <Row>
                <Col span={5}>联系地址:</Col>
                <Col>{order.data.address}</Col>
              </Row>
              <Row>
                <Col span={5}>支付金额:</Col>
                <Col>&#65509;{order.data.amountY}</Col>
              </Row>
              <Row>
                <Col span={5}>支付状态:</Col>
                <Col>支付成功</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      :<div>订单不存在</div>
  );
}



export default OrderStep3;
