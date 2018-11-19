import {parse} from 'qs';
import {query} from '../services/profile';

export default {
  namespace: 'profile',
  state: {
  },
  reducers: {
    querySuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *query({payload},{call, put}){
      const data = yield call(query, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }

    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location =>{
        if(location.pathname.parsePath() === '/profile'||location.pathname.startWith('/phoneOrder')){
          dispatch({type: 'query', payload: location.query})
        }
        if(location.pathname === '/'||location.pathname == '/m'){
          dispatch({type: 'query', payload: location.query})
        }
      });
    }
  }
};
