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
    } = this.props;
    return (
      <div className={styles.normall}>
        {list&&list.length>0?
          list.map((data, index) => {
            const {contactNumber,createdAt,payType,payMethod,orderStatus,id,payAmount,realName,orderDetails,orderId,orderSn,channelName,receiveAmount} = data;
            return(
        <ul key={index}>
          <div  style={{color: 'gray', textDecorator: ''}}>
            <div  style={{background: 'white',padding:0}}>
              <div className={styles.mcustoms}>
                <Row>
                  <Col lg={8}sm={8}md={8}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}>
                      {payType=='deposit'?
                        <p>交易对象:{realName}<a className={styles.lawyernames}>
                        </a></p>:''}
                      <p><span>{createdAt}</span></p>
                    </div>
                  </Col>
                  <Col lg={8}sm={8}md={8}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}>
                      <p>交易方式:{payMethod}</p>
                      <p>交易金额:{payAmount/100}元</p>
                    </div>
                  </Col>
                  <Col lg={8}sm={8}md={8}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}>
                      {orderId?
                        <p>订单号: <a  className={styles.lawyernames}>{orderSn}</a></p>
                        :''}
                      <p>交易类型: <span>{payType=='deposit'?'充值':'订单支付'}</span></p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ul>
            )})
          : <div>没有账单</div>}
        {pagination && pagination.total > 1 ?
          <Pagination defaultPageSize={9} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
          :''}
      </div>
    );
  }
}

export default ConsultationOrder;
