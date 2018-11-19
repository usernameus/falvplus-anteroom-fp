import React, {Component, PropTypes} from 'react';
import {Row, Col,Form, InputNumber, Button, Input, Card, Select,Icon, Upload} from 'antd';
// import OrderItemList from './OrderItemList';
import {uploadurl} from '../../utils/config';
import styles from './Order.css';
const FormItem = Form.Item;

const Cookie = require('js-cookie');

class OrderStep1 extends Component{
  state = {
    order: this.props.order,
    lostPassword: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.confirmOrder(values)
      }else{
        console.log(err);
      }
    });
  }
  checkPhone = (rule, value, callback) => {
    if(!/^\d{11}$/.test(value)){
      callback('手机号码不正确')
    }else{
      callback();
    }
  }
  onOrderChange = (products) => {
    this.setState({
      order:{
        products: products
      }
    })
  }
  onLostPassword = ()=>{
    this.setState({
      lostPassword: true
    })
  }
  onMobileInputed = (obj, event) => {
    const mobile = obj.target.value;
    if(/^\d{11}$/.test(mobile)){
      this.props.getUserByMobile(mobile);
    }else{
      this.props.smsInit();
      this.setState({
        lostPassword: false
      })
    }
  }
  handleChangeAmount = (value) => {
    this.setState({
      initPriceY: value
    })
  }
  getValidateCode = () => {
    const mobile = this.props.form.getFieldValue('mobile');
    this.props.getValidateCode(mobile);
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const Option = Select.Option;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select className="icp-selector" style={{width: 80}}>
        <Option value="86">+86</Option>
      </Select>
    );
    const products = this.state.order.products || this.props.order.products;
    const listProps = {
      readonly: false,
      products: products,
      form: this.props.form
    };

    const token = Cookie.get('token');
    const uploadProps = {
      name: 'file',
      action: uploadurl,
      xhrFields:{
        withCredentials:token
      },
      headers: {
        'Authorization': `Bearer ` + token
      },
      data:{
        channelId: 0
      },
      onChange(info){
        // const {file,fileList, event} = info;
        // const {name, response, size, status, type,percent, error} = file;
        // console.log(file);
        // if(file.status !== 'uploading'){
        //   console.log(info.file, info.fileList);
        //   if(response){
        //     const newFile = {
        //       fileName:response.fileName,
        //       originPathName:response.url,
        //       fileId: response.fileId,
        //       hash: response.hash,
        //       size: size,
        //       status: status,
        //       fileType: type,
        //       percent: 100,
        //       error: error,
        //       uid: file.uid
        //     };
        //     changeFiles(newFile);
        //   }
        // }else{
        //   console.log(info.file);
        //   const uploadingFile = {
        //     fileName: file.name,
        //     size: file.size,
        //     status: file.status,
        //     fileType: file.type,
        //     percent: file.percent * 0.8,
        //     error: file.error,
        //     uid: file.uid
        //   };
        //   changeFiles(uploadingFile);
        // }
      },
      defaultFileList:[]
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {span: 14, offset: 9}
    }
    const sumBuyCount = products ? products.reduce((pv, c)=>pv + c.buyCount,0) : 0;
    const mobile = Cookie.get('mobile');
    const smsSuccess = this.props.sms.success;

    return (
      <Form onSubmit={this.handleSubmit}>
        <span>感谢您关注本产品, 产品详情如下:</span>
        {/*<OrderItemList {...listProps} onChange={this.onOrderChange}/>*/}
        <Card title="订单意向">
          {products ? products.map((item,index)=>{
            const initPriceY = this.state.initPriceY || item.custom ? item.maxPriceY : item.shopPriceY;
            const minPrice = item.custom ? item.minPrice : item.shopPrice;
            const minPriceY = minPrice / 100;
            return (
              <div key={index}>
                <FormItem>
                  {getFieldDecorator('productId',{
                    initialValue: item.id
                  })(
                    <Input type="hidden"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} style={{fontWeight: 'bold'}} label="产品名称">
                  <span>{item.productName}</span>
                </FormItem>
                <FormItem {...formItemLayout} label="产品简介">
                  <span>{item.productBrief}</span>
                </FormItem>
                <FormItem {...formItemLayout} label="产品价格">
                  <span>￥{item.custom ?
                  Number(item.minPriceY).formatCurrency() + '-' + Number(item.maxPriceY).formatCurrency()
                    : Number(item.shopPriceY).formatCurrency()}元/{item.unitStr}</span>
                </FormItem>
                <FormItem {...formItemLayout} label="预估金额">
                  ￥
                  {getFieldDecorator('hopeAmount',{
                    initialValue: initPriceY,
                    rules: [
                      {required: true, message: '请输入意向金额'}
                    ]
                  })(
                    <InputNumber min={minPriceY} step={100} style={{width: '10em'}}
                                 formatter={value => `${(value+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                onChange={this.handleChangeAmount}/>
                  )}元
                </FormItem>
              </div>
            );
          }):''}
        </Card>

        <Card title="联系方式" className="userinfo">
          <span>请填写并确认您的联系信息,以便本律师与您沟通详情后根据需求情况定制服务价格。</span>
          <FormItem {...formItemLayout} label="电话号码:" hasFeedback={!this.props.login.loginState}>
            {getFieldDecorator('mobile',{
              initialValue: mobile,
              rules:[{
                required: true, message: '请输入您的电话号码'
              },{
                validator: this.checkPhone
              }]
            })(
              this.props.login.loginState ?
                <div>
                  {mobile}
                  <Input type="hidden" value={mobile}/>
                </div>
              : <Input addonBefore={prefixSelector} onChange={this.onMobileInputed}/>
            )}
            {/*{this.props.login.loginState ? <span>{mobile}</span>*/}
            {/*:getFieldDecorator('mobile',{*/}
              {/*initialValue: mobile,*/}
              {/*rules:[{*/}
                {/*required: true, message:'请输入您的电话号码'*/}
              {/*},{*/}
                {/*validator: this.checkPhone*/}
              {/*}]*/}
            {/*})(*/}
              {/*<Input addonBefore={prefixSelector} onChange={this.onMobileInputed}/>*/}
            {/*)*/}
            {/*}*/}
            {smsSuccess ? <span>该手机号码已经注册,请输入密码登录</span> : ''}
          </FormItem>
          {smsSuccess && !this.state.lostPassword ?
            <FormItem {...formItemLayout} label="密码" hasFeedback>
              {getFieldDecorator('password',{
                rules: [{
                  required: true, message: '请输入您的密码'
                }]
              })(
                <Input type="password"/>
              )}
              <a onClick={this.onLostPassword}>忘记密码</a>
            </FormItem>
          : ''}
          {this.props.login.loginState || smsSuccess && !this.state.lostPassword  ? ''
            :
            <FormItem {...formItemLayout} label="验证码" hasFeedback>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('validateCode', {
                    rules:[{
                      required: true, message: '请输入验证码'
                    }]
                  })(
                    <Input />
                  )}
                </Col>
                <Col span={12}>
                  <Button size="large" onClick={this.getValidateCode}>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
          }
          <FormItem {...formItemLayout} label="您的姓名:" hasFeedback>
            {getFieldDecorator('userName',{
              initialValue: this.props.sms.userName,
              rules: [
                {required:true, message: '请输入您的姓名,以便律师知道如何称呼您。' }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="详细地址:" hasFeedback>
            {getFieldDecorator('address',{
              initialValue: this.props.sms.address
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="需求说明" hasFeedback>
            {getFieldDecorator('needsSpec', {
            })(
              <Input type="textarea" autosize={{minRows: 6, maxRows: 10}} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="附件" hasFeedback>
            {getFieldDecorator('files', {
            })(
              <Upload {...uploadProps}>
                <Button><Icon type="upload"/>上传文件</Button>
              </Upload>
            )}
          </FormItem>
          <div style={{color: 'red', fontSize: '1.5em',textAlign:'center'}}>{this.props.order.errMsg}</div>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" disabled={sumBuyCount <= 0} loading={this.props.order.saving}>确认,提交订单</Button>
          </FormItem>
        </Card>
      </Form>
    );
  }

}

OrderStep1.propTypes={
  form: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  // getValidateCode: PropTypes.func,
  confirmOrder: PropTypes.func
}

export default Form.create()(OrderStep1);
