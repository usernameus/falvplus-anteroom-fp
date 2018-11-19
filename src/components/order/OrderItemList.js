import React from 'react';
import {Row, Col, InputNumber,Icon, Button} from 'antd';
import OrderItem from './OrderItem';
import styles from './Order.css';

class OrderItemList extends React.Component{
  constructor(props){
    super(props);
    const {products, onChange, form} = props;
    this.state = {
      readonly: false,
      products: products,
      form: form,
      onChange
    }

  }
  onBuyCountChange = (id,buyCount,amountY) => {
    const products = this.state.products || this.props.products;
    const newProducts = products.map(p=>{
      if(p.id == id){
        return {...p, buyCount: buyCount, amountY: amountY};
      }else{
        return p;
      }
    });
    this.setState({
      products: newProducts,
    })
    this.state.onChange(newProducts)
  }

  onDelete = (id) => {
    const products = this.state.products || this.props.products;
    const newProducts = products.filter(p=> p.id != id);
    this.setState({
      products: newProducts
    });
    this.state.onChange(newProducts)
  }
  render(){
    const {products} = this.state.products ? this.state : this.props;
    const totalamountY = products && products.length > 0 ?  products.reduce((pv, cv)=>pv + cv.shopPriceY * (cv.buyCount||0), 0) : 0;
    const showTotalamountY = totalamountY.formatCurrency();
    const readonly = this.props.readonly;
    return (
      <div className={styles.normal}>
        <Row>
          <Col span={8} offset={1}>
            <div>商品信息</div>
          </Col>
          <Col span={readonly ? 4 : 3}>
            <div>单价</div>
          </Col>
          <Col span={readonly ? 4 : 3}>
            <div>数量</div>
          </Col>
          <Col span={readonly ? 4 : 3}>
            <div>金额</div>
          </Col>
          {!readonly?
            <Col span={3}>
              <div>操作</div>
            </Col>
            :''
          }
        </Row>
        {products && products.length > 0 ? products.map((item, index) => {
           if(item.amountY !== undefined){
             item.detailAmountY = item.amountY;
           }
           return <OrderItem key={index} index={index} {...item} readonly={readonly} form={this.props.form} buyCount={item.buyCount || 1} onDelete={this.onDelete} onBuyCountChange={this.onBuyCountChange}/>
        }) : ''}
        <Row>
          <Col offset={16} span={8} style={{textAlign: 'right', marginRight: '30px'}}>
            <span>合计:</span>
            <span style={{fontSize: '2em', color:'orange'}}>￥{showTotalamountY || '0.00'}</span>
          </Col>
        </Row>
      </div>
    );

  }
}

export default OrderItemList;
