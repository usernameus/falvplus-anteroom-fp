/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Carousel} from 'antd';
import styles from '../MainCases/MainCases.less';


function ActivityDetails(props) {
  const {articleTitle,createdAt, articleCover, articleContent,nextPage,upPage,id,activityHerf,articlePicture,previewVisible} = props;
  const Picture=(articlePicture)=>{
    return <Carousel className={styles.carousel}>
      {articlePicture.articlePicture.map((item,index)=>{
        return <div  key={index}><div className="picture" style={{height:'300px',backgroundImage:'url('+ item.pictureImg+')'}}>
        </div>
          {/*<div><h3>{item.pictureName}</h3></div>*/}
        </div>
      })}
    </Carousel>
  }
  return (
    <div className={styles.normalActivities}>
      <div className={styles.casesDetails}>{articleTitle}</div>
      <div className={styles.detailsImg}>
        <img src={articleCover} alt=""width={700}height={300}/>
      </div>
      <div className="pictureImg">
        {articlePicture?<Picture articlePicture={articlePicture}/>:''}
      </div>
      <div className={styles.casesdetailsContent}>
        <p dangerouslySetInnerHTML={{__html: articleContent}}/>
      </div>
      <div className={styles.detailsTime}><Icon type="clock-circle-o"></Icon>{createdAt}</div>
      <div className={styles.detailsA}>
        <a href={activityHerf+upPage==null?id:upPage}>&lt;上一篇</a>
        <a href={activityHerf+nextPage==null?id:nextPage}style={{float:'right'}}>下一篇&gt;</a>
      </div>
    </div>
  );
}

export default ActivityDetails;
