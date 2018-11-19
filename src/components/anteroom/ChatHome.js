import React,{Component} from 'react';
import {Card, Tabs, Table} from 'antd';

const TabPane = Tabs.TabPane;
const {Column, ColumnGroup} = Table;
const Cookie = require('js-cookie');

class ChatHome extends Component{
  constructor(){
    super();
    this.state = {
      currentChannelsTab: "1",
      gettingChannels: false,
      currentTablePag:1
    }
  }

  componentDidUpdate = () => {
    if(this.props.roomConnected && !this.state.gettingChannels){
      this.props.getAllChannels();
      this.setState({
        gettingChannels: true
      })
    }
  }

  channelsTabChange = (value) => {
    this.setState({
      currentChannelsTab: value
      })
  }
  TableChange= (value) => {
    this.setState({
      currentTablePag: value.current
    })
  }

  handleChangeChannel = (channelId) => {
    this.props.onchangeChannel(channelId);
  }

  handleshowChannel= (channelId) => {
    this.props.showChannel(channelId);
  }

  render(){
    const {channelsCount, channels, changeChannel} = this.props;
    const columns = [{
      key:'channelName',
      title: '频道名称',
      className: 'channelname',
      render: ({channelId,channelName}) => <a onClick={this.handleChangeChannel.bind(null, channelId)}>{channelName}</a>
    },
      {
        key: 'op',
        title: '操作',
        className: 'channelsOp',
        render: ({channelId}) => <div>
         <a onClick={this.handleChangeChannel.bind(null, channelId)}>打开频道</a>
        </div>
      }
    ]

    const columnm = [
      {
        key:'channelName',
       title: '频道名称',
        className: 'channelname',
      render: ({channelId,channelName}) => <a>{channelName}</a>
    },
      {
        key:'op',
        title: '操作',
        className: 'channelsOp',
        render: ({channelId}) => <div>
          <a onClick={this.handleshowChannel.bind(null, channelId)}>取消隐藏</a>
        </div>
      }
    ]

    const processingData = channels.filter(c=>c.orders.length == 0  || c.orders.filter(o=>o.orderStatus < 3).length > 0) ;
    const completedData = channels.filter(c=>c.orders && c.orders.filter(o=>o.orderStatus > 2).length > 0);
    const hidechannelData = channels.filter(c=>c.channelState == '2') ;


    const processingPagination = {
      total:processingData.length || 0,
      pageSize: 5,
      defaultCurrent: 1
    }
    const completePagination = {
      total: completedData.length || 0,
      pageSize: 5,
      defaultCurrent: 1
    }
    const hidechannelPagination = {
      total: hidechannelData.length || 0,
      pageSize: 5,
      defaultCurrent: this.state.currentTablePag
    }


    const ChannelsTable = ({pagination,data}) => <Table pagination={pagination} dataSource={data} columns={columns} rowKey="channelId"></Table>
    const HideChannelsTable = ({pagination,data}) => <Table pagination={pagination} dataSource={data} columns={columnm} rowKey="channelId"  onChange={this.TableChange}></Table>
    return (
      <div style={{background:'white',height: '100%',padding:'10px',overflowY:'scroll'}}>
        <Card title="快捷链接">
          <a href="/" style={{margin: 10}}>回首页</a>
          {Cookie.get('r') == 9 ?
            <a href="/admin">后台管理</a>
          :''}
        </Card>
        <Card>
          频道数量: {channelsCount}
          <Tabs defaultActiveKey={this.state.currentChannelsTab} onChange={this.channelsTabChange}>
            <TabPane tab={'进行中('+processingPagination.total + ')'} key="1">
              <ChannelsTable pagination={processingPagination} data={processingData}/>
            </TabPane>
            <TabPane tab={'已结案(' + completePagination.total + ')'} key="2">
               <ChannelsTable pagination={completePagination} data={completedData}/>
            </TabPane>
            {/*<TabPane tab="联系人" key="3"/>*/}
            <TabPane tab={'已隐藏(' + hidechannelPagination.total +')'} key="4">
              <HideChannelsTable  pagination={hidechannelPagination} data={hidechannelData}/>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );

  }
}

export default ChatHome;
