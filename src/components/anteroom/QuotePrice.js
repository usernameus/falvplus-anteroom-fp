import React, {Component} from 'react';
import {Form,Row, Col, Button, InputNumber} from 'antd';

class QuotePriceForm extends Component{
  constructor(props){
    super(props);
  }

  onQuotePrice = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(err){
        return;
      }
      this.props.onQuotePrice(values);
    })
  }
  checkNumber = (rule, value, callback) => {
    if(value>500000){
      callback('报价不可超过50万')
    }if(value<=0){
      callback('输入金额有误')
    }else{
      callback();
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.onQuotePrice}>
        <Form.Item label="报价:">
          {getFieldDecorator("quotePrice",{
            initialValue: this.props.quotePrice || 0,
            rules:[
              {required: true, message: '请输入报价'},{validator: this.checkNumber}
            ]
          })(<InputNumber min={0}/>)}
        </Form.Item>
        <Row>
          <Col>
            <Button type="primary" size="large" style={{width:'8em'}} htmlType="submit">{this.props.priceStatus > 0 ? '重新报价': '报价'}</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(QuotePriceForm);
