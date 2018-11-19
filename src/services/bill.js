import { request } from '../utils'
import {billtoken} from '../utils/config';

// export async function  sendBill(params) {
//   return request('/bill', {
//     method: 'post',
//     data: params
//   })
// }

export async function bcPayBtn(params){
  return request(billtoken,{
    method: 'get',
    data: params
  })
}
