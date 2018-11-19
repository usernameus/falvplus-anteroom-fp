import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from 'antd'
import styles from './search.less'
import { Input, Select, Button, Icon } from 'antd'

const FormItem = Form.Item;

class InputButton extends React.Component {
  state = {
    clearVisible: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err){
        return;
      }
      this.props.onClick(values);
      this.handleClearInput();
    });

  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== ''
    })
  }
  handleClearInput = () => {
    this.props.form.setFieldsValue({
      'inputItem':''
    })
    this.setState({
      clearVisible: false
    })
  }

  handleDuplicate = (rule, value, callback) => {
    if(!this.props.validate(value)){
      callback('该' + this.props.itemName + '已经存在')
    }
    callback()
  }
  render () {
    const {size, style,value} = this.props
    const {clearVisible} = this.state
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem >
            <Input.Group compact size={size} className={styles.search} style={style}>
              {getFieldDecorator('inputItem',{
                initialValue: value,
                ref:'inputItem',
                rules:[
                  {required: true,
                    message: '请输入' + this.props.itemName
                  },{
                    validator: this.handleDuplicate
                  }
                ]
              })(
              <Input  size={size} onChange={this.handleInputChange} onPressEnter={this.handleSubmit} />
              )}
              <Button size={size} type='primary' htmlType='submit'>添加</Button>
              {clearVisible && <Icon type='cross' onClick={this.handleClearInput} />}
            </Input.Group>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(InputButton)
