import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ContactsList from '../components/contacts/list'
import ContactsSearch from '../components/contacts/search'
import ContactsModal from '../components/contacts/modal'
import DelChannelModal from '../components/contacts/delChannelModal'
import {parse} from 'qs'

function Contacts({ location, dispatch, contacts, crmcontact}) {
  const { loading, list, pagination, currentItem} = contacts
  const { field, keyword } = location.query

  const contactModalProps = {
    // nameOk:crmcontact.nameOk?crmcontact.nameOk:true,
    modalType: crmcontact.modalType,
    visible: crmcontact.modalVisible,
    contactInfo: crmcontact.contactInfo,
    listData: crmcontact.listData,
    onOk (data,value) {
      const queryObj = parse(location.query);
      dispatch({
        type: `crmcontact/${crmcontact.modalType}`,
        payload:{
          params: {
            ...data,
            telValue:value
          },
          add:false,
          action: 'contacts/query',
          actionPayload: {
            pageNo: queryObj.pageNo || 1,
            pageSize: queryObj.pageSize || 10,
            ...queryObj
          }
        }
      })
    },
    onOkAdd (data) {
      const queryObj = parse(location.query);
      dispatch({
        type: `crmcontact/${crmcontact.modalType}`,
        payload:{
          params: data,
          add:false,
          action: 'contacts/query',
          actionPayload: {
            pageNo: queryObj.pageNo || 1,
            pageSize: queryObj.pageSize || 10,
            ...queryObj
          }
        }
      })
    },
    onQueryLawyer(data) {
      dispatch({
        type: 'crmcontact/queryContacts',
        payload:{
          phone:data,
          modalType:crmcontact.modalType,
        }
      })
    },
    // onQueryLawyerName(data) {
    //   dispatch({
    //     type: 'crmcontact/queryContactsName',
    //     payload:{
    //       name:data,
    //       modalType:crmcontact.modalType,
    //     }
    //   })
    // },
    onLawyerOk() {
      const queryObj = parse(location.query);
      dispatch({
        type: 'crmcontact/update',
        payload:{
          params:crmcontact.contactInfo,
          action: 'contacts/query',
          actionPayload: {
            pageNo: queryObj.pageNo || 1,
            pageSize: queryObj.pageSize || 10,
            ...queryObj
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

  const contactListProps = {
    dataSource: list,
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
        type: 'crmcontact/initDelModal',
        payload: {
          modalType: 'delItem',
          contactUserId: id
        }
      })
    },
    onShare (data) {
      dispatch({
        type: 'contacts/onshare',
        payload:data
      })
    },
    onDeleteChannel (id) {
      dispatch({
        type: 'crmcontact/initDelModal',
        payload: {
          modalType: 'delChannel',
          contactUserId: id
        }
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
    },
  }

  const contactSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/contacts',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/contacts'
      }))
    },
    onAdd () {
      dispatch({
        type: 'crmcontact/initModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }
  const DelChannelModalProps = {
    visible: crmcontact.DelmodalVisible,
    Deltype:crmcontact.Deltype,
    ChannelList: crmcontact.ChannelList,
    onOk (data) {
      dispatch({
        type: `crmcontact/delete`,
        payload:{
          params: data,
        }
      })
    },
    onDelOk() {
      dispatch({
        type: 'contacts/delete',
        payload: crmcontact.ChannelList.flaWebContact.id
      })
    },
    onCancel () {
      dispatch({
        type: 'crmcontact/hideDelModal'
      })
    }
  }

  const ContactsModalGen = () =>
    <ContactsModal {...contactModalProps} />
  const DelChannelModalGen = () =>
    <DelChannelModal {...DelChannelModalProps} />

  return (
    <div className='content-inner'>
      <ContactsSearch {...contactSearchProps} />
      <ContactsList {...contactListProps} />
      <ContactsModalGen />
      <DelChannelModalGen/>
    </div>
  )
}

Contacts.propTypes = {
  customers: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ contacts, crmcontact}) {
  return { contacts, crmcontact}
}

export default connect(mapStateToProps)(Contacts)
