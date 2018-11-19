/**
 * Created by fapu on 17-6-26.
 */
import React, { PropTypes }  from 'react';
import {Button, Row,Icon,Input,Col,Radio,Form,Modal} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class PayModal extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    newKey:'',
    verifyModal:false,
    value:1,
    passwordVisible:false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          password: values.password,
          verifyModal:this.state.verifyModal
        }
        this.props.PayMethod(params)
      }
    });
  }
  switchModalMethod = (e)=>{
    this.setState({verifyModal : e.target.value == '0' ? true : false});
    this.setState({passwordVisible : e.target.value == '0' ? true : false});
    this.setState({value : e.target.value});

  }
  onCancel=()=>
  {
    this.setState({verifyModal:false});
    this.setState({passwordVisible:false});
    this.setState({value:1});
    this.props.hidePayModal();
  }
  render() {
    const {PayMethod,PaySum,Balance,errMsg,PayTypeVisible}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
    <Modal key={this.state.newKey} title="支付方式" visible={PayTypeVisible}footer={null}onCancel={this.onCancel}wrapClassName="vertical-center-modal"
    >
      <div>
        <Row>
          <Col lg={8}md={8}xs={8}>
            <h2>选择支付方式</h2>
          </Col>
          <Col  lg={16}md={16}xs={16}>
            <RadioGroup onChange={this.switchModalMethod} value={PaySum<=Balance?this.state.value:1}>
              {PaySum<=Balance?
                <Radio value={0} style={{fontSize:'17px'}}disabled={false}>余额支付</Radio>
                :<Radio value={0} style={{fontSize:'17px'}}disabled={true}>余额支付</Radio>}
              <Radio defaultChecked={true} value={1} style={{fontSize:'17px',marginLeft:'15px'}}>在线支付</Radio>
            </RadioGroup>
          </Col>
        </Row>
        {this.state.passwordVisible&&PaySum<=Balance?
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row style={{marginTop:30}}>
            <Col span={12}>
            <FormItem {...formItemLayout}
                      label=""
            >
              {getFieldDecorator('password', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '密码未填写'
                  }
                ]
              })(<Input type="password" placeholder="请输入登录密码"/>
              )}
            </FormItem>
              </Col>
            <Col span={12}>
            <div style={{ float:'right'}}><p style={{lineHeight:'30px'}}>余额: <span style={{fontSize:'1.5em', color: '#fe4d0f'}}>{Balance}元</span></p>
              <p style={{lineHeight:'30px'}}>支付: <span style={{fontSize:'1.5em', color: '#fe4d0f'}}>{PaySum}元</span></p>
            </div>
            <FormItem wrapperCol={{ span: 12, offset: 12 }}>
              <Col span={24} style={{ textAlign: 'right',float:'right' }}>
                <Button type="primary" htmlType="submit">去付款</Button>
              </Col>
            </FormItem>
              </Col>
            </Row>
            <div style={{color: 'red', textAlign:'center'}}>{errMsg}</div>
          </Form>
        :
        <div>
          <div><p style={{float:'right',lineHeight:'30px'}}>支付: <span style={{fontSize:'1.5em', color: '#fe4d0f',marginLeft:'1em'}}>{PaySum}元</span></p></div>
          <Button type="primary" size="large" style={{width:'8em',marginLeft:'80%',}} onClick={()=>PayMethod(this.state.verifyModal)}>去付款</Button>
        </div>
        }
      </div>
    </Modal>
    );
  }
}
export default Form.create()(PayModal);
