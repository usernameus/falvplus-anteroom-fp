import React from 'react';
import { connect } from 'dva';
import {Icon,Button,Upload} from 'antd';
import styles from './Casess.less';
import CasesDetails from '../components/MainCases/casesDetails'

function Casess({dispatch,casess }) {
  const {articleTitle,authorName,publishTime, articleCover, articleContent,id} = casess;
  return (
    <div className={styles.articlePage} style={{marginBottom:'-5px'}}>
      <CasesDetails {...casess}caseHref={'/case/'}/>
    </div>
  );
}

function mapStateToProps({casess}) {
  return {casess};
}

export default connect(mapStateToProps)(Casess);
