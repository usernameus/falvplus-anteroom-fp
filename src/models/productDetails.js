import {parse} from 'qs'
import {product} from '../services/productdetails'

export default {
  namespace: 'productDetails',
  state: {
    workResults: []
  },
  reducers: {
    productOk(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *products({payload}, {call,put}){
      const data = yield call(product, parse(payload));
      if(data){
        yield put({
          type: 'productOk',
          payload: {datadetail:data.data}
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/product/')){
          let productId = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'products',
            payload: {
              id: productId
            }
          })
        }
      });
    }
  },
};
