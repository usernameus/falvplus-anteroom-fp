import {query,remove,article,update,create} from '../services/articles'
import { parse } from 'qs'
import {ueditorbase} from '../utils/config'

export default {
  namespace: 'adminArticle',
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
        if(location.pathname.startWith('/admin/article/')){
          window.UEDITOR_HOME_URL= ueditorbase;
          let articleId = location.pathname.substring('/admin/article/'.length);
          dispatch({
            type: 'article',
            payload: {
              id: articleId
            }
          })
        }else if (location.pathname === '/admin/articles') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {
    *article({payload}, {call,put}){
      const data = yield call(article, parse(payload));
      if(data){
        yield put({
          type: 'articleOk',
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
    articleOk(state, action){
      return {...state, ...action.payload,};
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
