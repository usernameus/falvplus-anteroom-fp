import { request } from '../utils'
import {apisource} from '../utils/config'

export async function businessArea(params) {
  const pageSize = params.pageSize || 6;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/business/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}

