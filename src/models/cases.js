import {parse} from 'qs'
import {query,queryindex} from '../services/cases'

export default {
  namespace: 'cases',
  state: {},
  reducers: {
    querySuccess (state, action) {
      const {list, pagination} = action.payload
      return { ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    queryIndexSuccess (state, action) {
      const {list,page} = action.payload
      return { ...state,
        list,
        page,
        loading: false,
       }
    },
  },
  effects: {
    *query({payload}, {call, put}){
      const data = yield call(query , parse(payload));
      if(data){
        yield put({
          type: 'querySuccess',
          payload:{
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
    *queryIndex({payload}, {call, put}){
      const data = yield call(queryindex , parse(payload));
      if(data){
        yield put({
          type: 'queryIndexSuccess',
          payload:{
            list: data.data,
            page:data.page
          }
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname.parsePath().startWith('/cases')) {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
        if (location.pathname == '/'||location.pathname == '/m') {
          dispatch({
            type: 'queryIndex',
          })
        }
      })
    }
  },
};
