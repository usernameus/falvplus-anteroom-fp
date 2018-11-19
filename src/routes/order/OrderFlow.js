import React from 'react';
import { connect } from 'dva';
import {Card,Steps,Row,Col} from 'antd';
import Login from '../login';
import styles from '../Profile.less';

function OrderFlow({location, dispatch, children,order, login, fhome}) {
  const Step = Steps.Step;
  let currentStep = order.currentStep || 0;
  const loginProps = {
    ...login,
    onOk(data, loginMethod){
      const payload = {
        ...data,
        holder: false,
        loginMethod:loginMethod
      };
      dispatch({type: 'login/login', payload: payload})
    },
    getVerifyCode(phone){
      dispatch({type:'login/getVerifyCodes', payload:{phone: phone}})
    },
    switchLoginMethod(){
      dispatch({type: 'login/switchLoginMethod'})
    }
  }
  return (
    currentStep > 0 && !login.loginState ?
      <Login {...loginProps}/>
      :
      <div className='contentcol'>
        {currentStep > 0&&(order.products&&order.products[0].productPurchaseType==0) ?
          ''
          :<Card style={{marginTop: '1em'}}>
          <Row>
            <Col xs={0} sm={24} md={24} lg={24} >
              {order.products&&order.products[0].productPurchaseType==0?
                <Steps current={currentStep || 0} style={{padding: '20px 0'}}>
                  <Step title="意向订单" description=""/>
                  <Step title="协商定价" description=""/>
                  <Step title="支付服务费" description=""/>
                  <Step title="开始法律服务" description=""/>
                  <Step title="确认服务完成" description=""/>
                  <Step title="评价我的服务" description=""/>
                </Steps>:
                <Steps current={currentStep || 0} style={{padding: '20px 0'}}>
                  <Step title="确定订单" description=""/>
                  <Step title="支付服务费" description=""/>
                  <Step title="开始法律服务" description=""/>
                  <Step title="确认服务完成" description=""/>
                  <Step title="评价我的服务" description=""/>
                </Steps>}
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={0} md={0} lg={0} style={{marginTop:'25px',marginLeft:'10px'}}>
              {order.products&&order.products[0].productPurchaseType==0?
                <Steps current={currentStep || 0} style={{padding: '20px 0'}} direction="vertical">
                  <Step title="意向订单" description=""/>
                  <Step title="协商定价" description=""/>
                  <Step title="支付服务费" description=""/>
                  <Step title="开始法律服务" description=""/>
                  <Step title="确认服务完成" description=""/>
                  <Step title="评价我的服务" description=""/>
                </Steps>:
                <Steps current={currentStep || 0} style={{padding: '20px 0'}} direction="vertical">
                  <Step title="确定订单" description=""/>
                  <Step title="支付服务费" description=""/>
                  <Step title="开始法律服务" description=""/>
                  <Step title="确认服务完成" description=""/>
                  <Step title="评价我的服务" description=""/>
                </Steps>}
            </Col>
          </Row>
        </Card>}
        {children}
      </div>
  );
}

function mapStateToProps({login, fhome, order}) {
  return {login,fhome, order};
}
export default connect(mapStateToProps)(OrderFlow);
