/**
 * Created by mel on 2017/9/10.
 */
import React, {Component} from 'react';
import {Steps,Card} from 'antd';
import PriceInfo from './PriceInfo';
const Cookie = require('js-cookie');
const Step = Steps.Step;

class OrderSteps extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {lastOrder,orders,isMainCustomer, initRate, onQuotePrice, onPayType, onRateOrder,completeRequest,completeOrder,refuseCompleteOrder} = this.props;
        let priceInfoStatus = 0;
    if(Cookie.get('r') == 9 && lastOrder){
      // 律师信息
      if ((lastOrder.priceStatus == null || lastOrder.priceStatus == 0)&&lastOrder.productPurchaseType==0){
        // 定价协商
        priceInfoStatus = 11;
      }else if(lastOrder.orderStatus == 0){
        // 未付款,重新报价
        priceInfoStatus = 12;
      }else if(lastOrder.orderStatus == 1){
        // 已支付
        priceInfoStatus = 13;
      }else if(lastOrder.orderStatus == 2){
        // 已申请结案
        priceInfoStatus = 14;
      }else if(lastOrder.orderStatus == 3){
        // 已结案 ,待评价
        priceInfoStatus = 15;
      }else if(lastOrder.orderStatus == 4){
        // 已经评价
        priceInfoStatus = 16;
      }else if(lastOrder.orderStatus == 5){
        // 已经归档
        priceInfoStatus = 17;
      }
    }else if(lastOrder){
      // 客户信息
      if((lastOrder.priceStatus == null || lastOrder.priceStatus == 0)&&lastOrder.productPurchaseType==0){
        // 定价协商
        priceInfoStatus = 21;
      }else if(lastOrder.orderStatus == 0){
        // 未付款,可重新报价
        priceInfoStatus = 22;
      }else if(lastOrder.orderStatus == 1){
        // 已支付
        priceInfoStatus = 23;
      }else if(lastOrder.orderStatus == 2){
        // 已申请结案
        priceInfoStatus = 24;
      }else if(lastOrder.orderStatus == 3){
        // 已结案 ,待评价
        priceInfoStatus = 25;
      }else if(lastOrder.orderStatus == 4){
        // 已经评价
        priceInfoStatus = 26;
      }else if(lastOrder.orderStatus == 5){
        // 已经归档
        priceInfoStatus = 27;
      }
    }
    const priceInfoProps = {
      order:lastOrder,
      isMainCustomer,
      initRate,
      priceInfoStatus,
      onQuotePrice,
      onPayType,
      onRateOrder,
      completeRequest,
      completeOrder,
      refuseCompleteOrder
    }
    const currentStep = priceInfoStatus % 10;
    return <div　style={{padding: '20px', overflowY:'scroll'}}>
        {lastOrder  ? <PriceInfo {...priceInfoProps}/> : ''}
        {orders && orders.length > 0 ?
          <Card>
            {lastOrder&&lastOrder.productPurchaseType==0?
              <Steps current={currentStep} style={{padding: '20px 0'}} direction="vertical">
                <Step title="意向订单" description=""/>
                <Step title="协商定价" description=""/>
                <Step title="支付服务费" description=""/>
                <Step title="开始法律服务" description=""/>
                <Step title="确认服务完成" description=""/>
                <Step title="评价我的服务" description=""/>
              </Steps>:
              <Steps current={currentStep-1} style={{padding: '20px 0'}}direction="vertical">
                <Step title="确定订单" description=""/>
                <Step title="支付服务费" description=""/>
                <Step title="开始法律服务" description=""/>
                <Step title="确认服务完成" description=""/>
                <Step title="评价我的服务" description=""/>
              </Steps>}
          </Card>
          :''}
      </div>

  }

}

export default OrderSteps;
