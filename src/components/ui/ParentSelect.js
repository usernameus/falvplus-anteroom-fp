/**
 * Created by fapu on 17-5-27.
 */
import React, {Component} from 'react';

import { Select, Spin } from 'antd';
import {apisource} from '../../utils/config';
const Option = Select.Option;

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      data: [],
      value: [],
      fetching: false,
    }
  }

  componentDidMount = () => {
    this.QueryUser();
  }



  QueryUser = () => {
    this.setState({ fetching: true });
    fetch(apisource +'/api/channel/channelList')
      .then(response => response.json())
      .then((body) => {
        const data = body.map(user => ({
          text: `${user.contactName}`,
          value: user.channelId,
          fetching: false,
        }));
        const existsUserIds = this.props.existsUsers.map(u=>u.userId);
        const contacts = body.filter(user=>existsUserIds.indexOf(user.channelId) < 0).map(user=>({
          ChannelId: user.channelId,
          name: user.channelNickName
        }));
        this.setState({ data, contacts });
      });
  }
  handleChange = (value) => {
    this.props.onChange(value)
  }
  onFilter = (inputValue, option) => {

    console.log(inputValue);
    console.log(option);
    const phone = option.props.attributes['data-phone'];
    const email = option.props.attributes['data-email'];
    if(phone && phone.indexOf(inputValue) >= 0){
      return true;
    }
    if(email && email.indexOf(inputValue) >= 0){
      return true;
    }
    if(option.props.title && option.props.title.indexOf(inputValue) >= 0){
      return true;
    }

    return false;
  }
  render() {
    const { fetching, data, value, contacts } = this.state;
    return (
      <div>
        <Select  tokenSeparators={[',',';',' ']} labelInValue={true} placeholder="选择一个父频道"
            filterOption={this.onFilter} onChange={this.handleChange}>
          {contacts.map(d => <Option key={d.ChannelId} value={d.ChannelId.toString()} attributes={{'data-name': d.name}} title={d.name}>{d.name}</Option>)}
        </Select>
      </div>
    );
  }
}

export default UserRemoteSelect;
