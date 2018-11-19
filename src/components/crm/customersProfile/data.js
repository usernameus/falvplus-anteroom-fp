/**
 * Created by fapu on 17-4-13.
 */
import React,{Component} from 'react';
import { Card, Col, Row } from 'antd';
class Data extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      customerName,customerTypeText, tel, email, fax, homePage, address, post,
      followStatusText, sourceText, industryText, scaleText, nextFollow, memo
    } = this.props;
    return (
      <div>
        <Row>
          <Col span="12">
            <Card title="基本信息" bordered={false}>
              <div>
                <p>客户名称:{customerName}</p>
                <p>客户类型:{customerTypeText}</p>
              </div>
            </Card>
            <Card title="联系信息" bordered={false}>
              <p>电话:{tel}</p>
              <p>邮箱:{email}</p>
              <p>传真:{fax}</p>
              <p>网址:{homePage}</p>
              <p>地址:{address}</p>
              <p>邮编:{post}</p>
            </Card>
            <Card title="其他信息" bordered={false}>
              <p>跟进状态:{followStatusText}</p>
              <p>客户来源:{sourceText}</p>
              <p>所属行业:{industryText}</p>
              <p>人员规模:{scaleText}</p>
              <p>下次跟进时间:{nextFollow > 0 ? new Date(nextFollow).format('yyyy-MM-dd HH:mm') : ''}</p>
              <p>备注:{memo}</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Data;
