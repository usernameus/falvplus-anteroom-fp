
/**
 * Created by fapu on 17-2-27.
 */
import React, {Component} from 'react'
import {Table, Popconfirm,Tag} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './anteroomManage.css'

class AnteroomManage extends Component {

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
        title: '律师姓名',
        dataIndex: 'lawyerName',
        key: 'lawyerName',
        width: 155,
      },
      {title: '会客室名称',
        dataIndex:'siteName',
        key: 'siteName',
        width: 75,
      },
      {title: '会客室域名',
        dataIndex:'domainName',
        key: 'domainName',
        width: 150,
        render:(text,record)=>(<a href={'http://'+record.domainName}  style={{textAlign:'left'}}>{record.domainName}</a>)
      },
      {
        title: '业务领域',
        dataIndex:'businessStr',
        key: 'businessStr',
        width: 150,
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
export default AnteroomManage;
