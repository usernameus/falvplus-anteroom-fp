import React, {Component} from 'react';
import { Row, Col, Card, Button, Icon,Collapse} from 'antd';
import {avatarcolors,filetypeview} from '../../utils/config';
import styles from './Msglist.less';
import {inArray} from '../../utils/common';
const Panel = Collapse.Panel;
const Cookie = require('js-cookie');
class Msglist extends　Component{
  constructor(props){
    super(props);
  }
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   if(JSON.stringify(this.props) == JSON.stringify(nextProps)){
  //     return false;
  //   }
  //   return true;
  // }
  // componentWillReceiveProps(nextProps){
  //   console.log('NEXTPROPS');
  //   console.log(JSON.stringify(nextProps.msglist.length));
  // }
  componentDidUpdate = () => {
    if(this.refs　&&　this.refs.msgScroller){
      this.refs.msgScroller.scrollTop = this.refs.msgScroller.childNodes[0].clientHeight;
    }
    const msgtosendInput = document.getElementById('msgtosend');
    const channelListWidth = document.body.clientWidth;
    // 修正 bug, 当共享页面输入文本时,Sender 控件不获取焦点!
    // 增加 Modal 判断,当有 Modal 时不获取焦点
    const caretHelper = document.getElementById('caretHelper');
    const modalMask = document.querySelector('.ant-modal-mask');

    if(msgtosendInput && caretHelper == null&&channelListWidth>768 && !(modalMask && modalMask.classList.contains('ant-modal-mask-hidden'))){
      msgtosendInput.focus();
    }
  }
  componentDidMount = ()=>{
    if(this.refs　&&　this.refs.msgScroller){
      this.refs.msgScroller.scrollTop = this.refs.msgScroller.childNodes[0].clientHeight;
    }
    const msgtosendInput = document.getElementById('msgtosend');
    const channelListWidth = document.body.clientWidth;
    // 修正 bug, 当共享页面输入文本时,Sender 控件不获取焦点!
    // 增加 Modal 判断,当有 Modal 时不获取焦点
    const caretHelper = document.getElementById('caretHelper');
    const modalMask = document.querySelector('.ant-modal-mask');
    if(msgtosendInput && caretHelper == null&&channelListWidth>768 && !(modalMask && modalMask.classList.contains('ant-modal-mask-hidden'))){
      msgtosendInput.focus();
    }
  }
  // openFilePage = (fileId, page) =>{
  //   this.props.openFilePage(fileId, page);
  // }
  render(){
    const showMsg = this.props.msglist || [];
    const users = this.props.users;
    const orders = this.props.orders || [];
    const lastOrder=this.props.lastOrder;
    const userAvatar = (user) =>{
      if(user.avatar && user.avatar != ''){
        return <img className="avatar" src={user.avatar} />
      }else{
        const backcolor = avatarcolors[user.userId % avatarcolors.length];

        return <div className="avatardiv" style={{backgroundColor:backcolor}}>
          <span className="avatarName">{user.userName　? user.userName.substring(0,1) : '匿'}</span>
        </div>
      }
    }


    const RowMsg = ({user,msg, userFileId}) =>{
      const content = msg.content;
      if(inArray(msg.msgType, ['text','fileupload','uploadingfile'])){
        return (
          <Row style={{margin: '0.5rem'}}>
            <Col span={3}>
              {user.isme ? '' : userAvatar(user)}
            </Col>
            <Col span={18}>
              <div style={user.isme ? {textAlign:'right',padding: '0 10px'} : {padding:'0 10px'}}>{user.userName}</div>
              <div className={user.isme ? 'myMsg' : 'remoteMsg'}>
                <MsgBlock type={msg.msgType} userName={user.userName} content={content} userFileId={userFileId}/>
              </div>
            </Col>
            <Col span={3}>
              {user.isme ? userAvatar(user) : ''}
            </Col>
          </Row>
        )
      }else{
        return (
          <Row style={{margin: '0.5rem'}}>
            <Col span={24}>
              <MsgBlock type={msg.msgType}  userName={user.userName} content={content}/>
            </Col>
          </Row>
        )
      }
    }

    const parseContent = (content)  => {
      let contentObj = content;
      if(typeof content === 'string'){
        contentObj = JSON.parse(content);
      }
      return contentObj;
    }
    const MsgBlock = ({type, userName, content, userFileId}) => {
      if(type == 'text' && content　!=　null){
        const parags = content.split('\n');
        return <Paragraphs paras={parags} />
      }else if(type == 'fileupload' || type == 'uploadingfile') {
        return <FileMsg content={parseContent(content)} userFileId={userFileId}/>
      }else if(type == 'quoteprice') {
        return <PriceMsg content={parseContent(content)}/>
      }else if(type == 'orderpaid'){
        return <PaidMsg content={parseContent(content)} userName={userName}/>
      }else if(type == 'systemMessage') {
        return <ChannelMsg paras={content} />
      }else if(inArray(type, ['completeRequest','completeOrder','refuseCompleteOrder','cancelOrder','refundOrder'])) {
        let orderTitle = "";
        let orderMsg = "";
        if(type == 'completeRequest'){
          orderTitle = "律师请求结案";
          orderMsg = "律师认为您的问题已经解决,请求结案。请您及时处理。";
        }else if(type == 'completeOrder'){
          orderTitle = "客户结案";
          orderMsg = "该服务已经完成,客户同意结案。";
        }else if(type == 'refuseCompleteOrder'){
          orderTitle = "客户拒绝结案";
          orderMsg = "客户拒绝了律师的结案请求。";
        }else if(type == 'cancelOrder'){
          orderTitle = "取消订单";
          orderMsg = "订单已经取消。相关款项会退回到客户余额。";
        }else if(type == 'refundOrder'){
          orderTitle = "订单退款";
          orderMsg = <div>
            <p>订单退款流程开始>订单退款流程开始,相关款项会退回客户余额。</p>
            <p>客户可以在个人账户中申请提现。</p>
            <p>退款金额:" + (parseContent(content).refundAmount / 100).formatCurrency() + '元'</p>
          </div>
        }else{
          return <div></div>
        }
        return <OrderMsg type={type} title={orderTitle} message={orderMsg} />
      }else{
        return <div></div>;
      }
    }

    const OrderMsg = ({type, title, message}) =>
      <Card title={title} style={{margin: '10px 30px'}}>
        {message}
      </Card>

    const PriceMsg = ({content}) =>
      <div>
        <Card title="律师报价" style={{margin: '10px 30px'}}>
          律师报价:{content.quotePrice / 100}元
        </Card>
      </div>

    const PaidMsg = ({userName,content}) =>
      <div>
        <Card title="客户支付" style={{margin: '10px 30px'}}>
          客户[{userName}]支付订单:{content.paidAmount/ 100}元
        </Card>
      </div>


    const Paragraphs = ({paras}) =>
      <div>
        {paras.map((item,index)=>{
          return <p key={index} style={{fontSize: '14px'}}>{item == '' ? '　' : item.replace(' ','　')}</p>
        })}
      </div>
    const ChannelMsg = ({paras}) =>
      <Card title='创建频道' style={{margin: '10px 30px'}}>
        <p  style={{fontSize: '14px'}}>{paras}</p>
      </Card>

    const FileLink = ({fileId, fileName, fileType}) =>
      <a onClick={this.props.openFilePage.bind(null,fileType.toLowerCase(),fileId,1)}>{fileName}</a>
    // <div>
    // {fileType.toLowerCase().in_array(filetypeview)?
    //   <a onClick={this.props.openFilePage.bind(null,fileType,fileId,1)}>{fileName}</a>
    // : <a href={originPathName} download={fileName}>{fileName}</a>}
    // </div>

    const IconMaker = ({fileType}) => {
      fileType = fileType.toLowerCase();
      if(fileType == 'doc' || fileType == 'docx'){
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#3e83e1'}} className="fpanticon fpanticon-word"></i>
      }else if(fileType == 'xls' || fileType == 'xlsx') {
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#87c15c'}} className="fpanticon fpanticon-excel"></i>
      }else if(fileType == 'ppt' || fileType == 'pptx'){
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#f25646'}} className="fpanticon fpanticon-ppt"></i>
      }else if(fileType == 'pdf') {
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#c33f43'}} className="fpanticon fpanticon-pdf"></i>
      }else if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'bmp' || fileType == 'gif'){
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#ffff55'}} className="fpanticon fpanticon-pic"></i>
      }else {
        return <i style={{lineHeight:'50px', fontSize:'50px',color: '#666666'}} className="fpanticon fpanticon-download"></i>
      }
    }

    const FileMsg = ({content, userFileId}) =>
      <div style={{fontSize: '1.1em', minWidth:'20em'}}>
        <div style={{width: '80px', height:'50px',padding:'10px auto',float:'left'}}>
          <IconMaker fileType={content.fileType} />
        </div>
        <div>
          <FileLink fileId={content.fileId} fileName={content.fileName} fileType={content.fileType} />
          <p>{Number(content.fileSize/1024).formatCurrency()}KB</p>
        </div>
      </div>


    const OrderInfo = ({orders}) =>
      <div style={{marginBottom:'10px'}}>
        <Collapse>
          <Panel header={'订单消息'} key="1">
            {orders && orders.map((item, index) => {
              return <div>
                {item.customerId==lastOrder.customerId||Cookie.get('r') == 9?<Card key={index} style={{margin:'10px 30px'}}>
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
          </Panel>
        </Collapse>
      </div>
    let styleMsg = {position:'absolute', top: 56, left: 0, right:0, bottom:'4.5rem', overflowX:'hidden',overflowY:'scroll'};

    let prevSendTime = null;
    return (
      <div ref="msgScroller" style={styleMsg}>
        <ul>
          {/*<OrderInfo orders={orders}/>*/}
          {showMsg.map(({user, message,userFileId,sendTime}, index) => {
            let sendTimeTxt = '';
            if(prevSendTime != null && new Date(sendTime) - new Date(prevSendTime) < 1000 * 60 * 10){
              sendTimeTxt = '';
            }else{
              if(new Date().format('yyyyMMdd') == new Date(sendTime).format('yyyyMMdd')){
                sendTimeTxt = new Date(sendTime).format('HH:mm');
              }else if(new Date(new Date().getTime() - 24*60*60*1000).format('yyyyMMdd') == new Date(sendTime).format('yyyyMMdd')){
                sendTimeTxt = '昨天 ' + new Date(sendTime).format('HH:mm');
              }else if(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) < new Date(sendTime)){
                let weekDay = new Date(sendTime).getDay();
                sendTimeTxt = '星期{0} ' + new Date(sendTime).format('HH:mm');
                switch(weekDay){
                  case 0: sendTimeTxt = sendTimeTxt.replace('{0}','日'); break;
                  case 1: sendTimeTxt = sendTimeTxt.replace('{0}','一'); break;
                  case 2: sendTimeTxt = sendTimeTxt.replace('{0}','二'); break;
                  case 3: sendTimeTxt = sendTimeTxt.replace('{0}','三'); break;
                  case 4: sendTimeTxt = sendTimeTxt.replace('{0}','四'); break;
                  case 5: sendTimeTxt = sendTimeTxt.replace('{0}','五'); break;
                  case 6: sendTimeTxt = sendTimeTxt.replace('{0}','六'); break;
                }
              }else{
                sendTimeTxt = new Date(sendTime).format('yyyy年MM月dd日 HH:mm');
              }
            }
            prevSendTime = sendTime;

            const uFilter = users.filter((item)=>item.userId == user);
            let userInfo = {};
            if(uFilter.length >= 1){
              userInfo = uFilter[0];
            }
            userInfo['isme'] = (userInfo.userId == this.props.selfUserId);
            {/*return <li key={index} dangerouslySetInnerHTML={{__html: userMsg}}></li>*/}
            let msgObj = message;
            {/*console.log(message);*/}
            if(typeof message === 'string'){
              msgObj = JSON.parse(message);
            }
            const content = msgObj.content
            return <div key={index}>
              {sendTimeTxt == '' ? '' :
                <div style={{textAlign:'center'}}>
                  <span style={{padding:'2px 5px',borderRadius:'5px',background:'#999999',color:'white'}}>{sendTimeTxt}</span>
                </div>}
              <RowMsg user={userInfo} msg={msgObj} userFileId={userFileId}></RowMsg>
            </div>
          })}
        </ul>
      </div>
    );
  }
}
export default Msglist;
