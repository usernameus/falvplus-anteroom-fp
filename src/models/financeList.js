
/**
 * Created by zhihangjishu on 17/2/28.
 */
import {queryorder,searchorder,details ,changeOrder,querylawlist} from '../services/financeList'
import { parse } from 'qs'

export default {
  namespace: 'financeList',
  state: {
    orderId: '',
    orderSn: '',
    orderPhone: '',
    orderName: '',
    customerNote: '',
    productAmount: '',
    orderAmountStr:'',
    orderStatusStr:'',
    visible:false,
    ListType:true,
    types:'0'
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        let url=window.location.href;	  //获取当前页面的url
        var len=url.length;   //获取url的长度值
        var a=url.indexOf('?');   //获取第一次出现？的位置下标
        var b=url.substr(a+1,len);
        if (location.pathname.startWith('/admin/financeList')) {
          dispatch({
            type: 'queryOrder',
            payload: {
              field: location.query.keyword,
              keyword: location.query.field,
              values:{timeType:b==0||b==2||b==3?b:null
              },
              orderType: b==0||b==2||b==3?'3':'0',
              page: 1
            }
          })
        }
      })
    }
  },
  effects: {
    // *searchOrder({payload}, {call, put}) {
    //   const data = yield call(searchorder, payload)
    //   if(data){
    //     yield put({
    //       type: 'queryDetailsSuccess',
    //       payload: {
    //         data:data
    //       }
    //     })
    //   }
    // },
    *ChangeOrder({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(changeOrder, payload)
      if(data&&data.success){
        const data = yield call(queryorder, {orderType: '1', page: 1})
        if(data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
        }
      }
    },
    *queryDetails({payload}, {call, put}) {
      const data = yield call(details, payload)
      if(data){
        yield put({
          type: 'queryDetailsSuccess',
          payload: {
            data:data
          }
        })
      }
    },
    *queryOrder({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(queryorder, payload)
      if(data){
        const datas = yield call(querylawlist, parse(payload));
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
            types:payload.orderType,
            lawyerlist:datas
          }
        })
      }
    }
  },

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    queryDetailsSuccess (state, action) {
      const {data} = action.payload
      return {
        ...state,
        detailsData:data,
        visible:true
      }
    },
    hideModal(state, action){
      return {
        ...state,
        visible:false
      }
    },
    querySuccess (state, action) {
      const {list, pagination,types,lawyerlist} = action.payload
      return {
        ...state,
        list,
        types,
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
