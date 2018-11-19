import { request } from '../utils'
import {apisource} from '../utils/config';

export async function querys (params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.pageNo || 1;
  const urlPtn = apisource + '/api/crm/customers/{0}/{1}';
  const url = urlPtn.format(pageNo, pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function queryEdit (params) {
  const urlPtn = apisource + '/api/crm/customer/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get',
    // data: params
  })
}
export async function queryModal (params) {
  return request(apisource + '/api/crm/customertype', {
    method: 'get',
    data: params
  })
}
export async function create (params) {
  return request(apisource + '/api/crm/customer', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  const urlPtn = apisource + '/api/crm/customer/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'delete',
    // data: params
  })
}

export async function update (params) {
  const urlPtn = apisource + '/api/crm/customer/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'put',
    data: params
  })
}

export async function share (params) {
  return request(apisource + '/api/crm/toGrant', {
    method: 'get',
    data: params
  })
}
