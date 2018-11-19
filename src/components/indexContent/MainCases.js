/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button} from 'antd';
import styles from './MainIndex.less';


function MainCases(props) {
  const {list,onLastCase,onNextCase,caseHref,headerData}=props;
  return (
    <div className={styles.normalCases}>
      <div className={styles.CasesMain}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.caseTitle.Name:''}</div>
        <hr className={styles.serviceHr}/>
        <div className={styles.serviceH3}>{headerData.AllTitle?headerData.AllTitle.caseTitle.EName:''}</div>
        {list && list.length > 0? list.map((data,index) =>{
          const {articleTitle,authorName,publishTime, articleCover, articleContent,id} = data;
          let articleContents=articleContent.replace(/<\/?.+?>/g,"");
          return(
            <div key={index} className={styles.CasesList}>
              <div className={styles.CasesContent}>
                <div className={styles.CasesLeft}>
                  <p className={styles.CasesTop}>{articleTitle.slice(0,20)}{articleTitle.length > 20 ? '...' : ''}</p>
                  <div className={styles.CasesleftContent}>{articleContents.slice(0,50)}{articleContents.length > 50 ? '...' : ''}</div>
                  <a href={caseHref+id}className={styles.CasesleftA}>查看详情</a>
                </div>
                <img onClick={onLastCase} className={styles.leftButton} src="//theme.lj110.com/default/index/cases/cases3.png" alt=""/>
              </div>
              <div >
                <img className={styles.CasesImg} src={articleCover} alt=""/>
                <img onClick={onNextCase} className={styles.rightButton} src="//theme.lj110.com/default/index/cases/cases2.png" alt=""/>
              </div>
            </div>
            )
  }) : ''}
      </div>
    </div>
        )
}

export default MainCases;
