/**
 * Created by mel on 2017/2/26.
 */
import { request } from '../utils'
import {apisource} from '../utils/config'
//提现申请
export async function withdrawalsApply(params) {
  const url = apisource+'/api/withdrawals';
  return request(url, {
    method: 'post',
    data:params.data
  })
}
export async function DomainExpired(params) {
  const url = apisource+'/api/domainExpired';
  return request(url, {
    method: 'get',
  })
}
export async function query(params) {
  const url = apisource+'/api/profile';
  return request(url, {
    method: 'get',
    data: params
  })
}
export async function update(params) {
  const url = apisource+'/api/lawyerinfo';
  return request(url, {
    method: 'put',
    data: params
  })
}
export async function updateLawyer(params) {
  const url = apisource+'/api/lawyerprofile';
  return request(url, {
    method: 'put',
    data: params
  })
}
//套餐信息
export async function queryfinancedash() {
  const url = apisource+'/api/financialOverview';
  return request(url, {
    method: 'get',
  })
}
//套餐信息
export async function queryPackageInfo() {
  const url = apisource+'/api/sto/storage';
  return request(url, {
    method: 'get',
  })
}
//套餐信息存储详情
export async function queryPackageInfoDetails() {
  const url = apisource+'/api/sto/storageAll';
  return request(url, {
    method: 'get',
  })
}
//套餐信息短信详情
export async function queryPackageInfoMsgDetails() {
  const url = apisource+'/api/sto/smsPackageAll';
  return request(url, {
    method: 'get',
  })
}
//套餐信息短信详情
export async function queryPackageInfoUseDetails(params) {
  const pageSize = params.pageSize || 6;
  const pageNo = params.page || 1;
  const urlPtn = apisource + '/api/sto/smsUseLog/{0}/{1}';
  const url = urlPtn.format(pageNo,pageSize);
  return request(url, {
    method: 'get',
  })
}

