
import React, {Component} from 'react'
import {Table} from 'antd'
import styles from '../Myproducts/Myproducts.css'

class Schedule extends Component {
  constructor (props) {
    super(props)

  }
  render (){
    const {
      onAddItem,
      list
      } = this.props
    const columns = [ {
      title: '',
      dataIndex: 'empty',
      key: 'empty',
      width: 50,
    }, {
      title: '星期一',
      dataIndex:'monday',
      key: 'monday',
      render: (text, record) => (
        <div>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </div>
      )
    },{
      title: '星期二',
      dataIndex: 'tuesday',
      key: 'tuesday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    },  {
      title: '星期三',
      dataIndex: 'wednesday',
      key: 'wednesday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem(record)} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    }, {
      title: '星期四',
      dataIndex:'thursday',
      key:'thursday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    },{
      title: '星期五',
      dataIndex:'friday',
      key: 'friday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    },{
      title: '星期六',
      dataIndex: 'saturday',
      key: 'saturday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    },{
      title: '星期日',
      dataIndex: 'sunday',
      key: 'sunday',
      render: (text, record) => (
        <p>
          <a onClick={() => onAddItem()} style={{
              marginRight: 4
            }}>1</a>
        </p>
      )
    }];
    const data = [{
      key: '1',
      empty:'0',

    }, {
      key: '2',
      empty:'1',
      monday:'',
      tuesday:'',
      wednesday:''
    }, {
      key: '3',
      empty:'2',
    }, {
      key: '4',
      empty:'3',
    }, {
      key: '5',
      empty:'4',
    }, {
      key: '6',
      empty:'5',
    }, {
      key: '7',
      empty:'6',
    }, {
      key: '8',
      empty:'7',
    }, {
      key: '9',
      empty:'8',
    }, {
      key: '10',
      empty:'9',
    }, {
      key: '11',
      empty:'10',
    }, {
      key: '12',
      empty:'11',
    }, {
      key: '13',
      empty:'12',
    }, {
      key: '14',
      empty:'13',
    }, {
      key: '15',
      empty:'14',
    }, {
      key: '16',
      empty:'15',
    }, {
      key: '17',
      empty:'16',
    }, {
      key: '18',
      empty:'17',
    }, {
      key: '19',
      empty:'18',
    }, {
      key: '20',
      empty:'19',
    }, {
      key: '21',
      empty:'20',
    }, {
      key: '22',
      empty:'21',
    }, {
      key: '23',
      empty:'22',
    }, {
      key: '24',
      empty:'23',
    }];

    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 2000, y:1200
      }} columns={columns} dataSource={data} pagination={false}/>
    </div>
  }
}
export default Schedule;
