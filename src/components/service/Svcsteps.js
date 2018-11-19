import React from 'react';
import {Steps} from 'antd';
import styles from './Svcsteps.css';

function Svcsteps(props) {
  const Step = Steps.Step;
  const {currentStep} = props;
  return (
    <div className={styles.normal}>
      <Steps current={currentStep || 0} className={styles.stepDiv}>
        <Step title="意向订单" description=""/>
        <Step title="协商定价" description=""/>
        <Step title="付款到法仆网" description=""/>
        <Step title="开始法律服务" description=""/>
        <Step title="确认服务完成" description=""/>
        <Step title="评价我的服务" description=""/>
      </Steps>
    </div>
  );
}

export default Svcsteps;
