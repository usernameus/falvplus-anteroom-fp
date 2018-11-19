import {saveCrmDictList, queryAllDictList} from '../services/crmdict';

export default {
  namespace: 'crmdict',
  state: {
    holderId: '',
    customerTypes: [],
    followStatuses: [],
    sources:[],
    scales:[],
    industries: [],
    followTypes: []
  },
  reducers: {
    queryDictOK(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    queryListsSuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *saveCrmDictList({payload}, {call, put}){
      const data = yield call(saveCrmDictList, payload);
      if(data){
        console.log(data);
        // yield put({
        //   type: 'queryDictLists',
        // })
      }
    },
    // //Modal数据查询
    // *queryDictLists({payload}, { call, put }) {
    //   const data = yield call(queryAllDictList)
    //   if (data) {
    //     yield put({
    //       type: 'queryListsSuccess',
    //       payload: data
    //     })
    //     // if(payload.modalType == 'create'){
    //     //   yield put({
    //     //     type: 'customers/showModalAdd',
    //     //     payload: {
    //     //       modalType: 'create'
    //     //     }
    //     //   })
    //     // }else{
    //     //   yield put({
    //     //     type: 'customers/editQuery',
    //     //     payload: {
    //     //       modalType: 'update',
    //     //       id: payload.id
    //     //     }
    //     //   })
    //     // }
    //   }
    // },
    *queryDict({payload}, {call, put}){
      const data = yield call(queryAllDictList, payload);
      if(data){
        let rpayload = {};
        if(data.typeCode == 'customer_type'){
          rpayload = {
              customerTypes: data.values
            }
        }else if(data.typeCode == 'follow_status'){
           rpayload = {
              followStatuses: data.values
            }
        }else if(data.typeCode == 'source'){
           rpayload = {
              sources: data.values
            }
        }else if(data.typeCode == 'scale'){
           rpayload = {
              scales: data.values
            }
        }else if(data.typeCode == 'industry'){
           rpayload = {
              industries: data.values
            }
        }else if(data.typeCode == 'follow_type'){
           rpayload = {
              followTypes: data.values
            }
        }
        yield put({
          type: 'queryDictOK',
          payload: rpayload
        })
      }
    }
  },
  subscriptions: {
  }
};
