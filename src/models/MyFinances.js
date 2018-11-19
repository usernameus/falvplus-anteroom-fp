/**
 * Created by zhihangjishu on 17/2/28.
 */
import { query,queryFinances} from '../services/MyFinances'
import { parse } from 'qs'

const Cookie = require('js-cookie');

export default {
  namespace: 'MyFinances',

  state: {
    MyFinancesList: [],
    Pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    },
    Loading: false,
  },


  reducers: {
    querySuccess(state, action){
      const {MyFinancesList, pagination} = action
      return { ...state,
        MyFinancesList,
        Loading: false,
        Pagination: {
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
          MyFinancesList: data.data,
          pagination: data.page
        })
      }

    },
    *queryFinances({payload},{call, put}){
      const data = yield call(queryFinances, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          MyFinancesList: data.data,
          pagination: data.page
        })
      }

    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location =>{
        // if(location.pathname.parsePath() === '/userDetails' && Cookie.get('token')){
        //   dispatch({type: 'query', payload: location.query})
        // }
        // if(location.pathname.parsePath() === '/MyFinances' && Cookie.get('token')){
        //   dispatch({type: 'queryFinances', payload: location.query})
        // }
      });
    }
  }
};
