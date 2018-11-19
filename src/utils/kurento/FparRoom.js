/**
 * Created by mel on 2017/3/7.
 */
import RpcBuilder from 'kurento-jsonrpc';
import EventEmitter from 'wolfy87-eventemitter';
import kurentoUtils from 'kurento-utils';

require('./adapter');

function Room(fpar, options){
  var that = this;
  this.name = options.holder;
  this.userId = options.userId;

  var streams = {};
  var ee = new EventEmitter();
  var participants = {};
  var participantsSpeaking = [];
  var connected = false;
  var localParticipant;
  var subscribeToStreams = options.subscribeToStreams || true;
  var updateSpeakingInterval = options.updateSpeakingInterval || 1500;
  this.thresholdSpeaker = options.thresholdSpeaker || -50;

  this.getLocalParticipant = function(){
    return localParticipant;
  }

  this.receiveVideos= function(users){
    for(var p in participants){
      if(users.filter(u=>p.startWith(u.userId + "-")).length > 0){
      // if(users.filter(u=>p == u.userId).length > 0){
        var streams = participants[p].getStreams();
        for(var key in streams){
          // roomEvent.streams.push(streams[key]);
          if(subscribeToStreams){
            streams[key].subscribe();
          }
        }

      }
    }
  }

  this.addEventListener = function(eventName, listener){
    ee.addListener(eventName, listener);
  }

  this.emitEvent = function (eventName, eventsArray) {
    ee.emitEvent(eventName, eventsArray);
  }

  this.connect = function(){
    var joinParams = {
      token: options.token,
      // customer: options.customer,
      holder: options.holder
    };

    fpar.sendRequest('joinRoom', joinParams, function(error, response){
      if(error){
        console.warn('不能加入房间', error);
        ee.emitEvent('error-room', [{
          error: error
        }]);
      }else{
        connected = true;

        var existsParticipants = response.value ? response.value : [];

        var roomEvent = {
          participants: [],
          streams: [],
          sessionId: response.sessionId
        };

        var length = existsParticipants.length;
        for(var i = 0; i < length; i++){
          var participant = new Participant(fpar, false, that, existsParticipants[i]);
          participants[participant.getID()] = participant;
          roomEvent.participants.push(participant);
          // TODO: Stream
          var streams = participant.getStreams();
          for(var key in streams){
            roomEvent.streams.push(streams[key]);
            // if(subscribeToStreams){
              // streams[key].subscribe();
            // }
          }
        }
        ee.emitEvent('room-connected', [roomEvent]);
      }
    });
  }

  this.onParticipantPublished = function(options){
    var participant = new Participant(fpar, false, that, options);

    var pid = participant.getID();
    if(!(pid in participants)){
      console.info('Publisher not found in participants list by its id', pid);
    }else{
      console.info('Publisher found in participants list by its id', pid);
    }

    participants[pid] = participant;

    ee.emitEvent('participant-published', [{
      participant: participant
    }]);

    var streams = participant.getStreams();
    for(var  key in streams){
      var stream = streams[key];
      if(subscribeToStreams){
        stream.subscribe();
        ee.emitEvent("stream-added", [{
          stream: stream
        }]);
      }
    }
  }

  this.onParticipantUnpublished = function(msg){
    console.log(msg);
    var participant = participants[msg.name];
    if(participant != undefined){
      var streams = participant.getStreams();
      for(var key in streams){
        ee.emitEvent('stream-removed',[{
          stream: streams[key]
        }]);
      }
    }
  }

  this.onParticipantJoined = function(msg){
    var participant = new Participant(fpar, false, that, msg);
    var pid = participant.getID();
    if(!(pid in participants)){
      console.log('New participant to participants list with id ' , pid);
      participants[pid] = participant;
    }else{
      console.info('Participant already exists in participants list with the same id, old: ' + participants[pid], ',joined now:' , participant);
      participant = participants[pid];
    }
    ee.emitEvent('participant-joined', [{participant: participant}]);
  }

  this.onParticipantLeft = function(msg){
    var participant = participants[msg.name];
    if(participant !== undefined){
      delete participants[msg.name];

      ee.emitEvent('participant-left', [{
        participant: participant
      }]);

      // Stream
      var streams = participant.getStreams();
      for(var key in streams){
        ee.emitEvent('stream-removed', [{
          stream: streams[key]
        }]);
      }
      participant.dispose();
    }else{
      console.warn('Participant ' + msg.name + ' unknown. Participants:' + JSON.stringify(participants));
    }
  }

  this.onParticipantEvicted = function(msg){
    ee.emitEvent('participant-evicted', [{
      localParticipant: localParticipant
    }]);
  }

  this.onNewMessage = function(msg){
    console.log("New message: " + JSON.stringify(msg));
    var room = msg.room;
    var user = msg.user;
    var message = msg.message;

    if (user !== undefined){
      ee.emitEvent('newMessage', [{
        room: room,
        user: user,
        message: message
      }]);
    }else{
      console.error('User undefined in new message:' ,  msg);
    }
  }

  this.recvIceCandidate = function(msg){
    var candidate = {
      candidate: msg.candidate,
      sdpMid: msg.sdpMid,
      sdpMLineIndex: msg.sdpMlineIndex
    };
    var participant = participants[msg.endpointName];
    if(!participant){
      console.error('Participant not found for endpoint ' + msg.endpointName + '. Ice candidate will be ignored.', candidate);
      return false;
    }

    var streams = participant.getStreams();
    for(var key in streams){
      var stream = streams[key];
      stream.getWebRtcPeer().videoEnabled = false;
      stream.getWebRtcPeer().addIceCandidate(candidate, function(error){
        if(error){
          console.error('Error adding candidate for ' + key + ' stream of endpoint ' + msg.endpointName + ' : ' + error);
          return;
        }
      })
    }
    ee.emitEvent('recvIceCandidate',[{streams: streams}]);

  }

  this.onRoomClosed = function(msg){
    console.log('Room closed: ' + JSON.stringify(msg));
    var room = msg.room;
    if(room !== undefined){
      ee.emitEvent('room-closed', [{
        room: room
      }]);
    }else{
      console.error('Room undefined in on room closed', msg);
    }
  }


  this.onLostConnection = function(){
    if(!connected){
      console.warn('Not connected to room, ignoring lost connection notification');
      return false;
    }
    console.log('Lost connection in room ' + that.name);
    var room = that.name;
    if(room !== undefined){
      ee.emitEvent('lost-connection', [{
        room: room
      }]);
    }else {
      console.error('Room undefined when lost connection');
    }
  }

  this.onMediaError = function(params){
    console.error('Media error:' + JSON.stringify(params));
    var error = params.error;
    if(error){
      ee.emitEvent('error-media', [{
        error: error
      }]);
    }else{
      console.error('Received undefined media error. Params:', params);
    }

  }

  this.leave = function(forced, jsonRpcClient){
    forced = !!forced;
    console.log('Leaving room (forced=' + forced + ')');

    if(connected && !forced){
      fpar.sendRequest('leaveRoom', function(error, response){
        if(error){
          console.error(error);
        }
        // TODO: 考虑是否不应该关闭jsonRpc连接?
        jsonRpcClient.close();
      });
    }else{
      // TODO: 考虑是否不应该关闭jsonRpc连接?
      jsonRpcClient.close();
    }
    connected = false;
    if(participants){
      for(var pid in participants){
        participants[pid].dispose();
        delete participants[pid];
      }
    }
  }

  this.disconnect = function(stream){
    var participant = stream.getParticipant();
    if(!participant){
      console.error('Stream to disconnect has no participant', stream);
      return false;
    }

    delete participants[participant.getID()];
    participant.dispose();

    if(participant === localParticipant){
      console.log('Unpublishing my media (I\'m' + participant.getID() + ')');
      // TODO: 确认是否需要删除
      // delete localParticipant;
      fpar.sendRequest('unpublishVideo', function(error, response){
        if(error){
          console.error(error);
        }else{
          console.info('Media unpublished correctly');
        }
      });
    }else{
      console.log('Unsubscribing from ' + stream.getGlobalID());
      fpar.sendRequest('unsubscribeFromVideo', {
          sender: stream.getGlobalID()
        },
        function(error, response){
          if(error){
            console.error(error);
          }else{
            console.info('Unsubscribed correctly from ' + stream.getGlobalID());
          }

        });
    }


  }

  this.getStreams = function(){
    return streams;
  }

  this.addParticipantSpeaking = function(participantId){
    participantsSpeaking.push(participantId);
  }

  this.removeParticipantSpeaking = function(participantId){
    var pos = -1;
    for(var i = 0; i < participantsSpeaking.length; i++){
      if(participantsSpeaking[i] == participantId){
        pos = i;
        break;
      }
    }
    if(pos != -1){
      participantsSpeaking.splice(pos, 1);
    }
  }

  localParticipant = new Participant(fpar, true, that, {id: options.userId + '-' + options.token.substring(options.token.lastIndexOf('.') + 1)});
  participants[options.userId + '-' + options.token.substring(options.token.lastIndexOf('.') + 1)] = localParticipant;
}

