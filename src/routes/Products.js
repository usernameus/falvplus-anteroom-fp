import React from 'react';
import { connect } from 'dva';
import styles from './Products.css';
import HomeList from '../components/product/Homelist';


function Products({ dispatch,products,login,fhome}) {
  const {loginState} =  login
  const {pagination,productsHref,product} = products;
  const {headerData}=fhome
  const onPageChange = function(page,pageSize){
    dispatch({
      type: 'products/products',
      payload:{
        page: page,
        pageSize: pageSize
      }
    })
  }
  const productsprops={
    loginState:loginState,
    product:product,
    pagination:pagination,
    productsHref:productsHref,
  }
  return (
        <HomeList {...productsprops} headerData={headerData} onPageChange={onPageChange} productsHref={'/product/'}/>
  );
}

function mapStateToProps({products,login,fhome}) {
  return {products,login,fhome};
}

export default connect(mapStateToProps)(Products);
