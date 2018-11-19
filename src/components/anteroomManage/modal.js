import React, { PropTypes,Component } from 'react'
import { Select,Form, Input, InputNumber, Radio, Modal,Upload, message, Button, Icon,Tooltip } from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain,apisource} from '../../utils/config';
import styles from './anteroomManage.css'
const RadioGroup = Radio.Group;
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
      verifyModal: props.item.domainType,
      addresultsVisible:false,
    }
  }
  handleOk=()=>{
    this.props.form.validateFields((errors,values)=>{
      if(errors){
        return
      }else{
        let params = {
          userId:!isNaN(Number(values.userId))?values.userId:this.props.item.userId,
          domainId:!isNaN(Number(values.domainId))?values.domainId:this.props.item.id,
          businessDomainId:(!isNaN(Number(values.businessDomainId)))?values.businessDomainId:this.props.item.businessDomainId,
          siteName: values.siteName,
          id:values.id,
          domainType:values.domainType
        }
        this.props.onOk(params)
      }

    })
  }
  QuerySelect = (data) => {
    fetch(apisource +data,{
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
          userId: user.id,
          name: user.name
        }))
        const children = [];
        initContacts.forEach(d => children.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.name}>{d.name}</Option>))
        this.setState({children});
      });
  }
  QuerySelectM = (data) => {
    fetch(apisource +data,{
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
          userId: user.id,
          name: user.businessStr
        }))
        const Mchildren = [];
        initContacts.forEach(d => Mchildren.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.name}>{d.name}</Option>))
        this.setState({Mchildren});
      });
  }
  QuerySelectD= () => {
    fetch(apisource +'/api/allLawyerDomain',{
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
          userId: user.id,
          name: user.domainName
        }))
        const Dchildren = [];
        initContacts.forEach(d => Dchildren.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.name}>{d.name}</Option>))
        this.setState({Dchildren});
      });
  }
  switchModalMethod = (e)=>{
    this.setState({verifyModal : e.target.value == '0' ? false : true});
  }
  handleChange = (value) => {
  }
  render(){
    const {
      form: {
        getFieldDecorator,
      },
      item={},
    }=this.props;
    let MajorsInfo='/api/allBusinessDomain';
    let LawyerInfo='/api/fplawyer/allProfile'
    return(
      <div className={styles.form+'shadow'} >
        <form>
          <FormItem label='' {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue:item.id
            })(<Input type="hidden"/>)}
          </FormItem>
          <FormItem label='会客室类型'  hasFeedback {...formItemLayout}>
            {getFieldDecorator('domainType',{
              initialValue: item.domainType || 0,
              rules: [
                {
                  required: true,
                  message:'不能为空'
                }
              ]
            })(<RadioGroup onChange={this.switchModalMethod} value={item.domainType}>
                <Radio value={0}>个人会客室</Radio>
                <Radio value={1}>业务领域会客室</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label='会客室域名：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('domainId', {
              initialValue:item.domainName,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select
                style={{width: '100%'}}
                searchPlaceholder="标签模式"
                allowClear={true}
                onFocus={this.QuerySelectD}
                onChange={this.handleChange}
              >
                {this.state.Dchildren}
              </Select>
            )}
          </FormItem>
          <FormItem label='会客室名称：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('siteName', {
              initialValue:item.siteName,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label='律师姓名：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('userId', {
              initialValue: item.lawyerName,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Select
              style={{width: '100%'}}
              searchPlaceholder="标签模式"
              allowClear={true}
              onFocus={()=>this.QuerySelect(LawyerInfo)}
              onChange={this.handleChange}
            >
              {this.state.children}
            </Select>)}
          </FormItem>
          <p style={{color:'#666666',marginLeft:'25%'}}>提示:只能添加有联系方式的律师</p>
          {(!this.state || !this.state.verifyModal)?'':
          <FormItem label="业务领域" {...formItemLayout}>
            {getFieldDecorator('businessDomainId', {
              initialValue: item.businessStr,
              rules: [
                {
                  required: true,
                  message: '请填写您的业务领域'
                }
              ]
            })(<Select
              style={{width: '100%'}}
              searchPlaceholder="标签模式"
              allowClear={true}
              onFocus={()=>this.QuerySelectM(MajorsInfo)}
              onChange={this.handleChange}
            >
              {this.state.Mchildren}
            </Select>)}
          </FormItem>}
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
