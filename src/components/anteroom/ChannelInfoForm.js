import React,{Component} from 'react';
import {Button,Input,Card, Form} from 'antd';

const FormItem = Form.Item;

class ChannelInfoForm extends Component{
  constructor(props){
    super();
    this.state = {
      modify: props.modify == null ? false : props.modify,
      modal: props.modal == null ? false : props.modal
    }
  }
  onModifyChannelName = () => {
    this.setState({
      modify: true
    })
  }
  onSaveChannelName = () => {
    this.props.form.validateFields((errors, values) => {
      if(errors){
        return;
      }
      this.props.onSaveChannelName(this.props.userId, this.props.channelId, values.channelName);
      if(!this.state.modal) {
        this.setState({
          modify: false
        })
      }
    })
  }

  onCancelSaveChannelName = () => {
    if(this.state.modal){
      this.props.onCancel();
    }else{
      this.setState({
        modify: false
      })
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const cardTitle = {
      title: this.state.modal ? null : '频道设置'
    }
    return (
      <Card {...cardTitle} bordered={false} style={{fontSize:'1.2em'}}>
        <label>频道名称:</label>
        {this.state.modify ?
          <form>
            <FormItem style={{marginBottom:0}}>
                <div>
                  {getFieldDecorator("channelName",{
                    initialValue: this.props.channelName,
                    rules:[
                      {
                        required: true,
                        message: '请输入频道名称'
                      }
                    ]
                  })(<Input size="large" placeholder="频道名称" maxLength={32} />)}
                </div>
            </FormItem>
              <div>
                <Button type="default" size="large" htmlType="submit" onClick={this.onSaveChannelName} style={{width:'8em',margin:10}}>保存</Button>
                <Button type="default" size="large" onClick={this.onCancelSaveChannelName} style={{width:'8em'}}>取消</Button>
              </div>
          </form>
        :<div>
          <div style={{fontSize: 12, padding: 7}}>{this.props.channelName}</div>
          <Button  size="large" style={{width:'8em',margin:10}} onClick={this.onModifyChannelName}>修改</Button>
        </div>}
      </Card>
    );
  }
}

export default Form.create()(ChannelInfoForm);
