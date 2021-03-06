/**
 * Created by zhihangjishu on 17/2/28.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function queries(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/fplawyer/domain/{0}/{1}';
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
  return request(apisource + '/api/fplawyer/domain', {
    method: 'post',
    data: params
  })
}
export async function remove (params) {
  const url = apisource + '/api/fplawyer/domain';
  return request(url, {
    method: 'get',
    data: params
  })
}

export async function updater (params) {
  return request(apisource +'/api/fplawyer/domain', {
    method: 'put',
    data: params
  })
}

