import React, {PropTypes, Component} from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import { config } from '../utils'
import request from '../utils/request'
import styles from './login.less'

const FormItem = Form.Item

class login extends Component{
  constructor(props){
    super();
    this.state =  {
      loginButtonLoading: false,
      verifyLogin : props.consoleModalVisible,
      remainTime: 0,
      timer: null,
    };
  }
  // componentDidMount = ()=>{
  //   this.userNameInput.focus();
  // }
  switchLoginMethod = ()=>{
    this.setState({verifyLogin : !this.state.verifyLogin});
  }
  handleOk = ()=> {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      this.props.onOk(values, this.state.verifyLogin)
    })
  };
  CheckRegisTer = () =>{
    this.props.form.validateFields((errors, values) => {
      if(values.mobile){
        this.props.CheckRegister(values.mobile)
      }else{
        return
      }
    })
  }

  handleVerify = ()=>{
    this.props.form.validateFields(['username'],(errors, values) => {
      if(errors){
        return
      }
      const username = this.props.form.getFieldValue('username')
      this.props.getVerifyCode(username)
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
    })
  };
  handleVerifys = ()=>{
    this.props.form.validateFields(['mobile'],(errors, values) => {
      if(errors){
        return
      }
      const mobile = this.props.form.getFieldValue('mobile')
      this.props.getVerifyCode(mobile)
      const that = this;
      this.setState({
        remainTime: 60,
        timer: setInterval(function(){
          that.setState({
            remainTime: that.state.remainTime > 0 ? that.state.remainTime - 1 : 0
          });
          if(that.state.remainTime == 0){
            clearInterval(that.state.timer);
            that.setState({
              timer: null
            })
          }
        },1000)
      })
    })
  };

  checkMobile = (rule, value, callback) => {
    if(value == "" || !/^1[0-9]{10}$/.test(value)){
      callback();
      return;
    }
    const result = request(config.apisource + '/api/checkmobile',{
      method: 'get',
      data: {
        mobile: value
      }
    },function(){
      callback(new Error('该手机号码不存在'))
    },function(data){
      callback();
    });
  }


  render() {
    const {
      verifyLogin,
      } = this.state;
    const {
      loginButtonLoading,
      form: {
        getFieldDecorator,
      },
      logoSrc,
      Logo_titleText,
      // verifyLoading,
      registerVisible,
      signinVisible,
      loginState,
    } = this.props;
    let usernameRules = [];
    if(this.state.verifyLogin){
      usernameRules.push({
        required: true,
        message: '请填写您注册的手机号码'
      })
      //usernameRules.push({
      //  pattern: /^1[0-9]{10}$/,
      //  message: '手机号码不正确'
      //})
      usernameRules.push({
        validator:''
      })
    }else{
      usernameRules.push({
        required: true,
        message: '请填写您注册的手机号码/用户名/邮箱'
      })
    }
    return (
      <div className={styles.form + ' shadow'}>
        <div className={styles.logo}>
          <img src={logoSrc}/>
          <p className={styles.Logo_title}>{Logo_titleText}</p>
        </div>
        <form>
          {(signinVisible  || ((location.pathname.startWith('/admin') || location.pathname.startWith('/anteroom')) && location.pathname !== '/'))?<div>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              validateTrigger:'',
              rules: usernameRules
            })(<Input size='large' autoFocus="true" className={styles.inputphone} ref={(r)=>{this.userNameInput = r.refs.input;}}
                      maxLength={32} onPressEnter={this.handleOk} placeholder={verifyLogin ? '手机号码/用户名/邮箱' : '手机号码/用户名/邮箱'}/>)}
          </FormItem>
          {!verifyLogin?
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ]
              })(<Input size='large' type='password' className={styles.inputphone} maxLength={32} onPressEnter={this.handleOk} placeholder='密码'/>)}
            </FormItem>
            : <FormItem hasFeedback>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('verifyCode', {
                  rules: [
                    {
                      required: true,
                      message: '请填写动态码'
                    }
                  ]
                })(<Input size='large' type='text' maxLength={8} className={styles.verifyphone} onPressEnter={this.handleOk} placeholder='动态码'/>)}
              </Col>
              <Col span={12}>
                <Button size="large" onClick={this.handleVerify} className={styles.verifyphone}
                        loading={this.state.remainTime > 0}>{this.state.remainTime> 0 ? '(' + this.state.remainTime+ 's)' : '获取动态码'}</Button>
              </Col>
            </Row>
          </FormItem>
          }</div>:''}

          {registerVisible?<div>
            <FormItem hasFeedback>
              {getFieldDecorator('mobile', {
                validateTrigger:'',
                rules: usernameRules
              })(<Input size='large' autoFocus="true" className={styles.inputphone} ref={(r)=>{this.userNameInput = r.refs.input;}}
                        maxLength={32} onPressEnter={this.handleOk} placeholder= '请输入手机号码'/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('registerPassword', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ]
              })(<Input size='large' type='password' className={styles.inputphone} onChange={this.CheckRegisTer} maxLength={32} onPressEnter={this.handleOk} placeholder='密码'/>)}
            </FormItem>
            <FormItem hasFeedback>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请填写动态码'
                      }
                    ]
                  })(<Input size='large' type='text' maxLength={8} className={styles.verifyphone} onPressEnter={this.handleOk} placeholder='动态码'/>)}
                </Col>
                <Col span={12}>
                  <Button size="large" onClick={this.handleVerifys} className={styles.verifyphone}
                          loading={this.state.remainTime> 0}>{this.state.remainTime> 0 ? '(' + this.state.remainTime+ 's)' : '获取动态码'}</Button>
                </Col>
              </Row>
            </FormItem>
          </div>:''}
          {(signinVisible  || ((location.pathname.startWith('/admin') || location.pathname.startWith('/anteroom')) && location.pathname !== '/'))?<div>
          <Row>
            <Button type='primary' size='large' className={styles.siginphone} onClick={this.handleOk} loading={loginButtonLoading}>
              登录
            </Button>
          </Row>
          <div style={{textAlign: 'right'}} className={styles.siginphone_but}>
            {verifyLogin?
              <a onClick={this.switchLoginMethod}>已有用户 ? 密码登录</a>
              :
              <a onClick={this.switchLoginMethod}>动态码登录</a>
            }
            <div style={{color:'red',fontWeight:'bold',textAlign:'left'}}>{this.props.message}</div>
          </div>
            </div>:''}
          {registerVisible?
          <Row>
            <Button type='primary' size='large' className={styles.siginphone} onClick={this.handleOk} loading={loginButtonLoading}>
              注册
            </Button>
          </Row>:''}
        </form>
      </div>
    )
  }
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(login)
