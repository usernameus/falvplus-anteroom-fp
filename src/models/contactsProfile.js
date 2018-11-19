import { queryProfile,queryModal } from '../services/contactsProfile'
import { parse } from 'qs'

export default {
  namespace: 'contactsProfile',
  state: {
    loading: false,
    contactInfo: {},
    customerInfo: {},
    relatedContactList: []
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.startWith('/admin/contactsProfile/')){
          let id = location.pathname.split(/[?#\/]/)[3];
          dispatch({
            type: 'query',
            payload: {
              id:id
            }
          })
        }
      })
    }
  },
  effects: {
    *query({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(queryProfile, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    // *queryModal ({}, { call, put }) {
    //   const data = yield call(queryModal, parse());
    //   if (data) {
    //     yield put({
    //       type: 'queryModalSuccesss',
    //       payload: {
    //         productTypes:data
    //       }
    //     })
    //   }
    // }
  },
  reducers: {
    querySuccess (state, action) {
      const {list, pagination} = action.payload
      return { ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {
      return { ...state,
        ...action.payload,
        loading: false
       }
    },
    // queryModalSuccesss (state, action) {
    //   const {productTypes, pagination} = action.payload
    //   return { ...state,
    //     productTypes,
    //     loading: false,
    //     pagination: {
    //       ...state.pagination,
    //       ...pagination
    //     }}
    // },
    // showModal (state, action) {
    //   return { ...state, ...action.payload, modalVisible: true }
    // },
    // showModalfollowup (state, action) {
    //   return { ...state, ...action.payload, ModalVisible: true }
    // },
    // showModalcontact (state, action) {
    //   return { ...state, ...action.payload, ModalVisiblecontact: true }
    // },
    // hideModalfollowup (state) {
    //   return { ...state, ModalVisible: false }
    // },
    // hideModal (state) {
    //   return { ...state, modalVisible: false }
    // },
    // hideModalcontact (state) {
    //   return { ...state, ModalVisiblecontact: false }
    // }
  },
};
