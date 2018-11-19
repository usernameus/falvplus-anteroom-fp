import React, { PropTypes,Component } from 'react'
import { Form, Input, InputNumber,Button} from 'antd'
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
      }
      this.props.onOk(values)
    })
  }
  onKeyDowns =(e)=>{
    if(e.keyCode >=48 && e.keyCode <= 57){
    }else if(e.keyCode==8){
      if(e&& e.stopPropagation){
        code= e.which;
      }else{
        code= window.event.keyCode;
      }
    }else{
      if(e.keyCode == 190){
      }else{
        e.preventDefault();
      }
    }
  };

  render(){
    const {
      form: {
        getFieldDecorator,
        },
      }=this.props;

    return(
      <div>
        <form>
          <FormItem label='请输入充值金额' hasFeedback {...formItemLayout}>
            {getFieldDecorator('recharge', {
              rules: [
                {
                  required: true,
                  message: '请输入充值金额'
                }
              ]
            })(<InputNumber min={0} max={1000000} style={{width: 120}} step={0.01} onKeyDown={this.onKeyDowns}/>)}
          <span>元</span>
          </FormItem>
          <Button type="primary" onClick={this.handleOk}>充值</Button>
        </form>
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
