import React,{Component} from 'react';
import { Table, Button ,Row,Col,Tabs} from 'antd';
import { Select } from 'antd';
const TabPane = Tabs.TabPane;


class LawProModal extends Component{
  constructor(props){
    super(props);
  }
  state = {
    selectedRowKeys: [],
    tabKeys:this.props.lawproductlist[0].lawyerId.toString()
  };

  handleChange = (value) => {
    this.setState({ tabKeys:value });
  }
  onSelect = (record, selected) => {
   if(selected){
     this.props.addLawProduct({lawyerId:this.state.tabKeys,productId:record.key})
   }else {
     this.props.deleteLawProduct({lawyerId:this.state.tabKeys,productId:record.key})
   }
  }
  render(){
    const {lawproductlist} = this.props;
    const {tabKeys,selectedRowKeys} = this.state;

    const columns = [{
      title: '产品名称',
      dataIndex: 'productName',
    }, {
      title: '产品类型',
      dataIndex: 'productTypeId',
    }, {
      title: '产品购买类型',
      dataIndex: 'productPurchaseTypeStr',
    }, {
      title: '服务类型',
      dataIndex: 'serviceType',
    }];
    const rowSelection = {
      selectedRowKeys,
      onSelect:this.onSelect,
    };

    const children = [];
    for (let i = 0; i < lawproductlist.length; i++) {
      const data = [];
      for (let j = 0; j < lawproductlist[i].flaParWebProducts.length; j++) {
        if(lawproductlist[i].flaParWebProducts[j].displayProducts==1){
          selectedRowKeys.push(lawproductlist[i].flaParWebProducts[j].id)
        }
        data.push({
          key:lawproductlist[i].flaParWebProducts[j].id,
          productName:lawproductlist[i].flaParWebProducts[j].productName,
          productTypeId: lawproductlist[i].flaParWebProducts[j].productTypeId,
          productPurchaseTypeStr:lawproductlist[i].flaParWebProducts[j].productPurchaseTypeStr,
          serviceType:lawproductlist[i].flaParWebProducts[j].serviceType,
        });
      }
      children.push(<TabPane key={lawproductlist[i].lawyerId} tab={lawproductlist[i].lawyerName}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </TabPane>);
    }

    return (
      <div>
        <Tabs defaultActiveKey={tabKeys} onChange={this.handleChange}>
          {children}
        </Tabs>
      </div>
    );
  }
}

export default LawProModal;

