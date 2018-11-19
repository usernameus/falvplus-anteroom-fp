import Singleton from '../utils/kurento/singleton'

export default {
  namespace: 'holdroom',
  state: {
    channels: [],
    allChannels: [],
    AddChannelModal:false,
    showInviteModal:false,
    loadingChannel: true
  },
  reducers: {
    loadingChannel(state, action){
      return {
        ...state,
        loadingChannel: action.payload
      }
    },
    showAddChannelModal(state,action){
      return{
        ...state,
        AddChannelModal:true
      }
    },
    hideAddChannelModal(state,action){
      return{
        ...state,
        AddChannelModal:false
      }
    },
    showInviteUsersModal(state,action){
      return{
        ...state,
        showInviteModal:true
      }
    },
    hideInviteUsersModal(state,action){
      return{
        ...state,
        showInviteModal:false
      }
    },
    channelsResult(state, action){
      return {
        ...state,
        ...action.payload,
        lawyerName: action.payload.holderName
      }
    },
    allChannelsResult(state, action){
      return {
        ...state,
        ...action.payload,
        lawyerName: action.payload.holderName
      }
    },
    roomconnected(state, action){
      if(state.channels.length == 0){
        const fpar = Singleton.getInstance({});
        const msg = {
          type: 'getchannels'
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
    devices(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {

  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(/\/anteroom(#\d+)*$/.test(location.pathname.parsePath())){
          if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
            console.log('enumerateDevices() not supported.');
            return;
          }

          navigator.mediaDevices.enumerateDevices()
            .then(function(devices){
              dispatch({
                type: 'devices',
                payload: {
                  devices: devices
                }
              })
            })
          // .catch(function(err){
          //   console.error(err.name + ' : ' + err.message);
          //   return;
          // })
        }
        if(location.pathname.parsePath().startWith('/anteroom/')){
          const href = window.location.href;
          const markIndex = href.lastIndexOf('/');
          const queryIndex = href.indexOf('?');
          window.location.href = href.slice(0, markIndex) + '#' + href.slice(markIndex + 1,queryIndex);

        }
      })
    }
  },
};
