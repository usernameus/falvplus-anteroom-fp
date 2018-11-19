import React from 'react';
import { connect } from 'dva';
import { Tabs,Button,Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import {parse} from 'qs';
import Panorama from '../components/crm/customersProfile/panorama'
import Data from '../components/crm/customersProfile/data'
import Enclosure from '../components/crm/customersProfile/Enclosure'
import FollowupModal from '../components/crm/followupModal'
import CustomerModal from '../components/crm/modal'
import ContactsModal from '../components/contacts/modal'

const TabPane = Tabs.TabPane;

function CustomersProfile({dispatch,location,customersProfile,crmfollowup,crmcustomer,crmcontact,crmdict}) {
  const {loading, customerInfo, contactsList,followlogs, pagination, showStatus} = customersProfile;
  const customerId = customerInfo ? customerInfo.id : '';
  const contactListProps = {
    dataSource: contactsList,
    loading,
    pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          pageNo: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'contacts/delete',
        payload: id
      })
    },
    onEditItem (contactId) {
      dispatch({
        type: 'crmcontact/initModal',
        payload: {
          modalType: 'update',
          id: contactId
        }
      })
    }
  }
  const PanoramaProps = {
    customerInfo,
    contactsList,
    followlogs,
    loading,
    pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          pageNo: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onAddcontact () {
      dispatch({
        type: 'crmcontact/initModal',
        payload: {
          modalType: 'create',
          customerId: customerId
        }
      })
    },
    onAddfollowup () {
      dispatch({
        type: 'crmfollowup/initModal',
        payload: {
          modalType: 'create',
          customerId: customerId,
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

  const customerModalProps = {
    modalType: crmcustomer.modalType,
    dictLists: crmdict || {},
    visible: crmcustomer.modalVisible,
    customerInfo: crmcustomer.customerInfo,
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
        type: `crmcustomer/${crmcustomer.modalType}`,
        payload:{
          params:data,
          add:false,
          action: 'customersProfile/query',
          actionPayload: {id:customerInfo.id}
        } ,
      })
    },
    onOkAdd (data) {
      dispatch({
        type: `crmcustomer/${crmcustomer.modalType}`,
        payload: {
          data,
          add:true
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'crmcustomer/hideModal'
      })
    }
  }
  const contactsModalProps = {
    modalType: crmcontact.modalType,
    visible: crmcontact.modalVisible,
    listData: crmcontact.listData,
    contactInfo: crmcontact.contactInfo,
    onOk (data) {
      dispatch({
        type: `crmcontact/${crmcontact.modalType}`,
        payload:{
          params: data,
          add:false,
          action: 'customersProfile/query',
          actionPayload: {
            id: customerInfo.id
          }
        }
      })
    },
    onOkAdd (data) {
      dispatch({
        type: `crmcontact/${crmcontact.modalType}`,
        payload:{
          params: data,
          add: true,
          action: 'customersProfile/query',
          actionPayload: {
            id: customerInfo.id
          }
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'crmcontact/hideModal'
      })
    }
  }
  const onEdit =()=> {
      dispatch({
        type: 'crmcustomer/initModal',
        payload:{
          modalType: 'update',
          id: customerId
        }
      })
  }
  const onRemove = () => {
    dispatch({
      type: 'customers/delete',
      payload: customerId
    })
    dispatch(routerRedux.push({
      pathname: '/admin/crm'
    }))

  }
  const CustomerModalGen = () =>
    <CustomerModal {...customerModalProps} />

  const FollowupModalGen = () =>
    <FollowupModal {...followupModalProps} />

  const ContactsModalGen = () =>
  <ContactsModal {...contactsModalProps}/>

  return (
    <div className="content-inner">
      <h1>{customerInfo ? customerInfo.customerName : ''}</h1>
      <Button type="primary" style={{marginRight: '1em'}} onClick={onEdit}>编辑</Button>
      <Popconfirm title='确定要删除吗？' overlayStyle={{width: 150}} onConfirm={onRemove}>
        <Button type="danger">删除</Button>
      </Popconfirm>

      <Tabs defaultActiveKey={showStatus}>
        <TabPane tab="客户全景" key="1"><Panorama {...PanoramaProps}/></TabPane>
        <TabPane tab="客户资料" key="2"><Data {...customerInfo}/></TabPane>
        <TabPane tab="联系人" key="3"><Enclosure {...contactListProps}/></TabPane>
      </Tabs>
      <FollowupModalGen/>
      <CustomerModalGen/>
      <ContactsModalGen/>
    </div>
  );
}

function mapStateToProps({customersProfile,crmdict,crmfollowup,crmcustomer, crmcontact}) {
  return {customersProfile,crmdict,crmfollowup,crmcustomer,crmcontact};
}

export default connect(mapStateToProps)(CustomersProfile);
