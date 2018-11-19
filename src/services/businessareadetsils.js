/**
 * Created by zhihangjishu on 17/9/12.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function querydetails(params){
  const urlPtn = apisource +'/api/webBusiness/{0}';
  const url = urlPtn.format(params.bussinessId);
  return request(url, {
    method: 'get'
  })
}

//在线咨询
