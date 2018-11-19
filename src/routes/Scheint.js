//import React from 'react';
//import { connect } from 'dva';
//import styles from './Sche.css';
//import {Modal} from 'antd';
//import Buttoner from '../components/scheduler/Buttoner';
//import Scheint from '../components/scheduler/Scheduler'
//import List from '../components/scheduler/Lsit'
//
//function Schedule({dispatch,location,scheint}) {
//  const {modalVisible,modalType,} = scheint.scheint
//  const ScheintProps={
//    showModals(){
//      dispatch({
//        type: 'scheint/showModal'
//      })
//    }
//  }
//  const cancelLoginModal =()=> {
//    dispatch({
//      type: 'scheint/hideModal'
//    })
//  }
//  const ListProps = {
//    list:scheint.scheint.list,
//    onDeleteItem (id) {
//      dispatch({
//        type: 'scheint/delete',
//        payload:{scheduleId: id.id}
//      })
//    }
//  }
//  const scheModalProps = {
//    onOk (data) {
//      dispatch({
//        type: `scheint/setrules`,
//        payload: data
//      })
//    },
//  }
//  const ModalGen = () =>
//    <Modal title="" visible={modalVisible} onCancel={cancelLoginModal}>
//      <Buttoner {...scheModalProps}/>
//    </Modal>
//  return (
//    <div className={styles.normal}>
//      <Scheint {...ScheintProps}/>
//      <List {...ListProps}/>
//      <ModalGen/>
//    </div>);
//}
//
//function mapStateToProps(scheint) {
//  return {scheint};
//}
//export default connect(mapStateToProps)(Schedule);
