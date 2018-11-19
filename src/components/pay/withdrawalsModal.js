import React, { PropTypes,Component } from 'react'
import { Form, Input, InputNumber,Button,Row,Col} from 'antd'
import ReactDOM from 'react-dom'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class Deposit extends Component{
  constructor(props){
    super(props);
  }
  handleOk=()=>{
    this.props.form.validateFields((errors,values)=>{
      if(errors){
        return
      }else{
        this.props.onCashOk(values)
      }
    })
  }
  onCancel=()=>{
    this.props.onCancel()
  }
  checkNumber = (rule, value, callback) => {
    if(value>this.props.remainAmount){
      callback('您的余额不足')
    }if(value<=0){
      callback('输入金额有误')
    }else{
      callback();
    }
  }
  render(){
    const {
      ApplySuccess,
      form: {
        getFieldDecorator,
      },
    }=this.props;
    return(
      <div>{ApplySuccess&&ApplySuccess.success?
        <div><h3>您的申请已提交，请等待客服人员回复您！</h3></div>:
        <form>
          <FormItem label='提现金额:' hasFeedback {...formItemLayout}>
            {getFieldDecorator('drawingAmount', {
              rules: [{required: true, message: '请输入充值金额'},{validator: this.checkNumber}
              ]
            })(<InputNumber min={0}  style={{width: 120}} step={0.01}/>)}
            <span>元</span>
          </FormItem>
          <Row>
            <Col lg={4}offset={15}>
              <Button type="primary" onClick={this.handleOk}>申请提现</Button>
            </Col>
            <Col lg={4}offset={1}>
              <Button  onClick={this.onCancel}>取消</Button>
            </Col>
          </Row>
        </form>}
      </div>
    )
  }
}

Deposit.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(Deposit)
