import React from 'react';
import { connect } from 'dva';
import styles from './AdminArticle.css';
import AddArticle from '../components/articles/addArticle';
import SuccessTips from '../components/articles/successTips'

function AddArticles({dispatch,  adminArticle}) {
  const {successAdd} = adminArticle
  let loactionId = location.pathname.replace(/^\/(admin\/)?article\//,'').split(/[?#\/]/)[0];

  const articleProps = {
    ...adminArticle,
    onSubmit:(values) => {
      if(loactionId ==""){
        dispatch({
          type: 'adminArticle/create',
          payload: values,
        })
      }else {
        dispatch({
          type: 'adminArticle/update',
          payload: values,
        })
      }
    }
  }

  let successTips = {
     moreData : '再写一篇',
    moreHref:"/admin/article",
    returnData:'返回文集',
    returnHref:'/admin/articles'
  }

  return (
    <div className={styles.normalRow}>
      {!successAdd?
        <AddArticle {...articleProps}/>
        :
        <SuccessTips {...successTips}/>
      }
    </div>
  );
}

function mapStateToProps({adminArticle}) {
  return {adminArticle};
}
export default connect(mapStateToProps)(AddArticles);
