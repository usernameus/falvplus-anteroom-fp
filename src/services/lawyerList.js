/**
 * Created by zhihangjishu on 17/2/28.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'
export async function queries(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/fplawyer/lawyerProfile/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function services (params) {
  return request(apisource + '/api/productstatus', {
    method: 'get',
    data: params
  })
}

export async function creation (params) {
  return request(apisource + '/api/fplawyer/lawyerProfile', {
    method: 'post',
    data: params
  })
}
export async function remove (params) {
  const urlPtn = apisource + '/api/fplawyer/deleteProfile/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'delete',
    data: params
  })
}

export async function updater (params) {
  return request(apisource +'/api/fplawyer/lawyerProfile', {
    method: 'put',
    data: params
  })
}

