import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Row, Col, Card,Button,Icon,Modal} from 'antd'
import Profile from '../components/profile/Profile'
import LawyerProfile from '../components/profile/lawyerProfile'
import FinanceDash from '../components/profile/FinanceDash'
import styles from './dashboard.less'
import PackageModal from '../components/profile/packageDetails'
import {color} from '../utils'
import PackageInfo from '../components/profile/packageInfo'
const Cookie = require('js-cookie')


function Dashboard ({dashboard, dispatch, account,fhome}) {
  const {profile,profileEdit,LawyerprofileEdit,Expired,withdrawalsVisible,ApplySuccess,list,pagination,loading,packageModal,packageInfoDetails,packageInfoMsgDetails,packageInfo,dataType,packageInfoUseDetails,activeKey,financeData} = dashboard;
  const {headerData}=fhome;
  const {webTypes}=headerData;
  const editProfile = {
    ...profile,
    Expired,
    webTypes,
    profileEdit:profileEdit,
    editProfileClick(){
      dispatch({
        type:'dashboard/editProfileModeChange'
      })
    },
    onSubmit:(values) => {
      dispatch({
        type: 'dashboard/update',
        payload: values,
      })
    }
  }
  const editProfileClick = () => {
      dispatch({
        type:'dashboard/editProfileModeChange'
      })
  }
  const editLawyerProfile = {
    ...profile,
    webTypes,
    LawyerprofileEdit:LawyerprofileEdit,
    editLawyerProfileClick(){
      dispatch({
        type:'dashboard/editLawyerProfileModeChange'
      })
    },
    onChanel(){
      dispatch({
        type:'dashboard/hideEditLawyerProfileModeChange'
      })
    },
    onSubmit:(values) => {
      dispatch({
        type: 'dashboard/updateLawyer',
        payload: values,
      })
    }
  }
    const editLawyerProfileClick = () => {
      dispatch({
        type:'dashboard/editLawyerProfileModeChange'
      })
    }
    //财务总览
    const financeProps = {
      financeData:financeData,
      ApplySuccess:ApplySuccess,
      remainAmount: account.remainAmount,
      withdrawalsVisible:withdrawalsVisible,
      clickDeposit(data){
        dispatch({
          type: `bill/bcPayBtn`,
          payload:{
            title: '律师充值',
            amount: (data.recharge)*100,
            returnurl: window.location.href.replace(/[\?#].*$/,''),
            optional: {
              type: 'deposit'
            }
          }
        })
      },
      onHref(value){
        dispatch({
          type: 'dashboard/href',
          payload:value
        })
      },
      clickWithdrawals(data){
        dispatch({
          type: 'dashboard/WithdrawalsApply',
          payload:{
            data:data,
          }
        })
      },
      showWithdrawals(){
        dispatch({
          type:'dashboard/showWithdrawalsModal'
        })
      },
      hideWithdrawals(){
        dispatch({
          type:'dashboard/hideWithdrawalsModal'
        })
      }
    }
  //套餐信息
  const packageInfoProps = {
    packageInfo:packageInfo,
    loading,
    onPackage(value){
      if(value==1){
        dispatch({
          type:'dashboard/queryPackageUseDetails',
          payload: {
            dataType:value,
            activeKey:1,
            page: 1,
            pageSize:10
          }
        })
      }
      else{
        dispatch({
          type:'dashboard/queryPackageDetails',
          payload: {
            dataType:value,
          }
        })
      }
    },
  }
  const packageModalProps = {
    pagination:pagination,
    dataType: dataType,
    packageInfoMsgDetails:packageInfoMsgDetails,
    packageInfoDetails:packageInfoDetails,
    activeKey:activeKey,
    packageInfoUseDetails:packageInfoUseDetails,
    onPageChange(page,pageSize){
      dispatch({
        type:'dashboard/queryPackageUseDetails',
        payload: {
          activeKey:1,
          dataType:1,
          page: page,
          pageSize: pageSize
        }
      })
    },
    onChangeTab(activeKey){
      if(activeKey==1){
        dispatch({
          type:'dashboard/queryPackageUseDetails',
          payload: {
            activeKey:activeKey,
            dataType:1,
            page: 1,
            pageSize:10
          }
        })
      }else{
        dispatch({
          type:'dashboard/queryPackageMsgDetails',
          payload: {
            activeKey:activeKey,
            dataType:1,
          }
        })
      }
    },
  }
  const onCancel = () => {
    dispatch({
      type:'dashboard/hideModal'
    })
  }
  return (
    <div className="LawyerProfile">
    <Row gutter={16}>
      <Col span={24} md={14}>
          <FinanceDash {...financeProps}/>
        <PackageInfo {...packageInfoProps}/>
      </Col>
      <Col span={24} md={10}>
        <Card title={webTypes==0?'个人资料':'律所资料'} style={{height:469}} extra={profileEdit ?
          <div style={{height:'581px'}}>
            <Button onClick={editProfileClick}>取消修改</Button>
          </div>
          :<Icon type="edit" style={{fontSize: 24}} onClick={editProfileClick}/>}>
          <Profile {...editProfile}/>
        </Card>
        <Card title={webTypes==0?'律师简介':'律所简介'} extra={<Icon type="edit" style={{fontSize:24}} onClick={editLawyerProfileClick}/>}>
          <LawyerProfile {...editLawyerProfile}/>
        </Card>
      </Col>
    </Row>
      <Modal onCancel={onCancel} visible={packageModal} footer={null} title={dataType&&dataType==1?'短信详情':'存储详情'}>
        <PackageModal {...packageModalProps}/>
      </Modal>
    </div>
  )
}
export default connect(({dashboard,account,fhome}) => ({dashboard,account,fhome}))(Dashboard)
