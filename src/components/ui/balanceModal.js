import React, { PropTypes } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal,Cascader ,Card} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item
const Option = Select.Option
const Cookie = require('js-cookie');
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}

const modal = ({
  visible,
  onCancel,
  PayData,
  onOk,
  errMsg,
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
  return (<div>
    <Modal onCancel={onCancel} visible={visible} footer={<Button type="primary" size="large" style={{width:'8em'}} onClick={handleOk}>支付</Button>}>
      {PayData?
      <div>
      <h2 style={{marginTop:'30px',textAlign:'center'}}>余额支付</h2>
      <Card title="订单详情" bordered={false}>
        <h4 style={{lineHeight:'30px'}}>订单号:{PayData.order.orderSn}</h4>
        <h4 style={{lineHeight:'30px'}}>手机号:{PayData.order.mobile}</h4>
        {PayData.order.details?<h4 style={{lineHeight:'30px'}}>姓名:{Cookie.get('user_name')}</h4>:
        <h4 style={{lineHeight:'30px'}}>姓名:{PayData.order.orderName}</h4>
        }
        {PayData.order.details?<h4 style={{lineHeight:'30px'}}>产品名称:{PayData.order.details[0].productName}</h4>:
          <h4 style={{lineHeight:'30px'}}>付款金额:{PayData.order.amountY}</h4>
        }

        <h4 style={{lineHeight:'30px'}}>回复电话:{PayData.order.orderPhone}</h4>
        <h4 style={{lineHeight:'30px'}}>需求说明:{PayData.order.needsSpec}</h4>
      </Card>
        <div><h3>账户余额:{PayData.account}</h3></div>
        <Form>
          <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator('password', {
            })(
              <Input type="password" />
            )}
          </FormItem>
        </Form>
        <div style={{color: 'red', textAlign:'center'}}>{errMsg}</div>
      </div>
      : <div>订单不存在</div>}
    </Modal>
    </div>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
