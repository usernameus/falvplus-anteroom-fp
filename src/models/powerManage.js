/**
 * Created by zhihangjishu on 17/2/28.
 */
import { creation, remove, updater, queries,services } from '../services/lawyerList'
import { parse } from 'qs'

export default {
  namespace: 'powerManage',

  state: {
    productId: '',
    lawyerUserId: '',
    productName: '',
    productBrief: '',
    productThumb: '',
    shopPriceY:'',
    productImg:'',
    serviceTypeStr:'',
    productTypeIdStr:'',
    productNumber:'',
    onSale:'',
    unitStr:'',
    unit:'',
    productDesc:'',
    productTypes:[],
    //orderType:''
    //serviceType:'',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    },
    productType:'',
    fausetipVisible:false,
    addresultsVisible:false,
    lawpromodalVisible:false
  },


  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/powerManage') {
          dispatch({
            type: 'query',
            payload: location.query
          })
          dispatch({
            type: 'service'
          })
        }
      })
    }
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
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
    *service ({}, { call, put }) {
      const data = yield call(services, parse())
      if (data) {
        yield put({
          type: 'querySuccesss',
          payload: {
            productTypes:data
          }
        })
      }
    },
    *'delete' ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, {id:payload})
      if (data && data.success) {
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
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(creation,payload)
      if (data && data.success) {
        const qdata =yield call(queries, parse(payload))
        if (qdata) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: qdata.data,
              pagination: qdata.page
            }
          })
        }
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const id = yield select(({ myproducts }) => myproducts.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updater, newUser)
      if (data && data.success) {
        const data = yield call(queries, parse(payload))
        if(data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
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
    querySuccesss (state, action) {
      const { pagination,productTypes} = action.payload
      return { ...state,
        productTypes,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true, fausetipVisible:false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLawProcuctModal(state, action) {
      return { ...state, ...action.payload, lawpromodalVisible: true}
    },
    hideLawProcuctModal(state, action) {
      return { ...state, ...action.payload, lawpromodalVisible:false}
    },
    fausetip(state) {
      return { ...state, fausetipVisible:true }
    },
    showaddresults(state) {
      return { ...state, addresultsVisible:true }
    },
    hideaddresults(state) {
      return { ...state, addresultsVisible:false }
    }
  }

}

