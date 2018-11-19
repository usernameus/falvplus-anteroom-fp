import {parse} from 'qs'
import {querydetails} from '../services/businessareadetsils'

export default {
  namespace: 'businessareadetails',
  state: {
    selectOption:1
  },
  reducers: {
    querySuccess(state, action){
      return {...state, ...action.payload,selectOption:action.payload.fparWebBusinessDomain.id};
    },
  },
  effects: {
    *queryDetails({payload}, {call,put}){
      const data = yield call(querydetails, parse(payload));
      if(data){
        yield put({
          type: 'querySuccess',
          payload: {fparWebBusinessDomain:data.fparWebBusinessDomain,fparWebBusinessDomains:data.fparWebBusinessDomains}
        })
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/businessArea/')){
          let data = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'queryDetails',
            payload:{bussinessId:data}
          })
        }
      });
    }
  },
};
