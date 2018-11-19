import {channelInfo} from '../services/order';
const Cookie = require('js-cookie');
export default {
  namespace: 'evaluate',
  state: {
    error: '',
    enteringChannel: false,
    enterInChannel: false,
  },
  reducers: {
    loadOK(state, action){
      return {
        ...state,
        channelInfo: action.payload
      }
    },
    channelConnecting(state, action){
      return {
        ...state,
        enteringChannel: true
      }
    },
    channelEntered(state, action){
      return {
        ...state,
        enterInChannel: true,
        enteringChannel: false
      }
    },
  },
  effects: {
    *getEvaluateInfo({payload},{call,put}){
        try{
          const data = yield call(channelInfo, payload);
          if(data && !data.error){
            yield put({
              type: 'loadOK',
              payload: data
            })
            yield put({
              type: 'channelinfo/init',
              payload: {
                channelInfo: data
              }
            })
            const orders = data.orders;
            const lastOrder = orders && orders.length > 0 ? orders[orders.length - 1] : null;
            if(lastOrder && lastOrder.orderStatus == '0' && lastOrder.priceStatus == 1){
              yield put({
                type: 'order/setOrderStep',
                payload:{
                  currentStep: 2
                }
              })
            }
          }
        }catch(e){
          let errInfo = e.responseJSON;
          errInfo['errortitle'] = ' 协商定价';
          yield put({
            type: 'fhome/showError',
            payload: {
              error:　errInfo
            }
          })
        }
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/orderflow/evaluate/')){
          const token = Cookie.get('token');
          const expires = Cookie.get('expires');

          if(token !== undefined && expires != undefined && new Date(expires) >= new Date()){
            const orderId = location.pathname.getVarFromPath(3);
            dispatch({
              type: 'getEvaluateInfo',
              payload: {
                orderId: orderId
              }
            })
            dispatch({
              type: 'order/setOrderStep',
              payload: {
                currentStep: 1
              }
            })
          }else{

          }
        }
      });
    }
  },
};
