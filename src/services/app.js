import { request } from '../utils'
import {apisource} from '../utils/config'

export async function login (params) {
  return request(apisource +'/api/login', {
    method: 'post',
    data: params
  })
}
export async function showNews(params){
  return request(apisource + '/api/readMsg', {
    method: 'get',
    data: params
  })
}
export async function querynews(params){
  return request(apisource +'/api/message', {
    method: 'get',
    data: params
  })
}
export async function logout (params) {
  return request(apisource +'/api/logout', {
    method: 'post',
    data: params,
    token:params.token
  })
}

export async function registers(params){
  return request(apisource + '/api/register', {
    method: 'post',
    data: params
  })
}

export async function verifyCode(params){
  return request(apisource + '/api/nothingCode', {
    method: 'post',
    data: params
  })
}

export async function verifyCodes(params){
  return request(apisource + '/api/nothingCode', {
    method: 'post',
    data: params
  })
}

export async function userInfo(params){
  return request(apisource + '/api/userinfo/' + params.mobile+'/'+params.productId, {
    method: 'get'
  })
}

export async function checkRegister(params){
  return request(apisource + '/api/verification/'+params, {
    method: 'get',
    //data:{mobile:params}
  })
}
export async function queryPurchase(params) {
  return request(apisource +'/api/purchaseQuery', {
    method: 'get',
    data: params,
  })
}
export async function jumpLogin(params) {
  return request(apisource +'/api/automaticLogon', {
    method: 'get',
    data: params,
  })
}

