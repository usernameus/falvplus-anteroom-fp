/**
 * Created by mel on 2017/3/11.
 */
import {message,Modal} from 'antd';
import FparRoom from './FparRoom';
import {wsUris} from '../config';

const Cookie = require('js-cookie');

const Singleton = (function(){
  let instance;

  let that = this;

  function createInstance(options){
    const r = new FparRoom(wsUris, function (error, fpar) {
      if(error){
        return null;
      }
      fpar.addEventListener('connect-success',function(fpar2) {
        console.info('Connect successed!');
        const joinParams = {
          userId: Cookie.get('userId'),
          token: 'Bearer ' + Cookie.get('token'),
          holder: location.hostname
        }
        var room = fpar2.Room(joinParams);
        room.addEventListener('room-connected', function(roomEvent){
          if(options.onRoomConnected && typeof options.onRoomConnected === 'function'){
            options.onRoomConnected();
          }
          if(options.enterRoomSuccess && typeof options.enterRoomSuccess === 'function'){
            options.enterRoomSuccess({room});
          }
          message.success('成功连接');
        })
        room.addEventListener('error-room',function(){
          if(options.onRoomError && typeof options.onRoomError === 'function'){
            options.onRoomError();
          }
          // room.connect();
        })
        room.addEventListener('lost-connection', function(){
          if(options.onLostConnection && typeof options.onLostConnection === 'function'){
            options.onLostConnection();
          }
          message.warning('与服务器连接断开,请稍候, 重新连接');
          // room.connect();
        })
        room.addEventListener('participant-joined', function(participant){
          if(options.participantJoined && typeof options.participantJoined=== 'function'){
            options.participantJoined(participant);
          }
        })
        room.addEventListener('participant-left', function(participant){
          if(options.participantLeft && typeof options.participantLeft === 'function'){
            options.participantLeft(participant);
          }
        })
        room.addEventListener('stream-subscribed', function(streamEvent){
          if(options.streamSubscribed && typeof options.streamSubscribed === 'function'){
            options.streamSubscribed(streamEvent.stream);
          }
        })
        room.addEventListener('stream-added', function(streamEvent){
          // if(options.streamAdded && typeof options.streamAdded === 'function'){
          //   options.streamAdded(streamEvent.stream);
          // }
        })
        room.addEventListener('stream-removed',function(streamEvent){
          if(options.streamRemoved && typeof options.streamRemoved === 'function'){
            options.streamRemoved(streamEvent.stream);
          }
        })
        room.addEventListener('stream-speaking',function(participant){
          if(options.streamSpeaking && typeof options.streamSpeaking === 'function'){
            options.streamSpeaking(participant)
          }

        })
        room.addEventListener('stream-stopped-speaking',function(participant){
          if(options.streamStoppedSpeaking && typeof options.streamStoppedSpeaking === 'function'){
            options.streamStoppedSpeaking(participant);
          }

        })
        room.addEventListener('recvIceCandidate', function(streams){

        })
        room.addEventListener('newMessage', function(msgResult){
          const msgContent = eval("(" + msgResult.message + ")");
          if(msgContent.msgType == 'text'){
            if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              options.recvNewMessage(msgResult);
            }
          }else if(msgContent.msgType == 'onlineusers'){
            if(options.onlineUsers && typeof options.onlineUsers === 'function'){
              options.onlineUsers(msgContent.users);
            }
          }else if(msgContent.msgType == 'uploadingfile'){
            // message.warning('uploading');
            if(options.recvNewMessage && typeof options.recvNewMessage === 'function') {
              const fileInfo = JSON.parse(msgResult.message)['file'];
              const fmessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: fileInfo.uploadContent
              }
              options.recvNewMessage(fmessage);
            }
            if(options.recvNewFile && typeof options.recvNewFile === 'function'){
              const fileInfo = JSON.parse(msgResult.message)['file'];
              options.recvNewFile(fileInfo.uploadContent.content);
            }
          }else if(msgContent.msgType == 'openFilePage'){
            // openCanvasPage(msgContent.pageInfo);
            if(options.openCanvasPage && typeof options.openCanvasPage === 'function'){
              options.openCanvasPage(msgContent.pageInfo);
            }
          }else if(msgContent.msgType == 'shape'){
            if(options.remoteDrawingShape && typeof options.remoteDrawingShape === 'function'){
              const {channelId, channelFileId,sharingfile,scrollTop, scrollLeft,shapeInfo} = msgContent ;
              const payload = {
                remoteUser:msgResult.user,
                channelId: channelId,
                channelFileId: channelFileId,
                sharingfile: sharingfile,
                scrollTop: scrollTop,
                scrollLeft: scrollLeft,
                shapeInfo: shapeInfo
              }
              options.remoteDrawingShape(payload);
            }
          }else if(msgContent.msgType == 'removeShape'){
            if(options.remoteRemoveShape && typeof options.remoteRemoveShape === 'function'){
              const {channelId, fileId, channelFileId, shapeId} = msgContent;
              const payload = {
                remoteUser: msgResult.user,
                channelId: channelId,
                channelFileId: channelFileId,
                shapeId: shapeId
              }
              options.remoteRemoveShape(payload);
            }
          }else if(msgContent.msgType == 'sharefile'){
            if(options.onShareFile && typeof options.onShareFile === 'function'){
              const {channelId,fileId, channelFileId, pageNo, pageCount, pageImage, drawnShapes,users} = msgContent;
              const shareInfo = {
                channelId: channelId,
                fileId: fileId,
                channelFileId: channelFileId,
                pageNo: pageNo,
                pageCount: pageCount,
                pageImage:　pageImage,
                drawnShapes: drawnShapes,
                users: users
              }
              options.onShareFile(shareInfo);
            }
          }else if(msgContent.msgType == 'unsharefile'){
            if(options.onUnshareFile && typeof options.onUnshareFile === 'function'){
              const {channelId} = msgContent;
              options.onUnshareFile(channelId);
            }
          }else if(msgContent.msgType == 'quoteprice') {
            if (options.onQuotePrice && typeof options.onQuotePrice === 'function') {
              options.onQuotePrice(msgContent);
            }
            if (options.recvNewMessage && typeof options.recvNewMessage === 'function') {
              const priceInfo = JSON.parse(msgResult.message);
              const pmessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content: {
                    channelId: priceInfo.channelId,
                    orderId: priceInfo.orderId,
                    quotePrice: priceInfo.quotePrice
                  }
                }
              }
              options.recvNewMessage(pmessage);
            }
          }else if(msgContent.msgType == 'orderpaid'){
            if(options.onOrderPaid && typeof options.onOrderPaid ===  'function'){
              options.onOrderPaid(msgContent);
            }
            if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const paidInfo = JSON.parse(msgResult.message);
              const pmessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId: paidInfo.channelId,
                    orderId: paidInfo.orderId,
                    paidAmount: paidInfo.paidAmount
                  }
                }
              }
              options.recvNewMessage(pmessage);
            }

          }else if(msgContent.msgType == 'channels'){
            if(options.onChannels && typeof options.onChannels === 'function'){
              options.onChannels(msgContent);
            }
          }else if(msgContent.msgType == 'allChannels'){
            if(options.onAllChannels && typeof options.onAllChannels === 'function'){
              options.onAllChannels(msgContent);
            }
          }else if(msgContent.msgType == 'completeRequest'){
            if(options.onCompleteRequest && typeof options.onCompleteRequest === 'function'){
              options.onCompleteRequest(msgContent);
            }
            if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const orderInfo = JSON.parse(msgResult.message);
              const omessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId:orderInfo.channelId,
                    userId: orderInfo.userId,
                    orderId: orderInfo.orderId
                  }
                }
              }
              options.recvNewMessage(omessage);
            }
          }else if(msgContent.msgType == 'completeOrder'){
            if(options.onCompleteOrder && typeof options.onCompleteOrder === 'function'){
              options.onCompleteOrder(msgContent);
            }
            if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const orderInfo = JSON.parse(msgResult.message);
              const omessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId:orderInfo.channelId,
                    userId: orderInfo.userId,
                    orderId: orderInfo.orderId
                  }
                }
              }
              options.recvNewMessage(omessage);
            }
          }else if(msgContent.msgType == 'refuseCompleteOrder'){
            if(options.onRefuseCompleteOrder && typeof options.onRefuseCompleteOrder === 'function'){
              options.onRefuseCompleteOrder(msgContent);
            }
             if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const orderInfo = JSON.parse(msgResult.message);
              const omessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId:orderInfo.channelId,
                    userId: orderInfo.userId,
                    orderId: orderInfo.orderId
                  }
                }
              }
              options.recvNewMessage(omessage);
            }
          }else if(msgContent.msgType == 'cancelOrder'){
            if(options.onCancelOrder && typeof options.onCancelOrder === 'function'){
              options.onCancelOrder(msgContent);
            }
             if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const orderInfo = JSON.parse(msgResult.message);
              const omessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId:orderInfo.channelId,
                    userId: orderInfo.userId,
                    orderId: orderInfo.orderId
                  }
                }
              }
              options.recvNewMessage(omessage);
            }
          }else if(msgContent.msgType == 'refundOrder'){
            if(options.onRefundOrder && typeof options.onRefundOrder === 'function'){
              options.onRefundOrder(msgContent);
            }
             if(options.recvNewMessage && typeof options.recvNewMessage === 'function'){
              const orderInfo = JSON.parse(msgResult.message);
              const omessage = {
                room: msgResult.room,
                user: msgResult.user,
                message: {
                  msgType: msgContent.msgType,
                  content:{
                    channelId:orderInfo.channelId,
                    userId: orderInfo.userId,
                    orderId: orderInfo.orderId,
                    refundAmount: orderInfo.refundAmount
                  }
                }
              }
              options.recvNewMessage(omessage);
            }
          }else if(msgContent.msgType == 'rateOrder'){
            if(options.onRateOrder && typeof options.onRateOrder === 'function'){
              options.onRateOrder(msgContent);
            }
          }else if(msgContent.msgType == 'videoChanged'){
            if(options.onVideoChanged && typeof options.onVideoChanged === 'function'){
              options.onVideoChanged(msgContent);
            }
          }else if(msgContent.msgType == 'channelTimer'){
            if(options.onChannelTimer && typeof options.onChannelTimer === 'function'){
              options.onChannelTimer(msgContent);
            }
          }

        })
        if(options.joinroom){
          room.connect();
        }
      })
      fpar.addEventListener('connect-failed',function(error){
        console.error('Connect failed' + error);
        Modal.error({
          title: '连接失败!'
        })
      })
      return fpar;
    });
    return r;
  }

  return {
    getInstance : function(options){
      if (!instance){
        instance = createInstance(options);
      }
      return instance;
    },
  };
})();


export default Singleton;
