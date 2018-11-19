import React,{Component} from 'react';
import {Card,Rate,Input,Button} from 'antd';
import QuotePrice from './QuotePrice';

class PriceInfo extends Component{
  constructor(props){
    super(props);
    const initRate = this.props.order ? (this.props.order.rate || 0) : 0;
    this.state = {
      rate: initRate,
      rateComment:''
    }
  }
  changeRate = (value) => {
    this.setState({
      rate: value
    })

  }

  onCommentChange = (event) => {
    this.setState({
      rateComment: event.target.value
    })
  }

  render() {
    const {order,onQuotePrice,isMainCustomer,initRate,onPayType,onRateOrder,priceInfoStatus,completeRequest,completeOrder,refuseCompleteOrder } = this.props;

    const quoteProps = {
      priceStatus: order ? order.priceStatus : 0,
      quotePrice: order ? order.orderAmountY : 0,
      onQuotePrice(values){
        values['quotePrice'] = values['quotePrice'] * 100;
        values['orderId'] = order.orderId;
        onQuotePrice(values);
      }
    }
    const rateOrder = () => {
      onRateOrder(this.state.rate, this.state.rateComment);
    }
    return <Card title="订单信息" bordered={false} style={{fontSize: '1.2em'}}>
        {priceInfoStatus == 11 ?
          <QuotePrice {...quoteProps}/>
          : ''}
        {priceInfoStatus == 12 ?
          <div>
            <p>您的报价:{order.orderAmountY.formatCurrency()}元</p>
            <QuotePrice {...quoteProps}/>
          </div>
          : ''}
        {priceInfoStatus == 13 ?
          <div>
            <p>订单已经支付:{order.orderAmountY.formatCurrency()}元</p>
            <Button type="primary" size="large" onClick={completeRequest} style={{width: '8em'}}>请求结案</Button>
          </div>
          : ''}
        {priceInfoStatus == 14 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>您已经申请结案,请等待客户处理</p>
          </div>
          : ''}
        {priceInfoStatus == 15 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>订单已结案,等待客户评价。</p>
          </div>
          : ''}
        {priceInfoStatus == 16 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>客户已评价</p>
            <Rate disabled allowHalf value={initRate != this.state.rate ? initRate : this.state.rate}></Rate>
          </div>
          : ''}
        {priceInfoStatus == 21 ?
          <div>
            <div>律师尚未报价,请提交资料等待审核</div>
            <div>意向金额:{order.orderAmountY.formatCurrency()}元</div>
            {/*<Button size='large' style={{width:'8em',color:'#fff', backgroundColor:'orange', borderColor:'orange'}} onClick={this.onHandlePay}>去付款</Button>*/}
          </div>
          : ''}
        {priceInfoStatus == 22 ?
          <div>
            <div>律师已报价,请按订单价格支付</div>
            <div>订单价格:{order.orderAmountY.formatCurrency()}元</div>
            <Button size='large' style={{width: '8em', color: '#fff', backgroundColor: 'orange', borderColor: 'orange'}}
                    onClick={()=>onPayType(order.orderAmountY.formatCurrency())}>去付款</Button>
          </div>
          : ''}
        {priceInfoStatus == 23 ?
          <div>
            <div>您已经支付订单金额:{order.orderAmountY.formatCurrency()}元</div>
            {isMainCustomer ?
              <Button size="large" style={{width: '8em'}} onClick={completeOrder}>结案</Button>
              : <div></div>}
          </div>
          : ''}
        {priceInfoStatus == 24 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>律师已经申请结案,请订单发起人处理</p>
            {isMainCustomer ?
              <div>
                <Button type="primary" onClick={completeOrder} style={{marginRight: 10}}>同意</Button>
                <Button type="default" onClick={refuseCompleteOrder}>拒绝</Button>
              </div>
              : <div></div>}
          </div>
          : ''}
        {priceInfoStatus == 25 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>订单已结案, 订单发起人可以评价本次服务。</p>
            {isMainCustomer ?
              <div>
                <Rate allowHalf onChange={this.changeRate} value={this.state.rate}/>
                <Input type="textarea" onBlur={this.onCommentChange} defaultValue={this.state.rateComment}
                       placeholder="请填写您的评价" autosize={{minRows: 3, maxRows: 3}}
                />
                <Button type="primary" onClick={rateOrder}>提交评价</Button>
              </div>
              : <div></div>}
          </div>
          : ''}
        {priceInfoStatus == 26 ?
          <div>
            <p>订单金额:{order.orderAmountY.formatCurrency()}元</p>
            <p>订单已评价:</p>
            <Rate allowHalf disabled value={initRate != this.state.rate ? initRate : this.state.rate}/>
          </div>
          : ''}
      </Card>
      ;

  }
}

export default PriceInfo;
