/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainCases.less';


function CasesList(props) {
  const {list,pagination, onPageChange,caseHref,headerData} = props;
  return (
    <div className={styles.normalCases}>
      <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.caseTitle.Name:''}
          <div className={styles.TOPHerf}><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></div>
      </div>
      <hr className={styles.serviceHr} style={{marginBottom:30}}/>
      <Row gutter={16}>
        {list && list.length > 0? list.map((data,index) =>{
          const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
          let articleContents=articleContent.replace(/<\/?.+?>/g,"");
          let MarticleContents=articleContent.replace(/<\/?.+?>/g,"");
          return(
            <Col  md={8} sm={12} xs={12} className={styles.ColList} key={index}>
              <a  href={caseHref+id} style={{color: 'gray', textDecorator: ''}}>
                <div className={styles.casesList}>
                  <img src={articleCover}  className={styles.casesImg} width='100%' height='178px'style={{objectFit: 'cover'}}/>
                <div className={styles.productName}>
                  <Row>
                    <Col md={24} sm={24} xs={0}>
                      <p className={styles.casesTitle}>{articleTitle.slice(0,30)}{articleTitle.length > 30 ? '...' : ''}</p>
                      <div className={styles.casescecontent} style={{width:'100%',height:'80px'}}>{articleContents.slice(0,50)}{articleContents.length > 50 ? '...' : ''}</div>
                    </Col>
                    <Col md={0} sm={0} xs={24}>
                      <p className={styles.casesTitle}>{articleTitle.slice(0,8)}{articleTitle.length > 8 ? '...' : ''}</p>
                      <div className={styles.casescecontent} style={{width:'100%',height:'80px'}} >{MarticleContents.slice(0,30)}{MarticleContents.length > 30 ? '...' : ''}</div>
                    </Col>
                  </Row>
                  <div style={{marginTop:'6px',color:'#0496ff'}}>
                    {createdAt}
                  </div>
                </div>
              </div>
              </a>
            </Col>
          )
        }) : ''}
        </Row>
        <Row className={styles.footerpage}>
          {pagination && pagination.total > 1 ?
            <Pagination defaultPageSize={9} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}} onChange={onPageChange}/>
            :''}
        </Row>
      </div>
  );
}

export default CasesList;
