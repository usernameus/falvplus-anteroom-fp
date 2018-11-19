/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'

export async function getproduct(params){
 const productId = params.productId;
 const urlPtn = apisource +'/api/product/{0}';
 const url = urlPtn.format(productId);
 return request(url,{method: 'get'})
}

export async function homeproducts(params) {
  const pageSize = params.pageSize || 9;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/product/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
    data: params
  })
}

