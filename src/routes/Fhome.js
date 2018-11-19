import React,{PropTypes} from 'react';
import { connect } from 'dva';
import {Modal,Row, Col,Button,Card} from 'antd';
import Onlinewnd from '../components/ui/onlinewnd';
import PageHeader from '../components/flayout/PageHeader';
import MainFooter from '../components/layout/MainFooter';
import Footer from '../components/layout/Mfooter'
import styles from '../components/flayout/fmain.less';
import Login from './login';
import Loginedituserprofiles from '../components/userDetails/logineditprofiles';

function Fhome({dispatch,children,location,fhome,login,mainLawyerDetails}) {
  const {hasfooter,HeaderProps,headerData, menuVisible,list,pagination,types,newsNo} = fhome;
  const {logoSrc,copyright,index_header,Logo_titleText,index_center_headerImg,Mindex_center_headerImg,menuList,menuImgList,hideData,webTypes}=headerData;
  const {loginState, user, modalVisible,showhideVisible,signVisible, registerVisible,signinVisible,edituserVisible,closable,TipModalVisible,consulting,Cflag} = login;
  const pathname = location.pathname;
  let locationId = location.pathname.split(/[?#\/]/)[2];
  let currentMenu = pathname === "/" ? "home" : locationId===undefined? pathname.match(/\/([^/?#]+)/)[1]:pathname.match(/\/([^/?#]+)/)[1]+'s';
  if(pathname.startWith('/order')){
    currentMenu = 'products';
  }
  if((consulting&&consulting=='true')){
  if(loginState){
    if(user.r == '9'){
      window.location.href='/anteroom';
    }else{
      dispatch({
        type: 'fhome/consult',
        payload: loginState
      })
    }
  }else if(!Cflag&&!modalVisible){
    dispatch({
      type: 'login/showConsoleModal',
      payload: {
        consultClick: true
      }
    })
  }}
  document.title=headerData?headerData.headerTitleText:'律师专属会客室';
  const ModalProps = {
    ...login,
    logoSrc,
    Logo_titleText,
    registerVisible,
    signinVisible,
    loginState,
    onOk(data, loginMethod){
      const payload = {
        ...data,
        holder: false,
        loginMethod:loginMethod,
        consultClick: login.consultClick
      };
      dispatch({type:signinVisible? 'login/login':'login/register', payload: payload})
    },
    CheckRegister(data){
      dispatch({type:'login/CheckRegister', payload:data})
    },
    getVerifyCode(phone){
      dispatch({type:signinVisible? 'login/getVerifyCode':'login/getVerifyCodes', payload:{phone: phone}})
    },
    switchLoginMethod(){
      dispatch({type: 'login/switchLoginMethod'})
    }
  }

  const cancelLoginModal =()=> {
    dispatch({
      type: 'login/hideModal'
    })
  }
  const canceleditserModal =()=> {
    dispatch({
      type: 'login/hidedituserModal'
    })
  }

  const onConsultClick = () => {
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
        type: 'login/showConsoleModal',
        payload: {
          consultClick: true
        }
      })
    }
  }

  const edituserProps = {
    onSubmit:(values) => {
      //let {oldPassword,newPassword,} = values;
      dispatch({
        type:'userDetails/update',
        payload:{
          ...values,
          consultClick: login.consultClick
        },
      })
    },
    canceleditserModal:()=> {
      dispatch({
        type: 'login/hidedituserModal'
      })
    },
    onFaulttip:()=>{
      dispatch({
        type: 'userDetails/editFault',
      })
    },
    getVerifyCode(phone){
      dispatch({
        type:'userDetails/getVerifyCode',
        payload:{phone: phone}
      })
    },
    onSkip(){
      if(login.consultClick){
        onConsultClick();
      }else{
        dispatch({
          type: 'login/hidedituserModal'
        })
      }
    }
  }

  const ModalGen = () =>
    <Modal title="" visible={modalVisible} closable={closable}
           footer={null} wrapClassName="loginModal" transitionName="none"
           maskClosable={closable} onCancel={cancelLoginModal}>
      <div style={{position:'relative',height:340}}>
        <Login {...ModalProps}/>
      </div>
    </Modal>

  const ModalGens = () =>
    <Modal title="初次登录,补充资料" visible={edituserVisible} footer={null} width="412" transitionName="none" maskClosable={false} closable={false} onCancel={canceleditserModal}>
      {/*<div style={{position:'relative',height:300,paddingTop:50,paddingRight:60}}>*/}
        <Loginedituserprofiles {...edituserProps}/>
        {/*<a onClick={canceleditserModal} style={{position:'absolute',right:0,fontSize:14,color:'#999999'}}>跳过>></a>*/}
      {/*// </div>*/}
    </Modal>

  if(fhome.hasError){
    Modal.error({
      title: fhome.error.errortitle,
      content: fhome.error.errMsg,
      okText: ' 查看服务列表',
      onOk: function(){
        window.location.href = '/products';
      }
    });
  }

  const footerprops = {
    role: user ? user.r : '0',
  }

  const headerProps = {
    //新消息提醒
    mainLawyerDetails:mainLawyerDetails,
    list:list,
    newsNo:newsNo,
    types:types,
    pagination:pagination,
    loadMore:()=>{
      dispatch({
        type: 'fhome/queryMore',
        payload:{
          types:types,
          pageNo: pagination.current+1,
          pageSize:5
        }
      })
    },
    onShowNews(value,data){
      dispatch({
        type: 'fhome/ShowNews',
        payload:{
          orderId: value,
          hrefdata:data,
        }
      })
    },
    onChangeTab(activeKey){
      dispatch({
        type: 'fhome/queryNews',
        payload: {
          types: activeKey,
          pageNo:1,
          pageSize:5
        }
      })
    },
    webTypes,
    menuImgList,
    menuList,
    menuVisible,
    signVisible,
    registerVisible,
    signinVisible,
    Mindex_center_headerImg:Mindex_center_headerImg?Mindex_center_headerImg:null,
    index_center_headerImg:index_center_headerImg?index_center_headerImg:null,
    IndexHeaderData:index_header?index_header:'',
    currentMenu: currentMenu,
    loginState:loginState || false,
    role: user ? user.r : '0',
    userName: user ? user.name : '',
    headerType: HeaderProps?HeaderProps.headerType:'',
    headerImg: HeaderProps?HeaderProps.headerImg:'',
    phone_headerImg:HeaderProps?HeaderProps.phone_headerImg:'',
    // headerTitleText:headerData?headerData.headerTitleText:'',
    headerTitle:HeaderProps?HeaderProps.headerTitle
      :'',
    headerContent:HeaderProps?HeaderProps.headerContent:'',
    showhideVisible:login.showhideVisible,
    // banners:headerData?headerData.banners:'',
    handleMenuVisible(){
      dispatch({
        type: 'fhome/toggleVerticalMenu'
      })
    },
    onSignin () {
      dispatch({
        type: 'login/showModal'
      })
    },
    onRegister(){
      dispatch({
        type: 'login/showModals'
      })
    },
    onSignins(){
      dispatch({
        type: 'login/showSignin'
      })
    },
    onRegisters(){
      dispatch({
        type: 'login/showRegister'
      })
    },
    logout(){
      dispatch({type: 'login/logout'});
      window.location.href = '/';
    },
    handle_showhide () {
      dispatch({
        type: 'login/onShowhide',
      })
    },
  }


  const oAaboutuser = () =>{
    window.location.href='/addActivity'
  }

  const onPhoneconse = () =>{
    if(loginState && user.r == '9'){
      window.location.href = '/admin/consultation';
    }else{
      window.location.href='/phoneOrder';
    }
  }
  const onAdduserDetails = () =>{
    window.location.href='/userDetails'
  }

  const onAddarticles = () =>{
    window.location.href='/addArticle'
  }

  const backgroundColor = location.pathname == '/' ? 'white' : '#f8f8f8';

  return (
      <div style={{backgroundColor: backgroundColor}} >
        {(signVisible && !loginState)?'':<PageHeader {...headerProps} onConsultClick={onConsultClick}/>}
        <div className="childrenpc">
          {children}
        </div>
        {hasfooter ?
          <div>
            <MainFooter copyright={copyright} hideData={hideData} menuList={menuList}/>
            <Footer {...footerprops}  copyright={copyright} oAaboutuser={oAaboutuser} onPhoneconse={onPhoneconse} onAdduserDetails={onAdduserDetails} onAddarticles={onAddarticles} onConsultClicks={onConsultClick}/>
          </div>
          :''}
        <Onlinewnd onConsultClick={onConsultClick} headerData={headerData} role={user ? user.r : '0'}/>
        <ModalGen />
        <ModalGens/>
      </div>
  );
}

Fhome.propTypes = {
  children: PropTypes.element.isRequired,
}

export default connect(({fhome, login,mainLawyerDetails}) => ({fhome, login,mainLawyerDetails}))(Fhome);
