
import React from 'react';
import { connect } from 'dva';
import styles from './PowerManage.css';
import { routerRedux } from 'dva/router';
import {Modal,Button} from 'antd';
import PowerManage from '../components/powerManage/powerManage';
import Search from '../components/lawyerList/search';
import Modall from '../components/powerManage/modal';
function FPowerManage({dispatch, location, powerManage,modall}){

  const {loading, list, pagination, currentItem, modalType ,modalVisible,productTypes, fausetipVisible,lawpromodalVisible} = powerManage
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
        type: 'powerManage/fausetip'
      })
    },
    onOk (data) {
      if(data.shopPriceY != null|| (data.minPriceY && data.minPriceY<=data.maxPriceY)){
        dispatch({
          type: `powerManage/${modalType}`,
          payload: data
        })
      }else {
        return
      }
    },
    onCancel () {
      dispatch({
        type: 'powerManage/hideModal'
      })
    },
  }
  const powerManageProps = {
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
        type: 'powerManage/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'powerManage/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }
  const cancelLoginModal =()=> {
    dispatch({
      type: 'powerManage/hideModal'
    })
  }
  const CancelLawyerProduct =()=> {
    dispatch({
      type: 'powerManage/hideLawProcuctModal'
    })
  }

  const powerManageSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/powerManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/powerManage',
      }))
    },
    onAdd () {
      dispatch({
        type: 'powerManage/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    AddLawyerProduct() {
      dispatch({
        type: 'powerManage/showLawProcuctModal',
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
      <Search {...powerManageSearchProps}/>
      <PowerManage {...powerManageProps}/>
      <ModalGen/>
    </div>
  );
}

function mapStateToProps({powerManage }) {
  return {powerManage};
}

export default connect(mapStateToProps)(FPowerManage);

