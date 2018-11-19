import {parse} from 'qs'
import {query} from '../services/articles'

export default {
  namespace: 'articles',
  state: { list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }},
  reducers: {
    querySuccess (state, action) {
      const {list, pagination,url} = action.payload
      return { ...state,
        list,
        url,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    loadmore(state, action){
      const {list, pagination} = action.payload
      state.list = state.list.concat(list)
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...pagination
        }
     }
    }
  },
  effects: {
    *query({payload}, {call, put}){
      const data = yield call(query , parse(payload));
      if(data){
        yield put({
          type: 'querySuccess',
          payload:{
            url:data.url,
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
    *queryMore({payload}, {call, put}){
      const data = yield call(query , parse(payload));
      if(data){
        yield put({
          type: 'loadmore',
          payload:{
            url:data.url,
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname.parsePath().startWith('/articles')) {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
        // if (location.pathname === '/' ) {
        //   dispatch({type: 'query', payload: location.query})
        // }
      })
    }
  },
};
