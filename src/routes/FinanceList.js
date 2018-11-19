import React from 'react';
import { connect } from 'dva';
import { Tabs,Button,Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import {parse} from 'qs';
import Panorama from '../components/financeList/panorama'
import ConsultationSearch from  '../components/financeList/search';
import BillingDetails from '../components/financeList/billinDetails'
const TabPane = Tabs.TabPane;
const Cookie = require('js-cookie');

function FinanceList({dispatch,location,financeList}) {
  let url=window.location.href;	  //获取当前页面的url
  var len=url.length;   //获取url的长度值
  var a=url.indexOf('?');   //获取第一次出现？的位置下标
  var b=url.substr(a+1,len);   //截取问号之后的内容
  const {list,pagination,loading,types,lawyerlist}=financeList
  const PanoramaProps = {
    loading,
    list:list,
    pagination: pagination,
    onChangeTab(activeKey){
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          orderType: activeKey,
          page: 1
        }
      })
    },
    onPageChange (page, pageSize) {
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
  }
  const BillinDetails = {
    b,
    loading,
    list:list,
    pagination: pagination,
    onChangeBillTab(activeKey){
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          orderType: activeKey,
          page: 1
        }
      })
    },
    onPageChange (page, pageSize) {
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
  }
  const consultationSearchProps = {
    b,
    lawyerlist:lawyerlist ? lawyerlist : [],
    onSearch(values)  {
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          values:values,
          orderType:types,
        },
      })},
    onTimeSearch(values){
      dispatch({
        type: 'financeList/queryOrder',
        payload: {
          values:{
            timeType:values
          },
          orderType:types,
        },
      })},
  }
  const onChangeTab=(activeKey)=>{
    dispatch({
      type: 'financeList/queryOrder',
      payload: {
        orderType: activeKey,
        page: 1
      }
    })
  }
  const panes = [
    {title: '支付明细', content: '', key: '0'},
    {title: '余额明细', content: '', key: '1'},
  ]
  return (
    <div className="content-inner">
      <ConsultationSearch {...consultationSearchProps}/>
      <Tabs onChange={onChangeTab}defaultActiveKey={b==0||b==2||b==3?'1':'0'}>
        {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
      </Tabs>
      {types&&types=='0'?
      <Panorama {...PanoramaProps}/>:
        <BillingDetails {...BillinDetails}/>
      }
    </div>
  );
}

function mapStateToProps({financeList}) {
  return {financeList};
}

export default connect(mapStateToProps)(FinanceList);
