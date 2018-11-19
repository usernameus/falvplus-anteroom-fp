import React,{Component, PropTypes} from 'react';
import {Select, Modal, Button,Icon, Row, Col, Card,Table , Input} from 'antd';
import InputButton from './inputbutton';
import styles from './SelectModal.css';

const Option = Select.Option;

class SelectModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      datasource: this.props.datalist ? this.props.datalist.slice(0) : [],
      targetKeys: []
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  onCancel = () => {
    this.setState({
      datasource: this.props.datalist ? this.props.datalist.slice(0) : []
    })
    this.hideModal();
  }

  onOk = () => {
    this.props.onSaveList(this.state.datasource);
    this.hideModal();
  }

  onChange = (e) => {
    this.props.onChange(e);
  }

  changeName = (index) =>{
    const {datasource} = this.state;
    datasource[index]['editable'] = true;
    this.setState({
      datasource: datasource
    })
  }

  removeRow = (valueCode) => {
    console.log(valueCode)
    const datasource = this.state.datasource;
    let index = -1;
    for(var i = 0; i < datasource.length; i++){
      if(datasource[i][this.props.valueProp] == valueCode){
        index = i;
        break;
      }
    }
    if(index > -1){
      datasource.splice(index, 1);
    }
    this.setState({
      datasource: datasource
    })
  }

  addData = ({inputItem}) => {
    if(inputItem == ''){
      return;
    }
    const datasource = this.state.datasource;
    if(datasource.filter(d=>d[this.props.textProp] ==inputItem).length > 0){
      return;
    }
    const obj = new Object();
    obj[this.props.valueProp] = Math.max.apply(null, datasource.map(d=>d[this.props.valueProp])) + 1
    obj[this.props.textProp] = inputItem;
    datasource.push(obj);

    this.setState({
      datasource: datasource
    })
  }

  validateDuplicate = (value) => {
     return (this.state.datasource.filter(d=>d[this.props.textProp] == value).length == 0);
  }

  upOrder = (index) =>{
    const current = this.state.datasource[index];
    const before = this.state.datasource[index - 1];
    const datasource = this.state.datasource;
    datasource[index - 1] = current;
    datasource[index] = before;
    this.setState({
      datasource: datasource
    })

  }

  downOrder = (index) => {
    const current = this.state.datasource[index];
    const after = this.state.datasource[index + 1];
    const datasource = this.state.datasource;
    datasource[index + 1] = current;
    datasource[index] = after;
    this.setState({
      datasource: datasource
    })

  }

  render(){
    const {datalist, valueProp, textProp,currentValue, modalTitle, modalContent} = this.props;

    const columns = [
      {
        title: modalTitle,
        dataIndex: valueProp,
        key: valueProp,
        render: (text, record) => (
            <span>{record[textProp]}</span>
        )
      },{
        title: '操作',
        render: (text,record,index) => (
          <span>
            <a disabled={index == 0} onClick={this.upOrder.bind(null,index)}><Icon type="up"></Icon></a>
            <span className="ant-divider"/>
            <a disabled={index >= this.state.datasource.length - 1} onClick={this.downOrder.bind(null, index)}><Icon type="down"></Icon></a>
            <span className="ant-divider"/>
            <a onClick={this.removeRow.bind(null, record[valueProp])}>删除</a>
          </span>
        )
      }
    ]

    return (
      <div style={{position:'relative',width:'100%',...this.props.style}}>
        <Button icon="plus" onClick={this.showModal} style={{float:'right',width: 30,marginTop: 2}}></Button>
        <div style={{marginRight:'30px'}}>
          <Select defaultValue={currentValue} hasFeedback style={{width:'100%'}}
                  placeholder={this.props.placeholder||''}
                  onChange={this.onChange}>
            {this.state.datasource.map((item, index) => {
              return <Option key={index} value={item[valueProp].toString()}>{item[textProp]}</Option>
            })}
          </Select>
        </div>
        <Modal visible={this.state.modalVisible} onOk={this.onOk} onCancel={this.onCancel}
               title={modalTitle} okText="保存" cancelText="取消" width={700}>
          <InputButton itemName={modalTitle} onClick={this.addData} validate={this.validateDuplicate}/>
          <Table dataSource={this.state.datasource} columns={columns} rowKey={(record, index)=>index}/>
        </Modal>
      </div>
    );
  }
}

SelectModal.propTypes = {
  currentValue: PropTypes.string
}

export default SelectModal;
