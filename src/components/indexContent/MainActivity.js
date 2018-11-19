/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainIndex.less';
function MainActivity(props) {
  const {list,pageactivity,onLastActivity,onNextActivity,activityHref,headerData} = props;
  let listIndex=list&&list.length>1?list.slice(0,1):list;
  return (
    <div className={styles.normalActivity}>
      <div className={styles.ActivityMain}>
        <div className={styles.serviceDiv}style={{color:'white'}}>{headerData.AllTitle?headerData.AllTitle.activityTitle.Name:''}</div>
        <hr className={styles.serviceHr}/>
        <div className={styles.serviceH3}style={{color:'white'}}>{headerData.AllTitle?headerData.AllTitle.activityTitle.EName:''}</div>
        {listIndex && listIndex.length > 0? listIndex.map((data,index) =>{
          const {articleTitle,authorName,publishTime, articleCover, articleContent,id} = data;
          let articleContents=articleContent.replace(/<\/?.+?>/g,"");
          return(
            <div key={index} className={styles.ActivityContent}>
              <div className={styles.ActivityLeft}>
                <div style={{fontSize:'80px',fontFamily:'黑体',color:'#333333'}}>
                  {pageactivity.current&&pageactivity.current<10?
                  '0'+pageactivity.current
                    :pageactivity.current}
                </div>
                <div className={styles.activitySmall}>
                <p className={styles.rightTopTitle}>{articleTitle}</p>
                <div className={styles.rightContent}>{articleContents.slice(0,45)}{articleContents.length > 45 ? '...' : ''}</div>
                <p style={{marginTop:'26px'}}><a href={activityHref+id} className={styles.ActivityLeftA}>查看详情</a></p>
                </div>
                <div style={{marginTop:'16px'}}>
                  <img onClick={onLastActivity} className={styles.activityleftButton} src="//theme.lj110.com/default/index/cases/cases3.png" alt=""/>
                  <img onClick={onNextActivity} className={styles.activityrightButton} src="//theme.lj110.com/default/index/cases/cases2.png" alt=""/>
                </div>
              </div>
              <div className={styles.ActivityImg}>
                <img src={articleCover} alt="" width='100%' height='100%' style={{objectFit: 'cover'}}/>
              </div>
            </div>)
        }) : ''}
      </div>
    </div>
  );
}

export default MainActivity;
