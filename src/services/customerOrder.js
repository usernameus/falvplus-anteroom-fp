/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function query(params) {
  const pageSize = 5;
  const pageNo = 1;
  const urlPtn = apisource + '/api/customerOrder/{0}/{1}';
  const url = urlPtn.format( pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function queryOrder(params) {
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/customerOrder/{0}/{1}';
  const url = urlPtn.format( pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}
