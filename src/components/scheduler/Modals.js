/**
 * Created by zhihangjishu on 17/4/19.
 */
import React, {Component} from 'react'
import { Input,Form,Button } from 'antd'
import Schedule from './ScheduleDetail'
import styles from './Scheduler.css'

class modals extends Component{
  constructor(){
    super();
    this.state =  {
      verifymodal : false
    };
  }
  switchModalMethod = ()=>{
    this.setState({verifymodal : !this.state.verifymodal});
  }
  render() {
    const {
      verifymodal,
      } = this.state;
    return (
      <div>
        <Button onClick={this.switchModalMethod} className={styles.weekplay}>周</Button>
        {verifymodal ?
          <div>
            <Button onClick={this.switchModalMethod} className={styles.hideweek}>关闭</Button>
            <Schedule/>
          </div>
          : ''}
      </div>
    )
  }
}

export default Form.create()(modals)
