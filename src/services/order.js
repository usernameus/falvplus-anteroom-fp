import { request } from '../utils'
import {apisource, roomhost} from '../utils/config'

export async function saveOrder(params) {

  return request(apisource +'/api/order', {
    method: 'post',
    contentType:'application/json;charset=utf-8',
    data: params,
  })
}
export async function balancePayQuery(params){
  const url =apisource + '/api/accountOrder';
  return request(url,{
    method: 'get',
    data: params
  })
}
export async function getOrder(params){
  const urlPtn =apisource + '/api/order/{0}';
  var url = urlPtn.format(params['orderId'])
  return request(url,{
    method: 'get',
    data: ''
  })
}
export async function creatchannel(params){
  const urlPtn =apisource + '/api/creatChannel/{0}';
  var url = urlPtn.format(params['orderId'])
  return request(url,{
    method: 'post',
    data: ''
  })
}

//电话咨询订单详情
export async function queryphoneorder(params){
  const urlPtn =apisource + '/api/orderInfo/{0}';
  var url = urlPtn.format(params.PhoneOrderId)
  return request(url,{
    method: 'get',
  })
}
//查询余额
export async function queryBalance(){
  const url =apisource + '/api/account/remainamount';
  return request(url,{
    method: 'get',
  })
}
//支付密码验证
export async function balancePayment(params){
  const url =apisource + '/api/pay/accountPay';
  return request(url,{
    method: 'get',
    data:params
  })
}
export async function evaluatecomment(params){
  const url =apisource + '/api/comment';
  return request(url,{
    method: 'post',
    data:params
  })
}

export async function PhoneOrder(params){
  const url =apisource + '/api/consultationOrder';
  return request(url,{
    method: 'post',
    data: params
  })
}

export async function getService(params){
  const urlPtn =apisource + '/api/service/{0}';
  var url = urlPtn.format(params['serviceId']);
  return request(url,{
    method: 'get',
    data: ''
  })
}

export async function channelInfo(params) {
  const urlPtn = roomhost + '/channelInfo/{0}';
  var url = urlPtn.format(params['orderId']);
  return request(url, {
    method: 'get',
    data: ''
  })
}

export async function quoteOrderPrice(params){
  const url = apisource + '/api/order/quoteprice';
  return request(url, {
    method: 'post',
    data: params
  })
}

