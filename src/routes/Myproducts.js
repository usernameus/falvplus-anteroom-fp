import React from 'react';
import { connect } from 'dva';
import styles from './Myproducts.css';
import { routerRedux } from 'dva/router';
import {Modal,Button} from 'antd';
import MyproductsList from '../components/Myproducts/Myproducts';
import Search from '../components/Myproducts/search';
import Modall from '../components/Myproducts/modal';
import LawProModal from '../components/Myproducts/lawpromodal'

function Myproducts({dispatch, location, myproducts,modall}){

  const {loading, list, pagination, currentItem, modalType ,modalVisible,productTypes, fausetipVisible,lawpromodalVisible,lawproductlist} = myproducts
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
        type: 'myproducts/fausetip'
      })
    },
    onOk (data) {
      if(data.shopPriceY != null|| (data.minPriceY && data.minPriceY<=data.maxPriceY)){
        dispatch({
          type: `myproducts/${modalType}`,
          payload: data
        })
      }else {
        return
      }
    },
    onCancel () {
      dispatch({
        type: 'myproducts/hideModal'
      })
    },
  }
  const MyproductsListProps = {
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
        type: 'myproducts/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'myproducts/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }
  const cancelLoginModal =()=> {
    dispatch({
      type: 'myproducts/hideModal'
    })
  }
  const CancelLawyerProduct =()=> {
    dispatch({
      type: 'myproducts/query'
    })
  }

  const myproductsSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/myproducts',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/myproducts',
      }))
    },
    onAdd () {
      dispatch({
        type: 'myproducts/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },
    AddLawyerProduct() {
      dispatch({
        type: 'myproducts/showLawProcuctModal',
      })
    },
  }
  const LawProModalProps = {
    lawproductlist:lawproductlist ? lawproductlist : "",
    CancelLawyerProduct(){
      dispatch({
        type: 'myproducts/hideLawProcuctModal'
      })
    },
    addLawProduct(data){
      dispatch({
        type: 'myproducts/onAddLawProduct',
        payload:data
      })
    },
    deleteLawProduct(data){
      dispatch({
        type: 'myproducts/onDeleteLawProduct',
        payload: data
      })
    },
  }
  const modalWidth = () => {
    return 1000;
  }
  const ModalGen = () =>
    <Modal title="产品定义" visible={modalVisible} onCancel={cancelLoginModal}  maskClosable={false} width={modalWidth()} wrapClassName="productModal">
      <div>
        <Modall {...ModalProps} />
      </div>
    </Modal>
  const LawProModalGen = () =>
    <Modal title="选择律师产品" visible={lawpromodalVisible} onCancel={CancelLawyerProduct} footer={null} maskClosable={false} width={modalWidth()} wrapClassName="productModal">
      <div>
        <LawProModal {...LawProModalProps}/>
      </div>
    </Modal>


  return (
    <div className={styles.normal}>
      <Search {...myproductsSearchProps}/>
      <MyproductsList {...MyproductsListProps}/>
      <ModalGen/>
      <LawProModalGen/>
    </div>
  );
}

function mapStateToProps({myproducts }) {
  return {myproducts};
}

export default connect(mapStateToProps)(Myproducts);

