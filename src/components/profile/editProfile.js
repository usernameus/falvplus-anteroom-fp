/**
 * Created by mel on 2017/4/10.
 */
import React, {PropTypes} from 'react';
import {Row, Col, Form, Input, Button,Tag,Select,InputNumber} from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain,} from '../../utils/config';

const FormItem = Form.Item;
class EditProfile extends React.Component {
  onListChange = (fileList) => {
    this.fileList = fileList;
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const fieldsValue = getFieldsValue();
    const picUrl = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'picUrl': picUrl.length > 0 ? downdomain + picUrl : ''};
    setFieldsValue(newFieldsValue);
    validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          picUrl: values.picUrl,
          firm: values.firm,
          certificate: values.certificate,
          flaLawyerAdvtype: values.home,
          address: values.address,
          callPrice:values.callPrice,
          contacts:values.contacts,
          contactsPhone:values.contactsPhone
        }
        this.props.onSubmit(params)
      }
    });
  }
  handleChange = (value) => {
  // console.log(`selected ${value}`);
 }
  onKeyDownone =(e)=>{
    if(e.keyCode >=48 && e.keyCode <= 57){
    }else if(e.keyCode==8){
      if(e&& e.stopPropagation){
        code= e.which;
      }else{
        code= window.event.keyCode;
      }
    }else{
      if(e.keyCode == 190){
      }else{
        e.preventDefault();
      }
    }
  };
  checkPhone = (rule, value, callback) => {
    if(!/^[0-9][0-9\-]*[0-9]$/.test(value)){
      callback('手机号只能输入数字')
    }else{
      callback();
    }
  }
  render() {
    const {firmId,firm,picUrl,realName,address,certificate,callPrice,majors,flaLawyerAdvtype,webTypes,contacts,contactsPhone} = this.props;
    const {form} = this.props;
    const Option = Select.Option;
    const children = [];
    const home =[];
    majors&&majors.map((item)=> {
      return (
        children.push(<Option key={item.keys}>{item.values}</Option>)
      )
    })
    majors&&majors.map((item)=> {
      home.push(item.values)
    })


    const {getFieldDecorator} = form;
    let fileList = [];
    if (picUrl) {
      fileList = [{
        uid: -1,
        status: 'done',
        name: picUrl,
        url: picUrl
      }]

    }
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} id="profileForm">
        <FormItem label={webTypes==0?'姓    名':'律   所'} {...formItemLayout}>
          <span>{realName}</span>
        </FormItem>
        <FormItem label={webTypes==0?'律师照片':'头   像'} {...formItemLayout}>
          {getFieldDecorator('picUrl', {
            initialValue: picUrl,
            rules: [
              {
                required: true,
                message: '请上传您的照片'
              }
            ]
          })(<Input type="hidden"/>)}
          <PictureWall maxFile={1} fileList={fileList} onListChange={this.onListChange}/>
        </FormItem>
        <Input type="hidden" value={firmId}/>
        <FormItem label="电话咨询价格" {...formItemLayout}>
          {getFieldDecorator('callPrice', {
            initialValue: callPrice,
            rules: [
              {required: true, message: '请填写您电话咨询的价格'},
            ],
          })(<InputNumber min={0} onKeyDown={this.onKeyDownone}/>)}
        </FormItem>
        <FormItem label="专业领域" {...formItemLayout}>
          {getFieldDecorator('home', {
            initialValue: home,
            rules: [
              {
                required: true,
                message: '请填写您的专业领域'
              }
            ]
          })(<Select
            mode="tags"
            style={{width: '100%'}}
            searchPlaceholder="标签模式"
            allowClear={true}
            onChange={this.handleChange}
          >
          </Select>)}

        </FormItem>
        {webTypes==0?
        <FormItem label="执业机构" {...formItemLayout}>
          {getFieldDecorator('firm', {
            initialValue: firm,
            rules: [
              {required: true, message: '请填写你的执业机构'},
            ],
          })(<Input />)}
        </FormItem>:
          <FormItem label="联系人" {...formItemLayout}>
            {getFieldDecorator('contacts', {
              initialValue: contacts,
              rules: [
                {required: true, message: '请填写你的联系人'},
              ],
            })(<Input />)}
          </FormItem>}
        {webTypes==0?
        <FormItem label="执业证号" {...formItemLayout}>
          {getFieldDecorator('certificate', {
            initialValue: certificate,
            rules: [
              {
                required: true,
                message: '请录入您的执业证号'
              }
            ]
          })(<Input />)}
        </FormItem>:
        <FormItem label="联系电话" {...formItemLayout}>
          {getFieldDecorator('contactsPhone', {
            initialValue: contactsPhone,
            rules: [
              {required: true, message: '请填写你的联系电话'},{
                validator: this.checkPhone
              }
            ],
          })(<Input />)}
        </FormItem>}
        <FormItem label="联系地址" {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [
              {
                required: true,
                message: '请输入您的联系地址'
              }
            ]
          })(<Input />)}
        </FormItem>
        <Row>
          <Col offset={10}>
            <Button type="primary" htmlType="submit" style={{marginRight:5}}>保存</Button>
            <Button onClick={this.props.cancelChange}>取消</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object
}

export default Form.create()(EditProfile);
