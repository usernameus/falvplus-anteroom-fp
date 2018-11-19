import React, { PropTypes }  from 'react';
import {Form, Button, Icon,Input,Row,Col,DatePicker} from 'antd';
const {  RangePicker } = DatePicker;
const FormItem = Form.Item;
class Search extends React.Component {
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
          userPhone: values.userPhone,
          startTime: values.startTime?values.startTime._d.format("yyyy-MM-dd "):'',
          endTime: values.endTime?values.endTime._d.format("yyyy-MM-dd "):'',
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
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row>
          <Col lg={6}md={6}xs={12}>
            <FormItem{...formItemLayout} label="回复电话:">
              {getFieldDecorator('userPhone', {
              })(<Input placeholder="输入下单人留下的回复电话"/>
              )}
            </FormItem>
          </Col>
          <Col lg={6}md={6}xs={12}>
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
            <Col lg={6}md={6}xs={12}>
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
          <Col lg={6}md={6}xs={12}>
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
