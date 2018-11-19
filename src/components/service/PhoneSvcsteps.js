import React from 'react';
import {Steps,Row,Col} from 'antd';
import styles from './Svcsteps.css';

function Svcsteps(props) {
  const Step = Steps.Step;
  const {currentStep} = props;
  return (
    <div className={styles.normal}>
      <Row>
        <Col xs={0} sm={24} md={24} lg={24} >
      <Steps current={currentStep || 0} className={styles.stepDiv}>
        <Step title="填写咨询问题" description=""/>
        <Step title="去付款" description=""/>
        <Step title="订单详情" description=""/>
        <Step title="评价我的服务" description=""/>
      </Steps>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={0} md={0} lg={0} style={{marginTop:'25px',marginLeft:'10px'}}>
      <Steps direction="vertical" current={currentStep || 0}>
        <Step title="填写咨询问题" description="" />
        <Step title="去付款" description="" />
        <Step title="订单详情" description="" />
        <Step title="评价我的服务" description="" />
      </Steps>
        </Col>
      </Row>
    </div>
  );
}

export default Svcsteps;
