/**
 * Created by zhihangjishu on 17/4/19.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import {Button,Card,Row, Col, Popconfirm} from 'antd';
import styles from './Scheduler.css'

class MangeModal extends Component{
  constructor(props) {
    super(props)
    this.state={
        verifyModal: false
    }
  }
  switchModalMethod = ()=>{
    this.setState({verifymodal : !this.state.verifymodal});
  }
  render() {
    const {
      onDeleteItem,
      showScheModal
      }=this.props
    const {
      verifymodal,
      } = this.state;
    return (
      <div>
        {verifymodal?
        <div>
          <Button type="primary" onClick={this.switchModalMethod} className={styles.mangeshe}>关闭我的预约日程</Button>
          <Button type="primary" onClick={showScheModal} className={styles.mangeshetime}>预约时间设定</Button>
          <ul className={styles.schelist}>
            {this.props.scheint.list && this.props.scheint.list.length > 0 ?
              this.props.scheint.list.map((data, index) => {
                const {id,appointmentTypeText,schTypeText,schTypeDetailText,beginTime,endTime}= data;
                return (
                  <a key={index} id={id} style={{color: 'gray', textDecorator: ''}}>
                    <Card key={index} style={{background: 'white', margin: '5px 0', padding: '10px'}}>
                      <Row>
                        <Col md={21} xs={24} style={{paddingLeft: '1em'}}>
                          <div>类型:{appointmentTypeText}</div>
                          <div>频率:{schTypeText}{schTypeDetailText}</div>
                          <div>时间:{beginTime}至{endTime}</div>
                        </Col>
                        <Col md={3} xs={24} style={{paddingLeft: '1em'}}>
                          <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem({id})}>
                            <a >删除</a>
                          </Popconfirm>
                        </Col>
                      </Row>
                    </Card>
                  </a>
                );
              })
              :''}
          </ul>
        </div>:
        <Button type="primary"  onClick={this.switchModalMethod} className={styles.mangeshe}>管理我的预约日程</Button>
        }

      </div>
    );
  }
}
export default MangeModal;
