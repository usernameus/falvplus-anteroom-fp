/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function getRemainAmount() {
  const url = apisource + '/api/account/remainamount';
  return request(url, {
    method: 'get',
  })
}

