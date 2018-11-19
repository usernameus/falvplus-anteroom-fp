import React from 'react';
import { connect } from 'dva';
import {Modal, Form, Input, Button} from 'antd';
import Svcsteps from '../components/service/PhoneSvcsteps';
import OrderStep1 from '../components/PhoneOrder/OrderStep1';
import OrderStep2 from '../components/PhoneOrder/OrderStep2';
import OrderStep3 from '../components/PhoneOrder/OrderStep3';
import BalanceModal from '../components/ui/balanceModal';
import Evaluate from '../components/PhoneOrder/Evaluate';
import styles from './Profile.less';
function Order({location, dispatch,children, order, params,sms,login,profile,fhome}) {
  const {data ,EvaluateData,PayModal,BalancePayModal,PayData,Balance,errMsg}=order;
  const {loginState}=login
  const {headerData}=fhome;
  const {webTypes,hideData}=headerData;
  const PhoneOrderId = location.pathname.getVarFromPath(3);
  const orderId = params.orderId || order.orderId;
  let currentStep=0;
  if(location.pathname.startWith('/phoneOrder/pay')){
    currentStep = 1;
  }
  if(data!=undefined&&location.pathname.startWith('/phoneOrder/pay')){
  if(location.pathname.startWith('/phoneOrder/pay')&&data.orderStatus!=0){
    currentStep = 2;
  }else{
    currentStep = 1;
  }
  }
  if(location.pathname.startWith('/phoneOrder/evaluate/')){
    currentStep = 3;
  }
  const step1Props = {
    webTypes,
    profile,
    order,
    sms,
    login,
    getValidateCode(mobile){
      dispatch({
        type: 'sms/getValidateCode',
        payload:{
          phone: mobile
        }
      })
    },
    confirmOrder(values){
      let requestValues = values;
      if(requestValues.files && requestValues.files.fileList.length > 0){
        const attatchments = requestValues.files.fileList
          .filter((f)=>f.status == 'done')
          .map((item,index)=>{
          return {
            uid: item.uid,
            fileName: item.name,
            fileId: item.response.fileId,
            url: item.response.url
          }
        });
        requestValues.attachments = attatchments;
        delete requestValues.files;
      }
      dispatch({
        type: 'order/PhoneConfirmOrder',
        payload:{...requestValues,
          contactNumber:requestValues.contactNumber==""?requestValues.mobile:requestValues.contactNumber}
      })
    },
    getUserByMobile(mobile){
      dispatch({
        type: 'sms/getUserInfo',
        payload: {
          mobile: mobile,
          productId:'-1',
        }
      })
    },
    smsInit(){
      dispatch({
        type: 'sms/smsInit'
      })
    }
  }
  const step2Props = {
    order: order,
    PayModal:PayModal,
    Balance:Balance,
    PayMethod(value){
      if(value){
        dispatch({
          type:'order/BalancePayQuery',
          payload:{orderId:order.data.orderId}
        })
      }else{
        dispatch({
          type: 'bill/bcPayBtn',
          payload: {
            title: '电话咨询',
            amount: order.data.amount,
            optional: {
              type:'order',
              'orderId': order.data.orderId,
              'serverName': location.host,
              orderTitle: '电话咨询'
            },
            returnurl:window.location.href.replace(/[\?#].*$/,'')
          }
        })
      }
    }
  }
  const step3Props = {
     order:order

  }
  const step4Props = {
    order:order,
    EvaluateData:EvaluateData,

  }
  const onConsultClick = () => {
      dispatch({
        type: 'fhome/consult',
        payload: loginState
      })
  }
  const onEvaluate = (values) => {
    dispatch({
      type: 'order/EvaluateComment',
      payload: {
        ...values,
        orderId:PhoneOrderId
      }
    })
  }
  const BalanceModalProps = {
    visible: BalancePayModal,
    PayData:PayData,
    errMsg:errMsg,
    onOk(data){
      dispatch({
        type: 'order/BalancePayment',
        payload:{
          password:data.password,
          orderId: order.data.orderId
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideBalancePayModal'
      })
    }
  }
  const BalanceModalGen = () =>
    <BalanceModal {...BalanceModalProps} />
  return (
    <div className={styles.normalRowPhone}>
      <Svcsteps currentStep={currentStep}/>
      {currentStep == 0?
        <OrderStep1 {...step1Props}  />
      :''}
      {currentStep == 1?
        <OrderStep2 {...step2Props} />
        :''}
      {currentStep == 2?
        <OrderStep3 {...step3Props}  onConsultClick={onConsultClick}/>
      :''}
      {currentStep == 3?
        <Evaluate {...step4Props} onEvaluate={onEvaluate}/>
        :''}
      <BalanceModalGen/>
    </div>

  );
}

export default connect(({order, sms, login,profile,fhome})=>({order, sms, login,profile,fhome}))(Order);
