import {queryEdit} from '../services/customers';
import {saveCrmDictList, queryAllDictList} from '../services/crmdict';
import {message} from 'antd';
import {create, update} from '../services/customers';

export default {
  namespace: 'crmcustomer',
  state: {
    modalVisible: false,
    modalType: 'create',
    saving: false,
  },
  reducers: {
    showModal(state, action){
      return {
        ...state,
        modalVisible: true,
        modalType: action.payload || 'create'
      }
    },
    hideModal(state, action){
      return {
        ...state,
        modalVisible: false
      }
    },
    querySuccess(state, action){
      return {
        ...state,
        customerInfo: action.payload
      }
    },
    clearData(state, action){
      return {
        ...state,
        customerInfo: {}
      }
    }
  },
  effects: {
    *initModal({payload}, {call, put}){
      try{
        const dictdata = yield call(queryAllDictList)
        if(dictdata){
          yield put({type: 'crmdict/queryListsSuccess', payload: dictdata})
          if(payload.modalType == 'update'){
            // 编辑
            const data = yield call(queryEdit, payload)
            if(data){
              yield put({type: 'querySuccess', payload: data})
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
            yield put({
              type: payload.action,
              payload: payload.actionPayload
            })
          }
        }
      }catch(e){
        message.error('保存客户出错,请联系管理员')
      }
    },
    *update({payload}, {call,put}){
      try{
        const data = yield call(update,payload.params)
        if (data && data.success) {
          yield put({type: 'hideModal'})
          if(payload.action){
            yield put({
              type: payload.action,
              payload: payload.actionPayload
            })
          }
        }
      }catch(e){
        console.error(e);
        message.error('更新客户出错,请联系管理员')
      }
    }
  },
  subscriptions: {},
};
