import React from 'react';
import { connect } from 'dva';
import styles from './Hope.css';
import HopeOrder from './HopeOrder';
import OrderStep2 from '../../components/order/OrderStep2';
import BalanceModal from '../../components/ui/balanceModal';
function Hope({location, dispatch, order, login, sms}) {
  const {data ,EvaluateData,PayModal,BalancePayModal,PayData,Balance,errMsg,productOrder}=order;
  const productId = location.pathname.getVarFromPath(3);
  const hopeProps = {
    order,
    sms,
    login,
    getValidateCode(mobile){
      dispatch({
        type: 'login/getVerifyCodes',
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
        payload:
        {...requestValues,
          hopeAmount:requestValues.hopeAmount?requestValues.hopeAmount:order.products[0].amountY}
      })
    },
    getUserByMobile(mobile){
      dispatch({
        type: 'sms/getUserInfo',
        payload: {
          mobile: mobile,
          productId:productId,
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
    order: productOrder,
    PayModal:PayModal,
    Balance:Balance,
    PayMethod(value){
      if(value){
        dispatch({
          type:'order/BalancePayQuery',
          payload:{orderId:productOrder.orderId}
        })
      }else{
        dispatch({
          type: 'bill/bcPayBtn',
          payload: {
            title: productOrder.details[0].productName,
            amount: productOrder.amount,
            optional: {
              type:'order',
              'orderId': productOrder.orderId,
              'serverName': location.host,
              orderTitle: productOrder.details[0].productName
            },
            returnurl:window.location.href.replace(/[\?#].*$/,'')
          }
        })
      }
    }
  }
  let currentStep=0;
  if(location.pathname.startWith('/orderflow/payOrder')){
    currentStep = 1;
  }
  if(location.pathname.startWith('/orderflow/payOrder')&&productOrder&&productOrder.orderStatus!=0){
    dispatch({
      type: 'order/creatChannel',
      payload:{
        orderId: productOrder.orderId
      }
    })
   }
  const BalanceModalProps = {
    visible: BalancePayModal,
    PayData:PayData,
    errMsg:errMsg,
    onOk(data){
      dispatch({
        type: 'order/ProBalancePayment',
        payload:{
          password:data.password,
          orderId: productOrder.orderId
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
    <div className="contentcol">
      {currentStep == 0?
        <HopeOrder {...hopeProps}/>
        :''}
      {currentStep == 1?
        <OrderStep2 {...step2Props} />
        :''}
      <BalanceModalGen/>
    </div>
  );
}
function mapStateToProps({order, login, sms}) {
  return {order, login, sms};
}

export default connect(mapStateToProps)(Hope);
