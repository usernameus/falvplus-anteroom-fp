import {businessArea} from '../services/businessArea'
import {parse} from 'qs'

export default {
  namespace: 'businessarea',
  state: {},
  reducers: {
    querylistOK(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        loginState: true,
        loginButtonLoading: false
      }
    },
  },
  effects: {
    *businesslist({payload},{call, put}){
      const data = yield call(businessArea,parse(payload));
      if(data){
        yield  put({
          type: 'querylistOK',
          payload:{data:data.data,pagination:data.page}
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if ( location.pathname.parsePath() === '/businessAreas') {
          dispatch({
            type: 'businesslist',
          })
        }
        if (location.pathname === '/') {
          dispatch({type: 'businesslist', payload: {page: 1, pageSize: 10}})
        }
      })
    }
  },
};