function Participant(fpar, local, room, options){
  var that = this;
  var id = options.id;

  var streams = {};
  var streamsOpts = [];

  if(options.streams){
    for(var i = 0; i < options.streams.length; i++){
      var streamOpts = {
        topicId: options.topicId,
        id: options.streams[i].id,
        participant: that,
        recvVideo: (options.streams[i].recvVideo == undefined ? true : options.streams[i].recvVideo),
        recvAudio: (options.streams[i].recvAudio == undefined ? true : options.streams[i].recvAudio)
      };
      var stream = new Stream(fpar, false, room, streamOpts);
      addStream(stream);
      streamsOpts.push(streamOpts);
    }
  }
  console.log('New ' + (local ? 'local' : 'remote') + ' participant ' + id + ', stream options:', streamsOpts);

  that.setId = function(newId){
    id = newId;
  }
  function addStream(stream){
    streams[stream.getID()] = stream;
    room.getStreams()[stream.getID()] = stream;
  }
  that.addStream = addStream;

  that.getStreams = function(){
    return streams;
  }

  that.dispose = function(){
    for(var key in streams){
      streams[key].dispose();
    }
  }

  that.getID = function(){
    return id;
  }

  this.sendIceCandidate = function(candidate){
    console.debug((local ? "Local" : "Remote"), "candidate for",
      that.getID(), JSON.stringify(candidate));
    fpar.sendRequest("onIceCandidate", {
      endpointName: that.getID(),
      candidate: candidate.candidate,
      sdpMid: candidate.sdpMid,
      sdpMLineIndex: candidate.sdpMLineIndex
    }, function (error, response) {
      if (error) {
        console.error("Error sending ICE candidate: "
          + JSON.stringify(error));
      }
    });
  }
}

