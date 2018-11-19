/**
 * Created by zhihangjishu on 17/3/15.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function product(params){
  const urlPtn = apisource +'/api/product/{0}';
  const url = urlPtn.format(params.id);
  return request(url, {
    method: 'get'
  })
}
