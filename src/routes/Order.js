import React from 'react';
import { connect } from 'dva';
import {Modal, Form, Input, Button} from 'antd';
import Svcsteps from '../components/service/Svcsteps';
import OrderStep1 from '../components/order/OrderStep1';
import OrderStep2 from '../components/order/OrderStep2';
import OrderStep3 from '../components/order/OrderStep3';
import styles from './Profile.less';

const FormItem = Form.Item;

function Order({location, dispatch,children, order, params,sms,login}) {
  const orderId = params.orderId || order.orderId;

  let currentStep = 0;
  if(location.pathname.startWith('/order/evaluation')){
    currentStep = 1;
  }
  if(orderId){
    currentStep = 1;
  }
  if(location.pathname.startWith('/order/service')){
    currentStep = 2;
  }
  const step1Props = {
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
        type: 'order/confirmOrder',
        payload:requestValues
      })
    },
    getUserByMobile(mobile){
      dispatch({
        type: 'sms/getUserInfo',
        payload: {
          mobile: mobile
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
    onPayBtn(){
      let title = order.data.details[0].productName.slice(0,32);
      dispatch({
        type: 'bill/bcPayBtn',
        payload: {
          title: title,
          amount: order.data.amount,
          optional: {
            type:'order',
            'orderId': params.orderId
          }
        }
      })

    }
  }

  const step3Props = {
     order:order
  }

  const formItemLayout = {


  }
  const modalLogin = ()=>
    <Modal title="登录">
      <Form>
        <FormItem {...formItemLayout}>

        </FormItem>
        <FormItem {...formItemLayout}>

        </FormItem>
      </Form>
    </Modal>


  return (
    <div className={styles.normalRow}>
      <Svcsteps currentStep={currentStep}/>
      {currentStep == 0?
        <OrderStep1 {...step1Props} {...params} />
      :''}
      {currentStep == 1?
        <OrderStep2 {...step2Props} {...params} />
        :''}
      {currentStep == 2?
        <OrderStep3 {...step3Props} {...params} />
      :''}
      {children}
    </div>

  );
}

export default connect(({order, sms, login})=>({order, sms, login}))(Order);
