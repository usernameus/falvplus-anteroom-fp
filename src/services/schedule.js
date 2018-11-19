/**
 * Created by zhihangjishu on 17/4/8.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function query(params) {
  const url = apisource+'/api/schedule';
  return request(url, {
    method: 'get',
    data: ''
  })
}
export async function setrule(params) {
  const url = apisource+'/api/schedule';
  return request(url, {
    method: 'post',
    data: params
  })
}
export async function remove (params) {
  const urlPtn = apisource + '/api/schedule/{0}';
  const url = urlPtn.format(params.payload.scheduleId);
  return request(url, {
    method: 'delete',
    data: params.payload
  })
}

export async function querys(params) {
  const url = apisource+'/api/dayschedule';
  return request(url, {
    method: 'post',
    data: params
  })
}


