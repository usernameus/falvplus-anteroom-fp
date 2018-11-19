import React, {Component} from 'react';
import {Modal, Menu,Card,Badge, message, Row, Col} from 'antd';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import {avatarcolors} from '../../utils/config';
import styles from './ChannelList.css';

class ChannelList extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   channels: this.props.channels,
    //   changeChannel: this.props.changeChannel
    // }
    this.state = {
      channelId: this.props.channelId
    }
  }
  channelDel=()=>{
    Modal.error({
      title: '该频道已删除,禁止访问'
    })
  };
  handleClick = (e)=> {
    if(this.props.isStreaming && this.props.channelId != e.key){
      const changeChannel = this.props.onchangeChannel;
      const channelId = this.props.channelId;
      const that = this;
      Modal.confirm({
        title: '断开连接',
        content: '您正在视频会话,是否断开视频?',
        onOk(){
          that.setState({
            channelId: e.key
          })
          changeChannel(e.key);
        },
        onCancel(){
          that.setState({
            channelId: channelId
          });
          return;
        }
      });
    }else if(this.props.isStreaming && this.props.channelId == e.key){
      return;
    }else{
      this.setState({
        channelId: e.key
      })
      this.props.onchangeChannel(e.key);
    }

  }
  componentDidUpdate = ()=>{
    if(this.state.channelId==this.props.delChannelId){
      Modal.error({
        title: '该频道已删除,禁止访问',
        onOk(){
          window.location.href='/anteroom';
        }
      })
    }
    if(this.state.channelId != this.props.channelId){
      this.setState({
        channelId: this.props.channelId
      })
    }

  }


  render(){
    const {channels, handleContextMenu,lastOrder,channelIds} = this.props;

    const UserAvatar = ({user}) =>{
      if(user.avatar && user.avatar != ''){
        return <img className="cavatar" src={user.avatar} />
      }else{
        const backcolor = avatarcolors[user.userId % avatarcolors.length];
        return <div className="cavatardiv" style={{backgroundColor:backcolor}}>
          <span className="cavatarName">{user.userName　? user.userName.substring(0,1) : '匿'}</span>
        </div>
      }
    }
    const ChannelAvatar = ({users}) => {
      if(users.length == 2){
        return (
        <div className="channelAvatar">
          {users.filter((u,index)=>u.userId != this.props.selfUserId).map((u,index)=> {
          return <UserAvatar key={index} user={u}/>
          })}
        </div>)
      }else{
        const classAvatar = 'channelAvatar-' + Math.min(users.length, 9);
        return (
        <div className={classAvatar}>
          {users.filter((u,index)=>index < 9).map((u,index)=>{
            return <UserAvatar key={index} user={u}/>
          })}
          <div className="clearfix"></div>
        </div>)
      }
    }
    const collectChannelMenu = (props) => {
      return {
        channelState: props.attributes['data-channelstate'],
        channelId: props.attributes['data-channelid'],
        channelName: props.attributes['data-channelname'],
        onItemClick: props.onItemClick,
        Orders:props.attributes['data-orderStatus'],
        channelType:props.attributes['data-channelType'],
        childChannel:props.attributes['data-childChannel'],
      } ;
    }

    return (
      <div>
        <Menu id="channelListMenu" mode="inline"  onClick={this.handleClick} style={{fontSize: '1.3em'}}
              defaultSelectedKeys={[this.state.channelId.toString()]} selectedKeys={[this.state.channelId.toString()]}>
          {channels.map((item, index) =>{

            const itemStyle = {height: 64,borderBottom:'1px solid rgba(0,0,0,0.3)',cursor:'point',position:'relative',padding:0,paddingLeft:-24,overflow:'hidden'};
            if(item.channelState == '1'){
              itemStyle.backgroundColor = '#BBC8E6';
            }
            const attributes = {
              'data-channelstate': item.channelState,
              'data-channelid': item.channelId,
              'data-channelname': item.channelName,
              'data-orderStatus':item.orders,
              'data-channelType':item.channelType,
              'data-childChannel':item.webChannelInfos.length>0?item.webChannelInfos:[],
            }
            return (
              <Menu.Item key={item.channelId} className="channel-list-item"
                         style={itemStyle}>
                <ContextMenuTrigger id="channelContextMenu" attributes={attributes} onItemClick={handleContextMenu}
                                     collect={collectChannelMenu}>
                  <div style={{width: '100%', height:'100%',padding: '12px 18px 11px 12px'}}>
                    <input type="hidden" value={item.channelId}/>
                    <div className="channelAvatar">
                      <Badge count={item.unreadMsgCount}>
                        <ChannelAvatar users={item.users}/>
                      </Badge>
                    </div>
                    <div className="channelInfo">
                      <h3 className="nickname">{item.channelName}</h3>
                      <p className="lastmsg">
                        <span></span>
                      </p>
                    </div>
                  </div>
                </ContextMenuTrigger>
              </Menu.Item>
            )
          })}
        </Menu>

      </div>
    );
  }
}

ChannelList.propTypes = {

}

export default ChannelList;
