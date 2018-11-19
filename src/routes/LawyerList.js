import React from 'react';
import { connect } from 'dva';
import styles from './LawyerList.css';
import { routerRedux } from 'dva/router';
import {Modal,Button} from 'antd';
import LawyerList from '../components/lawyerList/lawyerList';
import Search from '../components/lawyerList/search';
import Modall from '../components/lawyerList/modal';
function FLawyerList({dispatch, location, lawyerList,modall}){
  const {loading, list, pagination, currentItem, modalType ,modalVisible,productTypes, fausetipVisible,lawpromodalVisible} = lawyerList
  const { field, keyword } = location.query
  const ModalProps = {
    ...modall,
    fausetipVisible,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    productTypes: productTypes,
    onBlurs(){
      dispatch({
        type: 'lawyerList/fausetip'
      })
    },
    onOk (data) {
        dispatch({
          type: `lawyerList/${modalType}`,
          payload: data
        })

    },
    onCancel () {
      dispatch({
        type: 'lawyerList/hideModal'
      })
    },
  }
  const lawyerListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
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
    onDeleteItem (id) {
      dispatch({
        type: 'lawyerList/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'lawyerList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }
  const cancelLoginModal =()=> {
    dispatch({
      type: 'lawyerList/hideModal'
    })
  }
  const CancelLawyerProduct =()=> {
    dispatch({
      type: 'lawyerList/hideLawProcuctModal'
    })
  }

  const lawyerListSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/lawyerList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/lawyerList',
      }))
    },
    onAdd () {
      dispatch({
        type: 'lawyerList/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    AddLawyerProduct() {
      dispatch({
        type: 'lawyerList/showLawProcuctModal',
      })
    },
  }
  const modalWidth = () => {
    return 1000;
  }
  const ModalGen = () =>
    <Modal title={modalType=='create'?'添加律师':'编辑律师'} visible={modalVisible} onCancel={cancelLoginModal}  maskClosable={false} width={modalWidth()} wrapClassName="productModal">
      <div>
        <Modall {...ModalProps} />
      </div>
    </Modal>
  return (
    <div className={styles.normal}>
      <Search {...lawyerListSearchProps}/>
      <LawyerList {...lawyerListProps}/>
      <ModalGen/>
    </div>
  );
}

function mapStateToProps({lawyerList }) {
  return {lawyerList};
}

export default connect(mapStateToProps)(FLawyerList);

