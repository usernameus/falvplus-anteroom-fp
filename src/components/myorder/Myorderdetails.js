/**
 * Created by fapu on 17-2-27.
 */
import React, {Component} from "react";
import {Table, Popconfirm} from "antd";
import {TweenOneGroup} from "rc-tween-one";
import styles from "./Myorderdetails.css";

class MyorderdetailsList extends Component {

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

  render (){
    const {
      loading,
      dataSource,
      pagination,
    } = this.props
    const columns = [ {
      title: '产品名称',
      dataIndex:'productName',
      key: 'productName',
    },{
      title: '产品类型',
      dataIndex: 'productTypeStr',
      key: 'productTypeStr',
    },{
      title: '数量',
      dataIndex: 'buyCountStr',
      key: 'buyCountStr',
    },{
      title: '剩余数量',
      dataIndex: 'remainCountStr',
      key: 'remainCountStr',
    },{
      title: '单价',
      dataIndex: 'priceStr',
      key: 'priceStr',
    },{
      title: '' +
      '订单时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
    }];
    return <div>
      <Table className={styles.table} bordered  columns={columns} dataSource={dataSource} loading={loading} onChange={::this.pageChange} pagination={pagination} simple rowKey={record => record.id} getBodyWrapper={this.getBodyWrapper} />
    </div>
  }
}
export default MyorderdetailsList;
