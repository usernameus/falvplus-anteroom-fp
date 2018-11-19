import React, { PropTypes,Component } from 'react'
import { Select,Form, Input, InputNumber, Radio, Modal,Upload, message, Button, Icon,Tooltip } from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain,apisource} from '../../utils/config';
import styles from './lawyerList.css'
const Cookie = require('js-cookie')
let token = Cookie.get('token');
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class modall extends Component{
  constructor(props){
    super(props);
    this.state={
      disabledType:false,
      verifyModal: props.item.custom,
      addresultsVisible:false
    }
  }
  handleOk=()=>{
    this.props.form.validateFields((errors,values)=>{
      if(errors){
        return
      }
      // values = {...values,webmajors: values.webmajors.map(p=>p.key)}
      this.props.onOk(values)
    })
  }
  QuerySelect = () => {
    fetch(apisource +'/api/firm/topMajor',{
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
          userId: user.keys,
          name: user.values
        }))
        const childrenMajor = [];
        initContacts.forEach(d => childrenMajor.push(<Option key={'k' + d.userId} value={d.userId.toString()}>{d.name}</Option>))
        this.setState({childrenMajor});
      });
  }
  onListChange = (fileList) => {
    this.fileList = fileList;
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const fieldsValue = getFieldsValue();
    const picture = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'picture': picture.length > 0 ? downdomain + picture : ''};
    setFieldsValue(newFieldsValue);
    validateFields();
  }

  render(){
    const {
      form: {
        getFieldDecorator,
      },
      item={},
    }=this.props;
    const lawyerNamelist = [];
    for (let i = 0; i <(item.webmajors ? item.webmajors.length : 0); i++) {
      lawyerNamelist.push({key:item.webmajors[i].key + '',label:item.webmajors[i].label});
    }
    const fileList = item.picture ? [{
      uid: -1,
      status: 'done',
      name: item.picture,
      url: item.picture
    }] : [];
    return(
      <div className={styles.form+'shadow'} >
        <form>
          <FormItem label='' {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue:item.id
            })(<Input type="hidden"/>)}
          </FormItem>
          <FormItem label='' {...formItemLayout}>
            {getFieldDecorator('firmId', {
              initialValue:item.firmId
            })(<Input type="hidden"/>)}
          </FormItem>
          <FormItem label='律师姓名：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='职务：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('duty', {
              initialValue:item.duty,
              rules: [
                {
                  required: false,
                  message: '不能为空'
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="专业领域" {...formItemLayout}>
            {getFieldDecorator('webmajors', {
              initialValue: lawyerNamelist,
              rules: [
                {
                  required: false,
                  message: '请填写您的专业领域'
                }
              ]
            })(<Select
              mode="tags"
              style={{width: '100%'}}
              labelInValue={true}
              allowClear={true}
              onFocus={this.QuerySelect}
              onChange={this.handleChange}
            >
              {this.state.childrenMajor}
            </Select>)}
          </FormItem>
          <FormItem label='手机号：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  type: 'string',
                  pattern: /^1[0-9]{10}$/,
                  message: '手机号码格式不正确'
                }
              ]
            })(
              <Input type="tel" maxLength={20}/>
            )}
          </FormItem>
          <FormItem label='邮箱：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
              rules: [
                {
                  required: false,
                  message: '不能为空'
                }
              ]
            })(
              <Input type="Email" maxLength={20}/>
            )}
          </FormItem>
          <FormItem label='工作地点：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('place', {
              initialValue:item.place,
              rules: [
                {
                  required: false,
                  message: '不能为空'
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label='头像：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('picture', {
              initialValue: item.picture,
              rules: [
                {
                  required: false,
                  message: '不能为空'
                },
              ]
            })(<Input type="hidden" />)}
            <PictureWall maxFile={1} fileList={fileList} onListChange={this.onListChange}/>
          </FormItem>
          <FormItem label='律师简介：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('lawyerProfiles', {
              initialValue: item.lawyerProfiles,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<Input type="textarea" rows={10}/>)}
          </FormItem>
          <FormItem label='工作经历：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('workExperience', {
              initialValue: item.workExperience,
              rules: [
                {
                  required: false,
                  message: '不能为空'
                }
              ]
            })(<Input type="textarea" rows={10}/>)}
          </FormItem>
          <a onClick={this.handleOk} className={styles.surebutton}>确定</a>
        </form>
      </div>
    )
  }
}

modall.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modall)
