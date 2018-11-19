import React,{Component} from 'react';
import {Modal,Tabs,Card} from 'antd';
import Userlist from './Userlist';
import Files from './Files';
import OrderSteps from './OrderSteps';
import ChannelInfoForm from './ChannelInfoForm';

const TabPane = Tabs.TabPane;

class TabPages extends  Component{
  constructor(props){
    super(props);
  }

  render(){
    const {selfUserId,
      channelId,
      channelInfo,
      changeTab,
      orders,
      lastOrder,
      changeFilesUpload,
      openFilePage,
      downloadFile,
      sharingfile,
      onInviteUsers,
      showInviteUsers,
      hideInviteUsers,
      showInviteModal,
      onRemoveConfirm,
      completeRequest,
      completeOrder,
      refuseCompleteOrder,
      onQuotePrice,
      onPayType,
      onRateOrder,
      initRate} = this.props;
    const isMainCustomer = this.props.channelInfo && this.props.channelInfo.users.filter(u=> u.userId == selfUserId && u.role == 1).length > 0;

    const usersProps = {
      canAdd: true, //this.props.channelInfo && this.props.channelInfo.channelType != 0 ? true : false,
      userlist: this.props.channelInfo ? this.props.channelInfo.users : [],
      showInviteModal:showInviteModal,
      onInviteUsers(values){
        onInviteUsers(values)
      },
      onRemoveConfirm(values){
        onRemoveConfirm(values);
      },
      showInviteUsers(){
        showInviteUsers()
      },
      hideInviteUsers(){
        hideInviteUsers()
      }
    };

    const channelInfoFormProps = {
      userId: selfUserId,
      channelId: channelId,
      channelName: channelInfo.channelName,
      onSaveChannelName:this.props.onSaveChannelName,
      onHideChannel(channelId){
      }
    }
    const filesProps = {
      channelId: channelId,
      hideUpload: lastOrder && lastOrder.orderStatus > 2 ? true : false,
      fileList: this.props.filelist ,
      beforeFileUpload(file, fileList){
        if(!channelId || channelId == ''){
          Modal.error({
            title: '未选择会话',
            content: '未选择会话或会话连接已丢失,请选择会话重新连接。'
          })
          return false;
        }
      },
      changeFiles(files){
        changeFilesUpload(channelId, files);
      },
      openFilePage,
      downloadFile
    }
    const ChannelFiles = () =>
      <Card title="文件" bordered={false}  style={{fontSize:'1.2em'}}>
        <Files {...filesProps}/>
      </Card>

    const orderInfoProps = {
      lastOrder,
      orders,
      isMainCustomer,
      initRate,
      onQuotePrice,
      onPayType,
      onRateOrder,
      completeRequest,
      completeOrder,
      refuseCompleteOrder,
    }
    const infoTab = (orders && orders.length > 0  && orders.filter(o=>o.customerId == selfUserId || o.lawyerUserId == selfUserId).length > 0)  ? channelInfo.infoTab : 'channelTab';
    return (
      <Tabs　activeKey={infoTab || 'channelTab'}  onChange={changeTab}
            style={{background:'white', height: '100%', width:'100%', overflowY:'scroll'}}>
        {orders && orders.length > 0 && orders.filter(o=>o.customerId == selfUserId || o.lawyerUserId == selfUserId).length > 0?
          <TabPane　tab="订单详情"　key="orderTab">
            <OrderSteps {...orderInfoProps}/>
          </TabPane>
          :''}
        <TabPane　tab="频道信息"　key="channelTab">
          <ChannelInfoForm {...channelInfoFormProps}/>
          <Userlist {...usersProps}></Userlist>
          <ChannelFiles />
        </TabPane>
      </Tabs>
    );
  }
}

export default TabPages;
