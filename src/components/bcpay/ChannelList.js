import React, {Component} from 'react';
import ChannelIcon from './ChannelIcon';

export default class ChannelList extends Component{
    render() {
        const {channels,currentChannel,changeBillChannel} = this.props;
        return (
            <div className="channels-wrapper">
                {channels.map((item, index) =>
                    <ChannelIcon changeBillChannel={changeBillChannel} selected={item.name===currentChannel} channel={item.name} imgPath={item.imgPath} key={index}/>
                ) }
            </div>
        )
    }
}
