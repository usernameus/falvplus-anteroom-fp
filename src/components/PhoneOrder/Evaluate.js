import React, {Component} from 'react';
import {Form,Row, Col, Button, InputNumber,Input,Rate,Card} from 'antd';
import styles from './Order.css';

class Evaluate extends Component{
  constructor(props){
    super(props);
  }

  onEvaluate = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(err){
        return;
      }
      this.props.onEvaluate(values);
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {order,EvaluateData}=this.props
    return (
      <div className={styles.normal}>
        {order.data&&order.data.orderStatus==4?
          <div style={{fontSize:'20px',color:'#666666',marginBottom:'30px',marginTop:'30px'}}>评价已完成，期待再次为您服务</div>:
          <div style={{fontSize:'20px',color:'#666666',marginBottom:'30px',marginTop:'30px'}}>服务已完成，请评价律师的服务，谢谢！</div>}
        {order&&order.data?
        <Row>
          <Col lg={{span:24}} >
            <Card className="userInfo" title="订单信息">
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>姓名:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.orderName}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系电话:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.mobile}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>联系地址:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.address}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>已付金额:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.amountY}</Col>
              </Row>
              <Row>
                <Col span={5} style={{fontSize:'20px',lineHeight:'40px'}}>需求说明:</Col>
                <Col style={{fontSize:'18px',lineHeight:'40px'}}>{order.data.needsSpec}</Col>
              </Row>
            </Card>
          </Col>
        </Row>:''}
        {order.data&&order.data.orderStatus==4?'':
      <Form onSubmit={this.onEvaluate}>
        <Form.Item label="评分:">
          {getFieldDecorator("rate",{
            rules:[
              {required: true, message: '请输入频道名称'}
            ]
          })(<Rate />)}
        </Form.Item>
        <Form.Item label="评价:">
          {getFieldDecorator("comment",{

          })(<Input type="textarea"/>)}
        </Form.Item>
        <Row>
          <Col>
            <Button type="primary" size="large" style={{width:'8em'}} htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
        }
      </div>
    );
  }
}

export default Form.create()(Evaluate);
