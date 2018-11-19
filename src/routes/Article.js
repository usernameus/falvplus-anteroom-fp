import React from 'react';
import { connect } from 'dva';
import {Icon,Button,Upload} from 'antd';
import styles from './Article.less';
import ArticlesDetails from '../components/MainArticles/articleDetails'

function Article({dispatch,article,fhome }) {
  // const {articleTitle,authorName,publishTime, articleCover, articleContent} = article;
const {headerData}=fhome
  return (
    <div className={styles.articlePage} style={{marginBottom:'-5px'}}>
      <ArticlesDetails {...article} headerData={headerData} articleHref={'/article'}/>
    </div>
  );
}

function mapStateToProps({article,fhome}) {
  return {article,fhome};
}

export default connect(mapStateToProps)(Article);
