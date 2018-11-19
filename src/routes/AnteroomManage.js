
import React from 'react';
import { connect } from 'dva';
import styles from './AnteroomManage.css';
import { routerRedux } from 'dva/router';
import {Modal,Button} from 'antd';
import AnteroomManage from '../components/anteroomManage/anteroonManage';
import Search from '../components/anteroomManage/search';
import Modall from '../components/anteroomManage/modal';
function FAnteroomManage({dispatch, location, anteroomManage,modall}){
  const {loading, list, pagination, currentItem, modalType ,modalVisible,productTypes, fausetipVisible,addsuccess,error} = anteroomManage
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
        type: 'anteroomManage/fausetip'
      })
    },
    onOk (data) {
        dispatch({
          type: `anteroomManage/${modalType}`,
          payload: data
        })
    },
    onCancel () {
      dispatch({
        type: 'anteroomManage/hideModal'
      })
    },
  }
  const anteroomManageProps = {
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
        type: 'anteroomManage/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'anteroomManage/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }
  const cancelLoginModal =()=> {
    dispatch({
      type: 'anteroomManage/hideModal'
    })
  }
  const anteroomManageSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/anteroomManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/anteroomManage',
      }))
    },
    onAdd () {
      dispatch({
        type: 'anteroomManage/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    AddLawyerProduct() {
      dispatch({
        type: 'anteroomManage/showLawProcuctModal',
      })
    },
  }
  const modalWidth = () => {
    return 1000;
  }
  const ModalGen = () =>
    <Modal title={modalType=='create'?'添加会客室':'编辑会客室'} visible={modalVisible} onCancel={cancelLoginModal}  maskClosable={false} width={modalWidth()} wrapClassName="productModal">
      <div>
        <Modall {...ModalProps} />
      </div>
    </Modal>
  return (
    <div className={styles.normal}>
      <Search {...anteroomManageSearchProps}/>
      <AnteroomManage {...anteroomManageProps}/>
      <ModalGen/>
    </div>
  );
}

function mapStateToProps({anteroomManage }) {
  return {anteroomManage};
}

export default connect(mapStateToProps)(FAnteroomManage);

