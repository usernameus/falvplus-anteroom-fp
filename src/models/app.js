import {login,querynews,showNews} from '../services/app'
import {parse} from 'qs'

const Cookie = require('js-cookie')

export default {
  namespace: 'app',
  state: {
    loginState: false,
    loading: false,
    message:'',
    user: {
      name: ''
    },
    newsNo:{
      redDotNumber:'',conRedDotNumber:'',channelNumber:''
    },
    username:'',

    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: false, //localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]') //侧边栏菜单打开的keys
  },

  subscriptions: {
    setup ({dispatch,history}) {
      history.listen(location => {
        if (location.pathname.startWith('/admin')) {
          dispatch({
            type: 'queryNews',
            payload:{
              types:1,
              pageNo:1,
              pageSize:5
            }
          })
          const token = Cookie.get('token');
          if (token!=null&&token!="null"){
            dispatch({
              type: 'queryUser',
              payload:{
                token:token
              }
            })
          }
          window.onresize = function () {
            dispatch({type: 'changeNavbar'})
          }
        }
      })
    }
  },
  effects: {
    //新消息提醒
    *queryNews({payload}, {call,put}){
      const data = yield call(querynews, parse(payload));
      if(data){
        yield put({
          type: 'querynewsSuccess',
          payload: {
            list: data,
            newsNo:data.flaMsg,
            pagination:data.page,
            types:payload.types
          }
        })
      }
    },
    *ShowNews({payload}, {call,put}){
      const data = yield call(showNews, parse(payload));
      if(data&&data.success){
        window.location.href=payload.hrefdata
      }
    },
    *queryMore({payload}, {call, put}){
      const data = yield call(querynews,parse(payload));
      if(data){
        yield put({
          type: 'loadmore',
          payload:{
            url:data.url,
            list: data,
            pagination: data.page
          }
        })
      }
    },
    *queryUser ({
      payload
    }, {call, put}) {

      yield put({type: 'showLoading'})

      if(Cookie.get('token') != undefined
        && Cookie.get('expires') != undefined
        && new Date(Cookie.get('expires')) > new Date().getTime()
        && Cookie.get('r') == 9){
        yield put({
          type: 'login/loginSuccess',
          payload: {
            user: {
              name: Cookie.get('user_name'),
              r: Cookie.get('r')
            }
          }
        })
      }else{
        yield put({
          type: 'login/loginFail',
          payload:{
            message: '',
            user:{
              name: ''
            }
          }
        });
      }
      yield put({type: 'hideLoading'})
    },
    // *logout ({
    //   payload
    // }, {call, put}) {
    //     yield put({
    //       type: 'login/logoutSuccess'
    //     })
    // },
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  reducers: {
    //新消息提醒
    querynewsSuccess (state, action) {
      const {list,types,pagination,newsNo} = action.payload
      return {
        ...state,
        list,
        newsNo,
        pagination,
        types:types,
        loading: false,
      }
    },
    shownewsSuccess(state, action){
      const {success} = action.payload
      return {
        ...state,
        success
      }
    },
    loadmore(state, action){
      const {list, pagination} = action.payload
      state.list.data = state.list.data.concat(list.data)
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }

  }
}
