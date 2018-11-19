import { request } from '../utils'
import {apisource} from '../utils/config'

export async function login(params){
  return request(apisource + '/api/login' ,{
    method: 'post',
    data: params
  })
}

export async function logout(params){
  return request(apisource + '/api/logout', {
    method: 'post',
    data: params
  })
}
