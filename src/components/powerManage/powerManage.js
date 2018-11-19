/**
 * Created by fapu on 17-2-27.
 */
import React, {Component} from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './powerManage.css'

class PowerManage extends Component {

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
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 155,
      render: text => <a href="#">{text}</a>,
    },  {
      title: '产品类型',
      dataIndex: 'productTypeId',
      key: 'productTypeId',
      width: 75,
    },
      {
      title: '产品购买类型',
      dataIndex:'productPurchaseTypeStr',
      key: 'productPurchaseTypeStr',
      width: 75,
     },
      {
      title: '产品价格',
      //dataIndex:'shopPriceY',
      key:'shopPriceY',
      width: 75,
      render:(text,record)=>(<div>{record.custom==0?record.shopPriceY:record.minPriceY+'-'+record.maxPriceY}</div>)
    },{
      title: '价格单位',
      dataIndex:'unitStr',
      key: 'unitStr',
      width: 75,
    },
    //  {
    //  title: '总份数',
    //  dataIndex: 'productNumber',
    //  key: 'productNumber',
    //  width: 75,
    //},
      {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 75,
    },
    //   {
    //   title: '简介',
    //   dataIndex: 'productBrief',
    //   key: 'productBrief',
    //     render:(text,record)=>(<div style={{textAlign:'left'}}>{record.productBrief}</div>)
    // },
    //  {
    //  title: '描述',
    //  dataIndex: 'productDesc',
    //  key: 'productDesc',
    //},
    //  {
    //  title: '是否开放销售',
    //  dataIndex: 'onSale',
    //  key: 'onSale',
    //  width: 75,
    //  render:(text,record) => (
    //    <span>
    //    {text? '是'
    //      :'否'}
    //      </span>
    //  )
    //
    //},
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
 export default PowerManage;
