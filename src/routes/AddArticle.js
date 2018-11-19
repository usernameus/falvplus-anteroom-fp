import React from 'react';
import { connect } from 'dva';
import styles from './AddArticle.less';
import Add_article from '../components/articles/MaddArticle';
import SuccessTips from '../components/articles/successTips'


function AddArticle({dispatch,  adminArticle,location}) {
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
    moreHref:"/addArticle",
    returnData:'返回文集',
    returnHref:'/articles'
  }
  return (
    <div className={styles.MaddArticle} >
      {!successAdd?
        <Add_article {...articleProps}/>
        :
        <SuccessTips {...successTips}/>
      }
    </div>
  );
}

function mapStateToProps({adminArticle}) {
  return {adminArticle};
}

export default connect(mapStateToProps)(AddArticle);
