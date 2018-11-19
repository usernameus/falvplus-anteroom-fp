import React from 'react';
import {Tooltip} from 'antd';
import styles from './Fpartimer.less';

class Fpartimer extends React.Component {
  constructor(props){
    super(props);
    // const showTime = this.props.start ? this.props.initTimeCount + Math.floor((new Date().getTime() - this.props.startTime.getTime()) / 1000) : this.props.initTimeCount;
    const showTime = this.props.initTimeCount;

    this.state = {
      time: this.formatTime(Math.floor(showTime / 3600)) + ':' + this.formatTime(Math.floor((showTime % 3600) / 60 )) + ':' + this.formatTime(showTime % 60),
      // startTime: this.props.startTime,
      start: false,
      tid: null,
      current: this.props.initTimeCount,
      channelId: this.props.channelId
    }
  }

  formatTime = (t) => {

    return ('00' + t).substr((''+t).length);
  }

  componentDidUpdate = ()=>{
    if(this.props.channelId != this.state.channelId){
      if(this.state.tid != null){
        clearInterval(this.state.tid);
      }
      const showTime = this.props.initTimeCount;
      this.setState({
        start: this.props.start,
        channelId: this.props.channelId,
        tid: null,
        current: this.props.initTimeCount,
        time: this.formatTime(Math.floor(showTime / 3600)) + ':' + this.formatTime(Math.floor((showTime % 3600) / 60 )) + ':' + this.formatTime(showTime % 60)
      })
    }
    if(this.props.start){
      if(this.state.start){
        return;
      }
      const that = this;
      const tid = setInterval(function(){
        // const showTime = that.props.start ? that.props.initTimeCount + Math.floor((new Date().getTime() - that.props.startTime.getTime()) / 1000) : that.props.initTimeCount;
        const showTime = that.props.channelId != that.state.channelId ? that.props.initTimeCount + 1 : that.state.current + 1;
        that.setState({
          current: showTime,
          time: that.formatTime(Math.floor(showTime / 3600)) + ':' + that.formatTime(Math.floor((showTime % 3600) / 60))  + ':' + that.formatTime(showTime % 60)
        })
      },1000);
      this.setState({
        start: this.props.start,
        tid: tid
      })
    }else{
      if(this.state.start && this.state.tid){
        clearInterval(this.state.tid);
        this.setState({
          start: false,
          tid: null
        })
      }
    }

  }

  render(){
    return (
      <Tooltip title="只累计两方以上视频沟通时间" overlayStyle={{width: 200}}>
      <span className={styles.normalTime} >
         计时:{this.state.time}
      </span>
      </Tooltip>
    );
  }
}

export default Fpartimer;
