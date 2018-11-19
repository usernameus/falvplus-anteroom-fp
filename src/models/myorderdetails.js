/**
 * Created by falvplus-dev on 17-3-31.
 */
import {details} from '../services/myorder'
import { parse } from 'qs'

export default {
  namespace: 'myorderdetails',

  state: {
    productName:'',
    productAdvType:'',
    buyCount:'',
    unit:'',
    remainCount:'',
    receivedAmount:'',
    endDate:''

  },


  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname.startWith('/admin/myorderdetails/')) {
          let orderId = location.pathname.replace(/^\/(admin\/)?myorderdetails\//,'').split(/[?#\/]/)[0];
          dispatch({
            type: 'query',
            payload:{
              payload:location.query,
              orderId:orderId
            }
          })
        }
      })
    }
  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(details, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
  },

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess (state, action) {
      const {list, pagination} = action.payload
      return {
        ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    }
  }
}
