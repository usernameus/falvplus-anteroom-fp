/**
 * Created by zhihangjishu on 17/2/28.
 */
import { query,queryOrder} from '../services/customerOrder'
import { parse } from 'qs'

export default {
  namespace: 'customerOrder',

  state: {
    myorderList: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }
  },


  reducers: {
    querySuccess(state, action){
      const {myorderList, pagination} = action
      return { ...state,
        myorderList,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    }
  },
  effects: {
    *query({payload},{call, put}){
      const data = yield call(query, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          myorderList: data.data,
          pagination: data.page
        })
      }

    },
    *queryOrder({payload},{call, put}){
      const data = yield call(queryOrder, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          myorderList: data.data,
          pagination: data.page
        })
      }

    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location =>{
        //if(location.pathname === '/userDetails'){
        //  dispatch({type: 'query', payload: location.query})
        //}
        if(location.pathname === '/MyOrder'){
          dispatch({type: 'queryOrder', payload: location.query})
        }
      });
    }
  }
};
