import React, {Component, PropTypes} from 'react';
import {Row, Col,Form, InputNumber, Button, Input, Card, Select,Icon, Upload} from 'antd';
import styles from './HopeOrder.less'

const FormItem = Form.Item;
const Cookie = require('js-cookie');

class HopeOrder extends Component{
  state = {
    order: this.props.order,
    lostPassword: false,
    remainTime: 0,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.confirmOrder(values);
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
  onLostPassword = ()=>{
    this.setState({
      lostPassword: true
    })
  }
  onMobileInputed = (obj, event) => {
    const mobile = obj.target.value;
    if(/^\d{11}$/.test(mobile)){
      this.props.getUserByMobile(mobile);
      if(!this.props.form.getFieldValue('contactNumber')){
        this.props.form.setFieldsValue({contactNumber : mobile})
      }
    }else{
      this.props.smsInit();
      this.setState({
        lostPassword: false
      })
    }
  }
  getValidateCode = () => {
    const mobile = this.props.form.getFieldValue('mobile');
    this.props.getValidateCode(mobile);
    const that = this;
    this.setState({
      remainTime: 60,
      timer: setInterval(function () {
        that.setState({
          remainTime: that.state.remainTime > 0 ? that.state.remainTime - 1 : 0
        });
        if (that.state.remainTime == 0) {
          clearInterval(that.state.timer);
          that.setState({
            timer: null
          })
        }
      }, 1000)
    });
  }

  render(){
    const {profile ,order,sms,webTypes}=this.props;
    const {realName, picUrl,lawyerDesc,callPrice} = profile;
    const lawyerDescs=lawyerDesc?lawyerDesc.replace(/<\/?.+?>/g,""):'';
    const {getFieldDecorator} = this.props.form;
    const {errMsg} = this.props;
    let errMessage = errMsg;
    if(Cookie.get('r') == 9||(sms.code&&sms.code=='LAWYER')){
      errMessage = '不能对您自己的产品下单';
    }
    const Option = Select.Option;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select className="icp-selector" style={{width: 80}}>
        <Option value="86">+86</Option>
      </Select>
    );

    const token = Cookie.get('token');

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
    }
    const mobile = Cookie.get('mobile');
    const smsSuccess = this.props.sms.success;

    return (
      <Row>
        <Col lg={17}>
          <Form onSubmit={this.handleSubmit}>
            <div style={{fontSize:'20px',color:'#666666',marginBottom:'30px',marginTop:'30px'}}>把问题简述给律师 本次电话咨询价格 <span style={{fontSize:'24px',color:'#fd7c00'}}>￥{callPrice}元/次</span></div>

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
                {smsSuccess ? <span>该手机号码已经注册,请输入密码登录</span> : ''}
              </FormItem>
              <FormItem {...formItemLayout} label="联系电话:" >
                {getFieldDecorator('contactNumber',{
                  initialValue: mobile,
                  rules:[]
                })(
                  <Input />
                )}
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
                      <Button size="large" onClick={this.getValidateCode} className={styles.verifyphone}
                              loading={this.state.remainTime > 0}>{this.state.remainTime> 0 ? '(' + this.state.remainTime+ 's)' : '获取动态码'}</Button>
                      {/*<Button size="large" onClick={this.getValidateCode}>获取验证码</Button>*/}
                    </Col>
                  </Row>
                </FormItem>
              }
              <FormItem {...formItemLayout} label="您的姓名:" hasFeedback>
                {getFieldDecorator('userName',{
                  initialValue: Cookie.get('user_name'),
                  rules: [
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
                  <Input type="textarea" autosize={{minRows: 6, maxRows: 10}} maxLength={200} />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large" style={{margin: '0 auto', display:'block'}}
                        disabled={Cookie.get('r') == 9||(sms.code&&sms.code=='LAWYER')} loading={this.props.order.saving}>确认,提交订单</Button>
              </FormItem>
              <div style={{color: 'red', textAlign:'center'}}>{order.errMsg?order.errMsg:''}</div>
              <div style={{color: 'red', textAlign:'center'}}>{errMessage}</div>
            </Card>
            <Card title="电话咨询小贴士">
              <div style={{marginTop:'20px'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>1</div>
                电话咨询收费模式是一次性收取，每次电话咨询时长在半小时左右。</div>
              <div style={{marginTop:'20px'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>2</div>
                填写联系方式便于律师主动联系，请保持手机的畅通。</div>
              <div style={{marginTop:'20px'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'10px',backgroundColor:'#fd7c00',lineHeight:'20px',textAlign:'center',float:'left',marginRight:'10px'}}>3</div>
                律师平时工作繁忙，请耐心等待律师回复。</div>
            </Card>

          </Form>
        </Col>
        <Col lg={6} offset={1} >
          <Card title={webTypes==1?'律所简介':'律师个人介绍'} style={{backgroundColor:'white',marginTop:'96px'}}>
            <div style={{height:'430px'}}>
              <div className={styles.lawyerImg}><img src={picUrl} alt=""/></div>
              <a href="/profile"><h2 style={{textAlign:'center',marginTop:'25px',color:'#0496ff'}}>{realName}</h2></a>
              <p style={{padding:'15px',color:'#999999',fontSize:'14px'}} >{lawyerDescs.slice(0,130)}{lawyerDescs.length > 130 ? '...' : ''}</p>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

HopeOrder.propTypes = {
}

export default Form.create()(HopeOrder);

