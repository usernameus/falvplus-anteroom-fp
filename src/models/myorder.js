/**
 * Created by falvplus-dev on 17-3-29.
 */
/**
 * Created by zhihangjishu on 17/2/28.
 */
import {queryorder,queries,services, myorders,ordersDetails,querylawlist} from '../services/myorder'
import { parse } from 'qs'

export default {
  namespace: 'myorder',

  state: {
    orderId: '',
    orderSn: '',
    orderPhone: '',
    orderName: '',
    customerNote: '',
    productAmount: '',
    orderAmountStr:'',
    orderStatusStr:'',
    orderDetailVisible:false
  },

  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/admin/myorder') {
          dispatch({
            type: 'queryorder',
            payload: {
              param:{
                orderType:"all",
                page:1,
                pageSize:10
              }
            }
          })
        }
      })
    }
  },
  effects: {
    *queryorder({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(queryorder, payload)
      if(data){
        const datas = yield call(querylawlist, parse(payload))
        if(datas){
          yield put({
            type: 'querySuccess',
            payload: {
              lawyerName:data.lawyerName,
              types:data.types,
              list: data.data,
              pagination: data.page,
              lawyerlist:datas
            }
          })
        }
      }
    },
    *orderdetail({payload}, {call,put}){
      const data = yield call(ordersDetails, parse(payload));
      if(data){
        yield put({
          type: 'showDetailsModal',
          payload: data.details[0]
        })
      }
    },
    *queryOrder({payload}, {call,put}){
      const data = yield call(queryorder, parse(payload));
      if(data){
        yield put({
          type: 'showDetailsModal',
          payload: data
        })
      }
    },
},

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    showDetailsModal(state, action){
      return {
        ...state,
        ...action.payload,
        orderDetailVisible: true
      }
    },
    hideDetailsModal(state, action){
      return {
        ...state,
        orderDetailVisible: false
      }
    },
    querySuccess (state, action) {
      const {list, pagination,types,lawyerlist,lawyerName} = action.payload
      return {
        ...state,
        list,
        types,
        lawyerName,
        lawyerlist,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    }
  }
}
