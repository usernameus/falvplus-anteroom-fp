import React,{Component} from 'react';
import { Card, Col, Row ,Icon,Button,Timeline,Tabs,Switch,Popconfirm,Pagination,Modal,Form} from 'antd';
import styles from './customersProfile.less'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Cookie = require('js-cookie');
class Panorama extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      list,
      onChange,
      onAddfollowup,
      onDetails,
      pagination,
      onChangeTab,
      onPageChange,
      onAddLawyer
    } = this.props;
    const panes = [
      {title: '未处理', content: '', key: '1'},
      {title: '已处理', content: '', key: '3'},
    ]
    return (
      <div className={styles.normall}>
        <Tabs onChange={onChangeTab}>
          {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
        </Tabs>
        {list&&list.length>0?
          list.map((data, index) => {
            const {contactNumber,createdAt,needsSpec,userName,orderStatus,id,cuId,contactName,customerName,assigns,orderSn,channelName,receiveAmount} = data;
            return(
              <ul key={index}>
                <div  style={{background: 'white',padding:0}}>
                  <div className={styles.bought_table_mod}><span>电话咨询</span><span style={{marginLeft:'50px'}}>下单时间:{createdAt}</span>
                  </div>
                  <div className={styles.mcustoms}>
                    <Row>
                      <Col lg={6} sm={6} xs={24}>
                        <div className={styles.bought_wrapper_mod__table}>
                          <p>回复电话:<a className={styles.lawyernames}>{contactNumber}
                          </a></p>
                          <p className={styles.orderamount}>需求说明:{needsSpec ? needsSpec.slice(0,30) : ''}{needsSpec && needsSpec.length > 30 ? '...' : ''} </p>
                        </div>
                      </Col>
                      <Col lg={6} sm={6} xs={24}>
                        <div className={styles.bought_wrapper_mod__table}>
                          <p className={styles.orstate}>联系人:{contactName}</p>
                          <p className={styles.changedetails}>客户:{customerName}</p>
                        </div>
                      </Col>
                      <Col lg={6} sm={6} xs={24}>
                        <div className={styles.bought_wrapper_mod__table}>
                          <p><Button href=""onClick={()=>onAddfollowup(cuId)}>+写跟进</Button></p>
                          <p><a onClick={() => onDetails(id)}>咨询详情</a></p>
                        </div>
                      </Col>
                      <Col lg={6} sm={6} xs={24}>
                        <div className={styles.bought_wrapper_mod__table}>
                          {orderStatus==1?
                            <p>
                              <Switch disabled={Cookie.get('webType')==1&&assigns==null?true:false} defaultChecked={false} checkedChildren={'已处理'} unCheckedChildren={'未处理'} onChange={() => {Cookie.get('webType')==1&&assigns==null?onAddLawyer(id):onChange(id)}} />
                            </p>
                          :''}
                          <div>
                            {Cookie.get('webType')==1?
                            <p>
                        {assigns==null?
                          <Button type='primary' onClick={()=>onAddLawyer(id)}>添加处理人</Button>:<span>处理人：{assigns}</span>}
                          </p>:''}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </ul>)})
          : <div>没有订单</div>}
        {pagination && pagination.total > 1 ?
          <Pagination defaultPageSize={10} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
          :''}
      </div>
    );
  }
}

export default Panorama;
