/**
 * Created by zhihangjishu on 17/3/16.
 */
import React from 'react';
import styles from './Homelist.css';
import {Button,Modal} from 'antd';
const Cookie = require('js-cookie')
let token = Cookie.get('token');

function List(productDetail) {
  const {datadetail,loginState}=productDetail
  const {id,shopPriceY,custom, minPriceY, maxPriceY,productTypeIdStr,achiement,productName,dealNumber,productBrief,consultationNumber,productImg,hot,best,promote,productPurchaseTypeStr,unitStr,serviceTypeStr,settledNumber,belongs,domainName} = datadetail;
  function hopeOrder(id,belongs,domainName){
    if(belongs=="lawyer"){
      if(loginState){
        window.location.href = 'https://'+domainName +'/orderflow/hope/'+ id+"?token="+token;
      }else{
        window.location.href = 'https://'+domainName +'/orderflow/hope/'+ id;
      }
    }else{
      window.location.href = '/orderflow/hope/' + id;
    }
  }
  return (
    <div className={styles.productPage}>
      <div className={styles.picturebox}>
        <img src={productImg} className={styles.picturesize}/>
      </div>
      <div className={styles.product_profile}>
        <div className={styles.product_profiles}>
        <div className={styles.productname}>
          {productName}
        </div>
        <div className={styles.pricebox}>
            <span className={styles.productnumber}>现价:</span>
            <span className={styles.shopprice}>￥{custom ? Number(minPriceY).formatCurrency() + '-' + Number(maxPriceY).formatCurrency() : Number(shopPriceY).formatCurrency()}元/{unitStr}</span>
        </div>
        <div className={styles.priceboxs}>
            <span className={styles.shopprice}>￥{custom ? Number(minPriceY).formatCurrency() + '-' + Number(maxPriceY).formatCurrency() : Number(shopPriceY).formatCurrency()}元/{unitStr}</span>
        </div>
         </div>
        <div className={styles.pronum}>
          <span  className={styles.have_server}>已服务:</span>
          <span className={styles.dealnumber}>{settledNumber}</span>|
          <span  className={styles.have_server}>已咨询:</span>
          <span className={styles.dealnumber}>{consultationNumber}</span>|
          <span className={styles.have_server}>好评率:</span>
          <span className={styles.dealnumber}>100%</span>
        </div>
        <div className={styles.pronums}>
          <span  className={styles.have_server}>已服务:</span>
          <span className={styles.dealnumber}>{settledNumber}</span>
          <span  className={styles.have_server}>已咨询:</span>
          <span className={styles.dealnumber}>{consultationNumber}</span>
          <span className={styles.have_server}>好评率:</span>
          <span className={styles.dealnumber}>100%</span>
        </div>
        <div className={styles.product_profiles}>
          <div>
            <span  className={styles.shichangprice}>产品类型:</span>
            {productTypeIdStr && productTypeIdStr.length > 0? productTypeIdStr.map((data,index) =>{
              return(
                <span key={index} className={styles.dealnumber}>{data}</span>
              )
            }):''}
          </div>
          <div>
            <span  className={styles.shichangprice}>服务类型:</span>
            {serviceTypeStr && serviceTypeStr.length > 0? serviceTypeStr.map((data,index) =>{
              return(<span key={index} className={styles.dealnumber}>{data}</span>)
            }):''}
          </div>
          <div>
            <span  className={styles.shichangprice}>购买类型:</span>
            <span className={styles.dealnumber}>{productPurchaseTypeStr}</span>
          </div>
        </div>
        <a>
          <p className={styles.buynow} onClick={(event)=>{event.stopPropagation(); hopeOrder(id,belongs,domainName)}}>咨询下单</p>
        </a>
      </div>
      <div className={styles.clearfix}></div>
      <div className={styles.pro_detail_parameter}>
        <div className={styles.hd}><p className={styles.productbir}>产品简介</p></div>
      </div>
      <div className={styles.product_content}>{productBrief}</div>
      <div className={styles.pro_detail_parameter}>
        <div className={styles.hd}><p className={styles.productbir}>成果物</p></div>
      </div>
      <div className={styles.product_content}>{achiement}</div>
    </div>
  );
}
export default List;
