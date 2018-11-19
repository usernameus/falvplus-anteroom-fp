
/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainIndex.less';


function FM_MainActivity(props) {
  const {list,pageactivity,onLastActivity,onNextActivity,activityHref,headerData} = props;
  let listLeft=list&&list.length>1?list.slice(0,1):list;
  let listRight=list&&list.length>3?list.slice(1,4):list.slice(1,list.length+1);
  return (
    <div className={styles.normalCases}>
      <div className={styles.CasesMain}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.activityTitle.Name:''}</div>
            {listLeft && listLeft.length > 0? listLeft.map((data,index) =>{
              const {articleTitle,authorName,publishTime, articleCover, articleContent,id,createdAt} = data;
              let articleContents=articleContent.replace(/<\/?.+?>/g,"");
              return(
                <div key={index} className={styles.MFactivityLeft}>
                  <div style={{padding:'32px 30px 26px 30px'}}>
                    <p style={{fontSize:'15px',color:'#666666',lineHeight:'40px'}}>{articleTitle}</p>
                    <Row>
                      <Col xs={12}>
                        <p>
                          <img src={articleCover} alt="" width='100%' height='80px'/>
                        </p>
                      </Col>
                      <Col xs={10} offset={2}>
                        <p style={{fontSize:'11px',color:'#999999',lineHeight:'20px',marginTop:'10px',marginBottom:'10px'}}>{articleContents}</p>
                        <p style={{marginTop:'24px'}}><Button type='primary'>MORE</Button></p>
                      </Col>
                    </Row>
                  </div>
                </div>
              )
            }) : ''}
              {listRight && listRight.length > 0? listRight.map((data,index) =>{
                const {articleTitle,authorName,publishTime, articleCover, articleContent,id,createdAt} = data;
                let articleContents=articleContent.replace(/<\/?.+?>/g,"");
                return(
                  <div className={styles.MRightCard} key={index}>
                    <Card>
                      <p className={styles.FRightTitlt}>
                        <span>·{articleTitle}</span>
                        <span style={{color:'#999999',fontSize:'19px',float:'right',marginRightL:'10px'}}>{createdAt.substring(0,10)}</span>
                      </p>
                      <p className={styles.FRightContent}>{articleContents}</p>
                    </Card>
                  </div>
                )
              }) : ''}
      </div>
    </div>
  );
}

export default FM_MainActivity;
