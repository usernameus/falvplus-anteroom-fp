import React from 'react';
import { connect } from 'dva';
import { Tabs,Button,Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import Data from '../components/contacts/contactsProfile/data'
import Enclosure from '../components/contacts/contactsProfile/Enclosure'
import ContactsModal from '../components/contacts/modal'

const TabPane = Tabs.TabPane;

function ContactsProfile({dispatch,location,contacts,contactsProfile, crmcontact}) {
  const { loading,pagination} = contacts
  const {relatedContactList, contactInfo, customerInfo}= contactsProfile
  const onEdit = () => {
    dispatch({
      type: 'crmcontact/initModal',
      payload: {
        modalType: 'update',
        id: contactInfo.id
      }
    })
  }
  const onRemove = () => {
    dispatch({
      type: 'contacts/delete',
      payload:contactInfo.id
    });
    dispatch(routerRedux.push({
      pathname: '/admin/contacts'
    }))
  }
  const contactModalProps = {
    modalType: crmcontact.modalType,
    visible: crmcontact.modalVisible,
    contactInfo: crmcontact.contactInfo,
    listData: crmcontact.listData,
    onOk (data) {
      dispatch({
        type: `crmcontact/${crmcontact.modalType}`,
        payload:{
          params:data,
          add:false,
          action: 'contactsProfile/query',
          actionPayload: {id: contactInfo.id}
        }
      })
    },
    onOkAdd (data) {
      dispatch({
        type: `contacts/${crmcontact.modalType}`,
        payload: {
          params:data,
          add:true,
          action: 'contactsProfile/query',
          actionPayload: {id: contactInfo.id}
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'crmcontact/hideModal'
      })
    }
  }
  const contactListProps = {
    dataSource: relatedContactList,
    loading,
    pagination: pagination,
    visible: crmcontact.modalVisible,
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
    onEditItem (item) {
      dispatch({
        type: 'crmcontact/initModal',
        payload: {
          modalType: 'update',
          id: item
        }
      })
    }
  }

  const ContactsModalGen = () =>
    <ContactsModal {...contactModalProps} />
  return (
    <div className='content-inner'>
      <div>
        <h1 style={{display:'inline-block'}}>{contactInfo ? contactInfo.contactName : ''}</h1>
        <span style={{margin: '0 2em'}}>客户:{customerInfo ? customerInfo.customerName : ''}</span>
        <span>手机:{contactInfo.phone}</span>
      </div>
      <Button type="primary" style={{marginRight: '1em'}} onClick={onEdit}>编辑</Button>
      <Popconfirm title='确定要删除吗？' overlayStyle={{width: 150}} onConfirm={onRemove}>
        <Button type="danger">删除</Button>
      </Popconfirm>

      <Tabs defaultActiveKey="1">
        <TabPane tab="联系人资料" key="1"><Data {...contactsProfile}/></TabPane>
        <TabPane tab="相关联系人" key="2"><Enclosure {...contactListProps}/></TabPane>
      </Tabs>
      <ContactsModalGen />
    </div>
  );
}

function mapStateToProps({customersProfile,contactsProfile,contacts, crmcontact}) {
  return {customersProfile,contactsProfile,contacts, crmcontact};
}

export default connect(mapStateToProps)(ContactsProfile);
