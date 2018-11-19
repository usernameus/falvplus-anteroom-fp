/**
 * Created by zhihangjishu on 17/5/23.
 */
import React, { PropTypes }  from 'react';
import {Form, Button, Icon,Input,Col,Row} from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain, ueditorconfig, ueditorall} from '../../utils/config';



const FormItem = Form.Item;

class EditProfiles extends React.Component {
  handleSubmit = (e,{mobile}) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err&&values.newPassword==values.newPasswords) {
        let params = {
          email: values.email,
          name:values.name,
          avatar: values.avatar,
          newPassword:values.newPassword,
          oldPassword:values.oldPassword,
          newPasswords:values.newPasswords,
          phone:this.props.mobile,
          code:values.code,
          pw:values.pw
        }
        this.props.onSubmit(params)
      }else{
        this.props.onFaulttip()
      }
    });
  }

  onListChange = (fileList) => {
    this.fileList = fileList;
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const fieldsValue = getFieldsValue();
    const avatar = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'avatar': avatar.length > 0 ? downdomain + avatar : ''};
    setFieldsValue(newFieldsValue);
    validateFields();
  }

  handleVerify = ()=>{
    this.props.getVerifyCode(this.props.mobile)
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const {address, email,name,usernameVisible,editVisible,useremailVisible,avatar,logincodeVisible,mobile} = this.props;
    const fileList = avatar ? [{
      uid: -1,
      status: 'done',
      name: avatar,
      url: avatar
    }] : [];
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        {usernameVisible?
          <div>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  { required: true, message: '用户名不能为空' },
                ],
              })(<Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传头像"
            >
              {getFieldDecorator('avatar', {
                initialValue: avatar,
                rules: [
                  { required: true, message: '封面不能为空' },
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={1} fileList={fileList} onListChange={this.onListChange}/>
            </FormItem>
          </div>:''}
        {useremailVisible?
          <FormItem
            {...formItemLayout}
            label="绑定邮箱"
          >
            {getFieldDecorator('email', {
              initialValue: email,
              rules: [
                { required: true, message: '邮箱不能为空' },
              ],
            })(<Input type="email" />
            )}
          </FormItem>:''}
        {editVisible?<div>
          <FormItem
            {...formItemLayout}
            label="请输入旧密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [
                { required: true, message: '密码不能为空' },
              ],
            })(<Input type="password"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请输入新密码"
          >
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: '密码不能为空' },
              ],
            })(<Input type="password"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请再次输入密码"
          >
            {getFieldDecorator('newPasswords', {
              rules: [
                { required: true, message: '密码不能为空' },
              ],
            })(<Input type="password"/>
            )}
          </FormItem>
        </div>:''}
        {logincodeVisible?<div>
          <FormItem {...formItemLayout}
            label="请输入新密码">
            {getFieldDecorator('pw', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]
            })(<Input size='large' placeholder='密码' type="password"/>)}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={10} offset={2}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: '验证码不能为空'
                    }
                  ]
                })(<Input size='large' type='text' placeholder='验证码'/>)}
              </Col>
              <Col span={10}>
                <Button size="large" onClick={this.handleVerify}>获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
        </div>:''}
        <FormItem wrapperCol={{ span: 24 }}>
          <Col span={6} offset={9}>
            <Button type="primary" htmlType="submit">确定修改</Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(EditProfiles);
