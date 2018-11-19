import {parse} from 'qs';
import ownerFromUrl from '../utils/owner';
import Singleton from '../utils/kurento/singleton';
import {Modal} from 'antd';
import {ownerSettings, consultService,querynews,showNews} from '../services/fhome'
const Cookie = require('js-cookie');

export default {
  namespace: 'fhome',
  state: {
    headerType:'noimg',
    hasfooter: true,
    msglist: [],
    menuImg:[],
    menuVisible: false,
    HeaderProps:{
    },
    newsNo:{
      redDotNumber:'',conRedDotNumber:'',channelNumber:''
    },
    headerData:{
      Saying:'纵有疾风起,人生不言弃',
      copyright:'©2016-2017 falvplus.com all rights reserved济南法仆网络科技有限公司鲁ICP备16009720号-1',
      logoSrc: 'https://www.falvplus.com/img/bluelogo.png',
      headerTitleText:'律师专属会客室',
    },
    roomConnected: false
  },
  reducers: {
    querySuccess (state, action) {
      const {Header_Data}=action.payload;
      let headerType = 'noimg';
      let headerImg = '';
      let headerContent='';
      let headerTitle='';
      let headerNav='';
      let Saying='';
      let phone_headerImg='';
      if(location.pathname == '/'){
        headerType = 'index';
        // headerContent ='为避免庭上仓促行事，出现纰漏与疏忽，我们详细掌握事实写好文案'
        // headerTitle='庭上十分钟，庭下十年功'
      }else if(location.pathname.startWith('/userDetails')){
        headerType = 'thirdheader';
        headerImg = Header_Data.userDetails_headerImg?Header_Data.userDetails_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.userDetails_headerContent?Header_Data.userDetails_headerContent:''
        phone_headerImg = Header_Data.phone_userDetails_headerImg?Header_Data.phone_userDetails_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerTitle=Header_Data.userDetails_headerTitle?Header_Data.userDetails_headerTitle:''
      }else if(location.pathname.startWith('/profile')){
        headerType = 'secondheader';
        headerImg =Header_Data.profile_headerImg?Header_Data.profile_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg =Header_Data.phone_profile_headerImg?Header_Data.phone_profile_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.profile_headerContent?Header_Data.profile_headerContent:''
        headerTitle=Header_Data.profile_headerTitle?Header_Data.profile_headerTitle:''
      }else if(location.pathname.startWith('/products')){
        headerType = 'secondheader';
        headerImg = Header_Data.products_headerImg?Header_Data.products_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_products_headerImg?Header_Data.phone_products_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.products_headerContent?Header_Data.products_headerContent:''
        headerTitle=Header_Data.products_headerTitle?Header_Data.products_headerContent:''
      }else if(location.pathname.startWith('/lawyerList')){
        headerType = 'secondheader';
        headerImg = Header_Data.lawyerList_headerImg?Header_Data.lawyerList_headerImg:'//theme.lj110.com/default/index/lvshiliebiao.jpg';
        phone_headerImg = Header_Data.phone_lawyerList_headerImg?Header_Data.phone_lawyerList_headerImg:'//theme.lj110.com/default/index/lvshiliebiao.jpg';
        headerContent =Header_Data.lawyerList_headerContent?Header_Data.lawyerList_headerContent:''
        headerTitle=Header_Data.lawyerList_headerTitle?Header_Data.lawyerList_headerContent:''
      }else if(location.pathname.startWith('/businessAreas')){
        headerType = 'secondheader';
        headerImg = Header_Data.businessAreas_headerImg?Header_Data.businessAreas_headerImg:'//theme.lj110.com/default/index/yewulingyu2.jpg';
        phone_headerImg = Header_Data.phone_businessAreas_headerImg?Header_Data.phone_businessAreas_headerImg:'//theme.lj110.com/default/index/yewulingyu2.jpg';
        headerContent =Header_Data.businessAreas_headerContent?Header_Data.businessAreas_headerContent:''
        headerTitle=Header_Data.businessAreas_headerTitle?Header_Data.businessAreas_headerContent:''
      }else if(location.pathname.startWith('/cases')){
        headerType = 'secondheader';
        headerImg = Header_Data.cases_headerImg?Header_Data.cases_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_cases_headerImg?Header_Data.phone_cases_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.cases_headerContent?Header_Data.cases_headerContent:''
        headerTitle=Header_Data.cases_headerTitle?Header_Data.cases_headerTitle:''
      }else if(location.pathname.startWith('/articles')) {
        headerType = 'secondheader';
        headerImg = Header_Data.articles_headerImg?Header_Data.articles_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_articles_headerImg?Header_Data.phone_articles_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.articles_header_Content?Header_Data.articles_header_Content:''
        headerTitle=Header_Data.articles_headerTitle?Header_Data.articles_headerTitle:''
      }else if(location.pathname.startWith('/activities')){
        headerType = 'secondheader';
        headerImg = Header_Data.activities_headerImg?Header_Data.activities_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_activities_headerImg?Header_Data.phone_activities_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.activities_headerContent?Header_Data.activities_headerContent:''
        headerTitle=Header_Data.activities_headerTitle?Header_Data.activities_headerTitle:''
      }else if(location.pathname.startWith('/article/')){
        headerType = 'thirdheader';
        headerImg = Header_Data.article_headerImg?Header_Data.article_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_articles_headerImg?Header_Data.phone_articles_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.article_headerContent?Header_Data.article_headerContent:''
        headerTitle=Header_Data.article_headerTitle?Header_Data.article_headerTitle:''
      } else if(location.pathname.startWith('/case/')){
        headerType = 'thirdheader';
        headerImg = Header_Data.case_headerImg?Header_Data.case_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_cases_headerImg?Header_Data.phone_cases_headerImg:'//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent =Header_Data.case_headerContent?Header_Data.case_headerContent:''
        headerTitle=Header_Data.case_headerTitle?Header_Data.case_headerTitle:''
      }else if(location.pathname.startWith('/activity/')) {
        headerType = 'thirdheader';
        headerImg = Header_Data.activity_headerImg ? Header_Data.activity_headerImg : '//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        phone_headerImg = Header_Data.phone_activities_headerImg ? Header_Data.phone_activities_headerImg : '//theme.lj110.com/default/Lawyerprofile/LawyerProfileBanners.jpg';
        headerContent = Header_Data.activity_headerContent ? Header_Data.activity_headerContent : ''
        headerTitle = Header_Data.activity_headerTitle ? Header_Data.activity_headerTitle : ''
      }else if(location.pathname.startWith('/lawyerDetails/')) {
        headerType = 'lawyerDetails';
        headerImg = Header_Data&&Header_Data.lawyerDetails_headerImg ? Header_Data.lawyerDetails_headerImg : '//theme.lj110.com/default/index/lvshiliebiao.jpg';
        phone_headerImg = '//theme.lj110.com/default/index/lvshiliebiao.jpg';
      }else if(location.pathname.startWith('/addArticle')) {
        headerType = '';
        headerNav='服务'
      }
      const HeaderProps = {
        headerType: headerType,
        headerImg: headerImg,
        phone_headerImg: phone_headerImg,
        headerTitle:headerTitle,
        headerContent:headerContent,
        headerNav:headerNav,
      }
      const headerData={
        menuImgList:Header_Data&&Header_Data.menuImgList?eval('('+Header_Data.menuImgList+')'):[
          {Href:'/profile',styleId:'profile'},
          {Href:'/products',styleId:'serviceitems'},
          {Href:'/cases',styleId:'cases'},
          {Href:'/articles',styleId:'articles'},
        ],
        menuList:Header_Data&&Header_Data.menuList?eval('('+Header_Data.menuList+')'):[
          {Name:'首页',MName:'首页',Href:'/',Key:'home',EName:'HOME PAGE'},
          {Name:'简介',MName:'律师简介',Href:'/profile',Key:'profile',EName:'PROFILE'},
          {Name:'服务',MName:'服务项目',Href:'/products',Key:'products',EName:'SERVICES'},
          {Name:'案例',MName:'精彩案例',Href:'/cases',Key:'cases',EName:'SUCCESS CASES'},
          {Name:'文集',MName:'我的文集',Href:'/articles',Key:'articles',EName:'ARTICLES'},
          {Name:'活动',MName:'我的活动',Href:'/activities',Key:'activities',EName:'ACTIVITIES'},
        ],
        AllTitle:Header_Data&&Header_Data.AllTitle?eval('('+Header_Data.AllTitle+')'):{
          articleTitle: {Name:'我的文集',EName:'My collected works'},
          activityTitle:{Name:'活动记录',EName:'Activity record'},
          caseTitle:{Name:'精彩案例',EName:'Wonderful case'},
          productTitle:{Name:'服务项目',EName:'Service item'},
          lawyerListTitle:{Name:'专业团队',EName:'Professional team'},
          businessTitle:{Name:'专业领域',EName:'Business domain'}
        },
        index_header:Header_Data&&Header_Data.home_page?Header_Data.home_page:[
          {"settings":{"baners":"//theme.lj110.com//default/index/banner1.jpg","headerTitle":"","headerContent":""}},
          {"settings":{"baners":"//theme.lj110.com//default/index/banner2.jpg","headerTitle":"","headerContent":""}},
          {"settings":{"baners":"//theme.lj110.com//default/index/pbanner.jpg","headerTitle":null,"headerContent":null}}
        ],
        Mindex_center_headerImg:Header_Data&&Header_Data.Mindex_center_headerImg?Header_Data.Mindex_center_headerImg:null,
        index_center_headerImg:Header_Data&&Header_Data.index_center_headerImg?Header_Data.index_center_headerImg:null,
        copyright:Header_Data&&Header_Data.copyright?Header_Data.copyright:'©2016-2017 falvplus.com all rights reserved济南法仆网络科技有限公司鲁ICP备16009720号-1',
        logoSrc: Header_Data&&Header_Data.lawyer_logo?Header_Data.lawyer_logo:'https://www.falvplus.com/img/bluelogo.png',
        Logo_titleText:Header_Data&&Header_Data.Logo_titleText?Header_Data.Logo_titleText:'律师专属会客室',
        headerTitleText:Header_Data&&Header_Data.headerTitleText?Header_Data.headerTitleText:'律师专属会客室',
        webTypes:Header_Data&&Header_Data.webType?Header_Data.webType:0,
        hideData:Header_Data&&Header_Data.hideData?Header_Data.hideData:'all',
      }
      return {
        ...state,
        HeaderProps,
        headerData
      }
    },
    headerType(state,action){
      return {
        ...state,
        ...action.payload
      }
    },
    toggleVerticalMenu(state, action){
      return {
        ...state,
        menuVisible: !state.menuVisible
      }
    },
    nofooter(state,action){
      return {
        ...state,
        hasfooter: false
      }
    },
    fetchSuccess(state, action){
      return {
        ...state,
        ...action.payload
      }
    },
    fparRoom(state, action){
      return {
        ...state,
        fpar: action.payload
      }
    },
    roomConnectedState(state, action){
      return {
        ...state,
        roomConnected: true
      }
    },
    lostConnection(state, action){
      return {
        ...state,
        roomConnected: false
      }
    },
    enterRoomSuccess(state,　action){
      return　{
        ...state,
        ...action.payload
      }
    },
    userChannels(state, action){
      return {
        ...state
      }
    },
    showError(state, action){
      return {
        ...state,
        hasError: true,
        ...action.payload
      }
    },
    //新消息提醒
    querynewsSuccess (state, action) {
      const {list,types,pagination,newsNo} = action.payload
      return {
        ...state,
        list,
        newsNo,
        pagination,
        types:types,
        loading: false,
      }
    },
    loadmore(state, action){
      const {list, pagination} = action.payload
      state.list.data = state.list.data.concat(list.data)
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    },
  },
  effects: {
    //新消息提醒
    *queryNews({payload}, {call,put}){
      const data = yield call(querynews, parse(payload));
      if(data){
        yield put({
          type: 'querynewsSuccess',
          payload: {
            list: data,
            newsNo:data.flaMsg,
            pagination:data.page,
            types:payload.types
          }
        })
      }
    },
    *ShowNews({payload}, {call,put}){
      const data = yield call(showNews, parse(payload));
      if(data&&data.success){
        window.location.href=payload.hrefdata
      }
    },
    *queryMore({payload}, {call, put}){
      const data = yield call(querynews,parse(payload));
      if(data){
        yield put({
          type: 'loadmore',
          payload:{
            url:data.url,
            list: data,
            pagination: data.page
          }
        })
      }
    },
    *queryHeaderData({payload}, {call, put} ){
      yield put({ type: 'showLoading' })
      const data = yield call(ownerSettings, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            Header_Data:data
          }
        })
      }
    },
    *consult({payload}, {call, put}){
      try{
        const data = yield call(consultService, payload);
        if(data){
          location.href = '/anteroom#' + data.channelId;
        }
      }catch(err){
        Modal.info({
          title: '不能咨询自己'
        });
      }
    },
    *roomConnected({payload}, {call, put}){
      yield put({
        type: 'roomConnectedState'
      })
      yield put({
        type: 'holdroom/roomconnected'
      })
      yield put({
        type: 'channelinfo/roomConnected'
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      const owner = ownerFromUrl();
      if(owner == ""){
        return;
      }

      history.listen(location => {
        dispatch({
          type: 'queryHeaderData',
        })
        if(location.pathname.parsePath().startWith('/anteroom')){
          const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
          if (!(userAgent.indexOf("Firefox") > -1) && !(userAgent.indexOf("Chrome") > -1) && (!userAgent.match(/AppleWebKit.*Mobile.*/)||!userAgent.match(/AppleWebKit/))) {
            window.location.href = '/tip';
          }
        }
        if(!location.pathname.startWith('/admin')){
          if(Cookie.get('token') != undefined && new Date(Cookie.get('expires')) >= new Date()){
            //新消息提醒
            dispatch({
              type: 'queryNews',
              payload:{
                types:Cookie.get('r')==9?1:1,
                pageNo:1,
                pageSize:5
              }
            })
            dispatch({
              type: 'login/loginSuccess',
              payload:{
                user:{
                  name: Cookie.get('user_name'),
                  r: Cookie.get('r')
                }
              }
            });
            let joinroomFlag = false;
            // if(location.pathname.parsePath().startWith('/anteroom') || location.pathname.parsePath().startWith('/orderflow/evaluate/')){
            if(location.pathname.parsePath().startWith('/anteroom')){
              joinroomFlag = true;
            }
              const options = {
              joinroom: joinroomFlag,
              onRoomConnected: function(){
                dispatch({
                  type: 'roomConnected'
                })
              },
              enterRoomSuccess:function(room){
                dispatch({
                  type:'enterRoomSuccess',
                  payload:　room
                });
              },
              onRoomError: function(){
                dispatch({
                  type: 'lostConnection'
                })
              },
              onLostConnection: function(){
                dispatch({
                  type: 'lostConnection'
                })
              },
              participantJoined: function(participant){
                dispatch({
                  type: 'channelinfo/participantJoined',
                  payload: participant
                })
              },
              participantLeft: function(participant){
              },
              onlineUsers:function(users){
                dispatch({
                  type: 'channelinfo/onlineusers',
                  payload: users
                })
              },
              onChannels: function(channelsResult){
                dispatch({
                  type: 'holdroom/channelsResult',
                  payload: {
                    selfUserId: channelsResult.userId,
                    userName: channelsResult.userName,
                    holderId: channelsResult.holderId,
                    holderName: channelsResult.holderName,
                    channels: channelsResult.channels,
                    delChannelId:channelsResult.delChannelId
                  }
                })

                if(channelsResult.channelNewMsg){
                  dispatch({
                    type: 'channelinfo/newMessage',
                    payload: {
                      ...channelsResult.channelNewMsg
                    }
                  })
                }

              },
              onAllChannels: function(channelsResult){
                let topChannels = channelsResult.allChannels.filter(c=>c.parentId == 0);
                let treeChannels = topChannels.map(c=>{
                  if(c.hasChildren){
                    c['children'] = channelsResult.allChannels.filter(s=>s.parentId == c.channelId);
                  }
                  return c;
                });
                let d=channelsResult.allChannels.filter(c=>c.parentId > 0).map(c=>channelsResult.allChannels.filter(cc=>cc.channelId == c.parentId).length ? null : c)
                let bottomChannels=d.filter(s=>s!=null);
                dispatch({
                  type: 'holdroom/allChannelsResult',
                  payload: {
                    selfUserId: channelsResult.userId,
                    userName: channelsResult.userName,
                    holderId: channelsResult.holderId,
                    holderName: channelsResult.holderName,
                    allChannels: treeChannels.concat(bottomChannels)
                  }
                })

              },
              recvNewMessage:function(msg){
                dispatch({
                  type: 'channelinfo/recvmsg',
                  payload: msg
                });
                if(msg.user != Cookie.get('userId')){
                  dispatch({
                    type: 'channelinfo/newMessage',
                    payload: {
                      ...msg
                    }
                  })
                }

              },
              recvNewFile: function(fileInfo){
                dispatch({
                  type: 'channelinfo/fileuploaded',
                  payload: fileInfo
                });
              },
              streamSubscribed: function(stream){
                dispatch({
                  type: 'channelinfo/streamSubscribed',
                  payload: stream
                });
              },
              streamAdded: function(stream){
                dispatch({
                  type: 'channelinfo/streamAdded',
                  payload: stream
                });
              },
              streamRemoved: function(stream){
                dispatch({
                  type: 'channelinfo/streamRemoved',
                  payload: stream
                });
              },
              streamSpeaking: function(participant){
                dispatch({
                  type: 'channelinfo/streamSpeaking',
                  payload: participant
                })
              },
              streamStoppedSpeaking: function(participant){
                dispatch({
                  type: 'channelinfo/streamStoppedSpeaking',
                  payload: participant
                })
              },
              onShareFile: function(shareInfo){
                dispatch({
                  type: 'channelinfo/shareFile',
                  payload: shareInfo
                });
                dispatch({
                  type: 'channelinfo/openCanvasPage',
                  payload: shareInfo
                })
              },
              onUnshareFile: function(channelId){
                dispatch({
                  type: 'channelinfo/unshareFile',
                  payload: channelId
                })
              },
              openCanvasPage: function(pageInfo){
                dispatch({
                  type: 'channelinfo/openCanvasPage',
                  payload: pageInfo
                });
              },
              remoteDrawingShape: function(shapeInfo){
                dispatch({
                  type: 'channelinfo/remoteDrawingShape',
                  payload: shapeInfo
                });
              },
              remoteRemoveShape: function(shapeInfo){
                dispatch({
                  type: 'channelinfo/remoteRemoveShape',
                  payload: shapeInfo
                })
              },
              onQuotePrice: function(msg){
                dispatch({
                  type: 'channelinfo/onQuotePrice',
                  payload: {
                    orderId: msg.orderId,
                    quotePrice: msg.quotePrice,
                    userId: msg.userId,
                    channelId: msg.channelId,
                    orders: msg.orders
                  }
                })
              },
              onOrderPaid: function(msg){
                dispatch({
                  type: 'channelinfo/onOrderPaid',
                  payload: {
                    orderId: msg.orderId,
                    userId: msg.userId,
                    channelId: msg.channelId,
                    paidAmount: msg.paidAmount,
                    orders: msg.orders
                  }
                })

              },
              onCompleteRequest: function(msg){
                dispatch({
                  type: 'channelinfo/onCompleteRequest',
                  payload:{
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onCompleteOrder: function(msg){
                dispatch({
                  type: 'channelinfo/onCompleteOrder',
                  payload: {
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onRefuseCompleteOrder: function(msg){
                dispatch({
                  type: 'channelinfo/onRefuseCompleteOrder',
                  payload:{
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onCancelOrder: function(msg){
                dispatch({
                  type: 'channelinfo/onCancelOrder',
                  payload:{
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onRefundOrder: function(msg){
                dispatch({
                  type: 'channelinfo/onRefundOrder',
                  payload:{
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onRateOrder: function(msg){
                dispatch({
                  type: 'channelinfo/onRateOrder',
                  payload: {
                    channelId: msg.channelId,
                    orderId: msg.orderId,
                    orders: msg.orders
                  }
                })
              },
              onVideoChanged: function(msg){
                dispatch({
                  type: 'channelinfo/onVideoChanged',
                  payload: {
                    userId: msg.userId,
                    channelId: msg.channelId,
                    videoEnabled: msg.videoEnabled
                  }
                })
              },
              onChannelTimer: function(msg){
                dispatch({
                  type: 'channelinfo/onChannelTimer',
                  payload: {
                    channelId: msg.channelId,
                    channelTimer: msg.channelTimer
                  }
                })
              }
            }
            const fpar = Singleton.getInstance(options);
            dispatch({
              type: 'fparRoom',
              payload: fpar
            });
          }
        }
      });
    }
  }
}
