/**
 * Created by fapu on 17-5-27.
 */
import React, {Component} from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import {apisource} from '../../utils/config';
const Option = Select.Option;

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    // this.fetchData = debounce(this.fetchData, 800);
    this.state = {
      initContacts:[],
      // contacts: [],
      data: [],
      value: [],
      // fetching: false,
      inputText: '',
      chilren:[]
    }
  }

  // fetchData = (value) => {
  //   this.lastFetchId += 1;
  //   const fetchId = this.lastFetchId;
  //   this.setState({fetching: true});
  //   fetch(apisource + '/api/crm/checkContacts/' + value)
  //     .then(response => response.json())
  //     .then((body) => {
  //       if (fetchId !== this.lastFetchId) {
  //         return;
  //       }
  //       const data = body.map((user) => ({
  //         userId: user.id,
  //         phone: user.phone,
  //         email: user.email,
  //         name: user.contactName,
  //         fetching: false
  //       }));
  //       this.setState({contacts: data});
  //     });
  // }

  handleChange = (value) => {
    var result = value.filter((e, index, self) => self.indexOf(e) === index)
      .map(({key,label}) => {
      if(key === label){
        return this.getKeyLabel(label);
      }else{
        return {key: '' + key, label};
      }
    });
    this.setState({value: result, inputText: ''});
    this.triggerChange(result);
  }

  getKeyLabel = (label) => {
      const keyValue = this.state.initContacts.filter(({userId, phone, email, name})=> (label == phone || label == email || label == name));
      if(keyValue.length > 0){
        return {key: keyValue[0].userId + '', label: keyValue[0].name};
      }else{
        return {key:label, label};
      }
  }

  triggerChange = (value) => {
    // const contacts = this.state.initContacts.filter(({userId}) => this.state.value.filter(({key}) => key == userId).length == 0);
    // this.setState({contacts});
    const onChange = this.props.onChange;
    if(onChange){
      onChange(Object.assign([], value));
    }
  }

  onSearch = (inputValue) => {
    this.setState({
      inputText: inputValue
    })

  }

  componentDidMount = () => {
    this.QueryUser();
  }

  QueryUser = () => {
    // this.setState({ fetching: true });
    fetch(apisource +'/api/crm/checkContactsAll')
      .then(response => response.json())
      .then((body) => {

        // const data = body.map(user => ({
        //   text: `${user.contactName}`,
        //   value: user.id,
        //   fetching: false,
        // }));
        const initContacts = body.map((user)=>({
          userId: user.id,
          phone: user.phone,
          email: user.email,
          name: user.contactName,
          type:user.firmLawyer
        }))
        // const existsUserIds = this.props.existsUsers.map(u=>u.userId);
        // const contacts = body.filter(user=>existsUserIds.indexOf(user.id) < 0).map(user=>({
        //   userId: user.id,
        //   phone:user.phone,
        //   email:user.email,
        //   name: user.contactName
        // }));
        const existsUsers = this.props.existsUsers;
        const contacts = initContacts.filter((user)=>existsUsers.filter(u=>u.userId === user.userId).length === 0);
        const children = [];
        contacts.forEach(d => children.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.type}>{d.name}</Option>))
        this.setState({initContacts, children});
      });
  }

  onBlurChange=()=>{
    if(this.state.inputText != ''){
      var value = this.state.value;
      value.push(this.getKeyLabel(this.state.inputText));
      this.setState({value, inputText:''})
      this.triggerChange(value);
    }
  }
  onFilter = (inputValue, option) => {

    const phone = option.props.attributes['data-phone'];
    const email = option.props.attributes['data-email'];
    if(phone && phone.in_array(this.state.value)
      || email && email.in_array(this.state.value)
      || option.props.title  && option.props.title.in_array(this.state.value)){
      return false;
    }
    if(phone && phone.indexOf(inputValue) >= 0 && phone !== inputValue ){
      return true;
    }
    if(email && email.indexOf(inputValue) >= 0 && email !== inputValue ){
      return true;
    }
    if(option.props.title && option.props.title.indexOf(inputValue) >= 0  && option.props.title !== inputValue){
      return true;
    }

    return false;
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(nextProps.initShow != this.props.initShow){
        const existsUsers = this.props.existsUsers;
        const contacts = this.state.initContacts.filter((user)=>existsUsers.filter(u=>u.userId === user.userId).length === 0);
        const children = [];
        contacts.forEach(d => children.push(<Option key={'k' + d.userId} value={d.userId.toString()} attributes={{'data-email': d.email, 'data-phone': d.phone}} title={d.name}>{d.name}</Option>))
        // this.setState({children, value:[]});
      nextState.children = children;
      nextState.value = [];
    }
    return true;
  }


  render() {
    const { children, value } = this.state;
    const showValue = value.filter(({key,label}) => this.props.existsUsers.filter(u=>u.userId == key) == 0);
    return (
      <div>
        <Select mode="tags" tokenSeparators={[',',';',' ']} placeholder="联系人、手机号、邮箱"  labelInValue={true}
                value={showValue} onSearch={this.onSearch}
                onChange={this.handleChange} filterOption={this.onFilter} onBlur={this.onBlurChange}>
          {children}
        </Select>
        <p style={{color:'#666666'}}>提示:选择现有联系人或直接输入新联系人的手机号码、邮箱,输入多个可用;分隔</p>
      </div>
    );
  }
}

export default UserRemoteSelect;
