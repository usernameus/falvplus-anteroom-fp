import React,{Component} from 'react';
import { Card, Col, Row } from 'antd';
import styles from './customersProfile.less'
class Panorama extends Component {
  constructor(props){
    super(props);

  }


  render(){
    const {} = this.props;
    return (
      <div className={styles.panorama}>
        <Row>
          <Col span="12">
            <Card title="基本资料" bordered={false}>Card content</Card>
            <Card title="联系人" bordered={false}>Card content</Card>
            <Card title="交易数据" bordered={false}>Card content</Card>
          </Col>
          <Col span="12">
            <Card title="跟进记录" bordered={false}extra={<a href="#">+写跟进</a>}style={{ marginLeft: 8 }}>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Panorama;
