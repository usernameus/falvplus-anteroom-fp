import { request } from '../utils'
import {apisource} from '../utils/config'
export async function ownerInfo(params) {
  return request('/api/profile', {
    method: 'get',
    data: params
  })
}

/**
 * 会客室主人设置信息
 * @param params
 *     {owner: ownername,
 * @returns {*}
 */
export async function ownerSettings(params){
  const url=apisource + '/api/homeSetting';
  return request(url,{
    method: 'get',
  })
}

export async function signIns(params){
  const url =apisource+'/api/adminlogin';
  return request(url,{
    method: 'get',
    data: params
  })
}
//已读消息
export async function showNews(params){
  return request(apisource + '/api/readMsg', {
    method: 'get',
    data: params
  })
}
export async function consultService(params){
  const url = apisource + '/api/channel/consult';
  return request(url, {
    method: 'get'
  })
}
//新消息提醒
export async function querynews(params){
  return request(apisource +'/api/message', {
    method: 'get',
    data: params
  })
}
