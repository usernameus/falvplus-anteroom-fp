/**
 * Created by fapu on 17-4-24.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from '../MainCases/MainCases.less';


function ArticlesList(props) {
  const {leftlist,rightlist,pagination, onPageChange,url,list,loadMore,articleHref,headerData} = props;

  const avatarUrl = (url? url:'//theme.lj110.com/default/moren/touxiang.jpg') + '?imageMogr2/thumbnail/200x/size-limit/$(fsize)!'

  return (
    <div className={styles.normalArticles}>
      <div className={styles.lawyerImg}>
        <img src={avatarUrl} alt="" width='194px' height='194px'/>
      </div>
      <div className={styles.articlesDiv}>{headerData.AllTitle?headerData.AllTitle.articleTitle.Name:''}</div>
     <div className={styles.articlesProfile}>{}</div>
      {list&&list.length>0?
      <div className={styles.articlesListContent}>
        <div style={{width:'100%',margin:'auto',textAlign:'center'}}><img  src="//theme.lj110.com/default/articles/articlesList1.png" alt=""/></div>
        <Row gutter={16}>
          <Col  lg={24} span={24}xs={0} sm={24}>
          <div className={styles.articlesListLeft}>
            {leftlist && leftlist.length > 0? leftlist.map((data,index) =>{
              const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
              let articleContents=articleContent.replace(/<\/?.+?>/g,"");
              return(
                <a href={articleHref+id} key={index} style={{color: 'gray', textDecorator: ''}}>
                  <Col  lg={24} span={24}xs={0}  sm={24} style={{paddingRight:'25px'}}>
                    <Card bordered={false}>
                      <img src={articleCover}  width='433px' height='303px' style={{objectFit: 'cover'}}/>
                      <div className={styles.productName}>
                        <p className={styles.casesTitle}>{articleTitle}</p>
                        <div className={styles.casescecontent} >{articleContents.slice(0,200)}{articleContents.length > 200 ? '...' : ''}</div>
                        <div style={{marginTop:'6px',color:'#0496ff'}}>
                          {createdAt}
                        </div>
                        <img src="//theme.lj110.com/default/articles/articlesList2.png" alt=""/>
                      </div>

                    </Card>
                  </Col>
                </a>
              )
            }) : ''}
            </div>
            <div className={styles.Dividingline}></div>
            <div className={styles.articlesListRight}>
              {rightlist && rightlist.length > 0? rightlist.map((data,index) =>{
                const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
                let articleContents=articleContent.replace(/<\/?.+?>/g,"");
                return(
                    <a key={index}  href={articleHref+id} style={{color: 'gray', textDecorator: ''}}>
                      <Col  lg={24} span={24}xs={0} sm={24}>
                      <Card bordered={false}>
                        <img src={articleCover}  width='433px' height='303px'style={{objectFit: 'cover'}}/>
                        <div className={styles.productName}>
                          <p className={styles.casesTitle}>{articleTitle}</p>
                          <div className={styles.casescecontent}>{articleContents.slice(0,200)}{articleContents.length > 200 ? '...' : ''}</div>
                          <div style={{marginTop:'6px',color:'#0496ff'}}>
                            {createdAt}
                          </div>
                          <img src="//theme.lj110.com/default/articles/articlesList2.png" alt=""/>
                        </div>
                      </Card>
                        </Col>
                    </a>
                )
              }) : ''}
            </div>
          </Col>
        </Row>
          <Row gutter={4}>
          <div className={styles.articlesListLeft}>
            {list && list.length > 0? list.map((data,index) =>{
              const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
              let articleContents=articleContent.replace(/<\/?.+?>/g,"");
              return(
                <a href={articleHref+id} key={index} style={{color: 'gray', textDecorator: ''}}>
                  <Col  span={24}xs={24}sm={0} style={{marginLeft:'-4px'}}>
                      <img src={articleCover}  width='100%' height='200px'className={styles.ListImg}style={{objectFit: 'cover'}}/>
                      <div className={styles.productName}>
                        <p className={styles.casesTitle}>{articleTitle}</p>
                        <div className={styles.casescecontent}>{articleContents.slice(0,60)}{articleContents.length > 60 ? '...' : ''}</div>
                        <div style={{marginTop:'6px',color:'#0496ff'}}>
                          {createdAt}
                        </div>
                        <img src="//theme.lj110.com/default/articles/articlesList2.png" alt=""/>
                      </div>
                  </Col>
                </a>
              )
            }) : ''}
          </div>
        </Row>
      <Row className={styles.footerpage}>
        {pagination && pagination.total > 4 ?
          <div className={styles.MoreArticlesList} onClick={loadMore}>加载更多</div>
          :''}
      </Row>
      </div>
      :''}
    </div>
  );
}

export default ArticlesList;
