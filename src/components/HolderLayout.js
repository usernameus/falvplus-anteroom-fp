import React,{Component} from 'react';
import {Layout, Menu,Popover, Modal, Button,Spin,Card, Row, Col,Tooltip,Collapse,Tabs,Icon,notification} from 'antd';
import ChannelList from './anteroom/ChannelList';
import ChatHome from './anteroom/ChatHome';
import MsgList from './anteroom/Msglist';
import Sender from './anteroom/Sender';
import ChannelInfoForm from './anteroom/ChannelInfoForm';
import Userlist from './anteroom/Userlist';
import OrderSteps from './anteroom/OrderSteps';
import Files from './anteroom/Files';
import TabPages from './anteroom/TabPages';
import PayMethods from './ui/PayMethods'
import {apisource,filetypeview} from '../utils/config';
const {Header, Content} = Layout;
const Cookie = require('js-cookie');
import {ContextMenu,MenuItem,connectMenu} from 'react-contextmenu';
import styles from './skin.less'
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const DynamicMenu = (props) =>{
  const {id, trigger} = props;
  const handleItemClick = trigger ? trigger.onItemClick : null;
  const OrderStatus=trigger&&trigger.Orders.length>0?trigger.Orders[0].orderStatus:null;
  return (
         <ContextMenu id={id} style={{zIndex: 2500,width:200, lineHeight:'1.3em', border:'solid 1px #CCCCCC'}}>
          <MenuItem onClick={handleItemClick} data={{action:'changeChannelName'}}>更改名称</MenuItem>
          <MenuItem onClick={handleItemClick} data={{action: 'hideChannel'}}>隐藏频道</MenuItem>
           {(OrderStatus==0||OrderStatus==null)&&Cookie.get('r') == 9?
           <MenuItem onClick={handleItemClick} data={{action: 'delChannel'}}>删除频道</MenuItem>:''}
           {trigger && trigger.channelState == '1' ?
             <MenuItem onClick={handleItemClick} data={{action: "cancelTopChannel"}}>取消置顶</MenuItem>
             :<MenuItem onClick={handleItemClick} data={{action: "setTopChannel"}}>置顶频道</MenuItem>
           }
        </ContextMenu>
  );

}

const ConnectMenu = connectMenu('channelContextMenu')(DynamicMenu);


class HolderLayout extends Component {

  constructor(props){
    super(props);
    this.state = {
      menuVisible: false,
      loadingChannel: this.props.loadingChannel || false,
      gettingChannelInfo: false,
      changeChannelVisible:false,
      channelId: '',
      channelName: '',
      PayTypeVisible: false,
      orderAmountY:'',
      connectChanged: false
    }
  }

  handleMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible
    })
  }
  //支付方式Modal
  onPayType = (value)=>{
    this.setState({
      orderAmountY:value,
    })
    this.props.onPayType();
  }
  hidePayModal= ()=>{
    this.props.hidePayModal()
  }

  componentWillUpdate = (nextProps) => {
    if(nextProps.roomConnected && !this.props.roomConnected){
      this.setState({
        connectChanged: true
      })
    }
  }

  componentDidUpdate = () => {
    const channelId = location.hash.slice(1);
    if(!this.props.channelInfo || this.props.channelInfo.channelId != channelId){
      if(this.props.roomConnected && this.state.connectChanged && !this.state.gettingChannelInfo){
        this.props.changeChannel(channelId);
        this.setState({
          gettingChannelInfo: true
        })
      }
    }
    if(this.state.connectChanged){
      this.setState({
        connectChanged: false
      })
    }
  }
  //消息列表顶部订单
  onchangeChannel=(channelId)=>{
    this.hideFloatPanel()
    this.props.changeChannel(channelId)
  }
  orderListDetailsVisible = () =>{
  const orderListPanel = document.querySelector('.orderListDetails');
  const floatPanel = document.querySelector('#orderDetailsPanel');
  if(floatPanel){
    this.showFloatPanel(floatPanel,orderListPanel.firstChild);
  }
}
  showFloatPanel = (panel, node) => {
  this.hideFloatPanel();
  if(node == null) return;
  const backLayer = document.querySelector('#floatPanelBacks');
  backLayer.style['display'] = 'block';
  panel.style['display'] = 'block';
  const panelBody = panel.querySelector('.ant-card-body');
  if(!panelBody.firstChild){
    panelBody.appendChild(node);
  }
}

  hideFloatPanel = () => {
  const backLayer = document.querySelector('#floatPanelBacks');
  backLayer.style['display'] = 'none';
  const toolPanels = document.querySelectorAll('.toolPanels');
  for(var i = 0; toolPanels && i < toolPanels.length; i++){
    const item = toolPanels[i];
    if(item.style['display'] != 'none'){
      item.style['display'] = 'none';
    }
    if(item.id == 'orderDetailsPanel'){
      const panelBody = item.querySelector('.ant-card-body');
      if(panelBody.firstChild){
        document.querySelector('.orderListDetails').appendChild(panelBody.firstChild);
      }
    }
  }
}
  render(){
    const {
      PayTypeVisible,
      errMsg,
      Balance,
      lawyerName,
      roomConnected,
      channels,
      delChannelId,
      allChannels,
      channelInfo,
      changeChannel,
      roomHome,
      analysis,
      shareFile,
      unshareFile,
      toggleVideo,
      changeTab,
      onQuotePrice,
      onInviteUsers,
      showInviteUsers,
      hideInviteUsers,
      showInviteModal,
      onRemoveConfirm,
      openCanvasPage,
      hidechannel,
      delchannel,
      settopchannel,
      canceltopchannel
      } = this.props;
    const channelId = this.props.channelInfo ? this.props.channelInfo.channelId : null;
    const users = this.props.channelInfo ? this.props.channelInfo.users : [];
    const filelist = this.props.channelInfo ? this.props.channelInfo.filelist : [];
    const msglist = this.props.channelInfo ? this.props.channelInfo.msglist : [];
    const selfUserId = Cookie.get('userId'); //this.props.channelInfo ? this.props.channelInfo.selfUserId　:'';
    const orders = this.props.channelInfo ? this.props.channelInfo.orders : [];
    const lastOrder = orders ? orders[orders.length - 1] : null;
    const fpar = this.props.fpar;
    const sharingfile = this.props.channelInfo ? this.props.channelInfo.sharingfile : false;
    const isStreaming = channelInfo.localStream != null && channelInfo.localStream.getWrStream().active;
    const selfUserInfo = users.filter(({userId})=> userId == selfUserId);


    const currentChannelName = selfUserInfo && selfUserInfo.length > 0 ? selfUserInfo[0].channelNickName : '';
    //判断频道是否删除
    // const newchannelId = Number(location.hash.slice(1));
    // if(channelId!=newchannelId&&channels.length>0){
    //   changeChannel()
    // }
    const handleContextMenu = (e, data,target) => {
      if(data.action == 'changeChannelName'){
        this.setState({
          changeChannelVisible: true,
          channelId: data.channelId,
          channelName: data.channelName
        })
      }else if(data.action == 'hideChannel'){
        onHideChannel(data.channelId);
      }else if(data.action == 'setTopChannel'){
        settopchannel(data.channelId);
      }else if(data.action == 'cancelTopChannel'){
        canceltopchannel(data.channelId)
      }else if(data.action == 'delChannel'){
        onDelChannel(data)
      }
    }
    const PayMethod =(value)=>{
      if(value||value){
        this.props.balancePay(value);
      }else{
        this.props.handlePay();
      }
    }
    const channelsProps = {
      delChannelId:delChannelId,
      selfUserId: selfUserId,
      isStreaming: isStreaming,
      channelId: channelId,
      lastOrder:lastOrder,
      channels: channels,
      bodyHeight: channelListHeight,
      handleContextMenu,
      onchangeChannel:this.onchangeChannel
    };

    const downloadFile = (fileId) => {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.src = apisource + '/download?fileId=' + fileId;
    }

    const openFilePage = (fileType, fileId, page) => {
      if(fileType.toLowerCase().in_array(filetypeview)){
        openFilePageReq(fileId, page, sharingfile);
      }else{
        downloadFile(fileId);
      }
    }


    const chatProps = {
      selfUserId: selfUserId,
      users: users,
      orders: orders,
      lastOrder:lastOrder,
      msglist: msglist,
      openFilePage
    };


    const changeFilesUpload = (channelId,files) => {
      const msg = {
        type: 'uploadingfile',
        channelId: channelId,
        file: files
      }
      fpar && fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
      });
    }
    const sendMessage = (msg) => {
      this.props.fpar && this.props.fpar.sendMessage(msg);
    }
    const senderProps = {
      channelId: channelId,
      sendMsg(msg){
        sendMessage(msg);
      },
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
      }
    }
    const filesProps = {
      channelId: channelId,
      hideUpload: lastOrder && lastOrder.orderStatus > 2 ? true : false,
      fileList: filelist ,
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

    function openFilePageReq(fileId, page,sharingfile){
      const msg = {
        type: 'openFilePage',
        channelId: channelId,
        fileId: fileId,
        sharingfile: sharingfile,
        page: page
      };
      fpar && fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
        if(rsp.error){
          Modal.warn({
            title: rsp.msg,
            content: ''
          });
        }else{
          openCanvasPage({
            fileId: rsp.fileId,
            fileName: rsp.fileName,
            channelFileId: rsp.channelFileId,
            pageNo: rsp.pageNo,
            pageCount: rsp.pageCount,
            drawnShapes: rsp.drawnShapes,
            pageImage: rsp.pageImage,
            users: rsp.users
          });
        }
      })
    }

    const completeRequest = () => {
      const msg = {
        type: 'completeRequest',
        channelId: channelId,
        orderId: lastOrder.orderId
      }
      fpar && fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
      })
    }

    const completeOrder = () => {
      Modal.confirm({
        title: '确认结案',
        content: '',
        onOk(){
          const msg = {
            type: 'completeOrder',
            channelId: channelId,
            orderId: lastOrder.orderId
          }
          fpar && fpar.sendCustomRequest(msg, function(error, rsp){
            if(error){
              console.error(error);
              return;
            }
          })

        },
        onCancel(){

        }
      })
    }

    const refuseCompleteOrder = () => {
      const msg = {
        type: 'refuseCompleteOrder',
        channelId: channelId,
        orderId: lastOrder.orderId
      }
      fpar && fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }
      })
    }
    const initRate = lastOrder ? (lastOrder.rate || 0) : 0;
    const onRateOrder = (rate, rateComment) => {
      const msg = {
        type: 'rateOrder',
        channelId: channelId,
        orderId: lastOrder.orderId,
        rate: rate,
        comment: rateComment
      }
      fpar && fpar.sendCustomRequest(msg, function(error, rsp){
        if(error){
          console.error(error);
          return;
        }

      });
    }
    const usersProps = {
      showInviteModal,
      canAdd: true, // this.props.channelInfo && this.props.channelInfo.channelType != 0 ? true : false,
      userlist: this.props.channelInfo ? this.props.channelInfo.users : [],
      onInviteUsers(values){
        onInviteUsers(values)
      },
      showInviteUsers(){
        showInviteUsers()
      },
      onRemoveConfirm(values){
        onRemoveConfirm(values);
      },
    };

    const channelInfoModalProps = {
      modify: true,
      modal: true,
      userId: selfUserId,
      channelId: this.state.channelId,
      channelName: this.state.channelName,
      onSaveChannelName: (userId, channelId, channelName) => {
        this.setState({
           changeChannelVisible: false,
           channelId: channelId,
           channelName: channelName
        });
        this.props.onSaveChannelName(userId, channelId, channelName);
      },
      onCancel: () => {
        onCancelChannelChange();
      }
    }
    //订单详情
    // const orderProps = {
    //   orders,
    //   lastOrder,
    //   completeRequest,
    //   completeOrder,
    //   refuseCompleteOrder,
    //   onQuotePrice,
    //   onPayType:this.onPayType,
    //   onRateOrder,
    //   initRate
    // }
    const orderInfoProps = {
      lastOrder,
      orders,
      isMainCustomer:this.props.channelInfo && this.props.channelInfo.users.filter(u=> u.userId == selfUserId && u.role == 1).length > 0,
      initRate,
      onQuotePrice,
      onPayType: this.onPayType,
      onRateOrder,
      completeRequest,
      completeOrder,
      refuseCompleteOrder,
    }
    const tabPageProps = {
      showInviteModal,
      selfUserId,
      channelInfo,
      channelId,
      changeTab,
      filelist,
      onSaveChannelName:this.props.onSaveChannelName,
      orders:orders,
      lastOrder:lastOrder,
      usersProps,
      sharingfile,
      changeFilesUpload,
      openFilePage,
      downloadFile,
      onInviteUsers,
      onRemoveConfirm,
      onQuotePrice,
      showInviteUsers,
      hideInviteUsers,
      onPayType: this.onPayType,
      completeRequest,
      completeOrder,
      refuseCompleteOrder,
      onRateOrder,
      initRate
    }

    const chatHomeProps = {
      channelsCount: allChannels ? allChannels.length : 0,
      channels: allChannels,
      roomConnected: this.props.roomConnected,
      onchangeChannel:this.onchangeChannel,
      showChannel: this.props.cancelHideChannel,
      getAllChannels: function(){
        const msg = {
          type:  'getAllChannels'
        }
        fpar && fpar.sendCustomRequest(msg, function(error, rsp){
          if(error){
            console.error(error);
            return;
          }
        });
      }
    }

    const channelsCol = {
      xs: 0,
      md: 5,
      lg: 5
    }


    const chatCol = {
      xs: 24,
      md: channelId ? 11 : 19,
      lg: channelId ? 12 : 19
    }

    const tabCol = {
      xs: 0,
      md: channelId ? 8 : 0,
      lg: channelId ? 7 : 0
    }


    const　onShareClick = ()=>{
      if(!this.props.channelInfo){
        return;
      }
      if(!sharingfile){
        shareFile();
      }else{
        unshareFile();
      }
    }


    const onHideChannel = (channelId) => {
      Modal.confirm({
        title: '隐藏该频道?',
        content: '（有新消息时会自动弹出）',
        okText: '确定',
        channelId: channelId,
        cancelText: '取消',
        onOk(){
            hidechannel(channelId);
        }
      })
    }
    const onDelChannel = (data) => {
        Modal.confirm({
          title: data.channelType==0?'删除该一对一频道?':'删除该频道?',
          content: <p>
        {data.childChannel.length>0?'该频道包含':''}
        {data.childChannel&&data.childChannel.map((item,index)=>{
          return <span key={index} style={{color:'red',fontSize:'14px'}}>{item.channelName},</span>
        })}
        {data.childChannel.length>0?'删除会把子频道一同删除':''}
        {data.channelType==0?'（删除以后该客户无法通过一对一频道进入会客室，建议您隐藏频道）':'(删除以后数据会丢失)'}
      </p>,
          okText: '确定',
          channelId: data.channelId,
          cancelText: '取消',
          onOk(){
            delchannel(data.channelId);
          }
        })
    }
    const onCancelChannelChange = () =>{
      this.setState({
        changeChannelVisible: false,
        channelId: '',
        channelName: ''
      })
    }

    const channelListHeight = document.body.clientHeight - 120;
    const channelListWidth = document.body.clientWidth;
    let channelReadonly = false;
    if(channelId){
      if(lastOrder && lastOrder.orderStatus > 2){
        channelReadonly = true;
      }else {
        channelReadonly = false;
      }
    }else{
      channelReadonly = true;
    }

    const clickMenu = (e) => {
      if(e.key == 'share'){
        onShareClick();
      }else if(e.key == 'video'){
        toggleVideo();
      }else if(e.key == 'home'){
        roomHome();
      }
      this.setState({
        menuVisible: false
      })
    }
    let styleMsg = {position:'absolute', zIndex:99, top: 0, left: 0, right:0, overflowX:'hidden',overflowY:'scroll',height:'50px',width:'100%'};
    const clientHeight = document.body.clientHeight;
    const canvasHeight = clientHeight - 130;

    const OrderInfo = ({orders,users}) =>
      <div style={{marginBottom:'10px',overflow:'scroll'}} className={styles.collapseList}>
            <Tabs type="card">
              {orders.length>0?
              <TabPane tab="订单消息" key="1" style={{height:'100%',overflowY:'scroll'}}>
            {orders && orders.map((item, index) => {
              return <div key={index}>
                    {item.customerId==lastOrder.customerId||Cookie.get('r') == 9?<Card  style={{margin:'10px 30px'}}>
                      <div>订单编号: {item.orderSn}</div>
                      <div>{lastOrder.productPurchaseType==0?<span>意向金额</span>:<span>订单金额</span>}: {Number(item.orderAmountY).formatCurrency()}元</div>
                      <div>客户名称: {item.customerName}</div>
                      <div>订购产品:
                        <ul>
                          {item.details.map((d, i) => {
                            return <li key={i}>{d.productName}</li>
                          })}
                        </ul>
                      </div>
                    </Card>:''}
                  </div>
            })}
              </TabPane>
                :''}
              {/*<TabPane tab="Tab Title 2" key="2">*/}
                {/*<p>Content of Tab Pane 2</p>*/}
                {/*<p>Content of Tab Pane 2</p>*/}
                {/*<p>Content of Tab Pane 2</p>*/}
              {/*</TabPane>*/}
              {/*<TabPane tab="Tab Title 3" key="3">*/}
                {/*<p>Content of Tab Pane 3</p>*/}
                {/*<p>Content of Tab Pane 3</p>*/}
                {/*<p>Content of Tab Pane 3</p>*/}
              {/*</TabPane>*/}
            </Tabs>
      </div>
    const verticalMenu = <Menu mode="vertical" onClick={clickMenu}>
      {!channelReadonly ?
      <Menu.Item key="share"><i className="fpanticon fpanticon-linkfiles" style={{marginRight: 5}}></i><span>{sharingfile ? '停止同步':'同步演示文档'}</span></Menu.Item>
        :''}
      {!channelReadonly ?
        <Menu.Item key="video"><i className="fpanticon fpanticon-video" style={{marginRight: 5}}></i><span>{isStreaming? '关闭视频':'打开视频'}</span></Menu.Item>
      :''}
      <Menu.Item key="home"><i className="fpanticon fpanticon-home" style={{marginRight: 5}}></i><span>频道首页</span></Menu.Item>
    </Menu>
    return (
      <Layout style={{height:'100%',position:'relative'}}>
        <Header style={{background:'#fff',  width: '100%'}}>
          <Row>
            <Col xs={0} sm={12}>
              <h2 style={{float:'left'}}>{roomConnected?<i className="fpanticon fpanticon-online" style={{color:'green'}}></i> : <i className="fpanticon fpanticon-offline" style={{color:'red'}}></i>}</h2>
            </Col>
            <Col xs={0} sm={12}>
              <ul className="righttopicons">
                {!channelReadonly?
                  <li onClick={onShareClick} style={sharingfile?{'color':'#108ee9'}:{}}>
                    <Tooltip overlayStyle={{width:'10em', padding:'0 auto'}} title={sharingfile ? '停止同步' : "同步演示文档"}>
                      <i className="fpanticon fpanticon-linkfiles"></i>
                    </Tooltip>
                  </li>
                  :''}
                {!channelReadonly?
                  <li onClick={toggleVideo} style={isStreaming ? {'color': '#108ee9'}:{}}>
                    <Tooltip  overlayStyle={{width:'6em', padding:'0 auto'}} title={isStreaming ? '关闭视频' : '打开视频'}>
                      <i className="fpanticon fpanticon-video"></i>
                    </Tooltip>
                  </li>
                  :''}
                <li onClick={roomHome}>
                  <Tooltip  overlayStyle={{width:'6em', padding:'0 auto'}} title="频道首页">
                    <i className="fpanticon fpanticon-home"></i>
                  </Tooltip>
                </li>
                {/*<li onClick={analysis}>*/}
                  {/*<Tooltip  overlayStyle={{width:'6em', padding:'0 auto'}} title="统计信息">*/}
                     {/*<i className="fpanticon fpanticon-statistics"></i>*/}
                  {/*</Tooltip>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*<Tooltip overlayStyle={{width:'6em', padding:'0 auto'}} title="财务信息">*/}
                    {/*<i className="fpanticon fpanticon-finance"></i>*/}
                  {/*</Tooltip>*/}
                {/*</li>*/}
              </ul>
            </Col>
          </Row>
        </Header>
        <Content className={styles.ContentList}>
          <Row style={{height: '100%', width:'100%'}} justify="spacebetween" align="top" gutter={8}>
            <Col {...channelsCol} className="channelListPanel" style={{height: '100%',overflow:'hidden'}}>
              <Card  title={this.props.channelListTitle} style={{position:'absolute', top:0, left: 0, width:'100%', height:'100%', overflow:'hidden'}}
                     bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:channelListHeight,marginBottom: '4em'}}>
                <ChannelList {...channelsProps}/>
              </Card>
            </Col>
            <Col {...channelsCol} className="filesListPanel" style={{height: '100%',overflow:'hidden', display:'none'}}>
              <Card  title={this.props.filesListTitle} style={{position:'absolute', top:0, left: 0, width:'100%', height:'100%', overflow:'hidden'}}
                     bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:channelListHeight,marginBottom: '4em'}}>
                <Files {...filesProps}/>
              </Card>
            </Col>
            <Col {...channelsCol} className="usersListPanel" style={{height: '100%',overflow:'hidden', display:'none'}}>
              <Card style={{position:'absolute', top:0, left: 0, width:'100%', height:'100%', overflow:'hidden'}}
                     bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:channelListHeight,marginBottom: '4em'}}>
                <Userlist {...usersProps}></Userlist>
              </Card>
            </Col>
            <Col {...channelsCol} className="orderListPanel" style={{height: '100%',overflow:'hidden', display:'none'}}>
              <Card style={{position:'absolute', top:0, left: 0, width:'100%', height:'100%', overflow:'hidden'}}
                    bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:channelListHeight,marginBottom: '4em'}}>
                {/*{lastOrder!=null?<OrderDetails {...orderProps}/>:''}*/}
                <OrderSteps {...orderInfoProps} />
              </Card>
            </Col>
            {/*消息列表上面的订单*/}
            <Col {...channelsCol} className="orderListDetails" style={{height: '100%',overflow:'hidden', display:'none'}}>
              <Card style={{position:'absolute', top:0, left: 0, width:'100%', height:'100%', overflow:'hidden'}}
                    bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:channelListHeight,marginBottom: '4em'}}>
                <OrderInfo orders={orders} users={users}/>
              </Card>
            </Col>
            <div id="floatPanelBacks" onClick={this.hideFloatPanel} style={{position:'absolute', zIndex:99, display:'none', top:0, left: 0,width: '100%', height:'100%', overflow:'hidden',background:'rgba(255,255,255,0.5)'}}></div>

            <Col {...chatCol} style={{height:'100%', background: 'none'}}>
              <Card id="orderDetailsPanel" className="toolPanels" title={currentChannelName} style={{position:'absolute',zIndex:100,display:'none', width: '100%',top: 60, bottom: 100,overflow:'hidden'}}
                    bodyStyle={{overflow:'scroll',padding:0, width:'100%',height:canvasHeight}}>
              </Card>
              {channelId ?
                <Spin tip="打开频道……" spinning={this.props.loadingChannel} wrapperClassName="chatInfo">
                <Card style={{background:'white',height:'100%', padding:'8px 0px 100px 8px'}} title={<div onClick={this.orderListDetailsVisible} style={{width:'100%',height:'30px',lineHeight:'30px',textAlign:'center'}}>{currentChannelName}<Icon type="down" /></div>}>
                    <MsgList {...chatProps}></MsgList>
                  {/*</Card>*/}
                  {lastOrder && lastOrder.orderStatus > 2 ?
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'4.5rem',padding:'10px'}}>订单已结案,频道关闭。</div>
                  :<Sender {...senderProps} ></Sender>}
                </Card>
                </Spin>
                : <ChatHome {...chatHomeProps}/>}
            </Col>
            <Col {...tabCol} style={{height:'100%', background:'none', overflowY:'scroll'}}>
              <Spin tip="加载中……" spinning={this.props.loadingChannel} wrapperClassName="tabsInfo">
              <TabPages {...tabPageProps}/>
            </Spin>
          </Col>
          </Row>
        </Content>
        <ConnectMenu />
        <Modal title="修改频道" footer={null}
                 visible={this.state.changeChannelVisible}>
          <ChannelInfoForm {...channelInfoModalProps}/>
        </Modal>
        {lastOrder?
          <PayMethods hidePayModal={this.hidePayModal} PayMethod={PayMethod} PaySum={lastOrder.orderAmountY?lastOrder.orderAmountY.formatCurrency():''} Balance={Balance ? Balance.formatCurrency() : Balance} errMsg={errMsg} PayTypeVisible={PayTypeVisible}/>:''}
        <div className={styles.rightNav}>
          <Popover content={verticalMenu} trigger="click" visible={this.state.menuVisible} onVisibleChange={this.handleMenuVisibleChange}>
            <Button icon="bars" style={{fontSize: '2em', border: 'none'}}></Button>
          </Popover>
        </div>
      </Layout>

    );
  }
}
HolderLayout.propTypes = {
}
export default HolderLayout;
