/**
 * Created by falvplus-dev on 17-3-29.
 */
/**
 * Created by zhihangjishu on 17/2/28.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function queryorder(params){
  const pageSize = params.param.pageSize || 10;
  const pageNo = params.param.page || 1;
  const urlPtn = apisource + '/api/order/{0}/{1}/{2}';
  const url = urlPtn.format(params.param.orderType, pageNo, pageSize);
  return request(url, {
    method: 'get',
    data: params.data
  })
}
export async function ordersDetails(params){
  const urlPtn = apisource +'/api/lawyerOrderInfo/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get'
  })
}

export async function myorder(params){
  return request (apisource +'/api/', {
    method: 'post',
    data: params
  })
}

export async function queries(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/order/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}//查询数据
export async function details(params) {
  const pageSize = params.payload.pageSize || 10;
  const pageNo = params.payload.page || 1;
  const orderId=params.orderId;
  const urlPtn = apisource + '/api/order/{0}/{1}/{2}';
  const url = urlPtn.format(pageNo,pageSize,orderId);
  return request(url, {
    method: 'get',
    data: params
  })
}//订单详情
export async function querylawlist (params) {
  return request(apisource + '/api/firm/AllFirmLawyer', {
    method: 'get',
  })
}
