/**
 * Created by fapu on 17-8-1.
 */
import React, {Component} from 'react';
import { Form, Input,Select, DatePicker, Button,Modal,Cascader,Tabs,Card,Row,Col,Pagination} from 'antd'
const TabPane = Tabs.TabPane;
class packageDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    const {onChangeTab,pagination,packageInfoDetails,onPageChange,dataType,packageInfoMsgDetails,activeKey,packageInfoUseDetails} = this.props;
  return (
    <div style={{marginBottom:'50px'}}>
      {dataType&&dataType==1?
      <div>
        <Tabs onChange={onChangeTab}>
          <TabPane tab='使用详情' key='1'></TabPane>
          <TabPane tab='购买详情' key='2'></TabPane>
        </Tabs>
        {activeKey&&activeKey==1? packageInfoUseDetails&&packageInfoUseDetails.length>0?
          packageInfoUseDetails.map((data,index) => {
            const {phone,createdAt,content}=data;
            return(
              <div>
              <ul key={index}>
                <li style={{border:'1px solid #f1f1f1',margin:'5px'}}>
                  <Row gutter={10}>
                    <Col md={10}>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>发送时间:{createdAt}</p>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>发送的手机号:{phone}</p>
                    </Col>
                    <Col md={14}>
                      <p style={{lineHeight:'20px',fontSize:'12px'}}>短信内容:{content}</p>
                    </Col>
                  </Row>
                </li>
              </ul>
              </div>)}

              )
          : <div>没有新消息</div>:
        packageInfoMsgDetails&&packageInfoMsgDetails.length>0?
          packageInfoMsgDetails.map((data,index) => {
            const {payTime,payNumber,storageType}=data;
            return(
              <ul key={index}>
                <li style={{border:'1px solid #f1f1f1',margin:'5px'}}>
                  <Row gutter={12}>
                    <Col md={12}>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>购买时间:{payTime}</p>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>购买数量:{payNumber}条</p>
                    </Col>
                    <Col md={12}>
                      <p style={{lineHeight:'20px',fontSize:'12px'}}>购买方式:{storageType==0?'套餐内':'额外购买'}</p>
                    </Col>
                  </Row>
                </li>
              </ul>)})
          : <div>没有新消息</div>}
        {pagination && pagination.total > 1&&activeKey==1 ?
          <Pagination defaultPageSize={10} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}}  onChange={onPageChange}/>
          :''}
      </div>: <div>
        {packageInfoDetails&&packageInfoDetails.length>0?
          packageInfoDetails.map((data,index) => {
            const {payTime,number,storageType,expirationDate}=data;
            return(
              <ul key={index}>
                <li style={{border:'1px solid #f1f1f1',margin:'5px'}}>
                  <Row gutter={12}>
                    <Col md={12}>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>购买时间:{payTime}</p>
                      <p style={{lineHeight:'20px',fontSize:'12px',marginLeft:'5px'}}>购买数量:{number}GB</p>
                    </Col>
                    <Col md={12}>
                      <p style={{lineHeight:'20px',fontSize:'12px'}}>购买方式:{storageType==0?'套餐内':'额外购买'}</p>
                      <p style={{lineHeight:'20px',fontSize:'12px'}}>到期时间:{expirationDate}</p>
                    </Col>
                  </Row>
                </li>
              </ul>)})
          : <div>没有新消息</div>}

      </div>}
    </div>
  )
}
}
export default packageDetails;
