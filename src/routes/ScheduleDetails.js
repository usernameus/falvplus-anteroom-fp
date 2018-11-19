//import React from 'react';
//import { connect } from 'dva';
//import {Modal} from 'antd';
//import styles from './ScheduleDetails.css';
//import Schedule from '../components/scheduler/ScheduleDetail';
//import Modall from '../components/scheduler/AddModal'
//
//function ScheduleDetails({dispatch, scheint}) {
//  const {modalVisible,list}=scheint.scheint
//
//  const ModalProps = {
//    visible: modalVisible,
//  }
//
//  const ScheduleProps={
//    list,
//    onAddItem () {
//      dispatch({
//        type: 'scheint/showModal',
//      })
//    }
//  }
//
//  const cancelLoginModal =()=> {
//    dispatch({
//      type: 'scheint/hideModal'
//    })
//  }
//
//  const ModalGen = () =>
//    <Modal title="" visible={modalVisible}  onCancel={cancelLoginModal}>
//      <div>
//        <Modall {...ModalProps}/>
//      </div>
//    </Modal>
//
//  return (
//    <div className={styles.normal}>
//      <Schedule {...ScheduleProps}/>
//      <ModalGen/>
//    </div>
//  );
//}
//
//function mapStateToProps(scheint) {
//  return {scheint};
//}
//
//export default connect(mapStateToProps)(ScheduleDetails);
