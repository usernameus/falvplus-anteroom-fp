/**
 * Created by fapu on 17-7-28.
 */
import React,{Component} from 'react';
import { Card, Col, Row ,Icon,Button,Timeline,Tabs,Switch,Popconfirm,Pagination,Badge,Tooltip} from 'antd';
import styles from './Profile.less'
const TabPane = Tabs.TabPane;

class NewsInfo extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      list,
      newsNo,
      types,
      pagination,
      onChangeTab,
      loadMore,
      onShowNews,
      role
    } = this.props;

    return (
      <div style={{height:'100%'}}>
        {role&&role==9?
          <Tabs onChange={onChangeTab}>
            <TabPane tab={<Tooltip overlayStyle={{width:'60px'}} placement="top" title="会客室"><Badge count={newsNo.channelNumber}><Icon style={{fontSize:'20px'}} type="home" /></Badge></Tooltip>} key='1'></TabPane>
            <TabPane tab={<Tooltip overlayStyle={{width:'70px'}} placement="top" title="电话咨询"><Badge count={newsNo.conRedDotNumber}><Icon style={{fontSize:'20px'}} type="phone" /></Badge></Tooltip>} key='0'></TabPane>
            <TabPane tab={<Tooltip overlayStyle={{width:'70px'}} placement="top" title="订单消息"><Badge count={newsNo.redDotNumber}><Icon style={{fontSize:'20px'}} type="shopping-cart"/></Badge></Tooltip>}key='2'></TabPane>
          </Tabs>:''}
        {list.data&&list.data.length>0?
          list.data.map((info, index) => {
            return(
              <div key={index}>
                {role&&role==9?
                  <ul key={index}>
                    {types==0?
                      <li  onClick={()=>onShowNews(info.id,"/admin/consultation")} style={{border:'1px solid #f1f1f1',margin:'5px',lineHeight:'25px'}}className={styles.newsInfoLi}>
                        <Row gutter={10}>
                          <Col md={24}>
                            <a> {info.customerName}客户购买了您的电话咨询,请您尽快处理!</a>
                          </Col>
                        </Row>
                      </li>:''}
                    {types==1?
                      <a href={"/anteroom#"+info.channelId}>
                        <li  onClick={()=>onShowNews(info.id,"/anteroom#" + info.channelId)} style={{border:'1px solid #f1f1f1',margin:'5px',lineHeight:'25px'}}className={styles.newsInfoLi}>
                          <Row gutter={10}>
                            <Col md={24}>
                              {info.realName}在您的会客室的{info.nickName}频道给您发了消息,请您尽快处理!
                            </Col>
                          </Row>
                        </li>
                      </a>:''}
                    {types==2?
                      <a>
                        {info.orderStatus==0?
                          <li  onClick={()=>onShowNews(info.id,"/anteroom#"+info.channelId)} style={{border:'1px solid #f1f1f1',lineHeight:'25px',margin:'5px'}}className={styles.newsInfoLi}>
                            <Row gutter={10}>
                              <Col md={24}>
                                客户{info.customerName}进入会客室咨询有关 {info.productName} 的问题，请登录您的会客室进行处理。
                              </Col>
                            </Row>
                          </li>: <li  onClick={()=>onShowNews(info.id,"/anteroom#"+info.channelId)} style={{border:'1px solid #f1f1f1',lineHeight:'25px',margin:'5px'}}className={styles.newsInfoLi}>
                          <Row gutter={10}>
                            <Col md={24}>
                              客户{info.customerName}购买了您的 {info.productName}产品,请登录您的会客室为其服务。
                            </Col>
                          </Row>
                        </li>}
                      </a>:''}
                  </ul>:
                  <ul key={index} style={{width:'300px'}}>
                    <a href={"/anteroom#"+info.channelId}>
                      <li style={{border:'1px solid #f1f1f1',lineHeight:'25px',margin:'5px'}}className={styles.newsInfoLi}>
                        <Row gutter={10}>
                          <Col md={24}>
                            {info.realName}在您的会客室的{info.nickName}频道给您发了消息,请您尽快处理!
                          </Col>
                        </Row>
                      </li></a>
                  </ul>}
              </div>
            )})
          : <div style={{paddingLeft:'20px',paddingBottom:'20px'}}>没有新消息</div>}
        <div>
          {pagination && pagination.total > 5&&list.pageCount>pagination.current ?
            <div style={{textAlign:'center',height:'30px'}} onClick={loadMore}><a > 加载更多</a> </div>
            :''}
        </div>
      </div>
    );
  }
}

export default NewsInfo;
