/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from '../MainCases/MainCases.less';

function ActivitiesList(props) {
  const {listTitle,listContent,pagination, onPageChange,activityHref,headerData} = props;
  return (
    <div className={styles.normalCases}>
      <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.activityTitle.Name:''}</div>
      <hr className={styles.serviceHr}/>
      <Row gutter={16}>
      {listTitle && listTitle.length > 0? listTitle.map((data,index) =>{
        const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
        let articleContents=articleContent.replace(/<\/?.+?>/g,"");
        let MarticleContents=articleContent.replace(/<\/?.+?>/g,"");
        return(
          <Col  lg={24} span={24} key={index}>
            <a  href={activityHref+id} key={index} style={{color: 'gray', textDecorator: ''}}>
              <div className={styles.activitieslistTitle}>
                <div className={styles.activitiesTitleImg}>
                  <img  src={articleCover} alt="" width='100%' height='100%'style={{objectFit: 'cover'}}/>
                </div>
                <div className={styles.activitiesTitleContent}>
                  <div className={styles.productName}>
                    <Row>
                      <Col md={24} sm={24} xs={0}>
                        <p className={styles.casesTitle}>{articleTitle.slice(0,30)}{articleTitle.length > 30 ? '...' : ''}</p>
                        <div className={styles.casescecontent} style={{width:'100%',height:'80px'}}>{articleContents.slice(0,120)}{articleContents.length > 120 ? '...' : ''}</div>
                      </Col>
                      <Col md={0} sm={0} xs={24}>
                        <p className={styles.casesTitle}>{articleTitle.slice(0,6)}{articleTitle.length > 6 ? '...' : ''}</p>
                        <div className={styles.casescecontent} style={{width:'100%',height:'80px'}} >{MarticleContents.slice(0,20)}{MarticleContents.length > 20 ? '...' : ''}</div>
                      </Col>
                    </Row>
                    <div className={styles.acrtivityCreat}>
                      {createdAt}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Col>
        )
      }) : ''}
      </Row>
      <Row gutter={16} style={{marginBottom:'50px',paddingTop:'20px',paddingLeft:'25px'}}>
        {listContent && listContent.length > 0? listContent.map((data,index) =>{
          const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
          let articleContents=articleContent.replace(/<\/?.+?>/g,"");
          let MarticleContents=articleContent.replace(/<\/?.+?>/g,"");
          return(
            <Col  lg={8} span={12} xs={12}className={styles.ColList} key={index}>
              <a  href={activityHref+id} key={index} style={{color: 'gray', textDecorator: ''}}><div className={styles.casesList}>
                <img src={articleCover}  className={styles.casesImg} width='268px' height='178px'/>
                <div className={styles.productName}>
                  <Row>
                    <Col md={24} sm={24} xs={0}>
                      <p className={styles.casesTitle}>{articleTitle.slice(0,30)}{articleTitle.length > 30 ? '...' : ''}</p>
                      <div className={styles.casescecontent} style={{width:'100%',height:'80px'}}>{articleContents.slice(0,80)}{articleContents.length > 80 ? '...' : ''}</div>
                    </Col>
                    <Col md={0} sm={0} xs={24}>
                      <p className={styles.casesTitle}>{articleTitle.slice(0,8)}{articleTitle.length > 8 ? '...' : ''}</p>
                      <div className={styles.casescecontent} style={{width:'100%',height:'80px'}}>{MarticleContents.slice(0,20)}{MarticleContents.length > 20 ? '...' : ''}</div>
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

export default ActivitiesList;
