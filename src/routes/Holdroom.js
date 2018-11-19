import React from 'react';
import { connect } from 'dva';
import {bindActionCreators} from 'redux';
import {Modal, message,Button, Menu,Select,Icon,Spin, Row, Col,Card,Input,Form, Popover, Checkbox} from 'antd';
import {ContextMenu,MenuItem} from 'react-contextmenu';
import ChannelModal from '../components/anteroom/addChannelModal'
import HolderLayout from '../components/HolderLayout';
import CircleButton from '../components/anteroom/CircleButton';
import Videownd from '../components/anteroom/Videownd';
import Canvas from '../components/anteroom/Canvas';
import Fpartimer from '../components/anteroom/Fpartimer';
import Login from './login';
import * as _actions from '../actions/holdroom';
import styles from './Holdroom.less';
import {clone,distinct} from '../utils/common'

const Cookie = require('js-cookie');
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

function Holdroom({dispatch,holdroom, channelinfo, order, fhome, actions, login}) {
  const {headerData} = fhome;
  const { AddChannelModal}=holdroom;
  const {logoSrc,Logo_titleText}=headerData;
  const {
    actLoginModal,
    actLogin,
    // actLogout,
    actVerifyCode,
    actInitChannelInfo,
    actLeaveChannel,
    actChangeTab,
    streamPublished,
    streamUnpublished,
    // streamAdded,
    // streamRemoved,
    // quoteOrderPrice,
    actOpenCanvasPage,
    actChangeFileList,
    actChangeDrawingType,
    actShareFile,
    actUnShareFile,
    actCloseFilePanel,
    actDrawShape,
    actChangeCanvasUsers,
    actChangeTimeFilter,
    handlePay,
    onHidePayModal,
    onBalancePay,
    onPayType,
    actChannels,
    actAllChannels,
    actChannelName,
    AddChannel,
    hideAddChannel,
    showInviteUsers,
    hideInviteUsers,
    actLoadingChannel
  } = actions;
  const {loginState, user} = login;
  const headerProps = {
    currentMenu:'',
    loginState:loginState || false,
    role: user ? user.r : '0',
    userName: user ? user.name : '',
    headerType: fhome.headerType,
    headerImg: fhome.headerImg,
    headerTitle:fhome.headerTitle,
    headerContent:fhome.headerContent,
    onSignin () {
      actLoginModal();
    },
    logout(){
      actLgout();
    }
  }
  const loginProps = {
    message: login.message,
    ...login,
    logoSrc,
    Logo_titleText,
    getVerifyCode(phone){
      actVerifyCode({phone: phone})
    },
    onOk (data, loginMethod) {
      const payload = {
        ...data,
        holder: true,
        loginMethod:loginMethod
      };
      actLogin(payload);
    }
  };

  const showFloatPanel = (panel, node) => {
    hideFloatPanel();
    if(node == null) return;
    const backLayer = document.querySelector('#floatPanelBack');
    backLayer.style['display'] = 'block';
    panel.style['display'] = 'block';
    const panelBody = panel.querySelector('.ant-card-body');
    if(!panelBody.firstChild){
      panelBody.appendChild(node);
    }
  }

  const hideFloatPanel = () => {
    const backLayer = document.querySelector('#floatPanelBack');
    backLayer.style['display'] = 'none';
    const toolPanels = document.querySelectorAll('.toolPanel');
    for(var i = 0; toolPanels && i < toolPanels.length; i++){
      const item = toolPanels[i];
      if(item.style['display'] != 'none'){
        item.style['display'] = 'none';
      }
      if(item.id == 'channelsPanel'){
        const panelBody = item.querySelector('.ant-card-body');
        if(panelBody.firstChild){
          document.querySelector('.channelListPanel').appendChild(panelBody.firstChild);
        }
      }
      if(item.id == 'filesPanel'){
        const panelBody = item.querySelector('.ant-card-body');
        if(panelBody.firstChild){
          document.querySelector('.filesListPanel').appendChild(panelBody.firstChild);
        }
      }
      if(item.id == 'usersPanel'){
        const panelBody = item.querySelector('.ant-card-body');
        if(panelBody.firstChild){
          document.querySelector('.usersListPanel').appendChild(panelBody.firstChild);
        }
      }
      if(item.id == 'orderPanel'){
        const panelBody = item.querySelector('.ant-card-body');
        if(panelBody.firstChild){
          document.querySelector('.orderListPanel').appendChild(panelBody.firstChild);
        }
      }
    }
  }

  const onChannelListVisible = () =>{
    const channelListPanel = document.querySelector('.channelListPanel');
    const floatPanel = document.querySelector('#channelsPanel');
    if(floatPanel){
      showFloatPanel(floatPanel, channelListPanel.firstChild);
    }
  }
  const onFilesListVisible = () =>{
    const filesListPanel = document.querySelector('.filesListPanel');
    const floatPanel = document.querySelector('#filesPanel');
    if(floatPanel){
      showFloatPanel(floatPanel,filesListPanel.firstChild);
    }
  }

  const usersListVisible = () =>{
    const usersListPanel = document.querySelector('.usersListPanel');
    const floatPanel = document.querySelector('#usersPanel');
    if(floatPanel){
      showFloatPanel(floatPanel,usersListPanel.firstChild);
    }
  }
  //手机端订单
  const orderListVisible = () =>{
    const orderListPanel = document.querySelector('.orderListPanel');
    const floatPanel = document.querySelector('#orderPanel');
    if(floatPanel){
      showFloatPanel(floatPanel,orderListPanel.firstChild);
    }
  }
  const shareFile = () => {
    if(!channelinfo){
      Modal.info({
        title: '进入频道后才能分享文档'
      })
      return;
    }
    const onlineusers = channelinfo ? channelinfo.users.filter(u=>u.onlineStatus==1 && u.userId != channelinfo.selfUserId) : [];
    if(onlineusers.length　== 0){
      Modal.info({
        title:'请等待其他用户进入后再分享文档。'
      })
      return;
    }
    const channelId = channelinfo ? channelinfo.channelId : '';
    if(!channelId){
      return;
    }
    const msg = {
      type: 'sharefile',
      channelId: channelId,
      fileId: channelinfo.canvasState.fileId,
      channelFileId: channelinfo.canvasState.channelFileId,
      pageNo: channelinfo.canvasState.pageNo,
      pageCount: channelinfo.canvasState.pageCount,
      pageImage: channelinfo.canvasState.pageImage,
      // drawnShapes: channelinfo.canvasState.drawnShapes
    }
    fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
      if(error){
        console.error(error);
        return;
      }
      const payload = {
        channelId: channelId
      }
      actShareFile(payload);
    });
  }
  const unshareFile = () => {
    const channelId = channelinfo ? channelinfo.channelId : '';
    if(!channelId){
      return;
    }
    const msg = {
      type: 'unsharefile',
      channelId: channelId
    }
    fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
      if(error){
        console.error(error);
        return;
      }
      actUnShareFile(channelId);
    })
  }
  const roomHome = () =>{
    if(channelinfo.localStream && channelinfo.localStream.getWrStream().active){
      Modal.confirm({
        title: '断开连接',
        content: '您正在视频会话,是否断开视频?',
        onOk(){
          channelinfo.localStream.unpublish();
          leaveChannel(channelinfo.channelId);
        },
        onCancel(){
          return;
        }
      });
    }else{
      leaveChannel(channelinfo.channelId);
    }
  }

  const analysis = () => {
    if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
      console.log('enumerateDevices() not supported.');
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(function(devices){
        console.log(devices);
        devices.forEach(function(device){
          console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
          console.log(device);
        })
      })
      .catch(function(err){
        console.error(err.name + ' : ' + err.message);
        return;
      })
  }

  const leaveChannel = (channelId) => {
    if(!channelId){
      return;
    }
    const msg = {
      type: 'leaveChannel',
      channelId: channelId
    };
    fhome.fpar.sendCustomRequest(msg, function(error,rsp){
      if(error){
        console.error(error);
        return;
      }
      window.location.hash = '';
      actLeaveChannel({channelId:channelId});
    });
  }

  const changeTab = (tab) => {
    actChangeTab(tab);
  }

  const toggleVideo = () => {
    if(!channelinfo || !channelinfo.channelId){
      Modal.warning({
        title: '会话未选择',
        content:'请进入会话后再打开视频'
      });
      return;
    }
    if(!fhome.fpar || !fhome.room){
      return
    }
    if(channelinfo.localStream){
      channelinfo.localStream.unpublish();
    }else{
      const audioInputCount = holdroom.devices.filter(d=>d.kind=='audioinput').length;
      const audioOutputCount = holdroom.devices.filter(d=>d.kind=='audiooutput').length;
      const videoCount = holdroom.devices.filter(d=>d.kind=='videoinput').length;

      if(audioInputCount == 0){
        return;
      }
      // if(audioOutputCount == 0){
      //   return;
      // }


      var　localStream　=　fhome.fpar.Stream(fhome.room,{
        audio: true,
        video: videoCount > 0,
        recvVideo: videoCount > 0,
        data: false,
        topicId: channelinfo.channelId
      });
      localStream.addEventListener('access-accepted', function(){
        localStream.publish();
        localStream.addEventListener('stream-published', function(streamEvent){
          streamPublished(localStream);
        });
        localStream.addEventListener('stream-unpublished', function(){
          streamUnpublished();
        });
      });
      localStream.addEventListener('access-denied',function(){
        console.error('Local stream DENIED!');
      })
      localStream.init();
    }
  }

  const onQuotePrice = (values)=>{
    // quoteOrderPrice(values);
    const msg = {
      type: 'quoteprice',
      channelId: channelinfo.channelId,
      orderId: values.orderId,
      quotePrice: values.quotePrice
    };
    fhome.fpar.sendCustomRequest(msg, function(error,rsp){
      if(error){
        console.error(error);
        return;
      }
    });
  }
  //频道添加
  const onQueryAddChannel = (values)=>{
      const msg = {
        type: 'establishChannel',
        channelName: values.channelName,
        channelId:values.ParentChannel?values.ParentChannel.key:'0',
        Contacts: values.Contacts,
        domainUrl:window.location.href,
        messageContent:values.messageContent || '',
        switchs:values.switchs || false
      };
        fhome.fpar.sendCustomRequest(msg, function(error,rsp){
          if(error){
            console.error(error);
            return;
          }
          hideAddChannel()
        });


  }
  const onShowInviteUsers = ()=>{
    showInviteUsers()
  }
  const onHideInviteUsers = ()=>{
    hideInviteUsers()
  }
  //邀请用户
  const onInviteUsers = (values)=>{
    const msg = {
      type: 'invitationUser',
      channelId: channelinfo.channelId,
      Contacts: values.Contacts,
      domainUrl:window.location.href,
      messageContent:values.messageContent,
      switchs:values.switchs
    };
    fhome.fpar.sendCustomRequest(msg, function(error,rsp){
      if(error){
        console.error(error);
        return;
      }
      hideInviteUsers()
    });
  }
  const onRemoveConfirm = (values)=>{
    const msg = {
      type: 'deleteChannelUser',
      channelId: channelinfo.channelId,
      userId:values,
    };
    fhome.fpar.sendCustomRequest(msg, function(error,rsp){
      if(error){
        console.error(error);
        return;
      }
    });
  }
  const onSaveChannelName = (userId, channelId, channelNickName) => {
    const msg = {
      type: 'changeChannelName',
      userId: channelinfo.selfUserId,
      channelId: channelId,
      channelName: channelNickName
    }
    fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
      if(error){
        console.error(error);
        return;
      }
      actChannels({channels: JSON.parse(rsp.channels)});
      actChannelName({channelName: rsp.channelName});
    })
  }

  const orders = channelinfo ? channelinfo.orders : [];
  const lastOrder = orders ? orders[orders.length - 1] : null;
  const selfVideoProps = {
    isLocal: true,
    isMuted: {muted: true},
    stream: channelinfo.localStream ? channelinfo.localStream.getWrStream() : null,
    videoEnabled: channelinfo.localStream ? channelinfo.localStream.getWebRtcPeer().videoEnabled : false,
    toggleVideo(){
      if(channelinfo.localStream && channelinfo.localStream.getWebRtcPeer()){
        channelinfo.localStream.getWebRtcPeer().videoEnabled = !channelinfo.localStream.getWebRtcPeer().videoEnabled;
      }
      const msg = {
        type: 'videoChanged',
        channelId: channelinfo.channelId,
        userId: channelinfo.selfUserId,
        userName: '自己',
        videoEnabled: channelinfo.localStream ? channelinfo.localStream.getWebRtcPeer().videoEnabled : true
      }
      fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
      })
    }
  };

  const remoteVideoPropsList = channelinfo.remoteStreams && channelinfo.remoteStreams.length > 0 ?
    channelinfo.remoteStreams.map((item, index) => {
      const userId = item.getParticipant().getID();
      const userName = channelinfo.users.filter(u=>u.userId == userId.substring(0,userId.indexOf("-"))).map(u=>u.userName)[0];
      return {
        isLocal: false,
        userId: userId.substring(0, userId.indexOf("-")),
        userName: userName,
        isMuted: {muted: false},
        videoEnabled: item.getWebRtcPeer().videoEnabled,
        stream: item ? item.getWrStream() : null,
        rstream: item
      }
    }): [];

  // const usersProps = {
  //   userlist: channelinfo.users
  // };

  // const ConnectModalGen = ({roomConnected}) =>

  const openFilePageReq = (fileId, page,sharingfile) => {
      const msg = {
        type: 'openFilePage',
        channelId: channelinfo.channelId,
        fileId: fileId,
        sharingfile: sharingfile,
        page: page
      };
      fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
        actOpenCanvasPage({
          fileId: rsp.fileId,
          fileName: rsp.fileName,
          channelFileId: rsp.channelFileId,
          pageNo: rsp.pageNo,
          pageCount: rsp.pageCount,
          drawnShapes: rsp.drawnShapes,
          pageImage: rsp.pageImage,
          users: rsp.users
        });
      })
    }

  const canvasProps = {
      channelId: channelinfo ? channelinfo.channelId : '',
      selfUserId: channelinfo ? channelinfo.selfUserId : '',
      sharingfile: channelinfo ? channelinfo.sharingfile : false,
      canvasUsers: channelinfo ? channelinfo.canvasUsers : [],
      timeFilter: channelinfo ? channelinfo.timeFilter : null,
      ...channelinfo.canvasState,
      openFilePage: openFilePageReq,
      drawingShape(type){
        const currentType = channelinfo.canvasState.selectedBtn;
        actChangeDrawingType(type == currentType ? '' : type);
      },
      rotateCanvas(newDeg){
        // rotateCanvas(newDeg);
      },
      sendShape(shapeType, obj,channelId,userFileId, channelFileId,sharingfile, drawRate){
        if(shapeType == ''){
          return;
        }

        function convertShape(shape, rate){
          if(rate == 1.0){
            return shape;
          }else{
            for(var v in shape){
              if(v.in_array(['x','y','x1','x2','y1','y2','cx','cy','rx','ry','width','height'])){
                shape[v] = shape[v] / rate;
              }else if(v == 'points'){
                shape[v] = shape[v].map((point, index) =>{
                   point[0] = point[0] / rate
                   point[1] = point[1] / rate
                   return point;
                })
              }

            }
            return shape;
          }
        }

        // 改版后style 中的 host 会引发循环引用,故删除
        const styleClone = obj.style.clone();
        if(styleClone['host']){
          delete styleClone.host;
        }

        const shapeObj = {
          shapeId: obj.id,
          shapeType: shapeType,
          shapeDesc: {
            id: obj.id,
            position: obj.position,
            // scale: obj.scale,
            style: styleClone,
            // style: shapeType === 'text' ? convertShape(obj.style, drawRate) : obj.style,
            shape: obj.shape ? convertShape(clone(obj.shape), drawRate) : undefined
          }
        }

        actDrawShape(shapeObj);

        const canvasBody = document.querySelector('#canvasCard .ant-card-body');
        const scrollTop = canvasBody ? canvasBody.scrollTop : 0;
        const scrollLeft = canvasBody ? canvasBody.scrollLeft : 0;

        const msg = {
          type: 'shape',
          channelId: channelId,
          fileId: userFileId,
          channelFileId: channelFileId,
          sharingfile: sharingfile,
          scrollTop: scrollTop,
          scrollLeft: scrollLeft,
          shape: shapeObj
        };
        fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
          if(error){
            console.error(error);
            return;
          }

        })
      },
      onRemoveShape(channelId, userFileId, channelFileId, shapeId){
        const msg = {
          type: 'removeShape',
          channelId: channelId,
          fileId: userFileId,
          channelFileId: channelFileId,
          shapeId: shapeId
        };
        fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
          if(error){
            console.error(error);
            return;
          }
        })
      }

    };

  const closeFile = ()=>{
    actCloseFilePanel();
  }

  const showFileFunc = () =>{
  }

  const changeCanvasUser = (checkedValues)=>{
    actChangeCanvasUsers(checkedValues);
  }

  const changeTimeFilter = (value) => {
    actChangeTimeFilter(value);
  }

  const usersOptions =
    channelinfo ? channelinfo.canvasUsers: []

  const timeOptions = channelinfo && channelinfo.canvasState && channelinfo.canvasState.drawnShapes ?
    distinct(JSON.parse(channelinfo.canvasState.drawnShapes).filter(s=>s.sendTime!=null).map(s=>parseInt(s.sendTime / 60 / 1000))).sort().reverse() : [];

  const canvasExtWnd = (<CheckboxGroup onChange={changeCanvasUser} defaultValue={usersOptions}>
    <h3>截止时间:</h3>
    <Select allowClear={true} style={{width: '15em'}} onChange={changeTimeFilter}>{timeOptions.map((t,index)=><Option key={index} value={''+t*60*1000}>{new Date(t*60*1000).format('yyyy-MM-dd HH:mm')}</Option>)}</Select>
    <h3>用户筛选</h3>
    {channelinfo && channelinfo.users.map((u,index)=>{
      return <Checkbox key={index} value={u.userId} checked={true}>{u.userName}</Checkbox>
    })}
    <p style={{fontWeight:'bold'}}>提示:为了不影响沟通,页面打开后进行的批注不会被筛选</p>

    </CheckboxGroup>);

  const canvasTitle = <div style={{textAlign: 'center'}}>
    <span onClick={showFileFunc} style={{cursor:'pointer'}}>
      <span>{channelinfo.canvasState.fileName}</span>
      <Popover placement="bottom" trigger="click" content={canvasExtWnd} title="批注筛选">
        <Icon type="down" style={{width:48, border:0,fontSize:'1.3em'}}></Icon>
      </Popover>
    </span>
      <Button icon="close" style={{position:'absolute',right:0,cursor:'pointer',border:0, fontWeight:700, width:48, height:48,lineHeight:'', fontSize: '1.5em' }}
        onClick={closeFile}></Button>
  </div>

  const clientHeight = document.body.clientHeight;
  const canvasHeight = clientHeight - 130;

  const overFileLayerClass = channelinfo.canvasState.showFilePanel ? 'visible' : '';

  document.title=headerData?headerData.headerTitleText:'律师专属会客室';

  const onAddChannel = () => {
    AddChannel()
  }

  // const ChannelModalGen = () => <Modal title="添加频道" visible={false}>
  //   <ChannelInfoPanel/>
  {/*</Modal>*/}

  const channelListTitle = <div style={{position:'relative'}}>
    <span>频道列表</span>
    {Cookie.get('r') == 9?
    <Icon type="plus" style={{position:'absolute', right: 0, lineHeight: '48px', cursor:'pointer'}} onClick={onAddChannel}></Icon>:''}
  </div>
  const filesListTitle = <div style={{position:'relative'}}>
    <span>我的文件</span>
  </div>
  const usersListTitle = <div style={{position:'relative'}}>
    <span>用户</span>
  </div>
  const orderListTitle = <div style={{position:'relative'}}>
    <span>订单详情</span>
  </div>
  const holderProps = {
    showInviteModal:holdroom.showInviteModal,
    errMsg:order.errMsg,
    Balance:order.Balance,
    PayTypeVisible:order.PayTypeVisible,
    lawyerName: holdroom.lawyerName,
    delChannelId:holdroom.delChannelId?holdroom.delChannelId:null,
    roomConnected: fhome.roomConnected,
    allChannels: holdroom.allChannels || [],
    channels: holdroom.channels || [],
    channelListTitle: channelListTitle,
    devices: holdroom.devices,
    filesListTitle:filesListTitle,
    usersListTitle:usersListTitle,
    channelInfo: channelinfo,
    fpar: fhome.fpar || null,
    room: fhome.room || null,
    canvasState: channelinfo.canvasState,
    onQuotePrice: onQuotePrice,
    onInviteUsers:onInviteUsers,
    showInviteUsers:onShowInviteUsers,
    hideInviteUsers:onHideInviteUsers,
    onRemoveConfirm:onRemoveConfirm,
    onSaveChannelName,
    shareFile: shareFile,
    unshareFile: unshareFile,
    roomHome: roomHome,
    analysis: analysis,
    changeTab: changeTab,
    toggleVideo: toggleVideo,
    loadingChannel: holdroom.loadingChannel,
    changeChannel: (channelId)=>{
      if(channelinfo.localStream && channelinfo.localStream.getWrStream().active){
        channelinfo.localStream.unpublish();
      }
      const msg = {
        type: 'openChatChannel',
        channelId: channelId,
        leaveChannel: channelinfo.channelId
      }
      actLoadingChannel(true);
      fhome.fpar.sendCustomRequest(msg, function(error,rsp){
        if(error){
          // console.error(error);
          actLoadingChannel(false);
          if(error.message == 'NO_AUTH'){
            Modal.error({
              title: '您没有此频道的权限,禁止访问',
              onOk(){
                window.location.href='/anteroom#'+channelinfo.channelId ;
              }
            })
          }
          if(error.message == 'DELETE'){
            Modal.error({
              title: '该频道已删除,禁止访问',
              onOk(){
                window.location.href='/anteroom#';
              }
            })
          }
          if(error.message == 'DELETE_TYPE_O2O'){
            Modal.error({
              title: '该频道已删除,请通过购买服务进入频道',
              onOk(){
                window.location.href='/products';
              }
            })
          }
          if(error.message == 'NON_EXISTENT'){
            Modal.error({
              title: '该频道不存在',
              onOk(){
                window.location.href='/anteroom#'+channelinfo.channelId ;
              }
            })
          }
          return;
        }

        const users = rsp.users.filter(u=>u.onlineStatus == 1);
        fhome.fpar.receiveVideos(users);

        location.hash = '#' + channelId;
        actInitChannelInfo({channelInfo: rsp});
        hideFloatPanel();
        actLoadingChannel(false);
      });
    },
    onPayType:()=>{
      onPayType();
    },
    hidePayModal:()=>{
      onHidePayModal();
    },
    changeFileList: (files) => {
      actChangeFileList(files);
    },
    changeDrawingType: (drawingType) => {
      actChangeDrawingType(drawingType);
    },
    openCanvasPage: (params) => {
      actOpenCanvasPage(params);
    },
    //余额支付
    balancePay(value){
      const data={
        password:value.password,
          orderId:lastOrder ? lastOrder.orderId : '',
      }
      onBalancePay(data);
    },
    handlePay:function(){
      handlePay({
        title:lastOrder.orderSn + lastOrder.details[0].productName.slice(0, (30 - lastOrder.orderSn.length) / 2) ,
        amount: lastOrder.orderAmount,
        optional: {
          orderTitle:lastOrder.orderSn + lastOrder.details[0].productName.slice(0, (30 - lastOrder.orderSn.length) / 2) ,
          type: 'order',
          'serverName': location.host,
          'orderId': lastOrder ? lastOrder.orderId : '',
          'products': lastOrder ? lastOrder.details[0].productName : ''
        },
        returnurl:window.location.href.replace(/[\?#].*$/,'')
      });
    },
    hidechannel(channelId){
      const msg = {
        type: 'hidechannel',
        channelId: channelId,
        hidechannel:true
      };
      fhome.fpar.sendCustomRequest(msg, function(error,rsp){
        if(error){
          console.error(error);
          return;
        }
        actChannels({channels: JSON.parse(rsp.channels)});
        actAllChannels({allChannels: JSON.parse(rsp.allChannels)});
        if(channelId == channelinfo.channelId){
          roomHome();
        }
      });
    },
    delchannel(channelId){
      const msg = {
        type: 'delchannel',
        channelId: channelId,
      };
      fhome.fpar.sendCustomRequest(msg, function(error,rsp){
        if(error){
          console.error(error);
          return;
        }
        // actChannels({channels: JSON.parse(rsp.channels)});
        // actAllChannels({allChannels: JSON.parse(rsp.allChannels)});
        if(channelId == channelinfo.channelId){
          roomHome();
        }
      });
    },
    cancelHideChannel(channelId){
        const msg = {
          type: 'cancelHideChannel',
          channelId: channelId
        }
        fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
          if(error){
            console.error(error);
            return;
          }
          actChannels({channels: JSON.parse(rsp.channels)});
          actAllChannels({allChannels: JSON.parse(rsp.allChannels)});
        });
    },
    settopchannel(channelId){
      const msg = {
        type:  'settopchannel',
        channelId: channelId,
      }
      fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
        actChannels({channels: JSON.parse(rsp.channels)});
      });
    },
    canceltopchannel(channelId){
      const msg = {
        type: 'canceltopchannel',
        channelId: channelId
      }
      fhome.fpar && fhome.fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
        actChannels({channels: JSON.parse(rsp.channels)});
      })
    }
  };
  const hideModal = () =>{
    hideAddChannel()
  }
  // const ModalGen =() => (
  //   <Modal title="添加频道" visible={AddChannelModal}footer={null}onCancel={hideModal}>
  //     <ChannelModal onQueryAddChannel={onQueryAddChannel} onCancel={hideModal}/>
  //   </Modal>
  // )
  if(login.loginState){
    const clientWidth = document.body.clientWidth;
    const countPerRow = parseInt((clientWidth - 250) / 300);
    return (
      <div style={{position:'absolute', width:'100%', height:'100%',bottom:0,fontFamily:'Microsoft Yahei'}}>
        <HolderLayout {...holderProps} />
        {fhome.roomConnected && channelinfo.localStream ?
          <Videownd {...selfVideoProps} startPos={{x: 250, y:60}} />
          :''}
        {fhome.roomConnected && remoteVideoPropsList && remoteVideoPropsList.map((item, index) => {
          const row = Math.floor((index + 1) / countPerRow);
          const xPos = 250 + ((index+1) % countPerRow) * 300;
          const yPos = 60 +  row * 200;

          return (item.stream.active ?
            <Videownd key={index} {...item} startPos={{x: xPos, y:yPos}}/>
            :'')
        })}
        {!channelinfo.canvasState.showFilePanel ?
          <CircleButton className="circle-button" style={{left:5, top: 200}} iconClass="anticon anticon-menu-unfold" onClick={onChannelListVisible} />
        :''}
        {channelinfo && channelinfo.channelId?
        <CircleButton className={'circle-button overfilelayer ' + overFileLayerClass} style={{right:5, top: 200, zIndex:300}} iconClass="fpanticon fpanticon-files" onClick={onFilesListVisible}/>
        :''}
        {channelinfo && channelinfo.channelId?
        <CircleButton className={'circle-button overfilelayer ' + overFileLayerClass} style={{right:5, top: 280, zIndex:300}} iconClass="fpanticon fpanticon-team"  onClick={usersListVisible}/>
          :''}
        {channelinfo && channelinfo.channelId && orders && orders.length > 0 && orders.filter(o=>o.customerId == channelinfo.selfUserId || o.lawyerUserId == channelinfo.selfUserId).length > 0 ?
          <CircleButton className={'circle-button overfilelayer ' + overFileLayerClass} style={{right:5, top: 360, zIndex:300}} iconClass="fpanticon fpanticon-order"  onClick={orderListVisible}/>
          :''}
        {/*<ConnectModalGen roomConnected={fhome.roomConnected}/>*/}
        <Modal title="" visible={!fhome.roomConnected} maskClosable={false} closable={false} footer={null}>
          <div style={{textAlign:'center', padding: '20px 30px'}}>
            <Spin size="large" tip="连接中……"></Spin>
          </div>
        </Modal>
        { channelinfo.canvasState.showFilePanel ?
          <Card id="canvasCard"  style={{position:'absolute',zIndex:20,right:0, top: 60, maxWidth:'100%',bottom:0, margin:10,overflow:'hidden',left:0 }}
                title={canvasTitle} bodyStyle={{width:'100%', height:canvasHeight,padding:10,overflow:'scroll',background:'#EFEFEF'}}>
            <Canvas {...canvasProps} />
          </Card>
          :''}
        <div id="floatPanelBack" onClick={hideFloatPanel} style={{position:'absolute', zIndex:50, display:'none', top:0, left: 0,width: '100%', height:'100%', overflow:'hidden',background:'rgba(255,255,255,0.5)'}}></div>
        <Card id="channelsPanel" className="toolPanel" title={channelListTitle} style={{position:'absolute',zIndex:100,display:'none', width: 300,top: 60, bottom: 0,overflow:'hidden'}}
          bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:canvasHeight}}>
        </Card>
        <Card id="filesPanel" className="toolPanel" title={filesListTitle} style={{position:'absolute',right:0,zIndex:100,display:'none', width: 300,top: 60, bottom: 0,overflow:'hidden'}}
              bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:canvasHeight}}>
        </Card>
        <Card id="usersPanel" className="toolPanel"  title={usersListTitle} style={{position:'absolute',right:0,zIndex:100,display:'none', width: 300,top: 60, bottom: 0,overflow:'hidden'}}
              bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:canvasHeight}}>
        </Card>
        <Card id="orderPanel" className="toolPanel"  title={orderListTitle} style={{position:'absolute',right:0,zIndex:100,display:'none', width: 300,top: 60, bottom: 0,overflow:'hidden'}}
              bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:canvasHeight}}>
        </Card>
        {channelinfo && channelinfo.channelTimer && channelinfo.channelId != "" ?
          <Fpartimer start={channelinfo.channelTimer.start} initTimeCount={channelinfo.channelTimer.timeCount} channelId={channelinfo.channelId}/>
          :''}
        {/*<ModalGen/>*/}
        <ChannelModal visible={AddChannelModal} onQueryAddChannel={onQueryAddChannel} onCancel={hideModal}/>
      </div>
    );
  }else{
    return (
      <div style={{height: '100vh'}} className="normalRow">
        <a href="/" style={{fontSize: '1.3em', color: '#666666',marginTop:'20px', marginLeft:'20px',display:'block'}}><Icon type="left"></Icon>返回首页</a>
        <div style={{margin:'30px auto 200px auto'}}>
            <Login {...loginProps}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({holdroom, channelinfo, fhome, order, login}) {
  return {holdroom, channelinfo, fhome,  order, login};
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(_actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Holdroom);
