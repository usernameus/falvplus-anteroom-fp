import {queryFollowupLists,saveFollowup} from '../services/crmfollowup'
import {message} from 'antd'

export default {
  namespace: 'crmfollowup',
  state: {
    customerId: '',
    modalVisible: false,
    modalType: 'create',
    saving: false,
    lists: {
      followStatuses: [],
      followTypes: [],
      contacts: []
    }
  },
  reducers: {
    showModal(state, action){
      return {
        ...state,
        modalVisible: true,
        modalType: action.payload.modalType || 'create',
        customerId: action.payload.customerId
      }
    },
    hideModal(state, action){
      return {
        ...state,
        modalVisible: false,
        customerId: ''
      }
    },
    saving(state, action){
      return {
        ...state,
        saving:true
      }
    },
    queryFollowListsOK(state, action){
      return {
        ...state,
        lists: action.payload
      }
    },
    savingcomplete(state,action){
      return {
        ...state,
        saving:false
      }
    }
  },
  effects: {
    *initModal({payload}, {call, put}){
      try{
        const params = {
          customerId: payload.customerId
        }
        const lists = yield call(queryFollowupLists, params);
        if(lists){
          yield put({
            type: 'queryFollowListsOK',
            payload: lists
          })
          yield put({
            type: 'showModal',
            payload: {
              modalType: payload.modalType,
              customerId: payload.customerId
            }
          })
        }
      }catch(e){
        message.error('与服务器通讯失败,请重试或联系管理员')
      }
    },
    *addFollowup({payload},{call,put}){
      try{
        yield call(saveFollowup, payload.params);
        yield put({type:'hideModal'})
        if(payload.action){
          yield put({type: payload.action, payload: payload.actionPayload})
        }
      }catch(e){
        message.error('保存跟进记录失败,请重试或联系管理员')
      }

    }
  },
  subscriptions: {},
};
