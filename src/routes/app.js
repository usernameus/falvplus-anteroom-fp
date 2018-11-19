const Cookie = require('js-cookie')
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import {Icon} from 'antd'
import Login from './login'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin } from 'antd'
import { classnames } from '../utils'
import '../components/layout/common.less'

function App ({children, location, dispatch, app,login,fhome}) {
  const {loading, message,siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys,list,types,pagination,newsNo,success} = app;
  const {loginState,user} = login;
  const {headerData}=fhome;
  const {logoSrc,Logo_titleText}=headerData;
  document.title=headerData?headerData.headerTitleText:'律师专属会客室';
  const loginProps = {
    logoSrc,
    Logo_titleText,
    message,
    ...login,
    getVerifyCode(phone){
      dispatch({type:'login/getVerifyCode', payload:{phone: phone}})
    },
    onOk (data, loginMethod) {
      const payload = {
        ...data,
        holder: true,
        loginMethod:loginMethod
      };
      dispatch({type: 'login/login', payload: payload})
    }
  }

  const footerprops = {
    role: user ? user.r : '0',
  }

  const headerProps = {
    //新消息提醒
    list:list,
    success:success,
    types:types,
    role:login.user.r,
    newsNo:newsNo,
    pagination:pagination,
    loadMore:()=>{
      dispatch({
        type: 'app/queryMore',
        payload:{
          types:types,
          pageNo: pagination.current+1,
          pageSize:5
        }
      })
    },
    onShowNews(value,data){
      dispatch({
        type: 'app/ShowNews',
        payload:{
          orderId: value,
          hrefdata:data,
        }
      })
    },
    onChangeTab(activeKey){
      dispatch({
        type: 'app/queryNews',
        payload: {
          types: activeKey,
          pageNo:1,
          pageSize:5
        }
      })
    },
    onPageChange (page, pageSize) {
      dispatch({
        type: '',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'login/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }

  const siderProps = {
    headerData,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }
  const onConsultClicks = () => {
    if(loginState){
      if(user.r == '9'){
        window.location.href='/anteroom';
      }else{
        dispatch({
          type: 'fhome/consult',
          payload: loginState
        })
      }
    }else{
      dispatch({
        type: 'login/showSignin'
      })
    }
  }
  const oAaboutuser = () =>{
    window.location.href='/addActivity'
  }

  const onPhoneconse = () =>{
    if(login.loginState &&  login.user.r == '9'){
      window.location.href='/admin/consultation'
    }else{
      window.location.href='/phoneOrder'
    }
  }

  const onAddarticles = () =>{
    window.location.href='/addArticle'
  }

  const onAdduserDetails = () =>{
    window.location.href='/userDetails'
  }


  return (
    <div>{login.loginState
      ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
      {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
        <Sider {...siderProps} />
      </aside> : ''}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread location={location} rootPath='/admin/'/>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer {...footerprops} oAaboutuser={oAaboutuser} onPhoneconse={onPhoneconse} onConsultClick={onConsultClicks} onAdduserDetails={onAdduserDetails} onAddarticles={onAddarticles}/>
      </div>
    </div>
      : <div>
      <a href="/" style={{display:'block', fontSize:'1rem', margin:5, color: '#999999'}}><Icon type="left"></Icon>回首页</a>
      <div className={styles.spin}>
      <Spin tip='加载用户信息...' spinning={loading} size='large'>
        <Login {...loginProps}/>
      </Spin>
    </div>
      </div>}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool
}

export default connect(({app,login,fhome}) => ({app,login,fhome}))(App)
