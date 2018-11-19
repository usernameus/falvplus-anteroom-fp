/**
 * Created by fapu on 17-4-13.
 */
import React, { PropTypes } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal ,Row,Col} from 'antd'
import SelectModal from '../ui/SelectModal';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker;

const formItemLayout = {
  style:{
    width:'100%'
  },
  wrapperCol: {
    span: 24
  }
}

const Followup = ({
  customerId,
  onSaveCrmDictList,
  lists:{
    contacts,
    followTypes,
    followStatuses,
  },
  visible,
  saving,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        customerId,
        // followTime: getFieldValue('followTime').format('YYYY-MM-DD HH:mm:ss'),
        // nextFollowTime: getFieldValue('nextFollowTime').format('YYYY-MM-DD HH:mm:ss')
      }
      onOk(data)
    })
  }

  function handleChange(value) {
  }

  function onChange(value, dateString) {
  }

  const modalOpts = {
    title: '跟进记录',
    visible,
    onOk: handleOk,
    onCancel,
  }

  const saveFollowStatusList = (valuelist)=>{
    onSaveCrmDictList('follow_status', valuelist)
  }
  const saveFollowTypeList = (valuelist) => {
    onSaveCrmDictList('follow_type', valuelist)
  }
  return (
    <Modal {...modalOpts} footer={[
      <Button key="cancel" size="default" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" size="default" loading={saving} onClick={handleOk}>保存</Button>,
    ]}>
      <Form layout="inline">
        <Row style={{marginBottom: '1em'}}>
          <Col span={10}>
            <FormItem hasFeedback style={{width:200}} {...formItemLayout} className='selectModalItem'>
              {getFieldDecorator('followType', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '请选择跟进方式'
                  }
                ]
              })(
                <SelectModal modalTitle="跟进方式" datalist={followTypes}
                             placeholder="跟进方式" style={{width:200}}
                         onSaveList={saveFollowTypeList}
                         valueProp="valueCode" textProp="valueName" />
              )}
            </FormItem>
          </Col>
          <Col offset={6} span={8}>
            <FormItem hasFeedback {...formItemLayout}>
              {getFieldDecorator('followTime', {
                initialValue: moment(new Date()),
                rules: [
                  {required: true, message: '请选择跟进时间'}
                ]
              })(
                <DatePicker
                  showTime
                  format="MM-DD HH:mm"
                  placeholder="实际跟进时间"
                  onChange={onChange}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{marginBottom: '1em', width:'100%'}}>
          <Col span={24}>
            <FormItem hasFeedback {...formItemLayout}>
              {getFieldDecorator('content', {
                initialValue: '',
                rules: [
                  {required: true, message:'请填写跟进情况'}
                ]
              })(<Input type="textarea" span={24} rows={6} style={{width: '500px',resize:'none'}} maxLength={200} placeholder="勤跟进"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{marginBottom: '1em'}}>
          <Col span={12}>
            <FormItem label='跟进状态：' hasFeedback {...formItemLayout} className='selectModalItem'>
              {getFieldDecorator('followStatus', {
                initialValue: '',
                rules:[
                  {required: true, mesasge: '请选择跟进状态'}
                ]
              })(
               <SelectModal modalTitle="跟进状态" datalist={followStatuses}
                         placeholder="跟进状态" style={{width:200}}
                         onSaveList={saveFollowStatusList}
                         valueProp="valueCode" textProp="valueName" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{marginBottom: '1em'}}>
          <Col span={12}>
            <FormItem label='联系人：' {...formItemLayout}>
              {getFieldDecorator('contactId', {
                initialValue: contacts.length == 1 ? contacts[0].id.toString() : '',
                rules:[
                  {
                    required: true, message: '请选择跟进联系人'
                  }
                ]
              })(
                <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                placeholder="联系人"
                onChange={handleChange}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                  {contacts.map((contact, index)=> {
                    return <Option key={index} value={contact.id.toString()}>{contact.contactName}</Option>
                  })}
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='下次跟进时间：' hasFeedback {...formItemLayout}>
              {getFieldDecorator('nextFollowTime', {
                initialValue: null
              })(
                <DatePicker
                  showTime
                  format="MM-DD HH:mm"
                  onChange={onChange}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

Followup.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(Followup)
