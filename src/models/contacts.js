import { querys,queryEdit,queryModal,update,create ,remove,queryLawyer,share} from '../services/contacts'
import { parse } from 'qs'

export default {
  namespace: 'contacts',
  state: {
    list: [],
    ModalList:[],
    loading: false,
    currentItem: {},
    modalVisible: false,
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
        if (location.pathname.startWith('/admin/contacts')) {
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
        if ( location.pathname.startWith('/admin/collaborative')) {
          const queryObj = parse(location.query);
          dispatch({
            type: 'queryLawyer',
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
    *queryLawyer({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const params = {
        pageNo: payload.pageNo,
        pageSize: payload.pageSize
      };
      if(payload.keyword){
        params[payload.field] = payload.keyword;
      }
      const data = yield call(queryLawyer, params)
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
    *query({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const params = {
        pageNo: payload.pageNo,
        pageSize: payload.pageSize
      };
      if(payload.keyword){
        params[payload.field] = payload.keyword;
      }
      const data = yield call(querys, params)
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
    // *queryModal ({payload}, { call, put }) {
    //   const data = yield call(queryModal)
    //   if (data) {
    //     yield put({
    //       type: 'queryModalSuccesss',
    //       payload: {
    //         productTypes:data
    //       }
    //     })
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
    // },
    *delete ({payload}, {call, put}){
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload})
      if (data && data.success) {
        yield put({ type: 'crmcontact/hideDelModal' })
        const queryObj = parse(window.location.search.slice(1));
        const qpayload = {
          pageNo: queryObj.pageNo || 1,
          pageSize: queryObj.pageSize || 10,
          ...queryObj
        }
        yield put({
          type: 'query',
          payload: qpayload
        })
      }

    },
    *deleteLawyer ({payload}, {call, put}){
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload})
      if (data && data.success) {
        yield put({ type: 'collaborativeLawyer/hideDelModal' })
        const queryObj = parse(window.location.search.slice(1));
        const qpayload = {
          pageNo: queryObj.pageNo || 1,
          pageSize: queryObj.pageSize || 10,
          ...queryObj
        }
        yield put({
          type: 'queryLawyer',
          payload: qpayload
        })
      }

    },
    // *create({payload}, {call,put}) {
    //   yield put({ type: 'hideModalcontact' })
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(create, payload.data)
    //   if (data && data.success) {
    //     const queryObj = parse(window.location.search.slice(1));
    //     const qpayload = {
    //       pageNo: queryObj.pageNo || 1,
    //       pageSize: queryObj.pageSize || 10,
    //       ...queryObj
    //     }
    //     yield put({
    //       type: 'query',
    //       payload: qpayload
    //     })
    //     if (payload.add){
    //       yield put({ type: 'showModalcontactAdd' })
    //     }
    //   }
    //
    // },
    // *update({payload}, {call,put}){
    //   yield put({ type: 'hideModalcontact' })
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(update,payload.data)
    //   if (data && data.success) {
    //     const queryObj = parse(window.location.search.slice(1));
    //     const qpayload = {
    //       pageNo: queryObj.pageNo || 1,
    //       pageSize: queryObj.pageSize || 10,
    //       ...queryObj
    //     }
    //     yield put({
    //       type: 'query',
    //       payload: qpayload
    //     })
    //     if (payload.add){
    //       yield put({ type: 'showModalcontactAdd' })
    //     }
    //   }
    //
    // }
    *onshare({payload}, {call, put}){
      const data = yield call(share,payload)
      if (data && data.success) {
        yield put({ type: 'showLoading' })
        const params = {
          pageNo:1,
          pageSize:10
        };
        const datas = yield call(querys, params)
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
    // querySuccessModal (state, action) {
    //   const {ModalList,modalType} = action.payload
    //   return { ...state,
    //     ModalList,
    //     modalType,
    //     loading: false,
    //   }
    // },
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
    // showModalcontact (state, action) {
    //   return { ...state, ...action.payload, ModalVisiblecontact: true }
    // },
    // showModalcontactAdd (state, action) {
    //   return { ...state, ...action.payload, ModalVisiblecontact: true,ModalList:'' }
    // },
    // hideModalcontact (state) {
    //   return { ...state, ModalVisiblecontact: false }
    // }
  },
};
