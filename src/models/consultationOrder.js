/**
 * Created by falvplus-dev on 17-3-29.
 */
/**
 * Created by zhihangjishu on 17/2/28.
 */
import {queryorder,searchorder,details ,changeOrder,handleLawyer} from '../services/consultation'
import { parse } from 'qs'

export default {
  namespace: 'consultationOrder',

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
    HandleVisible:false
  },


  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/admin/consultation') {
          dispatch({
            type: 'queryOrder',
            payload: {
              field: location.query.keyword,
              keyword: location.query.field,
              orderType: '1',
              page: 1
            }
          })
        }
      })
    }
  },
  effects: {
    //添加处理人
    *HandleLawyer({payload}, {call, put}) {
      const data = yield call(handleLawyer, payload)
      if(data&&data.success){
        const data = yield call(queryorder, payload)
        if(data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page,
              types:data.types
            }
          })
        }
      }
    },
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
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
            types:data.types
          }
        })
      }
    }
  },

  reducers: {
    //添加处理人
    handleLawyerSuccess (state,action) {
      const {handlePeople} = action.payload
      return {...state,
        handlePeople
      }
    },
    addHandle (state,action) {
      return {...state, HandleVisible: true,phoneOrderId:action.payload.id}
    },
    hideHandleModal (state) {
      return {...state, HandleVisible: false}
    },
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
      const {list, pagination,types} = action.payload
      return {
        ...state,
        list,
        types,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    }
  }
}
