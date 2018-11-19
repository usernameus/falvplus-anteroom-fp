import React from 'react';
import { connect } from 'dva';
import {Button, Calendar,Modal} from 'antd';
import styles from './Sche.css';
import { routerRedux } from 'dva/router';
import Schedule from '../components/scheduler/ScheduleDetail'
import Modals from '../components/scheduler/Modals';
import MangeModal from '../components/scheduler/mangeModal';
import Buttoner from '../components/scheduler/Buttoner';

//value.toDate().format('yyyy/MM/dd')

function Sche({dispatch, location, scheint}) {
  const {modalVisible} = scheint.scheint
  function getListData(value){
    let listData;
    const lists =scheint.scheint.list
    switch(value.date()){
      case 6:
        listData =lists
            break;
      default:
    }
    return listData || [];
  }
  function dateCellRender(value){
    const listData = getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item =>
          <li key={item.beginTime}>
            <Button type="primary" style={{margin:'3px', background:item.appointmentType==1?'#6F0':'#999999'}}>{item.beginTime}-{item.endTime}</Button>
          </li>
          )
        }
      </ul>
    )
  }
  function onPanelChange(value) {
    const data=value.toDate().format('yyyy-MM-dd');
    dispatch({
      type: 'scheint/quering',
      payload:{startDate: data}
    })
  }
  const MangeModalProps = {
    ...scheint,
    onDeleteItem (id) {
      dispatch({
        type: 'scheint/delete',
        payload:{scheduleId: id.id}
      })
    },
    showScheModal(){
      dispatch({
        type: 'scheint/showModal'
      })
    }
  }
  const cancelLoginModal =()=> {
    dispatch({
      type: 'scheint/hideModal'
    })
  }
  const scheModalProps = {
    onOk (data) {
      dispatch({
        type: `scheint/setrules`,
        payload: data
      })
    },
  }
  const ModalGen = () =>
    <Modal title="" visible={modalVisible} onCancel={cancelLoginModal}>
      <Buttoner {...scheModalProps}/>
    </Modal>
  return (
    <div className={styles.normalRow}>
      <div><span className={styles.book_color_box1}></span>不可预约</div>
      <div><span className={styles.book_color_box2}></span>可预约</div>
      <div><span className={styles.book_color_box3}></span>已被预约</div>
      <Calendar dateCellRender={dateCellRender} className={styles.datecard} onPanelChange={onPanelChange}/>
      <div className={styles.weekplay}><Modals></Modals></div>
      <MangeModal {...MangeModalProps}/>
      <ModalGen/>
    </div>
  );
}

function mapStateToProps(scheint) {
  return {scheint};
}

export default connect(mapStateToProps)(Sche);
