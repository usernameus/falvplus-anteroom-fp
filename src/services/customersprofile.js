import { request } from '../utils'
import {apisource} from '../utils/config';


export async function queryProfile (params) {
  const urlPtn = apisource + '/api/crm/customersProfile/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get',
    // data: params
  })
}
export async function querycustomerModal (params) {
  return request(apisource + '/api/crm/customertype', {
    method: 'get',
    data: params
  })
}
export async function querycontactsModal (params) {
  return request(apisource + '/api/crm/contactstype', {
    method: 'get',
    data: params
  })
}

export async function update (params) {
  return request(apisource + '/api/crm/contacts', {
    method: 'put',
    data: params
  })
}
// export async function create (params) {
//   return request(apisource + '/api/crm/followlog', {
//     method: 'post',
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
