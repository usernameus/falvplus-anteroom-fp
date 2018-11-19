import {parse} from 'qs'
import {query,queryindex} from '../services/activities'

export default {
  namespace: 'activities',
  state: {},
  reducers: {
    querySuccess (state, action) {
      const {list, pagination} = action.payload
      return { ...state,
        listTitle:list.slice(0,1),
        listContent:list.slice(1,10),
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    queryIndexSuccess (state, action) {
      const {list,pageactivity} = action.payload
      return { ...state,
        list,
        pageactivity,
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
            pageactivity:data.page
          }
        })
      }
    },
  },
  subscriptions: {

    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname.parsePath().startWith('/activities')) {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
        if (location.pathname == '/') {
          dispatch({
            type: 'queryIndex',
          })
        }
      })
    }
  },
};
