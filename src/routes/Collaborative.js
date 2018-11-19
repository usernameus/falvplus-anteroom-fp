import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ContactsList from '../components/collaborativeLawyer/list'
import ContactsSearch from '../components/collaborativeLawyer/search'
import ContactsModal from '../components/collaborativeLawyer/modal'
import DelChannelModal from '../components/collaborativeLawyer/delChannelModal'
import {parse} from 'qs'

function Collaborative({ location, dispatch, contacts, collaborativeLawyer}) {
  const { loading, list, pagination, currentItem} = contacts
  const { field, keyword } = location.query
  const {contactInfo,lawyerInfo}=collaborativeLawyer
  const contactModalProps = {
    modalType: collaborativeLawyer.modalType,
    visible: collaborativeLawyer.modalVisible,
    contactInfo: contactInfo?contactInfo:'',
    listData: collaborativeLawyer.listData,
    onOk (data,value) {
      const queryObj = parse(location.query);
      dispatch({
        type: `collaborativeLawyer/${collaborativeLawyer.modalType}`,
        payload:{
          params: {
            ...data,
            telValue:value
          },
          add:false,
          action: 'contacts/queryLawyer',
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
        type: `collaborativeLawyer/${collaborativeLawyer.modalType}`,
        payload:{
          params: data,
          add:false,
          action: 'contacts/queryLawyer',
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
        type: 'collaborativeLawyer/queryLawyer',
        payload:{
          phone:data,
          modalType:collaborativeLawyer.modalType,
        }
      })
    },
    onLawyerOk() {
      const queryObj = parse(location.query);
      dispatch({
        type: 'collaborativeLawyer/update',
        payload:{
          params:contactInfo,
          action: 'contacts/queryLawyer',
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
        type: 'collaborativeLawyer/hideModal'
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
        type: 'collaborativeLawyer/initDelModal',
        payload: {
          modalType: 'delItem',
          contactUserId: id
        }
      })
    },
    onDeleteChannel (id) {
      dispatch({
        type: 'collaborativeLawyer/initDelModal',
        payload: {
          modalType: 'delChannel',
          contactUserId: id
        }
      })
    },
    onEditItem (contactId) {
      dispatch({
        type: 'collaborativeLawyer/initModal',
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
        pathname: '/admin/collaborative',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/collaborative'
      }))
    },
    onAdd () {
      dispatch({
        type: 'collaborativeLawyer/initModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }
  const DelChannelModalProps = {
    visible: collaborativeLawyer.DelmodalVisible,
    Deltype:collaborativeLawyer.Deltype,
    ChannelList: collaborativeLawyer.ChannelList,
    onOk (data) {
      dispatch({
        type: `collaborativeLawyer/delete`,
        payload:{
          params: data,
        }
      })
    },
    onDelOk() {
      dispatch({
        type: 'contacts/deleteLawyer',
        payload: collaborativeLawyer.ChannelList.flaWebContact.id
      })
    },
    onCancel () {
      dispatch({
        type: 'collaborativeLawyer/hideDelModal'
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

Collaborative.propTypes = {
  customers: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ contacts, collaborativeLawyer}) {
  return { contacts, collaborativeLawyer}
}

export default connect(mapStateToProps)(Collaborative)
