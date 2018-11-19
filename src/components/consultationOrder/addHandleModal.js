import React, { PropTypes,Component } from 'react'
import { Form, Input,Select, DatePicker, Button,Modal,Cascader } from 'antd'
import moment from 'moment'
import LawyerListSelect from '../ui/phoneLawyerSelect'
import {apisource} from '../../utils/config';
import 'moment/locale/zh-cn';
const Cookie = require('js-cookie')
let token = Cookie.get('token');
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
    }
  }
  handleOk =() =>{
    this.props.form.validateFields((errors,values) => {
      if (errors) {
        return
      }
      this.props.onOk(values)
    })
  }
  QueryUser = () => {
    // this.setState({ fetching: true });
    fetch(apisource +'/api/fplawyer/phoneConsultation',{
      method:'get',
      xhrFields:{
        withCredentials:token
      },
      headers: {
        'Authorization': `Bearer ` + token
      }
    },)
      .then(response => response.json())
      .then((body) => {
        const initContacts = body.map((user)=>({
          userId: user.userId,
          name: user.realName
        }))
        const children = [];
        initContacts.forEach(d => children.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.name}>{d.name}</Option>))
        this.setState({children});
      });
  }
  render(){
    const {
      visible,
      modalType,
      onCancel,
      form: {
        getFieldDecorator,
      }
    }=this.props;

    const modalOpts = {
      title: `添加处理人`,
      visible,
      onCancel,
      wrapClassName: 'vertical-center-modal'
    }


    return (
      <Modal {...modalOpts} footer={[
        <Button key="cancel" size="default" onClick={onCancel}>取消</Button>,
        <Button key="submit" type="primary" size="default" onClick={this.handleOk}>保存</Button>
      ]}>
        <Form layout="horizontal">
          <Form.Item label="律师:">
            {getFieldDecorator("realName",{
              initValue:[],
              valuePropName: 'value',
              getValueFromEvent: function(e) {
                if(!e || !e.target){
                  return e;
                }
                const {target} = e;
                return target.type === 'checkbox' ?  target.checked : target.value ;

              },
              rules:[
                {required: true, message: '请输入处理人'}
              ]
            })( <Select onFocus={this.QueryUser} style={{ width:'100%' }}>
              {this.state.children&&this.state.children.map((item,index) => {
                return <Option key={index} value={item.props.value}>{item.props.title}</Option>
              })}
            </Select>)}
          </Form.Item>
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
