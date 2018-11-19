import React, {Component} from 'react';
import styles from './ChannelIcon.css';
import classnames from 'classnames';

export default class ChannelIcon extends Component{
    render(){
        const {imgPath,changeBillChannel,selected,channel} = this.props;
        return (
            <img alt="支付渠道" className={selected ? styles.channelIconSelected : styles.channelIcon}  onClick={()=>changeBillChannel(channel)}  src={imgPath} />
        )
    }
}
