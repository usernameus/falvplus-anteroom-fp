import React, { PropTypes,Component } from 'react'
import { Form, Input, InputNumber, Radio, Modal} from 'antd'
import { Upload, message, Button, Icon,Tooltip} from 'antd';
import { Select } from 'antd';
import PictureWall from '../upload/PictureWall';
import {downdomain} from '../../utils/config';
import styles from './Myproducts.css'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
      this.props.onOk(values)
    })
  }
  handleBlur=()=>{
    this.props.form.validateFields((errors,values)=>{
      if(values.maxPriceY<values.minPriceY){
        this.props.onBlurs()
      }
    })
  }

  switchModalMethod = (e)=>{
    this.setState({verifyModal : e.target.value == '0' ? false : true});
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
  onListChange=(fileList)=>{
    this.fileList = fileList;
    const fieldsValue = this.props.form.getFieldsValue();
    const productThumb = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'productImg': productThumb.length > 0 ? downdomain + productThumb : ''};
    this.props.form.setFieldsValue(newFieldsValue);
    this.props.form.validateFields();
  };

  handleChangeType = (value) =>{
    if(value!=0){
      this.setState({
        disabledType:true
      })
    }else{
      this.setState({
        disabledType:false
      })
    }
  }
  render(){
    const {
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
      },
      item={},
      productTypes,
      fausetipVisible,
    }=this.props;

    const fileList = item.productImg ? [{
      uid: -1,
      status: 'done',
      name: item.productImg,
      url: item.productImg
    }] : [];

    const {orderType, serviceType,unitList,productPurchaseType} = productTypes;

    return(
      <div className={styles.form+'shadow'} >
        <form>
          <FormItem label='' {...formItemLayout}>
            {getFieldDecorator('lawyerUserId', {
              initialValue:item.lawyerUserId
            })(<Input type="hidden"/>)}
          </FormItem>
          <FormItem label='产品名称：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('productName', {
              initialValue: item.productName,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='产品简介：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('productBrief', {
              initialValue: item.productBrief,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<Input type="textarea" rows={10}/>)}
          </FormItem>
          <FormItem label='产品类型：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('productTypeIdList', {
              initialValue:item.productTypeIdStr,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select mode="tags" style={{ width:'100%'}}>
                {orderType.map(({valueCode, valueName},index) => {
                  return <Option key={index} value={valueName}>{valueName}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label='服务类型：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('serviceTypeIdList', {
              initialValue: item.serviceTypeStr,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select mode="tags" style={{ width:'100%' }}>
                {serviceType.map(({valueCode, valueName},index) => {
                  return <Option key={index} value={valueName}>{valueName}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label='计价单位：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('unit', {
              initialValue: item.unit ? item.unit.toString(): '2',
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select  style={{ width: 120 }} >
                {unitList.map(({valueCode, valueName},index) => {
                  return <Option key={index} value={valueCode.toString()}>{valueName}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label='产品购买类型：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('productPurchaseType', {
              initialValue: item.productPurchaseType || '0',
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(
              <Select style={{ width: 120 }} onChange={this.handleChangeType} >
                {productPurchaseType.map(({value, text},index) => {
                  return <Option key={index} value={value}>{text}</Option>
                })}
              </Select>
            )}
          </FormItem>
          {(!this.state || !this.state.verifyModal)?
            <FormItem label='产品价格：' hasFeedback {...formItemLayout} >
              {getFieldDecorator('shopPriceY',{
                initialValue: item.shopPriceY || 0,
                rules: [
                  {
                    required: true,
                    message: '请输入数字'
                  }
                ]
              })(<InputNumber className={styles.minprice} min={0} onKeyDown={this.onKeyDownone}/>)}
            </FormItem>
            : <div>
            <FormItem label='最低价格' hasFeedback {...formItemLayout} >
              {getFieldDecorator('minPriceY',{
                initialValue:item.minPriceY || 0,
                rules: [
                  {
                    required: true,
                    message:'不能为空'
                  }
                ]
              })(<InputNumber className={styles.minprice} min={0} onKeyDown={this.onKeyDownone}/>)}
            </FormItem>
            <FormItem label='最高价格' hasFeedback {...formItemLayout}>
              {getFieldDecorator('maxPriceY',{
                initialValue:item.maxPriceY || 0,
                rules: [
                  {
                    required: true,
                    message:'不能为空'
                  }
                ]
              })(<InputNumber className={styles.minprice} min={0} onKeyDown={this.onKeyDownone} onBlur={this.handleBlur}/>)}
            </FormItem>
          </div>
          }
          <FormItem label='定价方式'  hasFeedback {...formItemLayout}>
            {getFieldDecorator('custom',{
              initialValue: item.custom || 0,
              rules: [
                {
                  required: true,
                  message:'不能为空'
                }
              ]
            })(<RadioGroup onChange={this.switchModalMethod}>
                <Radio value={0}>固定价格</Radio>
                <Radio value={1} disabled={this.state.disabledType}>自定义价格</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label='产品LOGO：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('productImg', {
              initialValue: item.productImg,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                },
              ]
            })(<Input type="hidden" />)}
            <PictureWall maxFile={1} fileList={fileList} onListChange={this.onListChange}/>
          </FormItem>
          <FormItem label='添加成果物：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('achiement', {
              initialValue: item.achiement,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<Input type="textarea" rows={5}/>)}
          </FormItem>
          <Button size='large' type="primary" className={styles.position_sure} onClick={this.handleOk}>确定</Button>
        </form>
        {fausetipVisible?<p className={styles.falsetip_price}>区间价格输入错误,请重新输入!</p>:''}
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
