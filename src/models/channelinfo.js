import React from 'react';
import {message,notification} from 'antd';
import Singleton from '../utils/kurento/singleton';
const Cookie = require('js-cookie');
const iNotify = require('title-notify');

export default {
  namespace: 'channelinfo',
  state: {
    selfUserId: '',
    channelId: '',
    channelType: null,
    channelName: '',
    channelTimer: null,
    localStream: null,
    remoteStreams: [],
    orders:[],
    users:[],
    canvasUsers:[],
    timeFilter: null,
    msglist: [],
    filelist: [],
    videos: [],
    sharingfile: false,
    currentStep: 0,
    canvasState:{
      selfUserId: '',
      lastShapeId: 0,
      selectedBtn: '',
      showFilePanel: false,
      channelFileId: null,
      pageImage: '',
      remoteShapes: [],
      remoteShape: {},
      removeShapeId: null
    }
  },
  reducers: {
    init(state, action){
      const channelInfo = action.payload.channelInfo;
      const selfUserInfo = channelInfo.users.filter(u=>u.userId == channelInfo.selfUserId);
      const lastShapeId = selfUserInfo && selfUserInfo.length > 0 ? selfUserInfo[0].lastShapeId　: 0;
      const lastOrder = channelInfo.orders && channelInfo.orders.length > 0 ? channelInfo.orders[channelInfo.orders.length-1] : null;
      let currentStep = 0;
      if(lastOrder){
        if(lastOrder.orderStatus == 0){ // 未付款
          if(lastOrder.priceStatus == null || lastOrder.priceStatus == 0){
            currentStep = 1;
          }else{
            currentStep = 2;
          }
        }else if(lastOrder.orderStatus == 1){ // 已付款
          currentStep = 3;
        }else if(lastOrder.orderStatus == 9){ // 订单完成
          currentStep = 4;
        }
      }
      let infoTab = 'channelTab';
      if(lastOrder && currentStep < 3){
        infoTab = "orderTab";
      }
      const channelName = channelInfo.users.filter(u=>u.userId == channelInfo.selfUserId).map(u=>u.channelNickName).toString();
      const canvasUsers = channelInfo.users.map(u=>u.userId);
      return {
        ...state,
        selfUserId: channelInfo.selfUserId,
        infoTab: infoTab,
        channelId: channelInfo.channelId,
        channelType: channelInfo.channelType,
        channelName: channelName,
        channelTimer: channelInfo.channelTimer,
        localStream: null,
        remoteStreams: [],
        currentStep: currentStep,
        orders: channelInfo.orders,
        users: channelInfo.users,
        canvasUsers: canvasUsers,
        timeFilter:null,
        msglist: channelInfo.chatMsgs,
        filelist: channelInfo.channelFiles,
        sharingfile: false,
        canvasState:{
          selfUserId: channelInfo.selfUserId,
          lastShapeId: lastShapeId,
          selectedBtn: '',
          pageImage: '',
          channelFileId: null,
          remoteShapes: [],
          remoteShape: {},
          removeShapeId:null
        }
      }
    },
    changeTab(state, action){
      return {
        ...state,
        infoTab: action.payload
      }
    },
    ordersInfo(state, action){
      return {
        ...state,
        orders: action.payload.orderInfo
      }
    },
    roomConnected(state,action){
      if(state.channelId){
        const fpar = Singleton.getInstance({});
        const msg = {
          type: 'setUserChannel',
          userId: state.selfUserId,
          channelId: state.channelId
        }
        fpar.sendCustomRequest(msg, function(err,rsp){
          if(err){
            console.error(err);
            return;
          }
        });
      }
      return {
        ...state
      }
    },
    onQuotePrice(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onOrderPaid(state,action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onCompleteRequest(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onCompleteOrder(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onRefuseCompleteOrder(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onCancelOrder(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders:action.payload.orders
      }
    },
    onRefundOrder(state, action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    onRateOrder(state,action){
      return {
        ...state,
        infoTab: 'orderTab',
        orders: action.payload.orders
      }
    },
    participantJoined(state, action){
      // 处理用户刷新
      state.remoteStreams.forEach((s,index) =>{
        if(s.getParticipant().getID() == action.payload.participant.getID()){
          state.remoteStreams.splice(index, 1);
        }
      })
      return {
        ...state
      }

    },
    onlineusers(state, action){
      // streaming
      action.payload.filter(u=>u.onlineStatus == false).forEach(u=>{
        state.remoteStreams.forEach((s, index)=> {
          if(s.getParticipant().getID() == u.userId){
            state.remoteStreams.splice(index, 1);
          }
        })
      })
      return {
        ...state,
        users: action.payload
      }
    },
    recvmsg(state, action){
      if(!action.payload.sendTime){
        action.payload.sendTime = new Date();
      }
      state.msglist.push(action.payload);
      return {...state};
    },
    fileuploaded(state, action){
      state.filelist.unshift(action.payload);
      return {...state};
    },
    streamPublished(state, action){
      return {
        ...state,
        localStream: action.payload
      }
    },
    streamUnpublished(state, action){
      return {
        ...state,
        localStream: null
      }
    },
    streamSubscribed(state, action){
      // state.remoteStreams = [];
      // TODO: 删除断开的流
      // state.remoteStreams.remove
      state.remoteStreams.push(action.payload);
      return {
        ...state
      }
    },
    streamAdded(state, action){
      return {
        ...state
      }
    },
    streamRemoved(state, action){
      const remoteStreams = state.remoteStreams.filter(s=>s.getGlobalID() != action.payload.getGlobalID());
      return {
        ...state,
        remoteStreams: remoteStreams
      }
    },
    streamSpeaking(state, action){
      // message.info(action.payload.participantId + ' Speaking');
      const user = state.users.filter(u=>u.userId == action.payload.participantId.split('_')[0]);
      if(user.length > 0){
        let userName = user[0].userName;
        if(!userName || userName == 'undefined' || userName.length == 0){
          userName = user[0].userId;
        }
        message.info(userName + '正在发言')
      }
      return {
        ...state
      }
    },
    streamStoppedSpeaking(state, action){
      // message.info(action.payload.participantId + ' Stopped speaking');
      return {
        ...state
      }
    },
    onVideoChanged(state, action){
      state.remoteStreams.forEach((s,index) =>{
        if(s.getParticipant().getID() == action.payload.userId){
          state.remoteStreams[index].getWebRtcPeer().videoEnabled = action.payload.videoEnabled;
        }
      })
      return {
        ...state
      }
    },
    onChannelTimer(state, action){
      if(state.channelId == action.payload.channelId){
        return {
          ...state,
          channelTimer: action.payload.channelTimer
        }
      }else{
        return {
          ...state
        }
      }

    },
    changeCanvasUsers(state, action){
      return {
        ...state,
        canvasUsers: action.payload
      }
    },
    changeTimeFilter(state, action){
      return {
        ...state,
        timeFilter: action.payload
      }
    },
    openCanvasPage(state, action){
      if(!action.payload.users){
        return {...state};
      }
      const users = JSON.parse(action.payload.users);
      const selfUser = users.filter(u=>u.userId == state.selfUserId);
      const lastShapeId = selfUser.length > 0 ? selfUser[0].lastShapeId : 0;
      return {
        ...state,
        timeFilter: null,
        canvasState: {
          ...action.payload,
          lastShapeId: lastShapeId,
          showFilePanel: true
        }
      }
    },
    closeFilePanel(state, action){
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          showFilePanel: false
        }
      }
    },
    changeFileList(state, action){
      return {
        ...state
      }
    },
    changeDrawingType(state, action){
      return {
        ...state,
        canvasState:{
          ...state.canvasState,
          selectedBtn: action.payload
        }
      }
    },
    shareFile(state, action){
      let sharingfile = true;
      const {channelId, userFileId, channelFileId} = action.payload;
      if(state.channelId != channelId){
        sharingfile = false;
      }
      return  {
        ...state,
        sharingfile: sharingfile
      }
    },
    unshareFile(state, action){
      return {
        ...state,
        sharingfile: false
      }
    },
    drawShape(state, action){
      let drawnShapes = JSON.parse(state.canvasState.drawnShapes);
      drawnShapes.push(action.payload);
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          drawnShapes: JSON.stringify(drawnShapes)
        }
      }

    },
    remoteDrawingShape(state, action){
      if(state.channelId == action.payload.channelId){
        let remoteShapes = state.canvasState.remoteShapes || [];
        remoteShapes.push(action.payload.shapeInfo);
        // const remoteUser = action.payload.remoteUser;
        // const userInfo = state.users.filter(u=>u.userId == remoteUser);
        // if(userInfo.length > 0){
          // const userName = userInfo[0].userName || userInfo[0].userId;
          // message.info(userName + '正在操作文件');
        // }
        // const cardBody = document.querySelector('#canvasCard .ant-card-body');
        // if(cardBody){
        //   cardBody.scrollTop = action.payload.scrollTop;
        //   cardBody.scrollLeft = action.payload.scrollLeft;
        // }else{
        //
        // }
        return {
          ...state,
          sharingfile: true,
          canvasState:{
            ...state.canvasState,
            remoteShapes: remoteShapes,
            remoteShape: action.payload.shapeInfo
          }
        }
      }else{
        return {
          ...state
        }
      }
    },
    remoteRemoveShape(state, action){

      if(state.channelId == action.payload.channelId){
        let remoteShapes = eval(state.canvasState.remoteShapes);
        let drawnShapes = eval(state.canvasState.drawnShapes);
        const removeShapeId = action.payload.shapeId;
        if(remoteShapes){
          remoteShapes = remoteShapes.filter(s=>s.shapeDesc.id != removeShapeId)
        }
        if(drawnShapes){
          drawnShapes = drawnShapes.filter(s=>s.shapeDesc.id != removeShapeId)
        }

        return {
          ...state,
          canvasState:{
            ...state.canvasState,
            remoteShapes: remoteShapes,
            drawnShapes: drawnShapes,
            removeShapeId: action.payload.shapeId
          }
        }

      }else{
        return {...state}
      }

    },
    leaveChannel(state, action){
      if(state.channelId == action.payload.channelId){
        return {
          ...state,
          channelId: '',
          channelName: '',
          channelTimer: null,
          localStream: null,
          remoteStreams: [],
          orders:[],
          users:[],
          canvasUsers:[],
          timeFilter: null,
          msglist: [],
          filelist: [],
          videos: [],
          sharingfile: false,
          canvasState:{
            selfUserId: '',
            lastShapeId: 0,
            selectedBtn: '',
            showFilePanel: false,
            channelFileId: null,
            pageImage: '',
            remoteShapes: [],
            remoteShape: {}
          }
        }
      }else{
        return {
          ...state
        }
      }
    },
    channelName(state, action){
      return {
        ...state,
        channelName: action.payload.channelName
      }
    },
    newMessage(state, action){
      const msg = action.payload;
      const msglist = state.msglist;
      const lastMsg = msglist && msglist.length > 1 ? msglist[msglist.length - 2] : null;
      const sameChannelNotify = (lastMsg != null) && (new Date() - new Date(lastMsg.sendTime) > 1000 * 60 * 30);
      if(msg.user != Cookie.get('userId')
        && ((msg.channel && msg.channel != state.channelId) || sameChannelNotify)){
        const content = JSON.parse(msg.message)['content'];
        const sender = state.users.filter(u=>u.userId==msg.user);
        const userName = msg.userName ? msg.userName : sender.map(u=>u.userName);
        const userIcon = msg.avatar ? msg.avatar : sender.map(u=>u.avatar);
        const notify = new iNotify({
          effect: 'flash',
          // message: '您有新的消息,请注意查收!',
          audio:{
            file:['https://theme.lj110.com//sound/newmessage.mp3']
          },
          interval: 1000,
          updateFavicon:{
            textColor: '#FFFFFF',
            backgroundColor: '#FF0000'
          },
          // openurl: msg.channel ? 'https://' + location.host + '/anteroom#' + msg.channel : '',
          notification:{
            title: userName,
            icon: userIcon,
            body: content,
          }
        });
        notify.notify({
          notification:{
          }
        }).player();

        function openChannel(channel){
          if(channel){
            window.location.href = 'https://' + location.host + '/anteroom#' + channel;
            window.location.reload(true);
          }
        }
        notification.info({
          duration: 30,
          message: <a onClick={openChannel.bind(null,msg.channel)}>{userName}</a>,
          description: content
        });
      }
      return {...state, newMessage: action.payload};

    }

  },
  effects: {


    // *onShareFile({payload}, {call,put}){
    //   const {channelId, userFileId, channelFileId} = action.payload;
    //
    // }
  },
  subscriptions: {

  },
};
