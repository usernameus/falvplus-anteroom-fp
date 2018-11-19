import {parse} from 'qs';
import {login,verifyCode,registers,verifyCodes,checkRegister,jumpLogin} from '../services/app'
import {consultService} from '../services/fhome'
import {Modal} from 'antd';

const Cookie = require('js-cookie');

export default {
  namespace: 'login',
  state: {
    modalVisible: false,
    closable: true,
    loginButtonLoading: false,
    mobileno: '',
    showhideVisible:false,
    signVisible:false,
    signinVisible:false,
    registerVisible:false,
    logintrueVisible:false,
    edituserVisible:false,
    loginState: false,
    consoleModalVisible:false,
    consultClick: false
  },
  reducers: {
    consultingValue(state, action){
      return{
        ...state,
        consulting:action.payload.value,
        Cflag:action.payload.flag
      }
    },
    showModal (state, action) {
      let closable = true;
      if(action.payload && action.payload.closable != undefined){
        closable = action.payload.closable;
      }
      return { ...state,
        modalVisible: true,
        signinVisible:true,
        registerVisible:false,
        closable: closable,
        consoleModalVisible:false
      }
    },
    showConsoleModal (state, action) {
      let closable = true;
      if(action.payload && action.payload.closable != undefined){
        closable = action.payload.closable;
      }
      return { ...state,
        modalVisible: true,
        signinVisible:true,
        registerVisible:false,
        closable: closable,
        consoleModalVisible:true,
        ...action.payload
      }
    },
    showModals(state, action) {
      return { ...state,
        modalVisible: true,signinVisible:false,registerVisible:true}
    },
    showedituserModal(state, action){
      return { ...state,
        edituserVisible:true }
    },
    hidedituserModal(state, action){
      return { ...state,
        edituserVisible:false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false}
    },
    onShowhide(state) {
      return { ...state, showhideVisible:!state.showhideVisible}
    },
    showSignin(state){
      return { ...state, signVisible: true,signinVisible:true,registerVisible:false}
    },
    showRegister(state){
      return { ...state, signVisible: true,signinVisible:false,registerVisible:true}
    },
    logintrue(state){
      return { ...state,logintrueVisible:true}
    },
    // verifyCodeLoading(state){
    //   var secs = state.verifyLoading;
    //   if(typeof secs == 'undefined' || secs <= 0){
    //     secs = 5;
    //   }else{
    //     secs = secs - 1;
    //   }
    //   return {
    //     ...state,
    //     verifyLoading: secs
    //   }
    // },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        loginState: true,
        loginButtonLoading: false
      }
    },
    loginFail (state,action) {
      return {
        ...state,
        loginState: false,
        message:action.payload.message,
        loginButtonLoading: false
      }
    },
    logout (state) {
      Cookie.remove('userId');
      Cookie.remove('mobile');
      Cookie.remove('token');
      Cookie.remove('user_name');
      Cookie.remove('r');
      Cookie.remove('expires');
      return {
        ...state,
        loginState: false,
      }
    },
  },
  effects: {
    *CheckRegister({payload}, {call, put}){
      const data = yield call(checkRegister, payload)
      if(!data.success){
        Modal.info({
          title: '该手机号已注册,请直接登录'
        });
      }
    },
    *getVerifyCode({payload}, {call, put}){
      // yield put({type: 'verifyCodeLoading'})
      const data = yield call(verifyCode, payload)
    },
    *getVerifyCodes({payload}, {call, put}){
      // yield put({type: 'verifyCodeLoading'})
      const data = yield call(verifyCodes, payload)
    },
    *register({payload}, {call, put}){
      yield put({type:'hideModal'})
      const datas=yield call(registers,payload)
      if(datas && datas.success){
        let payload={username:datas.data.mobile,password:datas.data.registerPassword,holder: false,loginMethod:false}
        yield put({
          type: 'login',
          payload:payload
        })
      }else{

      }
        },
    *JumpLogin({payload}, {call, put}){
      const data=yield call(jumpLogin,payload)
      if(data && data.success){
        Cookie.set("userId", data.userId)
        Cookie.set('mobile', data.mobile)
        Cookie.set('user_name', data.userName);
        Cookie.set('r', data.r);
        Cookie.set('webType', data.webTypes);
        Cookie.set('token', data.token, {expires: 3});
        const date = new Date();
        date.setTime(date.getTime() + 3 * 86400000);
        Cookie.set('expires', date.toUTCString());

        const isHolder = payload.holder || false;

        if(isHolder && data.r != 9 && location.pathname.parsePath().startWith('/admin')){
          location.href = '/';
          return;
        }
        yield put({
          type: 'loginSuccess',
          payload: {
            user:{
              name: Cookie.get('user_name'),
              r: data.r
            }
          }})
      }
    },
    *login ({
      payload
    }, {call, put}) {
      //yield put({type:'hideModal'})
      let data;
      try{
        data = yield call(login,payload)
      }catch(e){
        yield put({type: 'showModal'})
        let message = e.responseJSON.errMsg;
        yield put({
          type: 'loginFail',
          payload:{
            message: message
          }
        })
        return;
      }
      if (data.success) {

        Cookie.set("userId", data.userId)
        Cookie.set('mobile', data.mobile)
        Cookie.set('user_name', data.userName);
        Cookie.set('r', data.r);
        Cookie.set('webType', data.webTypes);
        Cookie.set('token', data.token, {expires: 3});
        const date = new Date();
        date.setTime(date.getTime() + 3 * 86400000);
        Cookie.set('expires', date.toUTCString());
        Cookie.set('parlorState',data.parlorState);

        const isHolder = payload.holder || false;

        if(isHolder && data.r != 9 && location.pathname.parsePath().startWith('/admin')){
          location.href = '/';
          return;
        }
        yield put({
          type: 'loginSuccess',
          payload: {
            user:{
              name: Cookie.get('user_name'),
              r: data.r
            }
          }})
        yield put({
          type: 'hideModal'
        });
        if(data.register===false) {
          yield put({
            type: 'showedituserModal'
          });
        }else{
          if(payload.consultClick){
            try{
              const datas = yield call(consultService,payload);
              if(datas){
                location.href = '/anteroom#' + datas.channelId;
              }
            }catch(err){
              Modal.info({
                title: '不能咨询自己'
              });
            }
          }else {
            location.reload();
          }
        }
      } else {
        Cookie.remove('userId');
        Cookie.remove('mobile');
        Cookie.remove('token');
        Cookie.remove('user_name');
        Cookie.remove('r');
        Cookie.remove('webType');
        Cookie.remove('expires');
        let message = data.errMsg;
        yield put({
          type: 'login/loginFail',
          payload:{
            message: message
          }
        })
      }
    },

  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        var reg=eval("/token"+"/g");
        var reg1=eval("/value"+"/g");
        var r = window.location.search.substr(1);
        var flag=reg.test(r);
        var flag1=reg1.test(r);
        var strs = r.split("token=")[1];
        var strs1 = r.split("value=")[1];
        var value = r&&flag1?r.split("value=")[1].substring(0, r.split("value=")[1].indexOf("&")):'';
        if(flag){
          if(value){
            dispatch({
              type: 'consultingValue',
              payload:{value:value,flag:flag}
            })
          }
          dispatch({
            type: 'JumpLogin',
            payload:{token:strs}
          })
        }else if(flag1){
          if(strs1){
            dispatch({
              type: 'consultingValue',
              payload:{value:strs1,flag:flag}
            })
          }
        }else{
          return false;
        }
      })
    }
  },
};
