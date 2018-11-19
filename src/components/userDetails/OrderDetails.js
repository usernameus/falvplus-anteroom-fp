/**
 * Created by zhihangjishu on 17/6/14.
 */
import React from 'react';
import {Button,Row,Col } from 'antd';
import { connect } from 'dva';
import styles from '../../routes/OrderDetails.css';

function OrderDetails(orderDetails){
  const {buyCount, detailAmount, detailAmountY, productImg, productName,shopPriceY}=orderDetails
  return(
    <div className={styles.normal}>
      <div className={styles.app_mod__tabs_container}>
        <div className={styles.tabs_mod__tabs_panels}>
          <Row gutter={24}>
            <Col span={8}>
              <h3>产品图片:</h3>
            </Col>
            <Col  span={8}>
              <img src={productImg}/>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <h3>产品名称:</h3>
            </Col>
            <Col  span={8}>
              {productName}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <h3>购买数量:</h3>
            </Col>
            <Col  span={8}>
              {buyCount}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <h3>产品金额:</h3>
            </Col>
            <Col  span={8}>
              {shopPriceY}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <h3>明细总金额:</h3>
            </Col>
            <Col  span={8}>
              {detailAmountY}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(OrderDetails);
