/**
 * Created by fapu on 17-2-27.
 */
import React, {Component} from 'react'
import {Table, Popconfirm,Tag} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './lawyerList.css'

class LawyerList extends Component {

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
    this.newPage = pagination.current || 1
  }

  render (){
    const {
      loading,
      dataSource,
      pagination,
      onDeleteItem,
      onEditItem
      } = this.props
    const columns = [
      {
        title: '律师头像',
        dataIndex: 'picture',
        key: 'picture',
        width: 155,
        render: (text, record) => (
          <img src={record.picture} style={{maxHeight:40, maxWidth:80}}/>
        )
      },
      {
      title: '律师姓名',
      dataIndex: 'name',
      key: 'name',
      width: 155,
    },  {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
      {
      title: '职位',
      dataIndex:'duty',
      key: 'duty',
      width: 75,
     },
      {
        title: '专业领域',
        dataIndex:'webmajors',
        key: 'webmajors',
        width: 150,
        render: (text, record) => (
          record.webmajors && record.webmajors.map((item,index)=>{
            return (
              <span key={index} style={{padding:'0 5px'}}>{item.label}</span>
            )
          })
        )
      },
      {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <a onClick={() => onEditItem(record)} >编辑</a>
          <span className="ant-divider"/>
          <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)} overlayStyle={{width: 150}}>
            <a> 删除</a>
          </Popconfirm>
        </p>
      )
    }];

    return <div>
    <Table className={styles.table} bordered columns={columns} dataSource={dataSource} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.id} getBodyWrapper={this.getBodyWrapper} />
  </div>
  }
}
 export default LawyerList;
