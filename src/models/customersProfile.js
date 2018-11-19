import { queryProfile} from '../services/customersprofile'
import {followups} from '../services/crmfollowup'
import { parse } from 'qs'

export default {
  namespace: 'customersProfile',
  state: {
    // ModalList:[],
    // contactsproductTypes:{
    //   customerType:'',
    //   followStatus:'',
    //   sWebProvinceList:'',
    //   source:'' +
    //   ''
    // },
    showStatus:'1',
    customerInfo: {
      id: ''
    },
    followlogs: [],
    // followUpsproductTypes:{
    //   flaWebContactList:'',
    //   followStatus:'',
    //   followType:'',
    // },
    // productTypes:{
    //   customerType:'',
    //   followStatus:'',
    //   sWebProvinceList:'',
    //   source:'' +
    //   ''
    // },
    // list: [],
    loading: false,
    // currentItem: {},
    // modalVisible: false,
    // modalType: 'create',
    pagination:{
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname.startWith('/admin/crm/')) {
          let id = location.pathname.split(/[?#\/]/)[3];
          dispatch({
            type: 'query',
            payload: {
              id:id
            }
          })
          // dispatch({
          //   type: 'queryCustomerModal',
          // })
          // dispatch({
          //   type: 'queryContactsModal'
          // })
          // dispatch({
          //   type: 'queryFollowUpModal',
          //   payload: {
          //     id:id
          //   }
          // })
        }
      })
    }
  },
  effects: {
    *query({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(queryProfile, parse(payload))
      if (data) {
        const customerId = data.customerInfo.id;
        const followlogs = yield call(followups,{customerId: customerId})
        yield put({
          type: 'querySuccess',
          payload: {
            ...data,
            followlogs: followlogs
          }
        })

      }
    },
    // *queryCustomerModal ({}, { call, put }) {
    //   const data = yield call(querycustomerModal, parse())
    //   if (data) {
    //     yield put({
    //       type: 'querycustomerModalSuccesss',
    //       payload: {
    //         productTypes:data
    //       }
    //     })
    //   }
    // },
    // *queryContactsModal ({}, { call, put }) {
    //   const data = yield call(querycontactsModal, parse())
    //   if (data) {
    //     yield put({
    //       type: 'querycontactsModalSuccesss',
    //       payload: {
    //         contactsproductTypes:data
    //       }
    //     })
    //   }
    // },
    // *queryFollowUpModal ({payload}, { call, put }) {
    //   const data = yield call(queryfollowUpModal, parse(payload))
    //   if (data) {
    //     yield put({
    //       type: 'queryfollowUpModalSuccesss',
    //       payload: {
    //         followUpsproductTypes:data
    //       }
    //     })
    //   }
    // },
    // *'delete' ({payload}, {call, put}){
    //
    // },
    // *create({payload}, {call,put}) {
    //   yield put({ type: 'hideModalcontact' })
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(create, payload)
    //   if (data && data.success) {
    //     const data = yield call(query, parse(payload))
    //     if (data) {
    //       yield put({
    //         type: 'querySuccess',
    //         payload: {
    //           list: data.data,
    //           pagination: data.page
    //         }
    //       })
    //     }
    //     if (payload.add){
    //       yield put({ type: 'showModalcontactAdd' })
    //     }
    //   }
    // },
    // *update({payload}, {call,put}){
    //   yield put({ type: 'hideModalcontact' })
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(update,payload.data)
    //   if (data && data.success) {
    //     const pay={
    //       id:payload.data.customerId
    //     }
    //     const data = yield call(queryProfile, parse(pay))
    //     if (data) {
    //       yield put({
    //         type: 'updateSuccess',
    //         payload: {
    //           ContactsProfiledata:data
    //         }
    //       })
    //     }
    //     //if (payload.add){
    //     //  yield put({ type: 'showModalcontactAdd' })
    //     //}
    //   }
    // },
    // *editQuery({payload}, {call, put} ){
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(queryEdit,parse(payload))
    //   if (data) {
    //     yield put({ type: 'showModalcontact' }),
    //       yield put({
    //         type: 'querySuccessModal',
    //         payload: {
    //           ModalList: data.data,
    //           modalType:'update'
    //         }
    //       })
    //   }
    // }
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },

    updateSuccess (state, action) {
      const {ContactsProfiledata} = action.payload
      return {
        ...state,
        showStatus:'3',
        ContactsProfiledata,
        modalVisible: false,
        loading: false
      }
    },
    querySuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    },
    // querycustomerModalSuccesss (state, action) {
    //   const {productTypes, pagination} = action.payload
    //   return { ...state,
    //     productTypes,
    //     loading: false,
    //     pagination: {
    //       ...state.pagination,
    //       ...pagination
    //     }}
    // },
    // querycontactsModalSuccesss (state, action) {
    //   const {contactsproductTypes, pagination} = action.payload
    //   return { ...state,
    //     contactsproductTypes,
    //     loading: false,
    //     pagination: {
    //       ...state.pagination,
    //       ...pagination
    //     }}
    // },
    // queryfollowUpModalSuccesss (state, action) {
    //   const {followUpsproductTypes, pagination} = action.payload
    //   return { ...state,
    //     followUpsproductTypes,
    //     loading: false,
    //     pagination: {
    //       ...state.pagination,
    //       ...pagination
    //     }}
    // },
    // querySuccessModal (state, action) {
    //   const {ModalList,modalType} = action.payload
    //   return { ...state,
    //     ModalList,
    //     modalType,
    //     loading: false,
    //   }
    // },
    // hideModalcontact (state) {
    //   return { ...state,modalVisible: false }
    // },
    // showModalcontact (state, action) {
    //   return { ...state, ...action.payload, modalVisible: true }
    // },
    // showModalcontactAdd (state, action) {
    //   return { ...state, ...action.payload, modalVisible: false,ModalList:'' }
    // },
    // hideModalfollowup (state) {
    //   return { ...state, modalVisible: false }
    // }
  },
};
