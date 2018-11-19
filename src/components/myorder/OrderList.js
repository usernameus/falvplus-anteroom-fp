import React,{Component} from 'react';
import {Row, Col,Card,Pagination} from 'antd';
import styles from './OrderList.css';

class OrderList extends Component{
  constructor(props){
    super(props);
  }
  orderTitle = (record) => {
    return <div>
      <span style={{marginRight:10}}>订单号:{record.orderSn}</span>
      咨询频道:<a href={'/anteroom#' + record.channelId}>{record.channelName}</a>
    </div>
  }

  getOrderStatusStr = (status) => {
    let result = '';
    switch (status) {
      case 0: result = '未付款'; break;
      case 1: result = '已付款'; break;
      case 2: result = '请求结案中'; break;
      case 3: result = '已结案'; break;
      case 4: result = '已评价'; break;
      case 5: result = '已归档'; break;
      case 98: result = '已退款'; break;
      case 99: result = '已取消'; break;
    }
    return result;
  }

  render(){
    const {dataSource, pagination} = this.props;

    return (
      <div className={styles.normal}>
        <Row style={{background: '#E0E0E0',padding:'10px 0',marginBottom:10,textAlign:'center'}}>
          <Col span={12}>订单详情</Col>
          <Col span={4}>客户</Col>
          <Col span={4}>订单状态</Col>
          <Col span={4}>实收金额</Col>
        </Row>
        {dataSource && dataSource.map((record, index) => {
          return (<Card title={this.orderTitle(record)} style={{padding:0}} bodyStyle={{padding:0}} key={index}>
         <Row style={{textAlign: 'center', lineHeight:'54px'}}>
          <Col span={12} style={{borderRight:'solid 1px #F4F4F4', textAlign:'left',paddingLeft: 10}}>
            {record.orderDetails.map((item,dindex) =>{
              return <span key={dindex}>{item.productName}</span>
            })}

          </Col>
          <Col span={4} style={{borderRight:'solid 1px #F4F4F4'}}>{record.customerName}({record.customerPhone})</Col>
          <Col span={4} style={{borderRight:'solid 1px #F4F4F4'}}>{this.getOrderStatusStr(record.orderStatus)}</Col>
          <Col span={4}>{(record.orderAmount / 100).formatCurrency()}元</Col>
        </Row>
          </Card>)
        })}
        {pagination && pagination.total > 10 ?
          <Pagination defaultCurrent={pagination ? pagination.current : 1} total={pagination ? pagination.total : 1} onChange={this.props.onPageChange} />
        :''}
      </div>
    );
  }
}

export default OrderList;
