import React, { PropTypes }  from 'react';
import {Form, Button, Icon,Input,Row,Col,DatePicker,Radio,Select} from 'antd';
const {  RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Cookie = require('js-cookie');

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    TimeData:'all',
    value:this.props.b==0||this.props.b==2||this.props.b==3?this.props.b:''
  };
  handleSubmit = (e) => {
    this.setState({value:''});
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          lawyerId:values.lawyerId,
          startTime: values.startTime?values.startTime._d.format("yyyy-MM-dd "):'',
          endTime: values.endTime?this.getNextDay(values.endTime._d.format("yyyy-MM-dd ")):'',
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
  //获取某一时间的后一天
  getNextDay=(d)=>{
  d = new Date(d);
  d = +d + 1000*60*60*24;
  d = new Date(d);
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

}
  //四个选择时间按钮
  onChangeTime=(e) =>{
    this.setState({ value: e.target.value });
    this.props.onTimeSearch(e.target.value)
}
  render() {
  const { startValue, endValue, endOpen } = this.state;
    const {b} = this.props;
    const { getFieldDecorator } = this.props.form;
    const {lawyerlist} =  this.props
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row>
          <Col lg={5}md={5}xs={12}>
            <FormItem wrapperCol={{span:24}}>
              <RadioGroup onChange={this.onChangeTime} value={this.state.value}>
                  <RadioButton value="0">今天</RadioButton>
                  <RadioButton value="1">昨天</RadioButton>
                  <RadioButton value="2">本周</RadioButton>
                  <RadioButton value="3">本月</RadioButton>
                </RadioGroup>
            </FormItem>
          </Col>
          { Cookie.get('webType') == 1 ?
            <Col lg={5}md={5}xs={24}>
              <FormItem
                {...formItemLayout}
                label="会客室"
              >
                {getFieldDecorator('lawyerId', {
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
          <Col lg={5}md={5}xs={12}>
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
            <Col lg={5}md={5}xs={12}>
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
          <Col lg={4}md={4}xs={12}>
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
