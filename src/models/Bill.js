import {bcPayBtn} from '../services/bill'
import {parse} from 'qs'
// // 测试环境
import '../utils/beecloud'
// 生产环境
// import '../utils/pay'

const Cookie = require('js-cookie')

export default {
  namespace: 'bill',
  state: {

  },
  reducers: {},
  effects: {
    *bcPayBtn({payload}, {call,put}){
      const data = yield call(bcPayBtn, parse(payload))
      const url = payload.returnurl;
      const urls= payload.returnurl;
      const userId = Cookie.get('userId');
      const token = Cookie.get('token');
      const role = Cookie.get('r');
      const optional = {
        ...payload.optional,
        userId: userId,
        token: token,
        role: role,
        serverName: window.location.host
      }

      if(data && data.title == 'JSButton'){
        BC.click({
          return_url: url,
          title: payload.title,
          amount: payload.amount,
          out_trade_no: data.OutTradeNo,
          sign: data.Sign,
          optional: optional
        });

      }else {
        BC.click({
          return_url:urls
        })
      }
    },

  },
  subscriptions: {

  }
};
