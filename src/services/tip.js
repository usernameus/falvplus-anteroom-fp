import { request } from '../utils'
import {apisource} from '../utils/config'

export async function packageDownload(params){
  const url =apisource + '/website/browserPath';
  return request(url,{
    method: 'get',
  })
}
