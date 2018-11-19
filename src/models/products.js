import {homeproducts} from '../services/products'
import {parse} from 'qs'

export default {
  namespace: 'products',
  state: {
    products:[],
    pagination: {}
  },

  reducers: {
    productsOK(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
  },
  effects: {
    *products({payload},{call, put}){
      const data = yield call(homeproducts, parse(payload));
      if(data){
        yield  put({
          type: 'productsOK',
          payload: {
            product: data.data,
            pagination: data.page
          }
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if ( location.pathname.parsePath() === '/products') {
          dispatch({type: 'products', payload: {page: 1, pageSize: 9}})
        }
        if (location.pathname === '/') {
          dispatch({type: 'products', payload: {page: 1, pageSize: 6}})
        }
      })
    }
  },
};
