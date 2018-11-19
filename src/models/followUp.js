import { query,remove,update,create,queryEdit,queryModal } from '../services/customers'
import { parse } from 'qs'

export default {
  namespace: 'followUp',
  state: {
    list: [],
    ModalList:[],
    loading: false,
    currentItem: {},
    modalVisible: false,
    ModalVisible: false,
    ModalVisiblecontact:false,
    modalType: 'create',
    productTypes:{
      customerType:'',
      followStatus:'',
      sWebProvinceList:'',
      source:'' +
      ''
    },
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
        if (location.pathname === '/admin/crm') {
          dispatch({
            type: 'queryData',
            payload: {
              pageNo: 1,
              pageSize: 10
            }
          })
          dispatch({
            type: 'queryModal'
          })
        }
      })
    }
  },
  effects: {
    *queryData({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
    //Modal数据查询
    *queryModal ({}, { call, put }) {
      const data = yield call(queryModal, parse())
      if (data) {
        yield put({
          type: 'queryModalSuccesss',
          payload: {
            productTypes:data
          }
        })
      }
    },
    *editQuery({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(queryEdit, parse(payload))
      if (data) {
        yield put({ type: 'showModal' }),
          yield put({
            type: 'querySuccessModal',
            payload: {
              ModalList: data,
              modalType:'update'
            }
          })
      }
    },
    *delete({payload}, {call, put}){
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload})
      if (data && data.success) {
        const data = yield call(query, parse(payload))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
        }
      }
    },
    *create({payload}, {call,put}) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload.data)
      if (data && data.success) {
        const data = yield call(query, parse(payload))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
        }
        if (payload.add){
          yield put({ type: 'showModal' })
        }
      }
    },
    *update({payload}, {call,put}){
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(update,payload.data)
      if (data && data.success) {
        const data = yield call(query, parse(payload))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
        }
        if (payload.add){
          yield put({ type: 'showModal' })
        }
      }
    }
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
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
    querySuccessModal (state, action) {
      const {ModalList,modalType} = action.payload
      return { ...state,
        ModalList,
        modalType,
        loading: false,
      }
    },
    queryModalSuccesss (state, action) {
      const {productTypes, pagination} = action.payload
      return { ...state,
        productTypes,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showModalAdd (state, action) {
      return { ...state, ...action.payload, modalVisible: true ,ModalList:''}
    },
    showModalcontact (state, action) {
      return { ...state, ...action.payload, ModalVisiblecontact: true }
    },
    hideModalfollowup (state) {
      return { ...state, ModalVisible: false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    hideModalcontact (state) {
      return { ...state, ModalVisiblecontact: false }
    }
  },
};
