
/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainIndex.less';


function M_MainActivity(props) {
  const {list,pageactivity,onLastActivity,onNextActivity,activityHref,headerData} = props;
  let listIndex=list&&list.length>1?list.slice(0,1):list;
  return (
    <div className={styles.MnormalActivity}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.activityTitle.Name:''}
          <div className={styles.TOPHerf}><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></div>
        </div>
        {listIndex && listIndex.length > 0? listIndex.map((data,index) =>{
          const {articleTitle,authorName,publishTime, articleCover, articleContent,id} = data;
          let articleContents=articleContent.replace(/<\/?.+?>/g,"");
          return(
        <div key={index} className={styles.MActivityContent}>
          <div className={styles.MActivityLeft}>
            <p className={styles.MrightTopTitle}>{articleTitle}</p>
            <div className={styles.MrightContent}>{articleContents.slice(0,50)}{articleContents.length > 50 ? '...' : ''}</div>
            <p style={{marginTop:'26px'}}><a href={activityHref+id}className={styles.MActivityLeftA}>查看详情</a></p>
            <div style={{marginTop:'16px'}}>
              <img onClick={onLastActivity} className={styles.MactivityleftButton} src="//theme.lj110.com/default/index/cases/cases3.png" alt=""/>
              <img onClick={onNextActivity} className={styles.MactivityrightButton} src="//theme.lj110.com/default/index/cases/cases2.png" alt=""/>
            </div>
          </div>
          <div className={styles.MActivityImg}>
            <img src={articleCover} alt="" width='100%' height='100%' style={{objectFit: 'cover'}} />
          </div>
        </div>)
        }) : ''}
    </div>
  );
}

export default M_MainActivity;
