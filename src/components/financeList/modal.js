import React, { PropTypes } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal,Cascader ,Card} from 'antd'
import moment from 'moment'
import styles from './customersProfile.less'
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

const modal = ({
  visible,
  onCancel,
  detailsData

}) => {
  return (
    <Modal onCancel={onCancel} visible={visible} footer={null}>
      {detailsData?
      <div className={styles.DetailsModal}>
      <Card title="详情" bordered={false}>
        <p>姓名:<a href={'/admin/crm/'+detailsData.conId}>{detailsData.contactName}</a></p>
        <p>手机号:{detailsData.conPhone}</p>
        <p>职位:{detailsData.jobTitle}</p>
        <p>邮箱:{detailsData.email}</p>
      </Card>
      <Card title="客户" bordered={false}>
        <p>客户名称:<a href={"/admin/crm/"+detailsData.cuId}>{detailsData.customerName}</a></p>
        <p>客户类型:{detailsData.customerType}</p>
        <p>电话:{detailsData.cutel}</p>
        <p>地址:{detailsData.address}</p>
      </Card>
      <Card title="订单详情" bordered={false}>
        <p>订单号:{detailsData.orderSn}</p>
        <p>订单时间:{detailsData.createdAt}</p>
        <p>手机号:{detailsData.cutel}</p>
        <p>姓名:{detailsData.orderName}</p>
        <p>付款金额:{detailsData.receiveAmount}</p>
        <p>回复电话:{detailsData.orderPhone}</p>
        <p>需求说明:{detailsData.needsSpec}</p>
      </Card>
      </div>
          :''}
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
