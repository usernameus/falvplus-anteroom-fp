/**
 * Created by fapu on 17-6-15.
 */
import React,{Component} from 'react';
import { Card, Col, Row ,Icon,Button,Timeline,Pagination} from 'antd';
import styles from './customerOrder.less'

class ConsultationOrder extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      list,
      pagination,
      onPageChange,
      customerInfo,
      contactsList,
      followlogs,
      onAddcontact,
    } = this.props;
    return (
      <div className={styles.normall}>
        {list&&list.length>0?
          list.map((data, index) => {
            const {contactNumber,createdAt,needsSpec,userName,orderStatus,id,customerName,orderAmount,orderDetails,orderId,orderSn,channelName,receiveAmount} = data;
            return(
        <ul key={index}>
          <div  style={{color: 'gray', textDecorator: ''}}>
            <div  style={{background: 'white',padding:0}}>
              <div className={styles.bought_table_mod}><span>下单时间：{createdAt}</span>
              </div>
              <div className={styles.mcustoms}>
                <Row>
                  <Col lg={8}sm={8}md={8}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}>
                      <p>回复电话:{contactNumber}<a className={styles.lawyernames}>
                      </a></p>
                      <p className={styles.orderamount}>需求说明:{needsSpec ? needsSpec.slice(0,30) : ''}{needsSpec && needsSpec.length > 30 ? '...' : ''} </p>
                    </div>
                  </Col>
                  <Col lg={9}sm={9}md={9}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}>
                      <p>联系人:{userName}</p>
                      <p>客户:{customerName}</p>
                    </div>
                  </Col>
                  <Col lg={7}sm={7}md={7}xs={24}>
                    {orderStatus!=4?
                      <div className={styles.bought_wrapper_mod__table_phone}>
                        {orderStatus==3?
                        <p><a href={"phoneOrder/evaluate/"+id}>去评价</a></p>
                          :''}
                          {orderStatus==1?
                        <p><a href={"phoneOrder/pay/"+id}>去催单</a></p>
                            :''}
                      </div>
                      :''}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ul>
            )})
          : <div>没有订单</div>}
        {pagination && pagination.total > 1 ?
          <Pagination defaultPageSize={9} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
          :''}
      </div>
    );
  }
}

export default ConsultationOrder;
