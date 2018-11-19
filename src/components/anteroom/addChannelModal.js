import React, {Component} from 'react';
import {Form,Row, Col, Button, InputNumber,Modal,Input,Checkbox,Select} from 'antd';
import UserRemoteSelect from '../ui/Select'
import ParentSelect from '../ui/ParentSelect'
const Cookie = require('js-cookie');
class ChannelModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      InvitateModol: false,
      SubchannelModal:false,
      messvalue: '',
      err:{}
    }
  }
  onQueryAddChannel = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(err){
        this.setState({err});
        return;
      }
      this.props.onQueryAddChannel(values);
      this.props.form.resetFields()
      this.setState({
        InvitateModol:false,
        SubchannelModal:false,
      })
    })
  }
  hideModal = () =>{
      this.props.onCancel();
    this.props.form.resetFields()
    this.setState({
      InvitateModol:false,
      SubchannelModal:false,
    })
  }
  handleChange = (event) =>{
    this.setState({messvalue: event.target.value});
  }
  onToggleInvitate = ()=>{
    this.setState({
      InvitateModol:!this.state.InvitateModol
    })
  }
  onSubchannel = ()=>{
    this.setState({
      SubchannelModal:!this.state.SubchannelModal
    })
  }
  handleConfirmUsers = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    value&&value.map((data) =>{
      let UsersType=data&&data.label.indexOf('@')
      var regPhone = /^[0-9]*$/;
      var regEmail = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]*\.){1,4}[a-z]{2,3}$/
      if (UsersType==-1 && !regPhone.test(data.label)&&data.label===data.key) {
        callback('手机号格式不正确')
      }else if(UsersType!=-1 && !regEmail.test(data.label.toLowerCase())&&data.label===data.key){
        callback('邮箱格式不正确')
      }
    })
    callback()
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title="添加频道" visible={this.props.visible} footer={null} onCancel={this.hideModal}>
      <Form onSubmit={this.onQueryAddChannel}>
        <Form.Item label="频道名称:">
          {getFieldDecorator("channelName",{
            initialValue: this.props.quotePrice || '',
            setFieldsValue:this.state.messvalue,
            rules:[
              {required: true, message: '请输入频道名称'}
            ]
          })(<Input onChange={this.handleChange}/>)}
        </Form.Item>
        <Form.Item style={{margin:0}}>
          {getFieldDecorator('Subchannel', {
          })(<Checkbox checked={this.state.SubchannelModal} onClick={this.onSubchannel}>子频道</Checkbox>)}
        </Form.Item>
        {this.state.SubchannelModal?<div>
          <Form.Item style={{margin:0}}>
            {getFieldDecorator('ParentChannel', {
              initialValue:'',
              rules: [
                {
                  required: true,
                  message: ' 请选择父频道'
                }
              ]
            })(<ParentSelect existsUsers={[]}/>)}
          </Form.Item>
          <Row style={{margin:5}}>
            <Col>
              <p style={{color:'#666666'}}>提示:请选择一个父频道</p>
            </Col>
          </Row></div>
          :''}
        <Form.Item label="邀请用户:">
          {getFieldDecorator("Contacts",{
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
              {required: true, message: '请输入要邀请的用户'}, {
                validator: this.handleConfirmUsers
              }
            ]
          })(<UserRemoteSelect existsUsers={[]} initShow={this.props.visible}/>)}
        </Form.Item>
        <Form.Item style={{margin:0}}>
          {getFieldDecorator('switchs', {
          })(<Checkbox checked={this.state.InvitateModol} onClick={this.onToggleInvitate}>发送短信</Checkbox>)}
        </Form.Item>
        {this.state.InvitateModol?<div>
          <Form.Item style={{margin:0}}>
            {getFieldDecorator('messageContent', {
              initialValue: Cookie.get('user_name')+'律师邀请您讨论'+this.state.messvalue+',请通过后附链接进入律师专属会客室。',
              rules: [
                {
                  required: true,
                  message: ' 请填写短信内容'
                }
              ]
            })(<Input type="textarea"  rows={3}/>)}
          </Form.Item>
          <Row style={{margin:5}}>
            <Col>
              <p style={{color:'#666666'}}>提示:请输入0~30个字</p>
            </Col>
          </Row></div>
          :''}
        <Row>
          <Col>
            <Button type="primary" size="large" style={{width:'8em'}} htmlType="submit">确定</Button>
            <Button  size="large" style={{width:'8em',marginLeft:'10px'}} onClick={this.hideModal}>取消</Button>
          </Col>
        </Row>
      </Form>
        </Modal>
    );
  }
}

export default Form.create()(ChannelModal);
