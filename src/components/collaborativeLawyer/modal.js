import React, { PropTypes,Component } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal,Cascader } from 'antd'
import moment from 'moment'

import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class modal extends Component{
  constructor(props){
    super(props);
    this.state={
      telTest:/^1[0-9]{10}$/,
      telValue:'0'
    }
  }
  handleOk =() =>{
    this.props.form.validateFields((errors,values) => {
      if (errors) {
        return
      }
      this.props.onOk(values,this.state.telValue)
    })
  }
  QueryLawyer=()=>{
    this.props.form.validateFields((errors,values) => {
      if(errors){
        if (errors.phone) {
          return
        }}
      this.props.onQueryLawyer(values.phone)
    })
  }
  onhandleChange=(value)=>{
    if(value==0){
      this.setState({telTest : /^1[0-9]{10}$/,telValue:value});
    }
    else if(value==1){
      this.setState({telTest : /^[0-9]*$/,telValue:value});
    }
  }

  render(){
    const {
      visible,
      modalType,
      handleChange,
      onCancel,
      onLawyerOk,
      contactInfo,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
      },
      listData:{
        regionList,
        customerList
      }
    }=this.props;
    const selectBefore = (
      <Select defaultValue="0" style={{ width: 80 }} onChange={this.onhandleChange}>
        <Option value="0">国内</Option>
        <Option value="1">海外</Option>
      </Select>
    );
    const customers = [];
    customerList&&customerList.map((item)=> {
      return (
        customers.push(<Option key={item.customerId} value={item.customerId.toString()}>{item.customerName}</Option>)
      )
    })

    const birthday = contactInfo && contactInfo.birthday ?moment(new Date(contactInfo.birthday)) : null;

    const modalOpts = {
      title: `${modalType === 'create' ? '新增联系人' : '修改联系人'}`,
      visible,
      onCancel,
      wrapClassName: 'vertical-center-modal'
    }

  return (
    <Modal {...modalOpts}footer={[
      <Button key="cancel" size="default" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" size="default" onClick={this.handleOk}>保存</Button>
    ]}>
      <Form layout="horizontal">
        <FormItem>
          {getFieldDecorator('id', {
            initialValue:contactInfo.id ||'',
          })(<Input type="hidden"/>)}
        </FormItem>
        <FormItem label='手机号 ' hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: contactInfo.phone ||'',
            rules: [
              {
                required: true,
                message: '手机号未填写'
              },
              {
                type: 'string',
                pattern: this.state.telTest,
                message: '手机号码格式不正确'
              }
            ]
          })(
            <Input addonBefore={selectBefore} type="tel" maxLength="11" onBlur={this.QueryLawyer} />
          )}
        </FormItem>
        {contactInfo?<div style={{textAlign:'center',color:'red',marginTop:'-10px'}}>{contactInfo.id!=null&&contactInfo.contactType!=null&&modalType!='update'?'该手机号已是协作律师':''}</div>
        :''}
        {contactInfo?<div style={{textAlign:'center',color:'red',marginTop:'0px'}}>{contactInfo.id!=null&&contactInfo.contactType==null?'该手机号已是联系人，是否进行角色转换？':''}
          {contactInfo.id!=null&&contactInfo.contactType==null?<Button type="primary" onClick={onLawyerOk}>确定</Button>:''}
        </div>
          :''}
        <FormItem label='姓名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactName', {
            initialValue:contactInfo.contactName ||'',
            rules: [
              {
                required: true,
                message: '姓名未填写'
              }
            ]
          })(<Input maxLength={64}/>)}
        </FormItem>
        <FormItem label="所属律所:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('firm',{
            initialValue: contactInfo.firm||'',
          })(
           <Input/>
          )}
        </FormItem>
        <FormItem label='部门：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('depart', {
            initialValue:contactInfo.depart ||'',
          })(<Input maxLength={32}/>)}
        </FormItem>
        <FormItem label='职务：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('jobTitle', {
            initialValue:contactInfo.jobTitle ||'',
          })(<Input maxLength={32}/>)}
        </FormItem>
        <FormItem label='邮箱：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: contactInfo.email ||'',
            rules:[
              {
                type: 'email',
                message: '电子邮件地址格式不正确'
              }
            ]
          })(<Input maxLength={120}/>)}
        </FormItem>
        <FormItem label='电话' hasFeedback {...formItemLayout}>
          {getFieldDecorator('tel', {
            initialValue: contactInfo.tel ||'',
            rules:[
              {
                type: 'string',
                pattern: /^[0-9][0-9\-]*[0-9]$/,
                message: '电话号码格式不正确'
              }
            ]
          })(
            <Input type="tel" maxLength={32}/>
          )}
        </FormItem>
        <FormItem label='网址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: contactInfo.url ||'',
          })(<Input maxLength={120}/>)}
        </FormItem>
        <FormItem label='地区：' {...formItemLayout}>
          {getFieldDecorator('region', {
            initialValue:  contactInfo && contactInfo.region ? contactInfo.region : [],
          })(
            <Cascader options={regionList} placeholder="请选择地区" />
          )}
        </FormItem>
        <FormItem label='地址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: contactInfo.address ||'',
          })(<Input  maxLength={120}/>)}
        </FormItem>
        <FormItem label="邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('post', {
            initialValue: contactInfo.post ||'',
            rules:[
              {
                type: 'string',
                pattern: /^[0-9\-]{0,32}$/,
                message: '邮编格式不正确'
              }
            ]
          })(<Input maxLength={32}/>)}
        </FormItem>
        <FormItem label="性别:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sex',{
            initialValue: contactInfo.sex ? ""+ contactInfo.sex+""  :''
          })(
            <Select>
              <Option key="男" value="1">男</Option>
              <Option key="女" value="2">女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="生日:" {...formItemLayout}>
          {getFieldDecorator('birthday',{
            initialValue: birthday || null
          })(
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="选择日期"
            />
          )}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('memo', {
            initialValue: contactInfo.memo ||'',
          })(
            <Input type="textarea" rows={4} maxLength={120}/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
  }
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
