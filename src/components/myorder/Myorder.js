/**
 * Created by fapu on 17-2-27.
 */
import React, {Component} from "react";
import {Table, Tabs,Spin, Input, Select, Button,Icon, Row, Col,Card,Pagination} from "antd";
import OrderList from './OrderList';
import { connect } from 'dva';
import styles from './../userDetails/customerOrder.less';
const TabPane = Tabs.TabPane;


function MyOrderList(myorderList){
  const {products, pagination, onPageChange,productsHref,onChangeTab,onSeeDetail} = myorderList;
  function redirect(url){
    var ul =  window.location.href.replace(/admin\/myorder/, "");
    window.location.href=ul+url
  }
  const panes = [
    {title: '所有订单', content: '', key: 'all'},
    {title: '未付款', content: '', key: 'nopay'},
    {title: '已付款', content: '', key: 'processing'},
    {title: '已结案', content: '', key: 'settled'},
    {title: '已评价', content: '', key: 'rated'}
  ]
  return (
      <div className={styles.normall}>
        <Tabs onChange={onChangeTab}>
          {panes.map((pane,index) => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
        </Tabs>
          {myorderList.dataSource && myorderList.dataSource.length > 0 ?
            myorderList.dataSource.map((data, index) => {
              const {channelId,channelStatus,customerName,customerPhone,lawyerId,lawyerName,orderAmount,orderDetails,orderId,orderSn,orderStatus,channelName,receiveAmount} = data;
              const product = orderDetails[0];
              return (
                  <div key={index} style={{background: 'white',padding:0}}>
                    <div className={styles.bought_table_mod}>
                      <Row>
                        <Col lg={12} md={12} xs={24}>
                          订单号:{orderSn}
                        </Col>
                        {channelName&&channelName!=null?
                        <Col lg={12} md={12} xs={24}>
                          频道名称:{channelStatus==5?<span>{channelName}(已删除)</span>:<a onClick={redirect.bind(null, 'anteroom#' + channelId)}>{channelName}</a>}
                        </Col>:''}
                      </Row>
                    </div>
                    <div className={styles.mcustoms}>
                      <Row>
                        <Col lg={4} md={4} xs={24}>
                          <img src={product.productImg}/>
                        </Col>
                        <Col lg={4} md={4} xs={24}>
                          <a className={styles.lawyernames}>{orderDetails.map((datas,indexs)=> {
                            const {productName} = datas;
                            return (<div key={indexs}>{productName}</div>)
                          })}</a>
                        </Col>
                        <Col lg={4} md={4} xs={24}>
                          <p className={styles.orderamount}>&#65509; {orderAmount/100}</p>
                        </Col>
                        <Col lg={4} md={4} xs={24}>
                          {orderDetails.map((datas,indexs)=> {
                            const {buyCount} = datas;
                            return (<div key={indexs}>数量:{buyCount}</div>)
                          })}
                        </Col>
                        <Col lg={4} md={4} xs={24}>
                          <p className={styles.orstate}>订单状态:{orderStatus==0 ? '未支付' :'已支付'}</p>
                          <p className={styles.changedetails} onClick={() => onSeeDetail(orderId)}>订单详情</p>
                        </Col>
                        <Col lg={4} md={4} xs={24}>
                          <p>客户姓名:{customerName ? customerName : (customerPhone)}</p>
                        </Col>
                      </Row>
                    </div>
                  </div>
              );
            })
            :''}
        <Row className={styles.footerpage}>
          {pagination && pagination.total > 1 ?
            <Pagination current={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
            :''}
        </Row>
      </div>
    )
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MyOrderList);
