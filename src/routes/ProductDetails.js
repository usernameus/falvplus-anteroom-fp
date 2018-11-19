import React from 'react';
import { connect } from 'dva';
import styles from './Products.less';
import List from '../components/product/productdetails';

function Products({dispatch,location,productDetails,login}) {
  const { datadetail } = productDetails
  const {loginState} =  login
  const productDetailsProp = {
    datadetail:datadetail ? datadetail : {},
    loginState:loginState,
  }
  return (
    <div className={styles.normal}>
      <List {...productDetailsProp}/>
    </div>
  );
}

function mapStateToProps({productDetails,login}) {
  return {productDetails,login};
}

export default connect(mapStateToProps)(Products);

