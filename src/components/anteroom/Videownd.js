import React,{Component} from 'react';
import {Button,Tooltip} from 'antd';
import Draggable from 'react-draggable2';
import {Icon} from 'antd';

class Videownd extends Component{
  constructor(props){
    super(props);
    this.state = {
      mini: false,
      fullscreen: false,
      x: this.props.startPos ? this.props.startPos.x : 0,
      y: this.props.startPos ? this.props.startPos.y : 0,
      width: 300,
      height: 200,
      videoEnabled: this.props.videoEnabled ? this.props.videoEnabled : false
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(JSON.stringify(this.state) == JSON.stringify(nextState) &&
      JSON.stringify(this.props) == JSON.stringify(nextProps)){
      return false;
    }
    return true;
  }


  toggleVideo = () => {
    this.props.toggleVideo();
    this.setState({
      videoEnabled: !this.state.videoEnabled
    })
  }

  toggleWindow = () => {
    if(this.state.fullscreen){
      this.setState({
        fullscreen: false,
        x: this.props.startPos ? this.props.startPos.x : 0,
        y: this.props.startPos ? this.props.startPos.y : 0,
        width: 300,
        height: 200
      })
    }else{
      this.setState({
        // fullscreen: true,
        mini:false,
        // x: 0,
        // y: 0,
        // width: '100%',
        // height: '100%'
      })
      // const v = document.querySelector('video');
      const v = this.videoElem;
      if(v.requestFullscreen){
        v.requestFullscreen();
      }else if(v.mozRequestFullScreen){
        v.mozRequestFullScreen();
      }else if(v.webkitRequestFullscreen){
        v.webkitRequestFullscreen();
      }

    }
  }
  toggleMini = () => {
    if(this.state.mini){
      this.setState({
        mini: false,
        x: this.props.startPos ? this.props.startPos.x : 0,
        y: this.props.startPos ? this.props.startPos.y : 0,
        width: 300,
        height: 200
      })
    }else{
      this.setState({
        mini: true,
        fullscreen: false,
        x: this.props.startPos ? (this.props.startPos.x - 250) / 300 * 70 : 0,
        y: this.props.startPos ? (this.props.startPos.y / 200 * 50) : 0,
        width: 70,
        height: 50
      })
    }
  }

  // componentDidMount = () => {
  //   document.querySelectorAll('audio').forEach((item,index)=>{item.play();})
  //   document.querySelectorAll('video').forEach((item,index)=>{item.play();})
  // }
  // componentDidUpdate = () => {
  //   document.querySelectorAll('audio').forEach((item,index)=>{item.play();})
  //   document.querySelectorAll('video').forEach((item,index)=>{item.play();})
  // }

  render(){
    const {isMuted, stream,startPos,userId, userName,isLocal} = this.props;

    // const nocamDivStyle = {
    //   // background:'url(https://theme.lj110.com/default/Logo/shexiangtouweikaiqi.png) no-repeat',
    //   position: 'absolute',
    //   width: '100%',
    //   height: '100%',
    //   right: 0 ,
    //   top:0,
    //   color: 'white',
    //   display: this.state.videoEnabled ? 'none':'block',
    //   paddingTop: '30%'
    // }

        if(stream && stream.active) {
          // const videoEnabled = this.props.rstream ? !this.props.rstream.getWebRtcPeer().videoEnabled : !this.state.videoEnabled;
          return <Draggable start={{x: this.state.x,  y: this.state.y}} zIndex={550} bounds="parent" handle="ul li .handle">
            <div className="box no-cursor" style={{width: this.state.width, height: this.state.height, position: 'absolute', overflow: 'hidden',
              border:'solid 1px rgba(200,200,200,0.8)',boxShadow:'10px 10px 5px #888888',zIndex:99}}>
              <div style={{background:'white',width:'100%', height:'100%'}}>
                {(typeof stream.getVideoTracks === 'function' && stream.getVideoTracks().length > 0
                && stream.getVideoTracks()[0].readyState == 'live'&& !stream.getVideoTracks()[0].muted) ?
                <video ref={(videoElem) => {this.videoElem = videoElem;}} style={{width: '100%',height: '100%',objectFit: 'fill'}} autoPlay="autoplay"  {...isMuted} src={URL.createObjectURL(stream)}></video>
                :<audio src={URL.createObjectURL(stream)} style={{marginLeft: 40, width: 100}} autoPlay={true} {...isMuted}></audio>
                }
                {/*{ videoEnabled ?*/}
                  {/*<span style={{color:'#999999', fontSize:'2em', position:'absolute', left: '50%', top:'50%', marginLeft: -60, marginTop: -20}}>摄像头未开启</span>*/}
                {/*:''}*/}
              </div>
              {/*<div style={nocamDivStyle}>*/}
              {/*</div>*/}
              <span style={{position:'absolute', bottom: 5, right: 5, color: 'white', textShadow:'2px 2px 1px #888888'}}>{!userName || userName == '' ? userId : userName}</span>
              {this.state.mini ?
                <ul style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 30,
                  height: '100%',
                  color: 'white',
                  background: 'rgba(0,0,0,0.5)',
                  textAlign:'center'
                }}>
                  <li className="cursor" style={{cursor: 'pointer'}}>
                    <Tooltip placement="right" title="移动窗口">
                      <i className="handle fpanticon fpanticon-move" style={{fontSize: '0.5em'}}></i>
                    </Tooltip>
                  </li>
                  <li onClick={this.toggleMini}>
                    <Tooltip placement="right" title={this.state.mini ? '恢复窗口' : '最小化'}>
                    <i className={this.state.mini ? 'fpanticon fpanticon-restoremini' : 'fpanticon fpanticon-mini'} style={{fontSize:'0.5em'}}>
                    </i>
                    </Tooltip>
                  </li>
                </ul>
              :
                <ul style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 30,
                  height: '100%',
                  color: 'white',
                  background: 'rgba(0,0,0,0.5)',
                  textAlign:'center'
                }}>
                  <li className="cursor" style={{cursor: 'pointer'}}>
                    <Tooltip placement="right" title="移动窗口">
                    <i className="handle fpanticon fpanticon-move"></i>
                    </Tooltip>
                  </li>
                  {isLocal ?
                    <li style={{fontSize: '0.8em'}} onClick={this.toggleVideo}>
                      <Tooltip  placement="right" title="视频图像">
                      <i className="fpanticon fpanticon-video"></i>
                      </Tooltip>
                    </li>
                    :''}
                  <li onClick={this.toggleWindow}>
                    <Tooltip placement="right" title={this.state.fullscreen ? '恢复窗口' : '窗口全屏'}>
                    <i className={this.state.fullscreen ? 'fpanticon fpanticon-restorewnd' : 'fpanticon fpanticon-maxwnd'}></i>
                    </Tooltip>
                  </li>
                  <li onClick={this.toggleMini}>
                    <Tooltip placement="right" title={this.state.mini ? '恢复窗口' : '最小化'}>
                    <i className={this.state.mini ? 'fpanticon fpanticon-restorewnd' : 'fpanticon fpanticon-mini'}></i>
                    </Tooltip>
                  </li>
                </ul>
              }
              <div style={{position:'absolute',right:5,top:5,fontSize:'1em',color:'white',textStroke:'1px #000',textShadow:'1px 1px 2px #000'}}>{this.props.username}</div>
            </div>
          </Draggable>
        }else{
          return <div></div>
        }
  }
}

export default Videownd;
