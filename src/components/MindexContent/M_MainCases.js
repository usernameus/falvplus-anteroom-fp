/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button} from 'antd';
import styles from './MainIndex.less';


function MainCases(props) {
  const {list,onLastCase,onNextCase,caseHref,headerData}=props;
  return (
    <div className={styles.MnormalCases}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.caseTitle.Name:''}
          <div className={styles.TOPHerf}><a href="/cases"><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></a></div>
        </div>
      {list && list.length > 0? list.map((data,index) =>{
        const {articleTitle,authorName,publishTime, articleCover, articleContent,id} = data;
        let articleContents=articleContent.replace(/<\/?.+?>/g,"");
        return(
          <div key={index} className={styles.MActivityContent}>
            <div style={{width:'100%'}}>
              <p className={styles.MrightTopTitle}>{articleTitle}</p>
              <div className={styles.MrightContent}>{articleContents.slice(0,50)}{articleContents.length > 50 ? '...' : ''}</div>
            </div>
            <div className={styles.MActivityImg}>
              <img src={articleCover} alt=""width='100%'height='100%'/>
            </div>
            <div className={styles.MCaseRight}>
              <p style={{marginTop:'26px'}}><a href={caseHref+id}className={styles.MActivityLeftA}>查看详情</a></p>
              <div style={{marginTop:'16px'}}>
                <img onClick={onLastCase} className={styles.MactivityleftButton} src="//theme.lj110.com/default/index/cases/cases3.png" alt=""/>
                <img onClick={onNextCase} className={styles.MactivityrightButton} src="//theme.lj110.com/default/index/cases/cases2.png" alt=""/>
              </div>
            </div>
          </div>)
      }) : ''}
      </div>
        )
}

export default MainCases;
