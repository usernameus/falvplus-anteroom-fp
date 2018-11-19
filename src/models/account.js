import {getRemainAmount} from '../services/account';

export default {
  namespace: 'account',
  state: {
    remainAmount: 0
  },
  reducers: {
    queryRemainSuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *queryRemain({payload},{call, put}){
      const data = yield call(getRemainAmount)
      yield put({
        type: 'queryRemainSuccess',
        payload: data
      })
    }
  },
  subscriptions: {},
};
