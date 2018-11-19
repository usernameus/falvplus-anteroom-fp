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
    const {current} = props.pagination;
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
      pagination,
      dataSource,
      onDeleteItem,
      onDeleteChannel,
      onEditItem,
      onShare
    } = this.props
    const columns = [
      {
        title: '姓名',
        dataIndex: 'contactName',
        key: 'contactName',
        className: styles.avatar,
        render: (text, record) => <a href={'/admin/contactsProfile/'+record.id}>{text}</a>,
      }, {
        title: '对应客户',
        dataIndex: 'customerName',
        key: 'customerName',
        render: (text, record) => <a href={'/admin/crm/' + record['customerId']}>{record['customerName']}</a>
      }, {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '部门',
        dataIndex: 'depart',
        key: 'depart',
      }, {
        title: '职务',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
      }, {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={() => onEditItem(record.id)}>编辑</a>
            <span className="ant-divider"/>
            <a onClick={() => onDeleteItem(record.userId)}>删除</a>
            <span className="ant-divider"/>
            <a onClick={() => onDeleteChannel(record.userId)}>频道管理</a>
            {(Cookie.get('webType') == 0 && Cookie.get('parlorState') == 1 )?<span>
              { record.toGrant == 1 ? <span>
                <span className="ant-divider"/>
                <a onClick={() => onShare({type:0,granType:0,contactsId:record.id})}>授权到律所</a>
              </span> : <span>
                <span className="ant-divider"/>
                 <a style={{color:'lightgray'}} onClick={() => onShare({type:0,granType:1,contactsId:record.id})}>取消授权</a>
              </span>}
          </span> : ''}
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered  columns={columns} dataSource={dataSource} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.id} getBodyWrapper={this.getBodyWrapper} />
    </div>
  }
}

export default list
