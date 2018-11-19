import React, { PropTypes } from 'react'
import {Row, Col, Form, Input,Select, DatePicker, Button,Modal,Cascader } from 'antd'
import moment from 'moment'
import SelectModal from '../ui/SelectModal';
import styles from './list.less';

const FormItem = Form.Item
const Option = Select.Option
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}


const modal = ({
  visible,
  modalType,
  onOk,
  onOkAdd,
  onCancel,
  onSaveCrmDictList,
  customerInfo,
  dictLists:{
    customerTypeList,
    followStatusList,
    sWebProvinceList,
    sourceList,
    scaleList,
    industryList
},
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }
  function handleOkAdd(){
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOkAdd(data)
    })
  }

  function getInitValue(obj, prop){
    return obj && obj[prop] ? obj[prop].toString() : '';
  }

  const modalOpts = {
    title: `${modalType === 'create' ? '新增客户' : '编辑客户'}`,
    visible,
    onOk: handleOk,
    onOkAdd:handleOkAdd,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  function onChange(value) {
    console.log(value);
  }

  const nextFollowTime = customerInfo?moment(new Date(customerInfo.nextFollow)):null;

  const saveCustomerTypes = (valuelist) => {
    console.log(valuelist);
    onSaveCrmDictList('customer_type', valuelist);
  }
  const saveFollowStatus = (valuelist) => {
    onSaveCrmDictList('follow_status', valuelist);
  }

  const saveSourceList = (valuelist) => {
    onSaveCrmDictList('source', valuelist);
  }

  const saveIndustries = (valuelist) => {
    onSaveCrmDictList('industry', valuelist);
  }

  const saveScaleList = (valuelist) => {
    onSaveCrmDictList('scale', valuelist);
  }

  return (
    <Modal {...modalOpts} footer={[
      <Button key="cancel" size="default" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" size="default" onClick={handleOk}>保存</Button>
    ]}>
      <Form layout="horizontal">
        <FormItem>
          {getFieldDecorator('id', {
            initialValue: getInitValue(customerInfo, 'id')
          })(<Input type="hidden"/>)}
        </FormItem>
        <FormItem label='客户名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('customerName', {
            initialValue: getInitValue(customerInfo,'customerName'),
            rules: [
              {
                required: true,
                message: '客户名称未填写'
              }
            ]
          })(<Input maxLength={64}/>)}
        </FormItem>
        <FormItem label='客户类型：' hasFeedback {...formItemLayout} className='selectModalItem'>
          {getFieldDecorator('customerType', {
            initialValue: getInitValue(customerInfo,'customerType'),
            valuePropName: 'currentValue',
            getValueFromEvent: function(e) {
              if(!e || !e.target){
                return e;
              }
              const {target} = e;
              return target.type === 'checkbox' ?  target.checked : target.value ;

            },
            rules: [
              {
                required: true,
                message: '客户类型未填写'
              }
            ]
          })(
            <SelectModal modalTitle="客户类型" datalist={customerTypeList}
                         onSaveList={saveCustomerTypes}
                         valueProp="valueCode" textProp="valueName" />
          )}
        </FormItem>
        <FormItem label='电话' hasFeedback {...formItemLayout}>
          {getFieldDecorator('tel', {
            initialValue: getInitValue(customerInfo,'tel'),
            rules: [
              {
                type: 'string',
                pattern: /^[0-9][0-9\-]*[0-9]{5,20}$/,
                message: '电话号码格式不正确(只能输入数字、-)'
              }
            ]
          })(
            <Input type="tel" onKeyDown={(e)=>e.keyCode} maxLength={20}/>
          )}
        </FormItem>
        <FormItem label='邮箱：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: getInitValue(customerInfo,'email'),
            rules:[
              {
                type: 'email',
                message: '邮箱地址格式不正确'
              }
            ]
          })(<Input type='Email' maxLength={120}/>)}
        </FormItem>
        <FormItem label='传真：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('fax', {
            initialValue: getInitValue(customerInfo,'fax'),
            rules:[
              {
                type: 'string',
                pattern: /^[0-9][0-9\-]*[0-9]$/,
                message: '电话号码格式不正确(只能输入数字、-)'
              }
            ]
          })(<Input maxLength={20}/>)}
        </FormItem>
        <FormItem label='网址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('homePage', {
            initialValue: getInitValue(customerInfo,'homePage'),
          })(<Input maxLength={120}/>)}
        </FormItem>
        <FormItem label='地区：' {...formItemLayout}>
          {getFieldDecorator('region',{
            initialValue: customerInfo ? customerInfo.region : []
          })(
            <Cascader options={sWebProvinceList} onChange={onChange} placeholder="请选择地区" />
          )}
        </FormItem>
        <FormItem label='地址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: getInitValue(customerInfo,'address'),
          })(<Input maxLength={120}/>)}
        </FormItem>
        <FormItem label="邮编" {...formItemLayout}>
          {getFieldDecorator('post', {
            initialValue: getInitValue(customerInfo,'post'),
            rules:[
              {
                type: 'string',
                pattern: /^[0-9\-]{0,32}$/,
                message: '邮编格式不正确'
              }
            ]
          })(<Input type="tel" maxLength={32}/>)}
        </FormItem>
        <FormItem label="跟进状态:" {...formItemLayout}>
          {getFieldDecorator('followStatus',{
            initialValue: getInitValue(customerInfo,'followStatus'),
            valuePropName: 'currentValue',
          })(
            <SelectModal modalTitle="跟进状态" datalist={followStatusList}
                         onSaveList={saveFollowStatus}
                         valueProp="valueCode" textProp="valueName" />
          )}
        </FormItem>
        <FormItem label="客户来源:" {...formItemLayout}>
          {getFieldDecorator('source',{
            initialValue: getInitValue(customerInfo,'source'),
            valuePropName: 'currentValue',
          })(
            <SelectModal modalTitle="客户来源" datalist={sourceList}
                         onSaveList={saveSourceList}
                         valueProp="valueCode" textProp="valueName" />
          )}
        </FormItem>
        <FormItem label="所属行业" {...formItemLayout}>
          {getFieldDecorator('industry',{
            initialValue: getInitValue(customerInfo,'industry'),
            valuePropName: 'currentValue',
          })(
            <SelectModal modalTitle="所属行业" datalist={industryList}
                         onSaveList={saveIndustries}
                         valueProp="valueCode" textProp="valueName" />
          )}
        </FormItem>
        <FormItem label="人员规模" {...formItemLayout}>
          {getFieldDecorator('scale', {
            initialValue: getInitValue(customerInfo,'scale'),
            valuePropName: 'currentValue',
          })(
            <SelectModal modalTitle="人员规模" datalist={scaleList}
                         onSaveList={saveScaleList}
                         valueProp="valueCode" textProp="valueName" />
          )}
        </FormItem>
        <FormItem label="下次跟进:" {...formItemLayout}>
          {getFieldDecorator('nextFollow',{
            initialValue: nextFollowTime > 0 ? nextFollowTime : null,
          })(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="选择时间"
            />
          )}
        </FormItem>
        <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator('memo', {
            initialValue: getInitValue(customerInfo, 'memo')
          })(
            <Input type="textarea" rows={4} maxLength={120}/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
