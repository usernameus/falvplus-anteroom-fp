import React, { PropTypes,Component } from 'react'
import { Form, Input ,Button,Select} from 'antd'
import styles from './BusinessDomain.css';
const FormItem = Form.Item;
const Option = Select.Option;
import {downdomain} from '../../utils/config';
import PictureWall from '../upload/PictureWall';

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
  }

  handleOk=()=>{
    this.props.form.validateFields((errors,values)=>{
      values.id=this.props.editid
      if(errors){
        return
      }
      values = {...values,lawyerId: values.lawyerId.map(p=>p.key)}
      this.props.onOk(values)
    })
  }
  onListChange=(fileList)=>{
    this.fileList = fileList;
    const fieldsValue = this.props.form.getFieldsValue();
    const productThumb = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'businessImg': productThumb.length > 0 ? downdomain + productThumb : ''};
    this.props.form.setFieldsValue(newFieldsValue);
    this.props.form.validateFields();
  };

  render(){
    const {
      form: {
        getFieldDecorator,
        },
      lawyerlist,
      lawyerdata,
      modalType
      }=this.props;
    const {businessStr,briefIntroduction,businessDetails,businessImg,domainLawyers}=lawyerdata
    const children = [];
    for (let i = 0; i < lawyerlist.length; i++) {
      children.push(<Option key={lawyerlist[i].id + ''}>{lawyerlist[i].name}</Option>);
    }
    const lawyerNamelist = [];
    for (let i = 0; i <(domainLawyers ? domainLawyers.length : 0); i++) {
      lawyerNamelist.push({key:domainLawyers[i].lawyerId + '',label:domainLawyers[i].lawyerStr});
    }
    const fileList = businessImg ? [{
      uid: -1,
      status: 'done',
      name: businessImg,
      url: businessImg
    }] : [];
    return(
      <div>
        <form>
          <FormItem label='业务名称：' hasFeedback {...formItemLayout} >
            {getFieldDecorator('businessStr',{
              initialValue:modalType == 'update' ? businessStr : '',
              rules: [
                {
                  required: true,
                  message: '业务领域未填写'
                }
              ]
            })(<Input/>)}
          </FormItem>
          <FormItem label='业务简介：' hasFeedback {...formItemLayout} >
            {getFieldDecorator('briefIntroduction',{
              initialValue:modalType == 'update' ? briefIntroduction : '',
              rules: [
                {
                  required: true,
                  message: '业务简介未填写'
                }
              ]
            })(<Input type="textarea" rows={4}/>)}
          </FormItem>
          <FormItem label='业务详情：' hasFeedback {...formItemLayout} >
            {getFieldDecorator('businessDetails',{
              initialValue:modalType == 'update' ? businessDetails : '',
              rules: [
                {
                  required: true,
                  message: '业务详情未填写'
                }
              ]
            })(<Input type="textarea" rows={10}/>)}
          </FormItem>
          <FormItem label='添加律师：' hasFeedback {...formItemLayout} >
            {getFieldDecorator('lawyerId',{
              initialValue:modalType == 'update' ?lawyerNamelist : [],
              rules: [
                {
                  required: true,
                  message: '请选择律师'
                }
              ]
            })(<Select labelInValue={true}
              mode="multiple"
              style={{ width: '100%' }}
            >
              {children}
            </Select>)}
          </FormItem>
          <FormItem label='相关图片：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('businessImg', {
              initialValue:modalType == 'update' ? businessImg : '',
              rules: [
                {
                  required: true,
                  message: '不能为空'
                },
              ]
            })(<Input type="hidden" />)}
            <PictureWall maxFile={1} fileList={modalType == 'update' ? fileList : ''} onListChange={this.onListChange}/>
          </FormItem>
        </form>
        <Button size='large' type="primary" className={styles.position_sure} onClick={this.handleOk}>确定</Button>
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

