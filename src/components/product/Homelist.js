import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip,Modal} from 'antd';
import styles from '../MainCases/MainCases.less';
const Cookie = require('js-cookie')
let token = Cookie.get('token');

function Homelist(props) {
  const {product, pagination, onPageChange,productsHref,loginState,headerData} = props;
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

  function redirect(url){
    window.location.href = url;
  }

  return (
    <div className={styles.normalRoww}>
      <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.productTitle.Name:''}
        <div className={styles.TOPHerf}><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></div>
      </div>
      <hr className={styles.serviceHr}/>
      <div className={styles.serviceH3}>{headerData.AllTitle?headerData.AllTitle.productTitle.EName:''}</div>
      <Row gutter={16} className={styles.row_padding}>
        {product && product.length > 0? product.map((data,index) =>{
          const {id,productName,custom,shopPriceY,minPriceY, maxPriceY,unitStr, productBrief,dealNumber,productImg,belongs,domainName} = data;
          return (
            <Col key={index} lg={8} sm={12} xs={12} className={styles.col_padding}>
              <a key={index} onClick={redirect.bind(null,productsHref + id)}>
                <div className={styles.productss} style={{height: '330px'}}>
                  {productImg?
                    <img src={productImg} alt={productName} width='268px' height='178px'/>
                    :<Icon type="link" className={styles.productImgDefault}/>}
                  <div className={styles.productNamee}>
                    <Tooltip placement="bottom" title={productName}overlayStyle={{width:'200px'}}>
                      <p className={styles.serviceTitle}>{productName.slice(0,12)}{productName.length > 12 ? '...' : ''}</p>
                    </Tooltip>
                    <p className={styles.servicecontent}>{productBrief.slice(0,30)}{productBrief.length > 30 ? '...' : ''}</p>
                    <div style={{float:'left',width:'100%',marginTop:'6px'}}>
                      <div className={styles.serviceBuybor}><span className={styles.serviceBuy}>￥{custom == 1 ? Number(minPriceY).formatCurrency() + '-' + Number(maxPriceY).formatCurrency() : Number(shopPriceY).formatCurrency()}元/{unitStr}</span></div>
                      <div className={styles.buySpan}>
                          <div  className={styles.buttonBuy} onClick={(event)=>{event.stopPropagation(); hopeOrder(id,belongs,domainName)}}>咨询下单</div>
                        </div>
                      <div className={styles.clearfix}></div>
                    </div>
                  </div>
                </div>
              </a>
            </Col>
          )
        }) : ''}
      </Row>
      {location.pathname === '/' ?
        '':
        <Row className={styles.footerpage}>
          {pagination && pagination.total > 1 ?
            <Pagination defaultPageSize={9} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}} onChange={onPageChange}/>
            :''}
        </Row>}
    </div>
  );
}

export default Homelist;
