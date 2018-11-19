import React, {Component} from 'react';
import {Form,Modal,Card,Icon,Row,Col,Button,Input,Checkbox,Popconfirm} from 'antd';
import UserRemoteSelect from "../ui/Select"
const Cookie = require('js-cookie');
class Userlist extends Component{
  constructor(props){
    super(props);
    this.state = {
      showInviteModal : false,
      InvitateModol: false,
      showRemoveUserModal: false,
      err:{}
    }
  }
  onInviteUsers = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(err){
        this.setState({err:err});
        return;
      }
      var value={
        switchs:this.state.InvitateModol ? 1 : 0,
        Contacts:values.Contacts,
        messageContent:values.messageContent
      }
      this.props.onInviteUsers(value);
      // this.props.form.resetFields()
      this.setState({
        InvitateModol:false,
      })
    })
  }
  onInviteUser = () => {
    this.props.showInviteUsers()
  }
  oncancel=(e)=> {

}
  onCancelModal = () => {
    this.props.hideInviteUsers()
    this.props.form.resetFields()
    this.setState({
      InvitateModol:false,
    })
  }
  onToggleInvitate = ()=>{
    this.setState({
      InvitateModol:!this.state.InvitateModol
    })
  }

  handleConfirmUsers = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    value&&value.map((data,index) =>{
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
  }

  shouldComponentUpdate(nextProps, nextState){
    return !(JSON.stringify(this.props) == JSON.stringify(nextProps) && JSON.stringify(this.state) == JSON.stringify(nextState) && !this.state.err);
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {userlist,showInviteModal} = this.props;
    const { fetching, data, value } = this.state;
    const userListTitle = <div style={{position:'relative'}}>
      <span>用户</span>
      {this.props.canAdd ?
      <i className="fpanticon fpanticon-adduser" style={{position:'absolute', right: 0, lineHeight: '48px', cursor:'pointer'}} onClick={this.onInviteUser}></i>
        :''}
    </div>
    return (
      <Card title={userListTitle}>
        {userlist && userlist.map((item,index)=>{
          const className =  item.onlineStatus ? 'online' : 'offline';
          return <div key={index}><Icon type="clock-circle" className={className}></Icon>{item.userName} {Cookie.get('r') == 9&&item.role!=2?
          <Popconfirm title="确定把这个用户移除么？" onConfirm={()=>this.props.onRemoveConfirm(item.userId)} onCancel={this.oncancel} overlayStyle={{width: 150}} okText="确定" cancelText="取消">
            <Icon type="close-circle-o" style={{float:'right'}} ></Icon>          </Popconfirm>:''}</div>
        })}
        <Modal title="邀请用户" visible={showInviteModal} footer={null} onCancel={this.onCancelModal}>
          <Form onSubmit={this.onInviteUsers}>
            <Form.Item label="新用户:">
              {getFieldDecorator("Contacts",{
                initialValue: [],
                valuePropName: 'value',
                getValueFromEvent: function(e) {
                  if(!e || !e.target){
                    return e;
                  }
                  const {target} = e;
                  return target.type === 'checkbox' ?  target.checked : target.value ;

                },
                rules: [{
                  required: true,
                  message: '请输入要邀请的用户',
                }, {
                  validator: this.handleConfirmUsers
                }],
              })(<UserRemoteSelect existsUsers={Cookie.get('r') == 9?this.props.userlist:[]} initShow={showInviteModal}/>)}
            </Form.Item>
            <Form.Item style={{margin:0}}>
              {getFieldDecorator('switchs', {
              })(<Checkbox checked={this.state.InvitateModol} onClick={this.onToggleInvitate}>发送短信</Checkbox>)}
            </Form.Item>
            {/*<Row style={{margin:5}}>*/}
              {/*<Col>*/}
                {/*<Checkbox checked={this.state.InvitateModol} onClick={this.onToggleInvitate}>发送短信通知</Checkbox>*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {this.state.InvitateModol?<div>
                <Form.Item style={{margin:0}}>
                  {getFieldDecorator('messageContent', {
                    initialValue:(Cookie.get('user_name')+(Cookie.get('r')== 9?'律师':'')+'邀请您讨论'+userlist.map((item,index)=>{
                      const {channelNickName}=item;
                      if(index==0){
                      return  channelNickName
                      }

                    })+'请通过后附链接进入律师专属会客室。').replace(/,,/g, ""),
                    rules: [
                      {
                        required: true,
                        message: '名称未填写'
                      }
                    ]
                  })(<Input type="textarea" rows={3}/>)}
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
                <Button  size="large" style={{width:'8em',marginLeft:'10px'}} onClick={this.onCancelModal}>取消</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    );
  }
}

export default Form.create() (Userlist);
