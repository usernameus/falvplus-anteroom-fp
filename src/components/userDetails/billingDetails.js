/**
 * Created by fapu on 17-6-15.
 */
import React,{Component} from 'react';
import { Card, Col, Row ,Icon,Button,Timeline,Pagination,Tabs} from 'antd';
import styles from './customerOrder.less'
const TabPane = Tabs.TabPane;
class ConsultationOrder extends Component {
  constructor(props){
    super(props);

  }
  render(){
    const {
      list,
      pagination,
      onPageChange,
      onChangeBillTab
    } = this.props;
    const panes = [
      {title: '全部明细', content: '', key: '1'},
      {title: '充值记录', content: '', key: '2'},
      {title: '消费记录', content: '', key: '4'},
      {title: '提现记录', content: '', key: '5'},
    ]
    return (
      <div className={styles.normall}>
        <Tabs onChange={onChangeBillTab}>
          {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
        </Tabs>
        {list&&list.length>0?
          list.map((data, index) => {
            const {contactNumber,createdAt,opAmount,opNote,orderStatus,id,accountBalance,opType,orderDetails,orderId,orderSn,channelName,receiveAmount} = data;
            return(
        <ul key={index}>
          <div  style={{color: 'gray', textDecorator: ''}}>
            <div  style={{background: 'white',padding:0}}>
              <div className={styles.mcustoms}>
                <Row>
                  <Col lg={24}sm={24}md={24}xs={24}>
                    <div className={styles.bought_wrapper_mod__table_phone}style={{width:'100%'}}>
                      <p >{opNote}</p>
                      <p>
                        <span>{createdAt}</span>
                        <span style={{marginLeft:'85px'}}>余额:{accountBalance/100}元</span>
                        <span style={{marginLeft:'85px'}}>{opType}</span>
                        <span style={{float:'right'}}>{opAmount>0?<span style={{color:'green'}}>+{opAmount}元</span>:<span style={{color:'red'}}>{opAmount}元</span>}</span>
                        {orderId?
                          <span style={{marginLeft:'85px'}}>订单Id: <a  className={styles.lawyernames} href="myorder">{orderId}</a></span>
                          :''}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ul>
            )})
          : <div>没有记录</div>}
        {pagination && pagination.total > 1 ?
          <Pagination defaultPageSize={9} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
          :''}
      </div>
    );
  }
}

export default ConsultationOrder;
