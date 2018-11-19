
/**
 * Created by fapu on 17-6-26.
 */
import React, { PropTypes }  from 'react';
import {Button, Row,Icon,Input,Col,Radio} from 'antd';
const RadioGroup = Radio.Group;
class PayModal extends React.Component {
  constructor(props){
    super(props);

  }
  state = {
    value:0,
    verifyModal:false,
  };
  switchModalMethod = (e)=>{
    this.setState({verifyModal : e.target.value == '0' ? false : true,value:e.target.value});
  }
  render() {
    const {PayMethod,PaySum,Balance}=this.props
    return (
      <div>
        <Row>
          <Col lg={8}md={8}xs={8}>
            <h2>选择支付方式</h2>
          </Col>
          <Col  lg={16}md={16}xs={16}>
            <RadioGroup onChange={this.switchModalMethod} value={this.state.value}>
              {PaySum<=Balance?
                <Radio value={1} style={{fontSize:'17px'}} disabled={false}>余额支付</Radio>:
              <Radio value={1} style={{fontSize:'17px'}} disabled={true}>余额支付</Radio>}

              <Radio value={0} style={{fontSize:'17px',marginLeft:'15px'}}>在线支付</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <div><p style={{marginLeft:'80%',lineHeight:'30px'}}>支付: <span style={{fontSize:'1.5em', color: '#fe4d0f',marginLeft:'1em'}}>{PaySum}</span></p></div>
        <Button type="primary" size="large" style={{width:'8em',marginLeft:'80%',}} onClick={()=>PayMethod(this.state.verifyModal)}>去付款</Button>
      </div>
    );
  }
}
export default PayModal;
