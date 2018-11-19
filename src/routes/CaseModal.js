import React from 'react';
import { connect } from 'dva';
import styles from './AdminArticle.css';
import AddCase from '../components/articles/addCase';
import SuccessTips from '../components/articles/successTips'

function AddArticles({dispatch, adminCases}) {
  const {successAdd} = adminCases
  let loactionId = location.pathname.replace(/^\/(admin\/)?case\//,'').split(/[?#\/]/)[0];

  const caseProps = {
    ...adminCases,
    onSubmit:(values) => {
      if(loactionId ==""){
        dispatch({
          type: 'adminCases/create',
          payload: values,
        })
      }else {
        dispatch({
          type: 'adminCases/update',
          payload: values,
        })
      }
    }
  }

  let successTips = {
    moreData : '再写一篇',
    moreHref:"/admin/case",
    returnData:'返回案例',
    returnHref:'/admin/cases'
  }
  return (
    <div className={styles.normalRow}>
      {!successAdd?
        <AddCase {...caseProps}/>
        :
        <SuccessTips {...successTips}/>
      }
    </div>
  );
}

function mapStateToProps({adminCases}) {
  return {adminCases};
}
export default connect(mapStateToProps)(AddArticles);
