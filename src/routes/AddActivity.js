import React from 'react';
import { connect } from 'dva';
import styles from './AddArticle.less';
import Add_Article from '../components/articles/MaddArticle';
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
    moreHref:"/activity",
    returnData:'返回活动',
    returnHref:'/activities'
  }
  return (
    <div className={styles.MaddArticle}>
      {!successAdd?
        <Add_Article {...activityProps}/>
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
