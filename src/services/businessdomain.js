/**
 * Created by zhihangjishu on 17/9/9.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'


export async function creation (params) {
  return request(apisource + '/api/business', {
    method: 'post',
    data: params
  })
}

export async function queryedit (params) {
  const urlPtn = apisource + '/api/business/{0}';
  const url = urlPtn.format(params.currentItem.id);
  return request(url, {
    method: 'get',
  })
}

export async function updater (params) {
  return request(apisource + '/api/business', {
    method: 'put',
    data: params
  })
}
export async function queries(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/business/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}

export async function remove (params) {
  const urlPtn = apisource + '/api/business/{0}';
  const url = urlPtn.format(params.payload.businessId);
  return request(url, {
    method: 'delete',
  })
}

export async function querylawlist (params) {
  return request(apisource + '/api/fplawyer/allLawyerProfile', {
    method: 'get',
    data: params
  })
}
