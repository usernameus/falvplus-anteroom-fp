
import {lawyerInfo} from '../services/mainLawyerList'
import {parse} from 'qs'

export default {
  namespace: 'mainLawyerDetails',
  state: {
  },

  reducers: {
    lawyerDetailsOk(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *lawyerDetails({payload}, {call,put}){
      const data = yield call(lawyerInfo, parse(payload));
      if(data){
        yield put({
          type: 'lawyerDetailsOk',
          payload: data
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        //律师详情
        if(location.pathname.parsePath().startWith('/lawyerDetails/')){
          let productId = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'lawyerDetails',
            payload: {
              id: productId
            }
          })
        }
      })
    }
  },
};
