import React from 'react';
import { connect } from 'dva';
import styles from './MyFinances.less';
import {Card,Row, Col} from 'antd';


function Finances({MyFinances}) {
  const {MyFinancesList}=MyFinances

  return (
    <div className={styles.normal}>
      <ul>
        {MyFinancesList && MyFinancesList.length > 0 ?
          MyFinancesList.map((data, index) => {
            const {opDatetime,opTypeStr,opAmount,opOtherSideName} = data;
            return (
              <a key={index} style={{color: 'gray', textDecorator: ''}}>
                <Card key={index} style={{background: 'white', margin: '5px 0', padding: '10px'}}>
                  <Row>
                    <Col md={12} xs={24}>
                      <div>操作时间:{opDatetime}</div>
                      <div>操作类型:{opTypeStr}</div>
                      <div>操作金额:{opAmount}</div>
                      <div>操作对象:{opOtherSideName}</div>
                    </Col>
                    {/*<Col md={12} xs={24} style={{paddingLeft: '1em'}}>*/}
                      {/*<div style={{fontSize: '1.5em'}}>小计:{orderAmountStr}</div>*/}
                      {/*<div>订单状态:{orderStatusStr}</div>*/}
                      {/*<div>律师留言:{noteToBuyer}</div>*/}
                    {/*</Col>*/}
                  </Row>
                </Card>
              </a>
            );
          })
          :''}
      </ul>
    </div>
  );
}

function mapStateToProps({MyFinances}) {
  return {MyFinances};
}

export default connect(mapStateToProps)(Finances);
