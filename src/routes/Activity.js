import React from 'react';
import { connect } from 'dva';
import styles from './Activity.css';
import ActivityDetails from '../components/MainActivity/activityDetails'

function Activity({activity,dispatch}) {
  return (
    <div className={styles.articlePage}style={{marginBottom:'-5px'}}>
      <ActivityDetails {...activity}activityHref={'/activity/'}/>
    </div>
  );
}

function mapStateToProps({activity}) {
  return {activity};
}

export default connect(mapStateToProps)(Activity);
