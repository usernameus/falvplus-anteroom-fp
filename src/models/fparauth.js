import {parse} from 'qs'
import jwtDecode from 'jwt-decode'
import {push} from 'react-router-redux'
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../utils/constants'
import {login, logout} from '../services/fparauth'

export default {
  namespace: 'fparauth',
  state: {},
  reducers: {
    loginUserRequest(state){
      return {
        ...state,
        type: LOGIN_USER_REQUEST
      }
    },
    loginUserSuccess(state, action){
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        type: LOGIN_USER_SUCCESS,
        ...action.payload
      }
    },
    loginUserFailure(state, action){
      localStorage.removeItem('token');
      return {
        ...state,
        type: LOGIN_USER_FAILURE,
        ...action.payload
      }
    },

  },
  effects: {
    *loginUser({payload},{call, put}){
      yield put({type: 'loginUserRequest'})
      const data = yield call(login, parse(payload))
      if(data && data.success){
        let decoded = jwtDecode(response.token)
        yield put({type: 'loginUserSuccess', payload:{token: decoded}})
        yield push(payload.redirect || '/')
      }else{
        yield put({type: 'loginUserFailure', payload: {response:{status: 403, statusText: '用户登录失败'}}})
      }
    },
    *logout({payload},{call}){
      localStorage.removeItem('token')
      const data = yield call(logout,parse(payload))
      push('/login')
    }
  },
  subscriptions: {},
};
