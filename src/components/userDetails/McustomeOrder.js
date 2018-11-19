/**
 * Created by zhihangjishu on 17/5/19.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './customerOrder.less';
import {Card,Row, Col} from 'antd';


function MyOrder({myorderList}) {
  function redirect(url){
    window.location.href = url;
  }
  return (
    <div className={styles.normals}>
      <ul>
        {myorderList && myorderList.length > 0 ?
          myorderList.map((data, index) => {
            const {lawyerName,orderAmountStr,orderName,orderPhone,orderSn,orderStatusStr,productsAmount,noteToBuyer,channelId} = data;
            return (
              <a key={index} style={{color: 'gray', textDecorator: ''}}>
                <Card key={index} style={{background: 'white'}}>
                  <table className={styles.mcustom}>
                    <tbody>
                    <tr className={styles.mcustom_tr}>
                      <td className={styles.lawyername}>
                        <div><img/></div>
                        <div className={styles.law_div}>
                          <p className={styles.lawnames}>{lawyerName}</p>
                        </div>
                        <div className={styles.clearfix}></div>
                      </td>
                      <td className={styles.ordersn}><p>订单号:{orderSn}</p></td>
                    </tr>
                    </tbody>
                  </table>
                  <table className={styles.mcustoms}>
                    <tbody>
                    <tr>
                      <td className={styles.td_one}><p>价格:{orderAmountStr}</p></td>
                      <td className={styles.td_two}>
                        <p>{orderStatusStr}</p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <Col md={6}  xs={24} >
                    {channelId ?<div onClick={redirect.bind(null, 'anteroom#' + channelId)}>进入频道>></div> :''}
                  </Col>
                </Card>
              </a>
            );
          })
          :''}
      </ul>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MyOrder);
