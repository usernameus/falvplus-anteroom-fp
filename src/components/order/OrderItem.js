/**
 * Created by mel on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {Row, Col,Button,Form, Icon,Input, InputNumber} from 'antd';
import styles from './Order.css';

class OrderItem extends Component{
  state = {
    readonly: true,
    form: this.props.form,
    price:0,
    buyCount: this.props.buyCount,
    detailAmountY: this.props.detailAmountY,
    onDelete: () => {
      this.props.onDelete(this.props.id)
    },
    onCountChange : (value)=>{
      this.setState({
        buyCount: value,
        detailAmountY: value * this.props.shopPriceY
      })
      this.props.onBuyCountChange(this.props.id, value, this.state.detailAmountY)
    }
  }

  readonlyCols(custom, minPriceY, maxPriceY, shopPriceY, unitStr, buyCount, detailAmountY){
    return  (
      <div>
        <Col span={4}>
          <div className="price">
            ￥{custom ?
            Number(minPriceY).formatCurrency() + '-' + Number(maxPriceY).formatCurrency()
              : Number(shopPriceY).formatCurrency()} 元/ {unitStr}
          </div>
        </Col>
        <Col span={4}><div className="buyCount">{buyCount}</div></Col>
        <Col span={4}><div className="detailAmountY">{detailAmountY}</div></Col>
      </div>
    )
  }

  editableCols(index,form, id, custom, minPriceY, maxPriceY,shopPriceY, unitStr, buyCount,showdetailAmountY){
    const FormItem = Form.Item;
    return (
     <div>
     <Col span={3}>
          <div className={styles.price}>
            <div className={styles.priceOrigin}>
              ￥{custom ?
                Number(minPriceY).formatCurrency() + '-' + Number(maxPriceY).formatCurrency()
              : Number(shopPriceY).formatCurrency()} 元/ {unitStr}
            </div>
            <div className={styles.promo}>
            </div>
          </div>
        </Col>
        <Col span={3}>
          <div className={styles.buycount}>
            <FormItem hasFeedback>
              {form ? form.getFieldDecorator("products[" + index + "].buyCount", {
                initialValue: buyCount || 1,
                rules: [{
                  required: true, message: '请输入数量'
                }]
              })(
                <InputNumber min={1} onChange={this.state.onCountChange}/>
              ) : ''}
            </FormItem>
            <FormItem>
              {form ? form.getFieldDecorator('products[' + index + '].productId', {
                initialValue: id
              })(
                <Input type="hidden"/>
              ) : ''}
            </FormItem>
          </div>
        </Col>
        <Col span={3}>
          <div className={styles.detailAmountY}>
            ￥{showdetailAmountY}
          </div>
        </Col>
        <Col span={3}>
          <Button onClick={this.state.onDelete}><Icon type="close-circle"/>删除</Button>
        </Col>
       </div>
       )
  }

  render(){
    const {index, form,id, productName, productImg,productBrief, shopPriceY, custom, minPriceY, maxPriceY, unitStr } = this.props;
    const {buyCount, detailAmountY} = this.state;
    const showdetailAmountY = detailAmountY ? Number(detailAmountY).formatCurrency() : 0;
    const readonly = this.props.readonly == undefined ? true : this.props.readonly;

    return (
      <Row key={index}>
        <Col span={8} offset={1}>
          {/*<div className={styles.itemPic}>*/}
            {/*<img src={productImg} alt="" style={{width: 100, height: 80}}/>*/}
          {/*</div>*/}
          <div className={styles.itemInfo}>
            <div className={styles.itemBasicInfo}>
              {productName}
            </div>
            {/*<div className={styles.itemOtherInfo}>*/}
              {/*{productBrief}*/}
            {/*</div>*/}
          </div>
        </Col>
        {readonly?
          this.readonlyCols(custom, minPriceY, maxPriceY,shopPriceY, unitStr, buyCount,showdetailAmountY)
        : this.editableCols(index, form, id, custom, minPriceY, maxPriceY, shopPriceY, unitStr, buyCount,showdetailAmountY)}
      </Row>
    )
  }
}

OrderItem.PropTypes = {
  readonly: PropTypes.Boolean
}

export default OrderItem;
