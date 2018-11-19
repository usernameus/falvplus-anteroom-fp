import React from 'react';
import { connect } from 'dva';
import styles from './customerOrder.less';
import {Card,Row, Col,Button,Tabs,Pagination} from 'antd';
const TabPane = Tabs.TabPane;

function MyOrder(props) {
  const { pagination, onPageChange,onChangeTab,list,onSeeDetail,keyword} = props;
  function redirects(url){
    window.location.href = url;
  }
  return (
    <div className={styles.normals}>
        {list && list.length > 0 ?
          list.map((data, index) => {
            const {channelName,createdAt,id,orderStatus,productImg,realName,orderSn,productId} = data;
            return (
                <div key={index} style={{background: 'white',padding:0}}>
                  <div className={styles.bought_table_mod}>
                    <Row>
                      <Col lg={8}md={8}xs={24}>
                        <span className={styles.bought_table_mod_span}></span>
                        <span>{createdAt}</span>
                      </Col>
                      <Col lg={16}md={16}xs={24}>
                        <span>订单号:{orderSn}</span>
                      </Col>
                      </Row>
                  </div>
                  <div className={styles.mcustoms}>
                    <Row>
                      <Col lg={8}md={8}xs={24}>
                        <div className={styles.fuwutupian}><img src={productImg}/></div>
                      </Col>
                      <Col lg={8}md={8}xs={24}>
                        <div className={styles.bought_wrapper_mod__table} style={{width:110}}>
                          <p>律师姓名:{realName}</p>
                        </div>
                      </Col>
                      <Col lg={8}md={8}xs={24}>
                        <div className={styles.bought_wrapper_mod__table} style={{width:110}}>
                          <p>订单状态:{orderStatus==0 ? '未付款' :orderStatus==1 ? '已付款' :orderStatus==2 ? '已申请结算' :orderStatus==3 ? '已结算' :'评价完成'}</p>
                          <p className={styles.changedetails} onClick={() => onSeeDetail(id)} >订单详情</p>
                          {orderStatus==0 ?<div>
                            <a href={'/orderflow/hope/' +productId }>
                              <p>去付款</p>
                            </a></div>:''}
                        </div>

                      </Col>
                    </Row>
                    {/*<div className={styles.bought_wrapper_mod__table} style={{width:110}}>
                      {channelId ?<div onClick={redirects.bind(null, 'anteroom#' + channelId)}>进入频道 >></div> :''}
                    </div>*/}
                  </div>
                </div>
            );
          })
          :''}
      <Row className={styles.footerpage}>
          <Pagination defaultPageSize={10} defaultCurrent={pagination.current} current={pagination.current} size="large" total={pagination.total} style={{float:'right'}} onChange={onPageChange}/>
      </Row>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MyOrder);
