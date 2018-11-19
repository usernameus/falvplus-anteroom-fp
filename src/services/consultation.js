
/**
 * Created by zhihangjishu on 17/2/28.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function queryorder(params){
  const pageSize = params.pageSize || 10;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/consultingOrder/{0}/{1}/{2}';
  const url = urlPtn.format(params.orderType, pageNo, pageSize);
  return request(url, {
    method: 'get',
    data: params.values
  })
}
//添加处理人
export async function handleLawyer(params) {
  const url= apisource + '/api/consultingAssigns';
  return request(url, {
    method: 'get',
    data: params
  })
}
// export async function searchorder(params){
//   const pageSize = params.pageSize || 10;
//   const pageNo = params.page || 1;
//   const urlPtn = apisource + '/api/consultingOrder/{0}/{1}/{2}';
//   const url = urlPtn.format(params.orderType, pageNo, pageSize);
//   return request(url, {
//     method: 'get',
//     data: params.values
// })
// }
export async function changeOrder(params) {
  const url = apisource + '/api/consultingOrder';
  return request(url, {
    method: 'put',
    data: params
  })
}//查询数据
export async function details(params) {
  const url= apisource + '/api/consultingInfo';
  return request(url, {
    method: 'get',
    data: params
  })
}//订单详情
