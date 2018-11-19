/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function queryProfile(params) {
  const url = apisource+'/api/user';
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function update (params) {
  return request (apisource +'/api/user', {
    method: 'put',
    data: params
  })
}

export async function updater (params) {
  return request(apisource +'/api/password', {
    method: 'post',
    data: params
  })
}

export async function verifyCode(params){
  return request(apisource + '/api/code', {
    method: 'post',
    data: params
  })
}
export async function handlechangepw(params){
  return request (apisource +'/api/verifypassword', {
    method: 'post',
    data: params
  })
}
export async function showorderdetail(params){
  const pageSize = params.pageSize || 9;
  const pageNo = params.pageNo || 1;
  const keyword = params.keyword
  const urlPtn = apisource + '/api/customerOrder/{0}/{1}/{2}';
  const url = urlPtn.format(pageNo,pageSize,keyword);
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function ordersDetails(params){
  const urlPtn = apisource +'/api/orderInfo/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get'
  })
}
//电话咨询
export async function queryphoneOrder(params){
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/userConsultingOrder/{0}/{1}/{2}';
  const url = urlPtn.format(params.orderType, pageNo, pageSize);
  return request(url, {
    method: 'get',
    data:params.values
  })
}
//财务列表
export async function queryfinancelist(params){
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/accountLog/{0}/{1}/{2}';
  const url = urlPtn.format(params.orderType, pageNo, pageSize);
  return request(url, {
    method: 'get',
    data:params.values
  })
}
//手机号修改
export async function handlePhoneedit(params){
  return request (apisource +'/api/replacePhone', {
    method: 'get',
    data: params
  })
}
