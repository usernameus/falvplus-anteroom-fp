/**
 * Created by falvplus-dev on 17-3-29.
 */
/**
 * Created by zhihangjishu on 17/2/28.
 */

//selectOptions: [{ value: 'userPhone', name: '客户手机号' },
//  {value:'productName',name:'产品名称'},{value:'orderSn',name:'订单号'}],

import React, { PropTypes }  from 'react';
import {Form, Button, Icon,Input,Row,Col,DatePicker,Select} from 'antd';
const {  RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const Cookie = require('js-cookie');

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          phone: values.phone,
          startTime:values.startTime ? values.startTime._d.format("yyyy-MM-dd"):undefined,
          endTime: values.endTime ? values.endTime._d.format("yyyy-MM-dd") :undefined,
          productName:values.productName,
          orderSn:values.orderSn,
          lawyerName:values.lawyerName == '-2' ? undefined : values.lawyerName
        }
        this.props.onSearch(params)
      }
    });
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  render() {
    const { startValue, endValue, endOpen } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {lawyerlist} =  this.props
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row>
          <Col lg={6}md={6}xs={24}>
            <FormItem{...formItemLayout} label="客戶手机号:">
              {getFieldDecorator('phone', {
              })(<Input placeholder="输入客户手机号"/>
              )}
            </FormItem>
          </Col>
          <Col lg={6}md={6}xs={24}>
            <FormItem{...formItemLayout} label="订单号:">
              {getFieldDecorator('orderSn', {
              })(<Input placeholder="输入订单号"/>
              )}
            </FormItem>
          </Col>
          <Col lg={6}md={6}xs={24}>
            <FormItem{...formItemLayout} label="产品名称:">
              {getFieldDecorator('productName', {
              })(<Input placeholder="输入产品名称"/>
              )}
            </FormItem>
          </Col>
          <Col lg={6}md={6}xs={24}>
            <FormItem
              {...formItemLayout}
              label="开始时间"
            >
              {getFieldDecorator('startTime', {
              })(<DatePicker
                  disabledDate={this.disabledStartDate}
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              )}
            </FormItem>
          </Col>
          <Col lg={6}md={6}xs={24}>
            <FormItem
              {...formItemLayout}
              label="截止时间"
            >
              {getFieldDecorator('endTime', {
              })( <DatePicker
                  disabledDate={this.disabledEndDate}
                  format="YYYY-MM-DD"
                  placeholder="截止时间"
                  onChange={this.onEndChange}
                  onOpenChange={this.handleEndOpenChange}
                />
              )}
            </FormItem>
          </Col>
          { Cookie.get('webType') == 1 ?
          <Col lg={6}md={6}xs={24}>
            <FormItem
              {...formItemLayout}
              label="会客室"
            >
              {getFieldDecorator('lawyerName', {
                initialValue:'全部'
              })(<Select
                  size='default'
                >
                <Option key='-2'>全部</Option>
                <Option key='-1'>律所</Option>
                {lawyerlist.map(({lawyerUserId, domainName},index) => {
                  return <Option key={lawyerUserId}>{domainName}</Option>
                })}
                </Select>
              )}
            </FormItem>
          </Col> : ''}
          <Col lg={6}md={6}xs={24}>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">搜索</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(Search);
