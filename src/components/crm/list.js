import React from 'react'
import {Table, Popconfirm,Button} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './list.less'
const Cookie = require('js-cookie');

class list extends React.Component {
  constructor (props) {
    super(props)
    this.enterAnim = [
      {
        opacity: 0,
        x: 30,
        backgroundColor: '#fffeee',
        duration: 0
      }, {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd
      }, {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: 'easeOutQuad'
      }, {
        delay: 1000,
        backgroundColor: '#fff'
      }
    ]
    this.leaveAnim = [
      {
        duration: 250,
        opacity: 0
      }, {
        height: 0,
        duration: 200,
        ease: 'easeOutQuad'
      }
    ]
    const {current} = props.pagination
    this.currentPage = current
    this.newPage = current
  }

  getBodyWrapper = (body) => {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage
      return body
    }
    return (
      <TweenOneGroup component='tbody' className={body.props.className} enter={this.enterAnim} leave={this.leaveAnim} appear={false}>
        {body.props.children}
      </TweenOneGroup>
    )
  }

  onEnd = (e) => {
    e.target.style.height = 'auto'
  }

  async pageChange (pagination) {
    await this.props.onPageChange(pagination)
    this.newPage = pagination.current
  }


  render () {
    const {
      loading,
      dataSources,
      pagination,
      onDeleteItem,
      onEditItem,
      onShare,
      onAddcontact,
      onAddfollowup
    } = this.props

    const columns = [
      {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 150,
        className: styles.avatar,
        render: (text, record) => <a href={'crm/'+record.customerId}>{text}</a>,
      }, {
        title: '客户类型',
        dataIndex: 'customerTypeName',
        key: 'customerTypeName'
      }, {
        title: '联系人',
        dataIndex: 'contactNames',
        key: 'contactNames',
        width: 300,
        render: (text,record) => <div>
          {record.contactResults.map((item, index) => {
            return <a key={index} style={{marginRight:'1em'}} href={"/admin/contactsProfile/" + item.contactId}>{item.contactName}</a>
          })}
        </div>,

      }, {
        title: '跟进状态',
        dataIndex: 'followStatusText',
        key: 'followStatusText',
      }, {
        title: '最新跟进记录',
        dataIndex: 'followContent',
        key: 'followContent',
        width: 150,
        render: (text,record) => <div><Button size='small'onClick={() => onAddfollowup(record.customerId)}>+</Button><span>{text}</span></div>,
      }, {
        title: '实际跟进时间',
        dataIndex: 'followTime',
        key: 'followTime',
        render:(date, record) => <span>{date > 0 ? new Date(date).format('MM-dd HH:mm'):''}</span>
      }, {
        title: '下次跟进时间',
        dataIndex: 'nextFollowTime',
        key: 'nextFollowTime',
        render:(date, record) => <span>{date >0 ? new Date(date).format('MM-dd HH:mm'):''}</span>
      },{
        title: '操作',
        key: 'operation',
        width: 250,
        render: (text, record) => (
          <p>
            <a onClick={() => onEditItem(record.customerId)}>编辑</a>
            <span className="ant-divider"/>
            <Popconfirm title='确定要删除吗？' overlayStyle={{width: 150}} onConfirm={() => onDeleteItem(record.customerId)}>
              <a>删除</a>
            </Popconfirm>
            {(Cookie.get('webType') == 0 && Cookie.get('parlorState') == 1 )?<span>
              { record.toGrant == 1 ? <span>
                <span className="ant-divider"/>
                <a onClick={() => onShare({type:1,granType:0,contactsId:record.customerId})}>授权到律所</a>
              </span> : <span>
                <span className="ant-divider"/>
                 <a style={{color:'lightgray'}} onClick={() => onShare({type:1,granType:1,contactsId:record.customerId})}>取消授权</a>
              </span>}
          </span> : ''}
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered columns={columns} dataSource={dataSources} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.customerId} getBodyWrapper={this.getBodyWrapper} />
    </div>
  }
}

export default list
