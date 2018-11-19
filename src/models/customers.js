import { querys,remove,update,create,queryEdit,share} from '../services/customers'
import { parse } from 'qs'

export default {
  namespace: 'customers',
  state: {
    list: [],
    loading: false,
    currentItem: {},
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
        if (location.pathname.startWith('/admin/crm')) {
          const queryObj = parse(location.query);
          dispatch({
            type: 'query',
            payload: {
              pageNo: queryObj.pageNo || 1,
              pageSize: queryObj.pageSize || 10,
              ...queryObj
            }
          })
        }
      })
    }
  },
  effects: {
    *query({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const params = {
        pageNo: payload.pageNo,
        pageSize: payload.pageSize
      };
      if(payload.keyword){
        params[payload.field] = payload.keyword;
      }
      const data = yield call(querys,params)
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
    *delete({payload}, {call, put}){
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload})
      if (data && data.success) {
        const queryObj = parse(window.location.search.slice(1));
        const qpayload = {
          pageNo: queryObj.pageNo || 1,
          pageSize: queryObj.pageSize || 10,
          ...queryObj
        }
        yield put({
          type: 'query',
          payload:  qpayload
        })
      }
    },
    *onshare({payload}, {call, put}){
      const data = yield call(share,payload)
      if (data && data.success) {
        const params = {
          pageNo:1,
          pageSize:10
        };
        const datas = yield call(querys,params)
        if (datas) {
          yield put({ type: 'showLoading' })
          yield put({
            type: 'querySuccess',
            payload: {
              list: datas.data,
              pagination: datas.page
            }
          })
        }
      }
    },
    *create({payload}, {call,put}) {
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload.data)
      if (data && data.success) {
        const queryObj = parse(window.location.search.slice(1));
        const qpayload = {
          pageNo: queryObj.pageNo || 1,
          pageSize: queryObj.pageSize || 10,
          ...queryObj
        }
        yield put({
          type: 'query',
          payload:  qpayload
        })
      }
    },
    *update({payload}, {call,put}){
      yield put({ type: 'showLoading' })
      const data = yield call(update,payload.data)
      if (data && data.success) {
         const queryObj = parse(window.location.search.slice(1));
        const qpayload = {
          pageNo: queryObj.pageNo || 1,
          pageSize: queryObj.pageSize || 10,
          ...queryObj
        }
        yield put({
          type: 'query',
          payload:  qpayload
        })
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
  }
};
