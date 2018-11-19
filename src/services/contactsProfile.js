import { request } from '../utils'
import {apisource} from '../utils/config';


export async function queryProfile (params) {
  const urlPtn = apisource + '/api/crm/contactsProfile/{0}';
  const url = urlPtn.format(params.id);
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
