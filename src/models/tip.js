import {parse} from 'qs'
import {packageDownload} from '../services/tip'

export default {
  namespace: 'tip',
  state: {},
  reducers: {
    packDown(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *PackageDownload({payload}, {call,put}){
      const data = yield call(packageDownload, parse(payload));
      if(data){
        yield put({
          type: 'packDown',
          payload: data
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen((location)=>{
        if(location.pathname.parsePath().startWith('/tip')){
          dispatch({
            type: 'PackageDownload',
          })
        }
      });
    }
  },
};
