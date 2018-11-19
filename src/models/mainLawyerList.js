
import {lawyerListInfo,indexLawyersInfo} from '../services/mainLawyerList'
import {parse} from 'qs'
export default {
  namespace: 'mainLawyerList',
  state: {
    products:[],
    pagination: {}
  },

  reducers: {
    lawyersListOK(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *FirmLawyersList({payload},{call, put}){
      const data = yield call(lawyerListInfo, parse(payload));
      if(data){
        yield  put({
          type: 'lawyersListOK',
          payload: {
            lawyerList: data.data,
            pagination: data.page
          }
        })
      }
    },
    *indexlawyersList({payload},{call, put}){
      const data = yield call(indexLawyersInfo, parse(payload));
      if(data){
        yield  put({
          type: 'lawyersListOK',
          payload: {
            lawyerList: data.data.slice(0,10),
            pagination: data.page
          }
        })
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if ( location.pathname.parsePath() === '/lawyerList') {
          dispatch({type: 'FirmLawyersList', payload: {page: 1, pageSize: 10}})
        }

        if (location.pathname === '/') {
          dispatch({type: 'indexlawyersList', payload: {page: 1, pageSize: 10}})
        }
      })
    }
  },
};