function Stream(fpar, local, room , options){
  var that = this;

  that.room = room;
  var ee = new EventEmitter();

  var sdpOffer;
  var wrStream;
  var wp;
  var id;

  if(options.id){
    id = options.id;
  }else{
    id = 'webcam';
  }

  var video;
  var videoElements = [];
  var elements = [];
  var participant = options.participant;
  var topicId = options.topicId;  // FPAR
  this.getTopicId = function(){
    return topicId;
  }

  var speechEvent;

  this.isLocal = function(){
    return local;
  }
  var recvVideo = options.recvVideo;

  this.getRecvVideo = function(){
    return recvVideo;
  }

  var recvAudio = options.recvAudio;

  this.getRecvAudio = function(){
    return recvAudio;
  }

  var showMyRemote = false;
  this.subscribeToMyRemote = function(){
    showMyRemote = true;
  }
  this.displayMyRemote = function(){
    return showMyRemote;
  }

  var localMirrored = false;
  this.mirrorLocalStream = function(wr){
    showMyRemote = true;
    localMirrored = true;
    if(wr){
      wrStream = wr;
    }
  }
  this.isLocalMirrored = function(){
    return localMirrored;
  }

  var chanId = 0;
  function getChannelName(){
    return that.getGlobalID() + '_' + chanId++;
  }

  var dataChannel = options.data || false;
  this.isDataChannelEnabled = function(){
    return dataChannel;
  }

  var dataChannelOpened = false;
  this.isDataChannelOpened = function(){
    return dataChannelOpened;
  }

  function onDataChannelOpen(event){
    console.log('Data channel is opened');
    dataChannelOpened = true;
  }

  function onDataChannelClosed(event){
    console.log('Data channel is closed');
    dataChannelOpened = false;
  }

  this.sendData = function(data){
    if(wp === undefined){
      throw new Error('WebRTC peer has not been created yet');
    }
    if(!dataChannelOpened){
      throw new Error('Data channel is not opened');
    }
    console.log('Sending through data channel:' + data);
    wp.send(data);
  }

  this.getWrStream = function(){
    return wrStream;
  }

  this.getWebRtcPeer = function(){
    return wp;
  }

  this.addEventListener = function(eventName, listener){
    ee.addListener(eventName, listener);
  }

  function showSpinner(spinnerPartentId){
    // TODO: 修改
    // var progress = document.createElement('div');
    // progress.id = 'progress-' + that.getGlobalID();
    // progress.style.background = "center transparent url('img/spinner.gif') no-repeat";
    // document.getElementById(spinnerParentId).appendChild(progress);
  }

  function hideSpinner(spinnerId){
    // TODO: 修改
    // spinnerId = (typeof spinnerId === 'undefined') ? that.getGlobalID() : spinnerId;
    // $(jq('progress-' + spinnerId)).hide();
  }

  this.getID = function(){
    return id;
  }

  this.getParticipant = function(){
    return participant;
  }

  this.getGlobalID = function(){
    if(participant){
      return participant.getID() + '_' + id;
    }else {
      return id + '_webcam';
    }
  }

  this.init = function() {
    participant.addStream(that);

    var constraints = {
      audio: true,
    }
    if (options.video) {
      constraints.video = {
        mandatory: {
          maxWidth: 640,
        },
        optional: [
          {maxFrameRate: 15},
          {minFrameRate: 15}
        ]
      }
    }else{
      constraints.video = false;
    }

    // var constraints = {
    //   audio: true,
    //   video: false
    // }

    navigator.getUserMedia(constraints, function(userStream){
      wrStream = userStream;
      ee.emitEvent('access-accepted', null);
    }, function(error){
      console.error('Access denied', error);
      ee.emitEvent('access-denied', null);
    })
  }

  this.publishVideoCallback = function(error, sdpOfferParam, wp){
    if(error){
      return console.error('(publish) SDP offer error: ' + JSON.stringify(error));
    }

    console.log('Sending SDP offer to publish as ' + that.getGlobalID(), sdpOfferParam);

    fpar.sendRequest("publishVideo", {
      topicId: topicId,
      sdpOffer: sdpOfferParam,
      doLoopback: that.displayMyRemote() || false,
      // audioOnly: !options.video
    }, function(error, response){
      if(error){
        console.error('Error on publishVideo: ' + JSON.stringify(error));
      }else{
        ee.emitEvent('stream-published', [{
          stream: that
        }]);
        that.processSdpAnswer(response.sdpAnswer);
      }

    });
  }

  this.startVideoCallback = function(error, sdpOfferParam, wp){
    if(error){
      return console.error('(subscribe) SDP offer error:' + JSON.stringify(error));
    }
    console.log('Sending SDP offer to subscribe to ' + that.getGlobalID() , sdpOfferParam);
    fpar.sendRequest('receiveVideoFrom', {
      topicId: topicId,
      sender: that.getGlobalID(),
      sdpOffer: sdpOfferParam
    }, function(error, response){
      if(error){
        console.error('Error on recvVideoFrom: ' + JSON.stringify(error));
      } else {
        that.processSdpAnswer(response.sdpAnswer);
      }
    });
  }

  function initWebRtcPeer(sdpOfferCallback){
    if(local){
      var options = {
        topicId: topicId,  // FPAR
        videoStream: wrStream,
        onicecandidate: participant.sendIceCandidate.bind(participant)
      };

      if(dataChannel){
        options.dataChannelConfig = {
          id: getChannelName(),
          onopen: onDataChannelOpen,
          onclose: onDataChannelClosed
        };
        options.dataChannels = true;
      }
      if(that.displayMyRemote()){
        wp = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(error){
          if(error){
            return console.error(error);
          }
          this.generateOffer(sdpOfferCallback.bind(that));
        });
      }else{
        wp = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error){
          if(error){
            return console.error(error);
          }
          this.generateOffer(sdpOfferCallback.bind(that));
        });
      }
    }else{
      var offerConstraints = {
        mandatory: {
          OfferToReceiveVideo: recvVideo,
          OfferToReceiveAudio: recvAudio
        }
      };
      console.log('Constraints of generate SDP offer (subscribing)', offerConstraints);
      var options = {
        onicecandidate: participant.sendIceCandidate.bind(participant),
        connectionConstraints: offerConstraints
      };
      // options.mediaConstraints = {
      //   audio: true,
      //   video: false
      // }
      wp = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error){
        if(error){
          return console.error(error);
        }
        this.generateOffer(sdpOfferCallback.bind(that));
      });
    }
    console.log('Waiting for SDP offer to be generated (' + (local ? 'local' : 'remote') + ' peer: ' + that.getGlobalID() + ')');
  }

  this.publish = function(){
    // TODO: FIXME
    initWebRtcPeer(that.publishVideoCallback)
  }

  this.subscribe = function(){
    // TODO: FIXME
    initWebRtcPeer(that.startVideoCallback);
  }

  this.processSdpAnswer = function(sdpAnswer){
    var answer = new RTCSessionDescription({
      type: 'answer',
      sdp: sdpAnswer
    });
    console.log(that.getGlobalID() + ': set peer connection with recvd SDP answer', sdpAnswer);
    var participantId = that.getGlobalID();
    var pc = wp.peerConnection;
    pc.setRemoteDescription(answer, function(){
      // AVOIDS to subscribe to your OWN stream remotely
      // except when showMyRemote is true
      if( !local || that.displayMyRemote()){
        wrStream = pc.getRemoteStreams()[0];
        console.log('Peer remote stream', wrStream);
        if(wrStream != undefined){
          speechEvent = kurentoUtils.WebRtcPeer.hark(wrStream, {threshold: that.room.thresholdSpeaker});
          speechEvent.on('speaking', function(){
            that.room.addParticipantSpeaking(participantId);
            that.room.emitEvent('stream-speaking', [{
              participantId: participantId
            }]);
          });
          speechEvent.on('stopped_speaking', function(){
            that.room.removeParticipantSpeaking(participantId);
            that.room.emitEvent('stream-stopped-speaking', [{
              participantId: participantId
            }]);
          });
        }
        // for (var i = 0; i < videoElements.length; i++){
        //   TODO: 显示 video
        // }
        that.room.emitEvent('stream-subscribed', [{
          stream: that
        }]);
      }

    }, function(error){
      console.error(that.getGlobalID() + ' : Error setting SDP to the peer connection: ' + JSON.stringify(error));
    });
  }

  this.unpublish = function(){
    if(wp){
      wp.dispose()
    }else{
      if(wrStream){
        wrStream.getAudioTracks().forEach(function(track){
          track.stop && track.stop()
        });
        wrStream.getVideoTracks().forEach(function(track){
          track.stop && track.stop()
        })
        speechEvent.stop();
      }
    }
    fpar.sendRequest("unpublishVideo", {}, function(error, response){
      if(error){
        console.error('Error on unpublishVideo: ' + JSON.stringify(error));
      }else{
        ee.emitEvent('stream-unpublished');
      }
    });
    console.log(that.getGlobalID() + ': Stream ' + id + ' unpublished');
  }

  this.dispose = function(){
    // TODO: THINK if need elements' dispose?

    if(wp){
      wp.dispose()
    }else{
       if(wrStream){
        wrStream.getAudioTracks().forEach(function(track){
          track.stop && track.stop()
        });
        wrStream.getVideoTracks().forEach(function(track){
          track.stop && track.stop()
        })
      }
    }
    console.log(that.getGlobalID() + ' : Stream ' + id + ' disposed');
  }


}

