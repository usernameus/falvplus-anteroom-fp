import { request } from '../utils'
import {apisource} from '../utils/config';

export async function saveFollowup(params) {
  return request(apisource + '/api/crm/addfollow', {
    method: 'post',
    data: params
  })
}

export async function followups(params){
  const urlPtn = apisource + '/api/crm/followups/{0}';
  const url = urlPtn.format(params.customerId);
  return request(url, {
    method: 'get'
  });
}

export async function queryFollowupLists(params) {
  const urlPtn = apisource + '/api/crm/followlogtype/{0}';
  const url = urlPtn.format(params.customerId);
  return request(url, {
    method: 'get',
    data: params
  })
}
