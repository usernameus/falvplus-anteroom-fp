//import { parse } from 'qs'
//import {query} from '../services/schedule';
//
//export default {
//  namespace: 'scheduleDetails',
//  state: {},
//  reducers: {
//    showModal (state, action) {
//      return { ...state, ...action.payload, modalVisible: true }
//    },
//    hideModal (state) {
//      return { ...state, modalVisible: false }
//    }
//  },
//  effects: {
//    *queryering({payload},{call, put}){
//      const data = yield call(query, parse(payload))
//      if(data){
//        yield put({
//          type: 'querySuccess',
//          payload: {
//            data:data
//          }
//        })
//      }
//    },
//  },
//  subscriptions: {
//    setup({dispatch, history}){
//      history.listen(location => {
//        if (location.pathname.startWith('/admin/schedule/')) {
//          const scheduleId = location.pathname.getVarFromPath(3);
//          dispatch({type: 'queryering', payload: scheduleId})
//        }
//      })
//    }
//  },
//};