export default function FparRoom(wsUri, callback){
  if (!(this instanceof FparRoom)){
    return new FparRoom(wsUri, callback);
  }

  var that = this;
  var jsonRpcClient;
  var room;
  var ee = new EventEmitter();

  function initJsonRpcClient(){
    var config = {
      heartbeat: 3000,
      sendCloseMessage: false,
      ws: {
        uri: wsUri,
        useSockJS: false,
        onconnected: connectCallback,
        ondisconnect: disconnectCallback,
        onreconnecting: reconnectingCallback,
        onreconnected: reconnectedCallback
      },
      rpc: {
        requestTimeout: 15000,
        //notifications
        participantJoined: onParticipantJoined,
        participantPublished: onParticipantPublished,
        participantUnpublished: onParticipantUnpublished,
        participantLeft: onParticipantLeft,
        participantEvicted: onParticipantEvicted,
        sendMessage: onNewMessage,
        iceCandidate: iceCandidateEvent,
        mediaError: onMediaError
      }
    };
    jsonRpcClient = new RpcBuilder.clients.JsonRpcClient(config);
  }

  function connectCallback(error){
    if (error){
      callback(error);
      ee.emitEvent('connect-failed', [{error: error}]);
    }else{
      callback(null, that);
      ee.emitEvent('connect-success', [that]);
    }
  }

  function isRoomAvailable(){
    if(room !== undefined && room instanceof Room){
      return true;
    }else {
      console.warn('Room instance not found');
      return false;
    }
  }

  function disconnectCallback(){
    console.log('Websocket connection lost');
    if(isRoomAvailable()) {
      room.onLostConnection();
    }else{
      console.error('Connection error. Please reload page');
    }
  }

  function reconnectingCallback(){
    console.log('reconnectingCallback');
    if(isRoomAvailable()){
      room.onLostConnection();
    }else{
      console.error('Connection error. Please reload page');
    }
  }

  function reconnectedCallback() {
    console.log(' reconnectedCallback');
    callback(null, that);
    ee.emitEvent('connect-success', [that]);
  }

  function onNewMessage(params){
    console.log(params);
    room.onNewMessage(params);
  }

  function onParticipantJoined(params){
    console.log('onParticipantJoined:' + JSON.stringify(params));
    if(isRoomAvailable()){
      room.onParticipantJoined(params);
    }
  }

  function onParticipantPublished(params){
    console.log('onParticipantPublished:' + JSON.stringify(params));
    if(isRoomAvailable()){
      room.onParticipantPublished(params);
    }
  }

  function onParticipantUnpublished(params){
    if(isRoomAvailable()){
      room.onParticipantUnpublished(params);
    }
  }

  function onParticipantLeft(params){
    console.log(params);
    if(isRoomAvailable()){
      room.onParticipantLeft(params);
    }
  }

  function onParticipantEvicted(params){
    console.log(params);
    if(isRoomAvailable()){
      room.onParticipantEvicted(params);
    }
  }

  function iceCandidateEvent(params){
    if(isRoomAvailable()){
      room.recvIceCandidate(params);
    }
  }

  function onRoomClosed(params){
    if(isRoomAvailable()){
      room.onRoomClosed(params);
    }
  }

  function onMediaError(params){
    if(isRoomAvailable()){
      room.onMediaError(params);
    }
  }


  var rpcParams;

  this.setRpcParams = function (params) {
    rpcParams = params;
  }
  this.sendRequest = function (method, params, callback) {
    if (params && params instanceof Function) {
      callback = params;
      params = undefined;
    }
    params = params || {};

    if (rpcParams && rpcParams !== "null" && rpcParams !== "undefined") {
      for(var index in rpcParams) {
        if (rpcParams.hasOwnProperty(index)) {
          params[index] = rpcParams[index];
          console.log('RPC param added to request {' + index + ': ' + rpcParams[index] + '}');
        }
      }
    }
    console.log('Sending request: { method:"' + method + '", params: ' + JSON.stringify(params) + ' }');
    try{
      jsonRpcClient.send(method, params, callback);
    }catch(e){
      console.error(e);
    }
  };

  this.sendMessage = function(message){
    this.sendRequest('sendMessage',
      {
        message: message
      },
      function(error, response){
        if(error){
          console.error(error);
        }

      }
    );
  }
  this.sendCustomRequest = function(params, callback){
    this.sendRequest('customRequest', params, callback);
  }
  this.sendCovertFile = function(params, callback){
    this.sendRequest('convertFile', params, callback);
  }

  this.close = function(forced){
    if(isRoomAvailable()){
      room.leave(forced, jsonRpcClient);
    }
  }

  this.disconnectParticipant = function(stream){
    if(isRoomAvailable()){
      room.disconnect(stream);
    }
  }

  this.Stream = function(room, options){
    options.participant = room.getLocalParticipant();
    return new Stream(that, true, room, options);
  }

  this.Room = function(options){
    room = new Room(that, options);
    return room;
  }

  this.connect = function(){
    initJsonRpcClient();
  }

  this.addEventListener = function(eventName, listener){
    ee.addListener(eventName, listener);
  }

  this.receiveVideos = function(users){
    if(isRoomAvailable()){
      room.receiveVideos(users);
    }
  }

  this.connectRoom = function(){
    if(isRoomAvailable()){
      room.connect();
    }
  }

  initJsonRpcClient();
}
