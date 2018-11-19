/**
 * Created by fapu on 17-7-27.
 */
import React, {Component} from 'react';
import {Modal, Button,Card,Row,Col,Icon,Progress} from 'antd';
import styles from './FinanceDash.css';
class PackageInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    const {packageInfo,onPackage} = this.props;
    return (
      <div className={styles.normal}>
        {packageInfo?
        <Card title="套餐余量">
          <Row gutter={16}>
            <Col lg={8}>
              <Card style={{height:198}} title={<span style={{fontSize:'16px',color:'#999999'}}><Icon type="clock-circle"style={{color:'#999999'}} />&nbsp;套餐期限</span>} >
                <p style={{fontSize:'14px',color:'#333333',lineHeight:'25px'}}>开始时间:{packageInfo.flaWebPayPackage.startTime}</p>
                <p style={{fontSize:'14px',color:'#333333',lineHeight:'25px'}}>结束时间:{packageInfo.flaWebPayPackage.endTime}</p>
              </Card>
            </Col>
            <Col lg={8}>
              <Card  style={{height:198}} title={<span style={{fontSize:'16px',color:'#999999',paddingRight:'10px'}}><Icon type="message"style={{color:'#999999'}} />&nbsp;短信</span>}extra={<Button onClick={()=>onPackage(1)} size='small'>详情</Button>} >
                <div>
                <Progress percent={(packageInfo.smsSpend/packageInfo.smsTotal)*100} strokeWidth={25} style={{position:'relative'}}showInfo={false}status={(packageInfo.smsSpend/packageInfo.smsTotal)*100>95?"exception":'active'}/>
                <div style={{position:'absolute',top:'76px',left:'27px',color:'black'}}>{packageInfo.smsSpend}条/{packageInfo.smsTotal}条</div>
                <p style={{fontSize:'14px',color:'#333333',lineHeight:'25px'}}>剩余短信：{packageInfo.smsTotal-packageInfo.smsSpend}条</p>
                </div>
              </Card>
            </Col>
            <Col lg={8}>
              <Card  style={{height:198}} title={<span style={{fontSize:'16px',color:'#999999',paddingRight:'10px'}}><Icon type="hdd"style={{color:'#999999'}} />&nbsp;存储</span>} extra={<Button onClick={()=>onPackage(2)} size='small'>详情</Button>} >
                <Progress percent={(packageInfo.ccSpend/(packageInfo.ccTotal))*100} strokeWidth={25} style={{position:'relative'}}showInfo={false}status="exception"/>
                <div style={{position:'absolute',top:'76px',left:'27px',color:'black'}}>{packageInfo.showCcSpend}/{packageInfo.ccTotal}GB</div>
                <p style={{fontSize:'14px',color:'#333333',lineHeight:'25px'}}>剩余空间：{packageInfo.ccTotal-Number(packageInfo.ccSpend).toFixed(2)}GB</p>
              </Card>
            </Col>
          </Row>
        </Card>
          :''}
      </div>
    );
  }
}

export default PackageInfo;
