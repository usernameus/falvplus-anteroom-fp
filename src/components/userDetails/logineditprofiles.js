/**
 * Created by zhihangjishu on 17/6/1.
 */
import React, { PropTypes }  from 'react';
import {Form, Button, Icon,Input,Col,Row} from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain, ueditorconfig, ueditorall} from '../../utils/config';



const FormItem = Form.Item;

class EditProfile extends React.Component {
  handleSubmit = (e) => {
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
    const {name,avatar,canceleditserModal,onSkip} = this.props;
    const fileList = avatar ? [{
      uid: -1,
      status: 'done',
      name: avatar,
      url: avatar
    }] : [];
    const formItemLayout = {
      labelCol: { span:6},
      wrapperCol: { span: 14},
    };
    return (
      <Form onSubmit={this.handleSubmit}>
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
                  { required: true, message: '头像不能为空' },
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={1} fileList={fileList} onListChange={this.onListChange}/>
            </FormItem>
        <FormItem {...formItemLayout}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button onClick={onSkip}>下次再填</Button>
            <Button type="primary" htmlType="submit" style={{marginLeft: 10}}>提交</Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(EditProfile);
