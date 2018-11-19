// import {myCity, queryWeather, query} from '../services/dashboard'
import {parse} from 'qs'
import {query,update,updateLawyer,DomainExpired,withdrawalsApply,queryPackageInfo,queryPackageInfoDetails,queryPackageInfoMsgDetails,queryPackageInfoUseDetails,queryfinancedash} from '../services/profile';

export default {
  namespace: 'dashboard',
  state: {
    profileEdit:false,
    packageModal:false,
    LawyerprofileEdit:false,
    withdrawalsVisible:false,
  },
  subscriptions: {
    setup ({dispatch,history}) {
      history.listen((location)=>{
        if( /^\/admin(\/dashboard)?/.test(location.pathname)){
          dispatch({
            type: "queryProfile"
          });
          dispatch({
            type: 'account/queryRemain'
          });
          dispatch({
            type: 'queryExpired'
          });
          dispatch({
            type: 'queryPackage'
          });
          dispatch({
            type: 'queryFinanceDash'
          });
        }
      })
    }
  },
  effects: {
    *queryFinanceDash({payload},{call, put}){
      const data = yield call(queryfinancedash);
      if(data){
        yield put({
          type:'FinanceSuccess',
          payload: {
            financeData:data
          }
        })
      }
    },
    //套餐信息
    *queryPackage({payload},{call, put}){
      const data = yield call(queryPackageInfo);
      if(data){
        yield put({
          type:'packageSuccess',
          payload: {
            package:data
          }
        })
      }
    },
    //套餐存储信息详情
    *queryPackageDetails({payload},{call, put}){
      const data = yield call(queryPackageInfoDetails,payload);
      if(data){
        yield put({
          type:'packageDetailsSuccess',
          payload: {
            packageDetails:data,
            dataType:payload.dataType,
          }
        })
      }
    },
    //套餐信息短信详情
    *queryPackageMsgDetails({payload},{call, put}){
      const data = yield call(queryPackageInfoMsgDetails,payload);
      if(data){
        yield put({
          type:'packageMsgDetailsSuccess',
          payload: {
            packageMsgDetails:data,
            dataType:payload.dataType,
            activeKey:payload.activeKey,
          }
        })
      }
    },
    //套餐信息短信使用详情
    *queryPackageUseDetails({payload},{call, put}){
      const data = yield call(queryPackageInfoUseDetails,payload);
      if(data){
        yield put({
          type:'queryPackageUseDetailsSuccess',
          payload: {
            packageUseDetails:data.data,
            activeKey:payload.activeKey,
            dataType:payload.dataType,
            pagination: data.page
          }
        })
      }
    },
    //提现申请
    *WithdrawalsApply({payload},{call, put}){
      const dataa = yield call(withdrawalsApply,payload);
      if(dataa&&dataa.success){
        yield put({
          type:'ApplySuccess',
          payload:{Expired:dataa}
        })
        const data = yield call(queryfinancedash);
        if(data){
          yield put({
            type:'FinanceSuccess',
            payload: {
              financeData:data
            }
          })
        }
      }
    },
    *queryProfile({payload},{call, put}){
      const data = yield call(query,DomainExpired);
      if(data){
        yield put({
          type:'profileSuccess',
          payload: {
            profile:data
          }
        })
      }
    },
    *queryExpired({payload},{call, put}){
      const data = yield call(DomainExpired);
      if(data){
        yield put({
          type:'expiredSuccess',
          payload: {
            Expired:data
          }
        })
      }
    },
    *update ({ payload }, { select, call, put }) {
      const newUser = { ...payload }
      const data = yield call(update, newUser)
      if (data && data.success) {
        const data = yield call(query, parse(payload))
        if(data) {
          yield put({
            type: 'editOk',
            payload: {
              profile:data,
              profileEdit: false
            }
          })
        }
      }
    },
    *updateLawyer ({ payload }, { select, call, put }) {
      const newUser = { ...payload }
      const data = yield call(updateLawyer, newUser)
      if (data && data.success) {
        const data = yield call(query, parse(payload))
        if(data) {
          yield put({
            type: 'editOk',
            payload: {
              profile:data,
              LawyerprofileEdit: false
            }
          })
        }
      }
    },

  },
  reducers: {
    FinanceSuccess(state,action){
      return {
        ...state,
        financeData:action.payload.financeData,
      }
    },
    //套餐信息
    packageSuccess(state,action){
      return {
        ...state,
        packageInfo:action.payload.package,
      }
    },
    //短信详情
    packageMsgDetailsSuccess(state,action){
      return {
        ...state,
        packageInfoMsgDetails:action.payload.packageMsgDetails,
        dataType:action.payload.dataType,
        activeKey:action.payload.activeKey,
      }
    },
    //短信使用详情
    queryPackageUseDetailsSuccess(state,action){
      return {
        ...state,
        packageModal:true,
        packageInfoUseDetails:action.payload.packageUseDetails,
        activeKey:action.payload.activeKey,
        dataType:action.payload.dataType,
        pagination:action.payload.pagination
      }
    },
    //存储详情
    packageDetailsSuccess(state,action){
      return {
        ...state,
        packageInfoDetails:action.payload.packageDetails,
        packageModal:true,
        dataType:action.payload.dataType,
      }
    },
    //详情Modal消失
    hideModal(state){
      return{
        ...state,
        packageModal:false,
      }
    },
    //提现Modal
    showWithdrawalsModal(state){
      return{
        ...state,
        withdrawalsVisible:true,
      }
    },
    hideWithdrawalsModal(state){
      return{
        ...state,
        withdrawalsVisible:false,
        ApplySuccess:{success:false}
      }
    },
    //提现申请
    ApplySuccess(state,action){
        return {
          ...state,
          // withdrawalsVisible:false,
          ApplySuccess:action.payload.Expired,
        }
      },
    editProfileModeChange(state,action){
      return {
        ...state,
        profileEdit: !state.profileEdit
      }
    },
    hideEditLawyerProfileModeChange(state,action){
      return {
        ...state,
        LawyerprofileEdit: false
      }
    },
    editLawyerProfileModeChange(state,action){
      return {
        ...state,
        LawyerprofileEdit: true
      }
    },
    editOk(state, action){
      return {
        ...state,
        profile:action.payload.profile,
        profileEdit:false,
        LawyerprofileEdit:false

      }
    },
    expiredSuccess(state, action){
      return {
        ...state,
        Expired:action.payload.Expired,
      }
    },
    profileSuccess(state, action){
      return {
        ...state,
        profile: action.payload.profile
      }
    },
  }
}
