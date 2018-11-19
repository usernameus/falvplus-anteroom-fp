import {parse} from 'qs';
import {query,setrule,remove,querys} from '../services/schedule';

export default {
  namespace: 'scheint',
  state: {

  },
  reducers: {
    querySuccess(state, action){
      return {
        ...state,
        list: action.payload.data
      }
    },
    showModal (state, action) {
      return { ...state, modalVisible: true}
    },
    hideModal (state) {
      return { ...state, modalVisible: false}
    },
  },
  effects: {
    *queryer({payload},{call, put}){
      const data = yield call(query, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload: {
            data:data
          }
        })
      }
    },
    *quering({payload},{call, put}){
      const data = yield call(querys, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload: {
            data:data
          }
        })
      }
    },
    *setrules({payload},{call, put}){
      yield put({ type: 'hideModal' })
      const data = yield call(setrule, parse(payload))
      if (data && data.success) {
        const qdata= yield call(query,{payload:''})
        if (qdata) {
          yield put({
            type: 'querySuccess',
            payload: {
              data:qdata
            }
          })
        }
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, {payload})
      if (data && data.success) {
        const qdata= yield call(query,{payload:''})
        if (qdata) {
          yield put({
            type: 'querySuccess',
            payload: {
              data:qdata
            }
          })
        }
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if ( location.pathname === '/admin/schedule') {
          dispatch({type: 'queryer', payload: ''})
        }
      })
    }
  },
};
