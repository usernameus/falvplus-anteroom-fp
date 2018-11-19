/**
 * Created by zhihangjishu on 17/2/28.
 */
import { queryProfile,update ,updater,verifyCode,handlechangepw,showorderdetail,queryphoneOrder,ordersDetails,queryfinancelist,handlePhoneedit} from '../services/userDetails'
import { parse } from 'qs'

const Cookie = require('js-cookie');
export default {
  namespace: 'userDetails',

  state: {
    modalVisible: false,
    editVisible:false,
    baseinforVisible:true,
    coutmonVisible:false,
    runorderVisible:false,
    usernameVisible:false,
    useremailVisible:false,
    changefalVisible:false,
    logincodeVisible:false,
    userprofilesVisible:true,
    userrunorderVisible:false,
    basesorceVisible:false,
    phoneConsultation:false,
    orderDetailVisible:false,
    //财务列表
    FinanceVisible:false,
    tabVisible:false,
    userphoneeditVisible:false
  },


  reducers: {
    queryProfile (state, action) {
      return { ...state, ...action.payload, editVisible: false }
    },
    usernameplay (state, action) {
      return { ...state, ...action.payload,
        usernameVisible: true,
        modalVisible: false,
        modalVisibles:false,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        userrunorderVisible:false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    querySuccess(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },
    editOk(state, action){
      return {
        ...state,
        ...action.payload.userInfo,
        baseinforVisible:true,
        useremailVisible:false,
        phoneConsultation: false,
        editVisible: false,
        usernameVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    editFault(state, action){
      return {
        ...state, changefalVisible:true
      }
    },
    showDeposit(state, action){
      return {
        ...state,
        modalVisible: true
      }
    },
    showDetailsModal(state, action){
      return {
        ...state,
        ...action.payload,
        orderDetailVisible: true
      }
    },
    hideDetailsModal(state, action){
      return {
        ...state,
        orderDetailVisible: false
      }
    },
    showDeposits(state, action){
      return {
        ...state,
        modalVisibles: true,
        userprofilesVisible:false
      }
    },
    hideDeposit(state, action){
      return {
        ...state,
        modalVisible: false
      }
    },
    editbasesorce(state, action){
      return {
        ...state,
        userprofilesVisible:false,
        basesorceVisible:true,
        phoneConsultation: false,
        FinanceVisible:false
      }
    },
    userrunordertates(state, action){
      return {
        ...state,
        usernameVisible: false,
        modalVisible: false,
        modalVisibles:false,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        userprofilesVisible:false,
        userrunorderVisible:true,
        FinanceVisible:false,
      }
    },
    editProfile (state, action) {
      return { ...state, ...action.payload,
        payforVisible:false,
        baseinforVisible:false,
        editVisible: true,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    showbaseinfor(state,action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:true,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    showcountmoney(state,action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:true,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    showrunorder(state,action){

      const {OrderList, pagination,keyword} = action.payload
      return{
        ...state,
        OrderList,
        pagination,
        keyword,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:true,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        userprofilesVisible:false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    useremailplay(state,action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:true,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    userphoneplay(state,action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:true
      }
    },
    showlogincode(state,action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:false,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:true,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
    handlesubError(state,action){
      const {code} = action.payload;
      return {...state,
        errorPrompt:code,
        changefalVisible:true
      }
    },
    //电话咨询
    phoneConsultation(state, action){
      const {list, pagination,types} = action.payload
      return {
        ...state,
        phoneList:list,
        types,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        },
        phoneConsultation: true,
        FinanceVisible:false,
        baseinforVisible:false,
        runorderVisible:false,
        userprofilesVisible:false,
        basesorceVisible:false,
        changefalVisible:false,
        usernameVisible:false,
        logincodeVisible:false,
        useremailVisible:false,
        userphoneeditVisible:false,
        modalVisible: false,
        modalVisibles:false,
        editVisible:false,
        coutmonVisible:false,
        userrunorderVisible:true
      }
    },
    queryListSuccess(state, action){
      const {list, pagination,types} = action.payload
      return {
        ...state,
        phoneList:list,
        types,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        },
        phoneConsultation: false,
        FinanceVisible:true,
        baseinforVisible:false,
        runorderVisible:false,
        userprofilesVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        basesorceVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        userphoneeditVisible:false,
        modalVisible: false,
        modalVisibles:false,
        editVisible:false,
        coutmonVisible:false,
        userrunorderVisible:true,
      }
    },
    phoneEditSuccess(state, action){
      return{
        ...state,
        editVisible:false,
        baseinforVisible:true,
        coutmonVisible:false,
        runorderVisible:false,
        usernameVisible:false,
        useremailVisible:false,
        changefalVisible:false,
        logincodeVisible:false,
        phoneConsultation: false,
        FinanceVisible:false,
        userphoneeditVisible:false
      }
    },
  },
  effects: {
    *showrunorders({payload},{call, put}){
      const data = yield call(showorderdetail, parse(payload))
      if(data){
        yield put({
          type: 'showrunorder',
          payload:{
            OrderList:data.data,
            pagination: data.page,
            keyword:data.keyword
          }
        })
      }
    },
    *showpayfors({payload},{call, put}){
      const data = yield call(showorderdetail, parse(payload))
      if(data){
        yield put({
          type: 'showpayfor',
          payload:{
            list:data.data,
            pagination: data.page
          }
        })
      }
    },
    *queryorderr({payload},{call, put}){
      const data = yield call(showorderdetail, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload:{
            OrderList:data.data,
            pagination: data.page
          }
        })
      }
    },
    //电话咨询
    *queryPhoneOrder({payload},{call, put}){
      const data = yield call(queryphoneOrder, payload)
      if(data){
        yield put({
          type: 'phoneConsultation',
          payload: {
            list: data.data,
            pagination: data.page,
            types:data.types
          }
        })
      }
    },
    //财务列表
    *queryFinanceList({payload},{call, put}){
      const data = yield call(queryfinancelist, payload)
      if(data){
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: data.data,
            pagination: data.page,
            types:payload.orderType
          }
        })
      }
    },
    *query({payload},{call, put}){
      const data = yield call(queryProfile, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload: data.data
        })
      }
    },
    *handlesub({payload},{call, put}){
      const data = yield call(handlechangepw, parse(payload))
      if(data.success){
        yield put({
          type: 'showbaseinfor',
        })
      }else{
        if (data.code=='WRONG_VERIFYCODE'){
          yield put({
            type: 'handlesubError',
            payload: {
              code:"验证码错误,请重新输入"
            }
          })
        }
      }

    },
    *orders({payload}, {call,put}){
      const data = yield call(ordersDetails, parse(payload));
      if(data){
        yield put({
          type: 'showDetailsModal',
          payload: data.details[0]
        })
      }
    },
    *getVerifyCode({payload}, {call, put}){
      const data = yield call(verifyCode, payload)
      if(data && data.success){

      }
    },
    *editQuery({payload},{call, put}){
      yield put({ type: 'editProfile' })
      const data = yield call(queryProfile, parse(payload))
      if(data){
        yield put({
          type: 'querySuccess',
          payload: data.data
        })
      }

    },
    *update ({ payload }, { select, call, put }) {
      const newUser = { ...payload }
      const data = yield call(update, newUser)
      if (data && data.success) {
        const data = yield call(queryProfile, parse(payload))
        if(data) {
          yield put({
            type: 'editOk',
            payload: {
              userInfo: data.data,
              pagination: data.page
            }
          })

          yield put({
            type: 'login/hidedituserModal',
          })

          if(payload.consultClick){
            yield put({
              type: 'fhome/consult',
              payload: true
            })
          }
        }
      }
    },
    *updater ({ payload }, { select, call, put }) {
      const newUser = { ...payload }
      const data = yield call(updater, newUser)
      if (data && data.success) {
        const data = yield call(queryProfile, parse(payload))
        if(data) {
          yield put({
            type: 'editOk',
            payload: {
              userInfo: data.data,
              pagination: data.page
            }
          })
        }
      }
    },
    *handlephoneedit({payload},{call, put}){
      const data = yield call(handlePhoneedit, parse(payload))
      if(data && data.success){
        yield put({
          type: 'phoneEditSuccess',
        })
      }

    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location =>{
        if(location.pathname.parsePath() === '/userDetails'){
          if(Cookie.get('token')){
            dispatch({type: 'query', payload: location.query})
          }else{
            dispatch({type:'login/showModal'});
          }
        }
      });
    },
  }
};
