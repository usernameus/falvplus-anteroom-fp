import {creation,queries,queryedit,updater,remove,querylawlist} from '../services/businessdomain'
import {parse} from 'qs'

export default {
  namespace: 'businessdomain',
  state: {
    modalVisible: false,
    loading:true
  },
  reducers: {
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload,loading: false, modalVisible: false, }
    },
  },
  effects: {
    *create ({ payload }, { call, put }) {
        const data =yield call(creation, parse(payload))
        if (data) {
          const datas = yield call(queries, parse(payload))
          if (datas) {
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
    *query ({ payload }, { call, put }) {
      const data = yield call(queries, parse(payload))
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
    *querylawyerlist({ payload }, { call, put }) {
      const data = yield call(querylawlist, parse(payload))
      if (data) {
        yield put({
          type: 'showModal',
          payload: {lawyerlist:data,modalType:payload.modalType}
        })
      }
    },
    *queryEdit({ payload }, { call, put }) {
      const data =yield call(queryedit, parse(payload))
      if (data) {
        const datas = yield call(querylawlist, parse(payload))
        if (datas) {
          yield put({
            type: 'showModal',
            payload: {lawyerlist:datas,lawyerdata:data,editid:payload.currentItem.id,modalType: 'update'}
          })
        }
      }
    },
    *update ({ payload }, { select, call, put }) {
      const data =yield call(updater, parse(payload))
      if (data) {
        const datas = yield call(queries, parse(payload))
        if (datas) {
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
    *delete ({ payload }, { call, put }) {
      const data = yield call(remove, {payload})
      if (data && data.success) {
        const datas = yield call(queries, parse(payload))
        if (datas) {
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
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/businessdomain') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },
};
