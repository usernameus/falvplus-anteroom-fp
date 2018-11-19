import React, {Component} from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './BusinessDomain.css';

class BusinessDomains extends Component {
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
    const {queryEdit,onDeleteItem,list,pagination,loading} = this.props
    const columns = [
      {
        title: '业务名称',
        dataIndex: 'businessStr',
        key: 'businessStr',
        width: 100,
      },
      {
        title: '业务简介',
        dataIndex:'briefIntroduction',
        key: 'briefIntroduction',
        width: 100,
      },
      {
        title: '业务详情',
        dataIndex:'businessDetails',
        key: 'businessDetails',
        width: 100,
      },
      {
        title: '相关律师',
        key: 'domainLawyers',
        width: 100,
        render: (text, record) => (
          record.domainLawyers && record.domainLawyers.map((item,index)=>{
            return (
              <span key={index} style={{padding:'0 5px'}}>{record.domainLawyers[index].lawyerStr}</span>
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
            <a onClick={() => queryEdit(record.id)}>编辑</a>
            <span className="ant-divider"/>
            <Popconfirm title='确定要删除吗' onConfirm={() => onDeleteItem(record.id)} overlayStyle={{width: 150}}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )
      }];

    return <div>
      <Table  className={styles.table} bordered columns={columns} dataSource={list} pagination={pagination} loading={loading} simple rowKey={record => record.id} onChange={::this.pageChange} getBodyWrapper={this.getBodyWrapper}/>
    </div>
  }
}
export default BusinessDomains;

