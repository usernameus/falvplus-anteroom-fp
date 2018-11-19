import {parse} from 'qs';
import {saveOrder, PhoneOrder,queryphoneorder,evaluatecomment,balancePayQuery,queryBalance,balancePayment,getOrder,creatchannel,queryPurchase} from '../services/order';
import {sendBill} from '../services/bill';
import {homeproducts, getproduct} from  '../services/products';
import {createStore, combineReducers} from 'redux';

const Cookie = require('js-cookie');

export default {
  namespace: 'order',
  state: {
    currentStep:0,
    PayTypeVisible:false,
    currentChannel: 'ALI_WEB',
    PayModal:false,
    BalancePayModal:false,
  },
  reducers: {
    //支付方式
    HidePayModal(state, action){
      return {...state, PayTypeVisible: false}
    },
    BalancePayQuerySuccess(state, action){
      const {PayData } = action.payload
      return {...state, BalancePayModal: true,PayModal: false,PayData}
    },
    hideBalancePayModal(state){
      return {...state, BalancePayModal: false}
    },
    PhoneOrderSuccess(state, action){
      const {data } = action.payload
      return {
        ...state,
        data:data,
      }
    },
    queryBalanceSuccess(state, action){
      const {BalanceData } = action.payload
      return {
        ...state,
        Balance:BalanceData,
        PayTypeVisible:true,
      }
    },
    EvaluateCommentSuccess(state, action){
      const {data } = action.payload
      return {
        ...state,
        EvaluateData:data,
      }
    },
    changeBillChannel(state, action){
      console.log(action);
      return {
        ...state,
        ...action.payload
      }
    },
    showOrderProducts(state, action){
      return {...state, ...action.payload}
    },
    showSaving(state){
      return {...state, errMsg: '', saving: true}
    },
    hideSaving(state){
      return {...state, saving: false}
    },
    confirmOrderOK(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    getOrderOK(state, action){
      const { currentStep,data} = action.payload
      return {
        ...state,
        currentStep,
        productOrder:data
      }
    },
    getServiceOK(state, action){
      return {
        ...state,
        data:{
          ...action.payload.data,
          products: action.payload.data
        }
      }
    },
    showError(state, action){
      return {
        ...state,
        errMsg: action.payload.error
      }
    },
    setOrderStep(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    aaa(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    purchaseQuery(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
    // quotePriceOk(state, action){
    //   return {
    //     ...state
    //   }
    // },
  },
  effects: {
    //获取支付数据
    *BalancePayQuery({payload}, {call, put}) {
      const data = yield call(balancePayQuery, payload)
      if(data){
        yield put({
          type: 'BalancePayQuerySuccess',
          payload: {
            PayData:data
          }
        })
      }
    },
    //查询余额
    *QueryBalance({payload}, {call, put}) {
      const data = yield call(queryBalance, payload)
      if(data){
        yield put({
          type: 'queryBalanceSuccess',
          payload: {
            BalanceData:data.remainAmount
          }
        })
      }
    },
    //余额支付密码验证
    *ProBalancePayment({payload}, {call, put}) {
      const data = yield call(balancePayment, payload)
      if(data&&data.success){
        if(data.channelId==null){
          const url = '/orderflow/payOrder/' + data.id;
          window.location.href = url;
        }else{
          yield put({
            type: 'channelinfo/ordersInfo',
            payload: {
              orderInfo:data.data
            }
          })
          yield put({
            type: 'HidePayModal',
          })
        }
      }
      else if(data&&!data.success){
        yield put({
          type: 'showError',
          payload: {
            error: data.errMsgStr
          }
        })
      }
    },
    *BalancePayment({payload}, {call, put}) {
      const data = yield call(balancePayment, payload)
      if(data&&data.success){
        if(data.channelId==null){
          const url = '/phoneOrder/pay/' + data.id;
          window.location.href = url;
        }else{
          yield put({
            type: 'channelinfo/ordersInfo',
            payload: {
              orderInfo:data.data
            }
          })
          yield put({
            type: 'HidePayModal',
          })
        }
      }
      else if(data&&!data.success){
        yield put({
          type: 'showError',
          payload: {
            error: data.errMsgStr
          }
        })
      }
    },
    *QueryPhoneOrder({payload}, {call, put}) {
      const data = yield call(queryphoneorder, payload)
      if(data){
        yield put({
          type: 'PhoneOrderSuccess',
          payload: {
            data:data
          }
        })
      }
    },
    *EvaluateComment({payload}, {call, put}) {
      const data = yield call(evaluatecomment, payload)
      if(data){
        const url = '/phoneOrder/evaluate/' + data.id;
        window.location.href = url;
        yield put({
          type: 'EvaluateCommentSuccess',
          payload: {
            data:data
          }
        })
      }
    },
    *PhoneConfirmOrder({payload}, {call, put}){
      try{
      const data = yield call(PhoneOrder, parse(payload))
      if(data&& data.auth && data.auth.success){
        const auth = data.auth;
        Cookie.set("userId", auth.userId);
        Cookie.set('mobile',auth.mobile)
        Cookie.set('user_name',auth.userName);
        Cookie.set('r', auth.r);
        Cookie.set('token',auth.token, {expires: 3});
        const date = new Date();
        date.setTime(date.getTime() + 3 * 86400000);
        Cookie.set('expires', date.toUTCString());
        yield put({
          type: 'login/loginSuccess',
          payload:{
            name: auth.userName,
            r: auth.r
          }})
      }
      if(data.flaParWebOrder){
        const url = '/phoneOrder/pay/' + data.flaParWebOrder.id;
        window.location.href = url;
      }else{
        yield put({
          type: 'showError',
          payload: {
            error: '订单生成失败,请稍后重试'
          }
        })
      }
    }catch(err){
      yield put({
        type: 'showError',
        payload:{
          error: err.responseJSON ? err.responseJSON.error : '发生错误,请重试'
        }
      })
    }
    },
    *getProduct({payload}, {call, put}){
      const data = yield call(getproduct, parse(payload))
      if(data){
        let product = {...data.data, buyCount:1,amountY:data.data.shopPriceY,shopPriceY:data.data.shopPriceY}
        const products = [product];
        yield put({
          type: 'showOrderProducts',
          payload: {
            products: products, // data.data.map(p=>{p['buyCount'] = 1; p.shopPriceY /= 100; p['amountY'] = p.shopPriceY;  return p})
            currentStep: payload.currentStep
          }
        })
      }
    },
    *confirmOrder({payload}, {call, put}){
      yield put({type: 'showSaving'});
      try{
        const data = yield call(saveOrder, parse(payload));
        if(data && data.auth && data.auth.success){
          const auth = data.auth;
          Cookie.set("userId", auth.userId);
          Cookie.set('mobile',auth.mobile)
          Cookie.set('user_name',auth.userName);
          Cookie.set('r', auth.r);
          Cookie.set('token',auth.token, {expires: 3});
          const date = new Date();
          date.setTime(date.getTime() + 3 * 86400000);
          Cookie.set('expires', date.toUTCString());
          yield put({
            type: 'login/loginSuccess',
            payload:{
              name: auth.userName,
              r: auth.r
            }
          });
          // const url = '/order/pay/' + data.orderId;
          // window.location.href = url;
          // yield put({
          //   type: 'confirmOrderOK',
          //   payload: {
          //     orderId: data.orderId
          //   }
          // })
        }

        if(data.channel){
          // const url = '/orderflow/evaluate/' + data.orderId;
          const url = '/anteroom#' + data.channel.channelId;
          window.location.href = url;
        }if(data.order){
          // const url = '/orderflow/evaluate/' + data.orderId;
          const url = '/orderflow/payOrder/' + data.orderId;
          window.location.href = url;
        }else{
          yield put({
            type: 'showError',
            payload: {
              error: '订单生成失败,请稍后重试'
            }
          })
        }
      }catch(err){
        yield put({
          type: 'showError',
          payload:{
            error: err.responseJSON ? err.responseJSON.error : '发生错误,请重试'
          }
        })
      }
      yield put({type: 'hideSaving'});
    },
    *getOrders({payload}, {call,put}){
      const data = yield call(getOrder, parse(payload));
      if(data){
        yield put({
          type: 'getOrderOK',
          payload: {
            data: data,
            currentStep: payload.currentStep

          }
        })
      }
     },
    *creatChannel({payload}, {call,put}){
      const data = yield call(creatchannel, parse(payload));
      if(data&&data.channelId){
        const urls = '/anteroom#' + data.channelId;
        window.location.href = urls;
      }
    },
    // *getService({payload}, {call,put}){
    //   const data = yield call(getOrder, parse(payload));
    //   if(data && data.orderStatus===1){
    //     yield put({
    //       type: 'getServiceOK',
    //       payload: {
    //         data: data
    //       }
    //     })
    //   }else{
    //     const url = '/order/pay/' + payload.orderId;
    //     window.location.href = url;
    //   }
    // },
    // *quotePrice({payload}, {call,put}){
    //   const data = yield call(quoteOrderPrice, parse(payload));
    //   if(data){
    //     yield put({
    //       type: 'quotePriceOk',
    //       payload:{
    //         data: data
    //       }
    //     });
    //   }
    //
    // }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen((location)=>{
        if(location.pathname.parsePath().startWith('/orderflow/hope/')){
          const productId = location.pathname.getVarFromPath(3);
          dispatch({
            type: 'getProduct',
            payload: {
              productId: productId,
              currentStep: 0
            }
          })
        }
        if(location.pathname.parsePath().startWith('/orderflow/payOrder/')){
          const orderId = location.pathname.getVarFromPath(3);
          dispatch({
            type: 'getOrders',
            payload: {
              orderId: orderId,
              currentStep: 1,
            }
          })
          dispatch({
            type: 'QueryBalance',
          })
        }
        if(location.pathname.startWith('/phoneOrder/pay/')||location.pathname.startWith('/phoneOrder/evaluate/')){
          const PhoneOrderId = location.pathname.getVarFromPath(3);
          dispatch({
            type: 'QueryPhoneOrder',
            payload: {
              PhoneOrderId:PhoneOrderId,
            }
          })
          dispatch({
            type: 'QueryBalance',
          })
        }

        if(location.pathname.parsePath().startWith('/orderflow/')
           && !location.pathname.parsePath().startWith('/orderflow/hope/')){
          dispatch({
            type:'fhome/nofooter'
          })
        }
      });
    }
  },
};
