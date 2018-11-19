import React from 'react';
import { connect } from 'dva';
import styles from './LawyerDetails.css';
import Details from '../components/MainLawyerList/LawyerDetails';

function LawyerDetails({mainLawyerDetails,login}) {
  const {loginState} =  login
  return (
    <div className={styles.normal}>
      {mainLawyerDetails?
      <Details mainLawyerDetails={mainLawyerDetails} loginState={loginState}/>:''}
    </div>
  );
}

function mapStateToProps({mainLawyerDetails,login}) {
  return {mainLawyerDetails,login};
}

export default connect(mapStateToProps)(LawyerDetails);
