import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Modal} from 'antd';
import styles from './BusinessDomain.css';
import BusinessDomains from '../components/businessDomain/BusinessDomain'
import Search from '../components/businessDomain/search';
import Modall from '../components/businessDomain/modal';

function BusinessDomain({dispatch, location ,businessdomain}) {
  const {lawyerlist,modalVisible,modalType,list,pagination,loading,lawyerdata,editid} = businessdomain.businessdomain
  const { field, keyword } = location.query
  const cancelLoginModal =()=> {
    dispatch({
      type: 'businessdomain/hideModal'
    })
  }
  const modalWidth = () => {
    return 1000;
  }
  const SearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/admin/businessdomain',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      }))
    },
    onAdd () {
      dispatch({
        type: 'businessdomain/querylawyerlist',
        payload: {
          modalType: 'create'
        }
      })
    },
  }
  const ModalProps = {
    lawyerlist:lawyerlist ? lawyerlist : [],
    lawyerdata:lawyerdata ? lawyerdata : {},
    modalType:modalType,
    editid:editid ? editid : null,
    onOk (data) {
      modalType == 'create' ?
        dispatch({
          type: 'businessdomain/create',
          payload: data
        }): dispatch({
          type: 'businessdomain/update',
          payload: data
      })
    },
  }
  const businessDomainsProps = {
    list:list,
    pagination:pagination || 1,
    loading,
    queryEdit (id) {
      dispatch({
        type: 'businessdomain/queryEdit',
        payload: {
          currentItem:{id:id}
        }
      })
    },
    onDeleteItem (data) {
      dispatch({
        type: 'businessdomain/delete',
        payload:{businessId:data}
      })
    },

    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
  }
  const ModalGen = () =>
    <Modal title={modalType == 'create' ? "业务添加" : "业务编辑"} visible={modalVisible} onCancel={cancelLoginModal}  maskClosable={false} width={modalWidth()} >
      <div>
        <Modall {...ModalProps}/>
      </div>
    </Modal>
  return (
    <div className={styles.normal}>
      <Search {...SearchProps}/>
      <BusinessDomains {...businessDomainsProps}/>
      <ModalGen/>
    </div>
  );
}

function mapStateToProps(businessdomain) {
  return {businessdomain};
}

export default connect(mapStateToProps)(BusinessDomain);
