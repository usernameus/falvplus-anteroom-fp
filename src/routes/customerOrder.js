import React from 'react';
import { connect } from 'dva';
import styles from './customerOrder.less';
import {Card,Row, Col} from 'antd';


function MyOrder({customerOrder}) {
  const {myorderList}=customerOrder
  return (
    <div className={styles.normal}>
      <ul>
        {myorderList && myorderList.length > 0 ?
          myorderList.map((data, index) => {
            const {lawyerName,orderAmountStr,orderName,orderPhone,orderSn,orderStatusStr,productsAmount,noteToBuyer} = data;
            return (
              <a key={index} style={{color: 'gray', textDecorator: ''}}>
                <Card key={index} style={{background: 'white', margin: '5px 0', padding: '10px'}}>
                  <Row>
                    <Col md={12} xs={24}>
                      <div>订购姓名:{lawyerName}</div>
                      <div>订单号:{orderSn}</div>
                      <div>订单手机号:{orderPhone}</div>
                    </Col>
                    <Col md={12} xs={24} style={{paddingLeft: '1em'}}>
                      <div>小计:{orderAmountStr}</div>
                      <div>订单状态:{orderStatusStr}</div>
                      <div>律师留言:{noteToBuyer}</div>
                    </Col>
                  </Row>
                </Card>
              </a>
            );
          })
          :''}
      </ul>
    </div>
  );
}

function mapStateToProps({customerOrder}) {
  return {customerOrder};
}

export default connect(mapStateToProps)(MyOrder);
