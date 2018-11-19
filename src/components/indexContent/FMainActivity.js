/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainIndex.less';
function FMainActivity(props) {
  const {list,pageactivity,onLastActivity,onNextActivity,activityHref,headerData} = props;
  let listLeft=list&&list.length>1?list.slice(0,1):list;
  let listRight=list&&list.length>3?list.slice(1,4):list.slice(1,list.length+1);
  return (
    <div className={styles.normalCases}>
      <div className={styles.CasesMain}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.activityTitle.Name:''}</div>
        <hr className={styles.serviceHr}/>
        <div className={styles.serviceH3}>{headerData.AllTitle?headerData.AllTitle.activityTitle.EName:''}</div>
        <Row gutter={16}>
          <Col lg={12} md={12}>
            {listLeft && listLeft.length > 0? listLeft.map((data,index) =>{
              const {articleTitle,authorName,publishTime, articleCover, articleContent,id,createdAt} = data;
              let articleContents=articleContent.replace(/<\/?.+?>/g,"");
              return(
                <div key={index} className={styles.FactivityLeft}>
                  <div style={{padding:'58px'}}>
                    <p style={{fontSize:'19px',color:'#999999',lineHeight:'40px'}}>{createdAt.substring(0,10)}</p>
                    <p style={{fontSize:'15px',color:'#666666',lineHeight:'40px'}}>{articleTitle ? articleTitle.slice(0,20) : ''}{articleTitle && articleTitle.length > 20 ? '...' : ''}</p>
                    <p style={{fontSize:'11px',color:'#999999',lineHeight:'20px',marginTop:'10px',marginBottom:'10px'}}>{articleContents ? articleContents.slice(0,40) : ''}{articleContents && articleContents.length > 40 ? '...' : ''}</p>
                    <p style={{fontSize:'19px',color:'#999999',lineHeight:'40px'}}>
                      <img src={articleCover} alt="" width='323px' height='165px'/>
                    </p>
                    <p style={{lineHeight:'40px'}}>
                      <Button type='primary'>MORE</Button>
                    </p>
                  </div>
                </div>
              )
            }) : ''}
          </Col>
          <Col lg={12} md={12}>
            <div className={styles.FactivityRight}>
              {listRight && listRight.length > 0? listRight.map((data,index) =>{
                const {articleTitle,authorName,publishTime, articleCover, articleContent,id,createdAt} = data;
                let articleContents=articleContent.replace(/<\/?.+?>/g,"");
                return(
                  <div className={styles.FRightCard} key={index}>
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
          </Col>
        </Row>

      </div>
    </div>
  );
}

export default FMainActivity;
