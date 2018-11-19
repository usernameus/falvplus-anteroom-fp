import {query,remove,cases,update,create} from '../services/cases'
import { parse } from 'qs'

export default {
  namespace: 'adminCases',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname.startWith('/admin/case/')){
          let caseId = location.pathname.substring('/admin/case/'.length);
          dispatch({
            type: 'case',
            payload: {
              id: caseId
            }
          })
        }else if (location.pathname === '/admin/cases') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {
    *case({payload}, {call,put}){
      const data = yield call(cases, parse(payload));
      if(data){
        yield put({
          type: 'caseOk',
          payload: data
        })
      }
    },
    *query ({ payload }, { call, put }) {
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
    *'delete' ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload.id })
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
    *create ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload)
      if (data && data.success) {
        yield put({
          type: 'addOk',
          payload: {
            id: data.id,
            // pagination: {
            //   total: data.page.total,
            //   current: data.page.current
            // }
          }
        })
      }
    },
    *update ({ payload }, {  call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(update,{...payload})
      if (data && data.success) {
        yield put({
          type: 'editOk',
          payload: {
            id: data.id,
            // pagination: {
            //   total: data.page.total,
            //   current: data.page.current
            // }
          }
        })
      }
    }
  },

  reducers: {
    caseOk(state, action){
      return {...state, ...action.payload};
    },
    editOk(state, action){
      return {...state, ...action.payload,successAdd: true};
    },
    addOk(state, action){
      return {...state, ...action.payload,successAdd: true};
    },
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
        },successAdd: true}
    },
  }

}
