/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'
export async function query(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/activity/{0}/{1}';
  const url = urlPtn.format( pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function queryindex(params) {
  const pageSize = 1;
  const pageNo = params.pagecase||1;
  const urlPtn = apisource + '/api/activity/{0}/{1}';
  const url = urlPtn.format( pageNo,pageSize);
  return request(url, {
    method: 'get',
  })
}
export async function activities(params){
  const urlPtn = apisource +'/api/activity/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get'
  })
}
export async function create (params) {
  return request(apisource +'/api/activity', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  const urlPtn = apisource + '/api/activity/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request(apisource + '/api/activity', {
    method: 'put',
    data: params
  })
}

