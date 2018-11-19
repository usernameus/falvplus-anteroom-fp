import { request } from '../utils'
import {apisource} from '../utils/config';


export async function queryAllDictList (params) {
  return request(apisource + '/api/crm/customertype', {
    method: 'get',
    data: params
  })
}
export async function saveCrmDictList(params) {
  return request(apisource + '/api/crm/saveCrmDictList',
    {
      method: 'post',
      data: params
    })
}

