import React, { PropTypes, Component} from 'react'
import { Form, Input, InputNumber, Radio, Modal,TimePicker,Button } from 'antd'
const FormItem = Form.Item
import styles from './Scheduler.css'
import { Select} from 'antd';
const Option = Select.Option;
//import moment from 'moment';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class buttoner extends Component{
  constructor(props){
    super(props);
    this.state={
      showSpan:false,
      showdiv:false
    }
  }
  handleAdd =()=>{
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
      }
      this.props.onOk(data)
    })
  }
  handleHide = (e) =>{
    this.setState({
      showSpan:e=="weekend"?true:false,
      showdiv: e=="q"?false:true
    })
  }

  render(){
    const children = [],childrens = [];
    const selection=['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    selection.map((item,index)=> {
      children.push(<Option key={index}>{item}</Option>);
    })
    for (let i = 1; i < 32; i++) {
      childrens.push(<Option key={i}>{i}</Option>);
    }
    const {
      visible,
      type,
      onOk,
      onCancel,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
        }
      }=this.props
    const format = 'HH:mm';
    function range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }
    function disabledMinutes(h) {
      if (h>=0 && h<=23) {
        const minutes = range(0, 60);
        minutes.splice(0,1);
        minutes.splice(14,1);
        minutes.splice(28,1);
        minutes.splice(42,1);
        return minutes;
      }
      return h;
    }

    return (
      <div>
        <form>
          <FormItem label='频率' hasFeedback {...formItemLayout}>
            {getFieldDecorator('seq', {
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select style={{ width: 120 }}  onChange={this.handleHide}>
                <Option value="q">每日</Option>
                <Option value="weekend">每周</Option>
                <Option value="month">每月</Option>
              </Select>
            )}
          </FormItem>
          {this.state.showdiv?this.state.showSpan?
            <FormItem label='至少选择一天：' hasFeedback {...formItemLayout}>
              {getFieldDecorator('whichDay', {
                rules: [
                  {
                    required: true,
                    message: '不能为空'
                  }
                ]
              })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                {children}
              </Select>)}
            </FormItem>:
            <FormItem label='至少选择一天：' hasFeedback {...formItemLayout}>
              {getFieldDecorator('witchDay', {
                rules: [
                  {
                    required: true,
                    message: '不能为空'
                  }
                ]
              })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                {childrens}
              </Select>)}
            </FormItem>:''}
          <FormItem label='开始时间' hasFeedback {...formItemLayout}>
            {getFieldDecorator('startTime', {
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<TimePicker
              //defaultValue={moment('00:00', format)}
              format={format}
              disabledMinutes={disabledMinutes}
              hideDisabledOptions
             />)}
          </FormItem>
          <FormItem label='结束时间' hasFeedback {...formItemLayout}>
            {getFieldDecorator('endTime', {
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<TimePicker
              //defaultValue={moment('00:00', format)}
              format={format}
              disabledMinutes={disabledMinutes}
              hideDisabledOptions/>)}
          </FormItem>
          <FormItem label='状态' hasFeedback {...formItemLayout}>
            {getFieldDecorator('state', {
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select  style={{ width: 120 }}>
                <Option value={1}>可预约</Option>
                <Option value={2}>不可预约</Option>
              </Select>
            )}
          </FormItem>
        </form>
        <a className={styles.adder} onClick={this.handleAdd}>添加</a>
      </div>
    )
  }
}

export default Form.create()(buttoner)
