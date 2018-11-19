import { request } from '../utils'
import {apisource} from '../utils/config';

export async function querys (params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.pageNo || 1;
  const urlPtn = apisource + '/api/crm/contacts/{0}/{1}';
  const url = urlPtn.format(pageNo, pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
//查询协作律师
export async function queryLawyer (params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.pageNo || 1;
  const urlPtn = apisource + '/api/crm/coordinationLawyer/{0}/{1}';
  const url = urlPtn.format(pageNo, pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
//查询律师是否存在在联系人中
export async function querylawyerHave (params) {
  const url = apisource + '/api/crm/checkPhone';
  return request(url, {
    method: 'get',
    data: params
  })
}
//查询重名
// export async function querycontactsName (params) {
//   const url = apisource + '/api/crm/contactsName';
//   return request(url, {
//     method: 'get',
//     data: params
//   })
// }
export async function queryEdit (params) {
  const urlPtn = apisource + '/api/crm/contacts/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get',
    // data: params
  })
}
export async function queryChannel (params) {
  const urlPtn = apisource + '/api/channel/channelUser/{0}';
  const url = urlPtn.format(params.contactUserId);
  // const url = apisource + '/api/channel/channelUser';
  return request(url, {
    method: 'get',
    // data: params
  })
}

export async function queryModal (params) {
  return request(apisource + '/api/crm/contactstype', {
    method: 'get',
    data: params
  })
}
export async function createLawyer (params) {
  return request(apisource + '/api/crm/coordinationLawyer', {
    method: 'post',
    data: params
  })
}
export async function create (params) {
  return request(apisource + '/api/crm/contacts', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  const urlPtn = apisource + '/api/crm/contacts/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'delete',
    // data: params
  })
}
export async function removeChannel (params) {
  const url = apisource + '/api/channel/channelUser';
  return request(url, {
    method: 'delete',
    data: params.params
  })
}

export async function update (params) {
  return request(apisource + '/api/crm/contacts', {
    method: 'put',
    data: params
  })
}
export async function updateLawyer (params) {
  return request(apisource + '/api/crm/coordinationLawyer', {
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
