import {verifyCode,userInfo,queryPurchase} from '../services/app';

export default {
  namespace: 'sms',
  state: {},
  reducers: {
    smsInit(state, action){
      return {
        ...state,
        userName: '',
        address: '',
        success:false
      }
    },
    getUserInfoSuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    getUserInfoFailed(state, action){
      return {
        ...state
      }
    },
    validateCodeSuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    validateCodeFailed(state, action){
      return {
        ...state
      }
    },
    purchaseQuerySuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
  },
  effects: {
    *getUserInfo({payload},{call, put}){
      const data = yield call(userInfo, payload);
      if(data && data.success){
        yield put({
          type: 'getUserInfoSuccess',
          payload: data
        })
      }else{
        yield put({
          type: 'getUserInfoFailed',
          payload: data
        })
      }
    },
    *getValidateCode({payload}, {call, put}){
      const data = yield call(verifyCode, payload);
      if(data){
        yield put({
          type: 'validateCodeSuccess'
        })
      }else{
        yield put({
          type: 'validateCodeFailed'
        })
      }
    },
    *queryPurchase({payload}, {call,put}){
      const data = yield call(queryPurchase, payload);
      if(data&&data!=null){
        if(data.channelId != null && data.channelId != ''){
          const url = '/anteroom#' + data.channelId;
          window.location.href = url;
        }
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen((location)=> {
        if (location.pathname.parsePath().startWith('/orderflow/hope/')) {
          const productId = location.pathname.getVarFromPath(3);
          dispatch({
            type: 'queryPurchase',
            payload: {
              productId: productId,
            }
          })
        }
      })
    }
  },
};
