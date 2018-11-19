import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip} from 'antd';
import styles from './BusinessArea.css';
const Cookie = require('js-cookie')
let token = Cookie.get('token');

function BusinessArea(props) {
  const {data, pagination,onPageChange,loginState,headerData} = props;
  function redirect(url){
    window.location.href = url;
  }
  function EnteranterRoom(domainName){
    let domaincrmhref='https://'+domainName+'/anteroom'+"?token="+token
    let crmhref = 'https://'+domainName
    if(loginState){
      window.location.href = domaincrmhref
    }else {
      window.location.href = crmhref
    }
  }
  return (
    <div className={styles.normal}>
      <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.businessTitle.Name:''}</div>
      <hr className={styles.serviceHr}/>
      <Row gutter={16}>
        {data && data.length > 0? data.map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          return (
            <Col key={index} lg={8} sm={12} xs={12}>
              <Row key={index} style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                <div className={styles.business_box}>
                  {businessImg? <img src={businessImg} className={styles.listImgSize}/> : ''}
                  <div style={{textAlign:'center',width:'100%'}} className={styles.hidebottom}>
                    <div style={{width: '100%',margin:'0 auto'}}>
                      <h2 style={{borderBottom:'1px solid #f5f5f5',fontSize:'20px',color:'#333333'}}>{businessStr}</h2>
                      <p className={styles.business_brief_span} style={{textAlign:'left',height:'60px' ,color:'#777777',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis'}}>{briefIntroduction.slice(0,30)}{briefIntroduction.length > 12 ? '...' : ''}</p>
                      {domainName?<a onClick={(event)=>{event.stopPropagation(); EnteranterRoom(domainName)}} className={styles.business_routeinhuikeshi_span}>进入会客室</a>
                        :
                        <a onClick={redirect.bind(null,'/businessArea/' + id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          )
        }) : ''}
      </Row>
      {location.pathname === '/' ?
        '':
        <Row>
          {pagination && pagination.total > 1 ?
            <Pagination defaultPageSize={6} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}} onChange={onPageChange}/>
            :''}
        </Row>}
    </div>
  );
}

export default BusinessArea;
