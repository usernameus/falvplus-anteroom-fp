/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Carousel} from 'antd';
import styles from '../MainCases/MainCases.less';


function ArticlesDetails(props) {
  const Picture=(articlePicture)=>{
    return <Carousel className={styles.carousel}>
      {articlePicture.articlePicture.map((item,index)=>{
        return <div><div key={index} className="picture" style={{height:'300px',backgroundImage:'url('+ item.pictureImg+')'}}>
        </div>
          {/*<div><h3>{item.pictureName}</h3></div>*/}
        </div>
      })}
    </Carousel>
  }
  const {articleTitle,createdAt, articleCover, articleContent,upPage,nextPage,url,id,articleHref,articlePicture,previewVisible,headerData} = props;
  const avatarUrl = (url? url:'//theme.lj110.com/default/moren/touxiang.jpg') + '?imageMogr2/thumbnail/200x/size-limit/$(fsize)!'
  return (
    <div className={styles.normalCases}>
      <div className={styles.lawyerImg}>
        <img src={avatarUrl} alt="" width='194px' height='194px'/>
      </div>
      <div className={styles.articlesDiv}>{headerData.AllTitle?headerData.AllTitle.articleTitle.Name:''}</div>
      <div className={styles.articlesProfile}>{}</div>
      <div className={styles.detailsImg}>
        <img src={articleCover} alt=""width={700}height={300}/>
      </div>
      <div className={styles.casesDetails}>{articleTitle}</div>
      <div className="pictureImg">
        {articlePicture?<Picture articlePicture={articlePicture}/>:''}
      </div>
      <div className={styles.casesdetailsContent}>
        <p dangerouslySetInnerHTML={{__html: articleContent}}/>
      </div>

      <div className={styles.detailsTime}><Icon type="clock-circle-o"></Icon>{createdAt}</div>
      <div className={styles.detailsA}>
        <a href={articleHref+upPage==null?id:upPage}>&lt;上一篇</a>
        <a href={articleHref+nextPage==null?id:nextPage} style={{float:'right'}}>下一篇&gt;</a>
      </div>
    </div>
  );
}

export default ArticlesDetails;
