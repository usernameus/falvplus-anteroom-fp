import React from 'react';
import { connect } from 'dva';
import styles from './Activities.css';
import ActivitiesList from '../components/MainActivity/activitiesList';


function Activities({dispatch, activities,fhome}) {
  const {headerData}=fhome
  const onPageChange = function(page,pageSize){
    dispatch({
      type: 'activities/query',
      payload:{
        page: page,
        pageSize: pageSize
      }
    })
  }
  return (
    <div style={{marginBottom:'15px'}}>
      <ActivitiesList {...activities} headerData={headerData} onPageChange={onPageChange} activityHref={'/activity/'}/>
    </div>
  );
}

function mapStateToProps({activities,fhome}) {
  return {activities,fhome};
}

export default connect(mapStateToProps)(Activities);
