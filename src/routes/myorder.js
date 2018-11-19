/**
 * Created by falvplus-dev on 17-3-29.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './myorder.css';
import {routerRedux } from 'dva/router';
import { Form, Button, Row, Col,Modal} from 'antd';
import OrderDetails from '../components/userDetails/OrderDetails';
import MyorderList from '../components/myorder/Myorder';
import Search from '../components/myorder/search';

function Myorder({dispatch,location,myorder}){
  const {loading, list, pagination,orderDetailVisible,types,lawyerlist,lawyerName} = myorder
  const ModalGens = () =>
    <Modal title="订单详情" visible={orderDetailVisible} onCancel={cancelorderModal} footer={null} >
      <div>
        <OrderDetails {...orderdetailsprops}/>
      </div>
    </Modal>
  const cancelorderModal =()=> {
    dispatch({
      type: 'myorder/hideDetailsModal'
    })
  }
  const orderdetailsprops = {
    ...myorder,
  }
  const MyorderListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onChangeTab(activeKey){
      dispatch({
        type: 'myorder/queryorder',
        payload: {
          param:{
            orderType: activeKey,
            page:1,
            pageSize:10
          }
        }
      })
    },
    onPageChange (page, pageSize) {
      dispatch({
        type: 'myorder/queryorder',
        payload: {
          param:{
            orderType: types,
            page:page,
            pageSize:pageSize
          }
        }
      })
    },
    onSeeDetail (orderId) {
      dispatch({
        type: 'myorder/orderdetail',
        payload:{id: orderId}
      })
    }
  }
  const orderSearchProps = {
    lawyerlist:lawyerlist ? lawyerlist : [],
    onSearch (values) {
      dispatch({
        type: 'myorder/queryorder',
        payload: {
          param:{
            orderType: types,
            page:1,
            pageSize:10
          },
          data:{
            lawyerName:values.lawyerName,
            phone: values.phone,
            startTime: values.startTime,
            endTime: values.endTime,
            productName:values.productName,
            orderSn:values.orderSn
          }
        },
      })},
    }

  return (
    <div className={styles.normal}>
      <Search {...orderSearchProps}/>
      <MyorderList {...MyorderListProps}　detailHref={'myorderdetails/'}/>
      <ModalGens/>
    </div>
  );
}
function mapStateToProps({myorder,orderDetails}) {
  return {myorder,orderDetails};
}
export default connect(mapStateToProps)(Myorder);
