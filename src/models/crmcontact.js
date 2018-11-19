import {queryEdit,queryModal,create,update,queryChannel,removeChannel,querys,querylawyerHave,querycontactsName} from '../services/contacts';
import {message} from 'antd'

export default {
  namespace: 'crmcontact',
  state: {
    modalVisible: false,
    modalType: 'create',
    saving: false,
    errorMsg: null,
    // nameOk:true,
    contactInfo: {},
    listData:{
      regionList: [],
      customerList: []
    },
    ChannelList:{
      flaWebContact:[],
      fparWebChannelList:{}
    }
  },
  reducers: {
    // queryNameSuccess(state, action){
    //   return {
    //     ...state,
    //     nameOk: action.payload.success
    //   }
    // },
    showModal(state, action){
      return {
        ...state,
        modalVisible: true,
        errorMsg: null,
        modalType: action.payload || 'create'
      }
    },
    showDelModal(state, action){
      return {
        ...state,
        DelmodalVisible: true,
        Deltype:true,
      }
    },
    showDelItemModal(state, action){
      return {
        ...state,
        DelmodalVisible: true,
        Deltype:false,
      }
    },
    hideDelModal(state, action){
      return {
        ...state,
        DelmodalVisible: false,
        errorMsg: null,
      }
    },
    hideModal(state, action){
      return {
        ...state,
        modalVisible: false
      }
    },
    saving(state, action){
      return {
        ...state,
        saving: true
      }
    },
    savingcomplete(state, action){
      return {
        ...state,
        saving: false
      }
    },
    queryChannelSuccess(state, action){
      return {
        ...state,
        ChannelList: action.payload
      }
    },
    querySuccess(state, action){
      return {
        ...state,
        contactInfo: action.payload
      }
    },
    queryListsSuccess(state, action){
      return {
        ...state,
        listData: action.payload
      }
    },
    clearData(state, action){
      const customerId = action.payload ? action.payload.customerId : null;
      return {
        ...state,
        contactInfo: {
          customerId: customerId
        }
      }
    },
    error(state, action){
      return {
        ...state,
        errorMsg: action.payload
      }
    }
  },
  effects: {
    //查询律师是否存在在联系人中
    *queryContacts({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(querylawyerHave, payload)
      if (data) {
        if(data.id==null||payload.modalType=='update'){
          if(data.id!=null){
            yield put({
              type: 'querySuccess',
              payload:
                data,
            })
          }
        }else{
          yield put({
            type: 'querySuccess',
            payload:
              data,
          })
        }

      }
    },
    //查询重名
    // *queryContactsName({payload}, {call, put} ){
    //   yield put({ type: 'showLoading' })
    //   const data = yield call(querycontactsName, payload)
    //   if (data) {
    //       yield put({
    //         type: 'queryNameSuccess',
    //         payload:
    //         data,
    //       })
    //   }
    // },
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
    *initDelModal({payload}, {call, put}){
      try{
        if(payload.modalType == 'delChannel'||payload.modalType == 'delItem'){
            //批量删除频道
            const data = yield call(queryChannel, { contactUserId: payload.contactUserId})
            if(data){
              yield put({type: 'queryChannelSuccess', payload: data})
              if(payload.modalType == 'delChannel'){
                yield put({type:'showDelModal', payload: 'delete'})
              }
              if(payload.modalType == 'delItem'){
                yield put({type:'showDelItemModal', payload: 'delete'})
              }

            }
          }
      }catch(e){
        message.error('与服务器通讯失败,请重试或联系管理员')
      }
    },
    *initModal({payload}, {call, put}){
      try{
        const listsdata = yield call(queryModal)
        if(listsdata){
          yield put({type: 'queryListsSuccess', payload: listsdata})
          if(payload.modalType == 'update'){
            // 编辑
            const data = yield call(queryEdit, payload)
            if(data){
              yield put({type: 'querySuccess', payload: data.data})
              yield put({type:'showModal', payload: 'update'})
            }
          }else{
            // 新建
            yield put({type: 'clearData', payload: payload})
            yield put({type: 'showModal', payload: 'create'})
          }
        }
      }catch(e){
        message.error('与服务器通讯失败,请重试或联系管理员')
      }
    },
    *create({payload}, {call,put}) {
      try{
        const data = yield call(create, payload.params)
        if (data && data.success) {
          yield put({type:'hideModal'})
          if(payload.action){
            yield put({type: payload.action, payload:payload.actionPayload})
          }
        }else if(!data.success){
          yield put({type: 'error', payload: data.successStr})
        }
      }catch(e){
        console.error(e);
        message.error('新增联系人出错,请联系管理员')
      }
    },
    *update({payload}, {call,put}){
      try{
        const data = yield call(update,payload.params)
        if (data && data.success) {
          yield put({type: 'hideModal'})
          if(payload.action){
            yield put({type: payload.action, payload: payload.actionPayload})
          }

        }

      }catch(e){
        console.error(e);
        message.error('更新联系人出错,请联系管理员')
      }

    },
    *delete ({payload}, {call, put}){
      yield put({ type: 'showLoading' })
      const data = yield call(removeChannel, payload)
      if (data && data.success) {
        yield put({type: 'hideDelModal'})
        if(payload.action){
          yield put({type: payload.action, payload: payload.actionPayload})
        }
        // const queryObj = parse(window.location.search.slice(1));
        // const qpayload = {
        //   pageNo: queryObj.pageNo || 1,
        //   pageSize: queryObj.pageSize || 10,
        //   ...queryObj
        // }
        // yield put({
        //   type: 'query',
        //   payload: qpayload
        // })
      }

    },
  },
  subscriptions: {},
};
