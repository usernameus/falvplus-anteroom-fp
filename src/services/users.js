import { request } from '../utils'
import {apisource} from '../utils/config';

export async function query (params) {
  const urlPtn = apisource + '/api/remarks/{0}/{1}';
  const url = urlPtn.format(params.pageNo, params.pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apisource + '/api/users', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apisource + '/api/users', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request(apisource + '/api/users', {
    method: 'put',
    data: params
  })
}
