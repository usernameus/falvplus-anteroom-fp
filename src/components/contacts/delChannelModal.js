import React, { PropTypes } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal,Cascader,Checkbox,Radio,Popconfirm} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
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
  Deltype,
  onOk,
  onDelOk,
  onCancel,
  contactInfo,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  ChannelList:{
    flaWebContact,
    fparWebChannelList
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        // key: item.key
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${Deltype ? '移除频道' : '删除联系人'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  //客户
  const plainOptions = [];
  fparWebChannelList.length>0&&fparWebChannelList.map((item)=> {
    return (
      plainOptions.push({label:item.channelNickName,value: item.id})
    )
  })
  // const optionsWithDisabled = [
  //   { label: flaWebContact.contactName, value: flaWebContact.userId },

  // ];
  //
  // const birthday = contactInfo && contactInfo.birthday ?moment(new Date(contactInfo.birthday)) : null;

  return (
    <Modal {...modalOpts}footer={[
      <Button key="cancel" size="default" onClick={onCancel}>取消</Button>,
      Deltype&&Deltype?
        <Popconfirm title='确定要删除吗？' overlayStyle={{width:150}} onConfirm={handleOk}>
      <Button key="submit" type="primary" size="default" >移除</Button></Popconfirm>
          :
        <Button key="submit" type="primary" size="default" onClick={onDelOk}>确定</Button>
    ]}>
      {Deltype&&Deltype?
      <Form layout="horizontal">
        <FormItem label="对应频道:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('channelUserId',{
          })(
            <CheckboxGroup options={plainOptions}  />
          )}
        </FormItem>

      </Form>:
        <div>
        {fparWebChannelList && fparWebChannelList.length > 0 ?
      <div style={{textAlign:'center'}}>
        该联系人在
        {fparWebChannelList && fparWebChannelList.length > 0 ?  fparWebChannelList.map((m,index)=>{
          return <span key={index}style={{color:'#0496ff',fontSize:'18px'}}>&nbsp;&nbsp;{m.channelNickName}&nbsp;&nbsp;</span>
        }) : '0个'}频道中;确定删除么？
        </div>:'确定删除么？'}</div>}
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
