import React from 'react';
import { connect } from 'dva';
import { Tabs,Button,Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import {parse} from 'qs';
import Panorama from '../components/consultationOrder/panorama'
import FollowupModal from '../components/crm/followupModal'
import DetailsModal from '../components/consultationOrder/modal'
import ConsultationSearch from  '../components/consultationOrder/search';
import AddHandleModal from '../components/consultationOrder/addHandleModal'
const TabPane = Tabs.TabPane;

function Consultation({dispatch,location,crmfollowup,consultationOrder}) {
  const {list,pagination,loading,types}=consultationOrder
  const PanoramaProps = {
    loading,
    list:list,
    pagination: pagination,
    onDetails(id){
      dispatch({
        type: 'consultationOrder/queryDetails',
        payload: {
          orderId: id,
        }
      })
    },
    onAddfollowup (cuId) {
      dispatch({
        type: 'crmfollowup/initModal',
        payload: {
          modalType: 'create',
          customerId: cuId,
        }
      })
    },
    onChangeTab(activeKey){
      dispatch({
        type: 'consultationOrder/queryOrder',
        payload: {
          orderType: activeKey,
          page: 1
        }
      })
    },
    onChange (orderId){
      dispatch({
        type: 'consultationOrder/ChangeOrder',
        payload: {
          orderId: orderId,
        }
      })
    },
    onPageChange (page, pageSize) {
      dispatch({
        type: 'consultationOrder/queryOrder',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
    onAddLawyer(id){
      dispatch({
        type: 'consultationOrder/addHandle',
        payload: {
          id:id
        }
      })
    }
  }
  const followupModalProps = {
    type: 'create',
    visible: crmfollowup.modalVisible,
    saving: crmfollowup.saving,
    lists: crmfollowup.lists,
    customerId: crmfollowup.customerId,
    onSaveCrmDictList(type,values){
      dispatch({
        type: 'crmdict/saveCrmDictList',
        payload: {
          typeCode:type,
          values: values
        }
      })
    },
    onOk (data) {
      dispatch({
        type: `crmfollowup/addFollowup`,
        payload: {
          params: data,
          action: 'customersProfile/query',
          actionPayload:{
            id: customerId
          }
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'crmfollowup/hideModal'
      })
    }
  }
  //添加处理人
  const addHandleModalProps = {
    visible: consultationOrder.HandleVisible,
    onOk (data) {
      dispatch({
        type: `consultationOrder/HandleLawyer`,
        payload: {
          userId: data.realName,
          orderId:consultationOrder.phoneOrderId
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'consultationOrder/hideHandleModal'
      })
    }
  }
  const DetailsModalProps = {
    visible: consultationOrder.visible,
    detailsData:consultationOrder.detailsData,
    onCancel () {
      dispatch({
        type: 'consultationOrder/hideModal'
      })
    }
  }
  const consultationSearchProps = {
    onSearch(values)  {
        dispatch({
          type: 'consultationOrder/queryOrder',
          payload: {
            values:values,
            orderType:types,
          },
        })},
  }
  const DetailsModalGen = () =>
    <DetailsModal {...DetailsModalProps} />
  const FollowupModalGen = () =>
    <FollowupModal {...followupModalProps} />
  const AddHandleModalGen = () =>
    <AddHandleModal {...addHandleModalProps} />
  return (
    <div className="content-inner">
      <ConsultationSearch {...consultationSearchProps}/>
      <Panorama {...PanoramaProps}/>
      <FollowupModalGen/>
      <DetailsModalGen/>
      <AddHandleModalGen/>
    </div>
  );
}

function mapStateToProps({crmfollowup,consultationOrder,customersProfile,crmdict}) {
  return {crmfollowup,consultationOrder,customersProfile,crmdict};
}

export default connect(mapStateToProps)(Consultation);
