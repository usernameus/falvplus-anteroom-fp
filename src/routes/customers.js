import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {parse} from 'qs';
import CustomerList from '../components/crm/list'
import CustomerSearch from '../components/crm/search'
import CustomerModal from '../components/crm/modal'
import FollowupModal from '../components/crm/followupModal'

function Customers({ location, dispatch, customers,crmfollowup, crmcustomer, crmdict}) {
  const { loading, list, pagination, currentItem} = customers
  const { field, keyword } = location.query
  //添加客户
  const customerModalProps = {
    modalType: crmcustomer.modalType ,
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
      const queryObj = parse(location.query);
      dispatch({
        type: `crmcustomer/${crmcustomer.modalType}`,
        payload:{
          params:data,
          add:false,
          action: 'customers/query',
          actionPayload: {
            pageNo: queryObj.pageNo || 1,
            pageSize: queryObj.pageSize || 10,
            ...queryObj
          }
        } ,
      })
      // dispatch({type:'crmcustomer/hideModal'})
    },
    onOkAdd (data) {
      const queryObj = parse(location.query);
      dispatch({
        type: `crmcustomer/${crmcustomer.modalType}`,
        payload:{
          params:data,
          add: true,
          action: 'customers/query',
          actionPayload: {
            pageNo: queryObj.pageNo || 1,
            pageSize: queryObj.pageSize || 10,
            ...queryObj
          }
        } ,
      })
    },
    onCancel () {
      dispatch({
        type: 'crmcustomer/hideModal'
      })
    }
  }
  //客户列表
  const customerListProps = {
    dataSources: list,
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
        type: 'customers/delete',
        payload: id
      })
    },
    onEditItem (customerId) {
      dispatch({
        type: 'crmcustomer/initModal',
        payload:{
          modalType: 'update',
          id: customerId
        }
      })
    },
    onShare (data) {
      dispatch({
        type: 'customers/onshare',
        payload:data
      })
    },
    onSaveCrmDictList(type,values){
      dispatch({
        type: 'crmdict/saveCrmDictList',
        payload: {
          typeCode:type,
          values: values
        }
      })
    },
    onAddfollowup (customerId) {
      dispatch({
        type: 'crmfollowup/initModal',
        payload: {
          modalType: 'create',
          customerId: customerId,
        }
      })
    }
  }
  //客户搜索
  const customerSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/crm',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/crm'
      }))
    },
    onAdd () {
      dispatch({
        type: 'crmcustomer/initModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  //写跟进
  const followupModalProps = {
    type: crmfollowup.modalType,
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
      const queryObj = parse(location.query);
      dispatch({
        type: `crmfollowup/addFollowup`,
        payload: {
          params:data,
          action: 'customers/query',
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
        type: 'crmfollowup/hideModal'
      })
    }
  }

  const CustomerModalGen = () =>
    <CustomerModal {...customerModalProps} />
  const FollowupModalGen = () =>
    <FollowupModal {...followupModalProps} />
  return (

    <div className='content-inner'>
      <CustomerSearch {...customerSearchProps} />
      <CustomerList {...customerListProps} />
      <CustomerModalGen />
      <FollowupModalGen/>
    </div>
  )
}

Customers.propTypes = {
  customers: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ customers, crmfollowup, crmcustomer, crmdict}) {
  return { customers,crmfollowup, crmcustomer, crmdict}
}

export default connect(mapStateToProps)(Customers)
