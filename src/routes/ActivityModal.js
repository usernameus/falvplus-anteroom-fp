import React from 'react';
import { connect } from 'dva';
import styles from './AdminArticle.css';
import AddArticle from '../components/articles/addArticle';
import SuccessTips from '../components/articles/successTips';
import {ueditorbase} from '../utils/config';

window.UEDITOR_HOME_URL= ueditorbase;

function AddActivity({dispatch, adminActivities}) {
  const {successAdd} = adminActivities
  let loactionId = location.pathname.replace(/^\/(admin\/)?activity\//,'').split(/[?#\/]/)[0];

  const activityProps = {
    ...adminActivities,
    onSubmit:(values) => {
      if(loactionId ==""){
        dispatch({
          type: 'adminActivities/create',
          payload: values,
        })
      }else {
        dispatch({
          type: 'adminActivities/update',
          payload: values,
        })
      }
    }
  }

  let successTips = {
    moreData : '再写一篇',
    moreHref:"/admin/activity",
    returnData:'返回活动',
    returnHref:'/admin/activities'
  }
  return (
    <div className={styles.normalRow}>
      {!successAdd?
        <AddArticle {...activityProps}/>
        :
        <SuccessTips {...successTips}/>
      }
    </div>
  );
}

function mapStateToProps({adminActivities}) {
  return {adminActivities};
}
export default connect(mapStateToProps)(AddActivity);
