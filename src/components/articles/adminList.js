/**
 * Created by fapu on 17-2-27.
 */
import React from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './adminList.css'

class AdminList extends React.Component {
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
    const {current} = this.props.pagination
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
      editHref,
      loading,
      dataSource,
      pagination,
      onDeleteItem,
    } = this.props
    const columns = [{
      title: '封面',
      dataIndex: 'articleCover',
      key: 'articleCover',
      render: (text, record) => (
        <img src={record.articleCover} style={{maxHeight:40, maxWidth:80}}/>
      )
    },{
      title: '标题',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
      render: (text) => <p className="articleText" style={{textAlign:'left'}}>{text}</p>
    },  {
        title: '发布时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },{
      title: '浏览数',
      width: 64,
      dataIndex: 'browseNumber',
      key: 'browseNumber',
    },{
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => (
          <p>
            <a href={editHref + record.id}>编辑</a>
            <span className="ant-divider"/>
            <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)} overlayStyle={{width: 150}}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered columns={columns} dataSource={dataSource} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.id} getBodyWrapper={this.getBodyWrapper} />
    </div>
  }
}

export default AdminList;
