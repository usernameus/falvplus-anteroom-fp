
import React from 'react';
import { connect } from 'dva';
import styles from './MainLawyersList.css';
import LawyersList from '../components/MainLawyerList/LawyersList';
function MainLawyersList({ dispatch,mainLawyerList,login,fhome}) {
  const {loginState} =  login
  const {headerData}=fhome
  const onPageChange = function(page,pageSize){
    dispatch({
      type: 'mainLawyerList/FirmLawyersList',
      payload:{
        page: page,
        pageSize: pageSize
      }
    })
  }
  return (
    <LawyersList {...mainLawyerList} headerData={headerData} onPageChange={onPageChange} loginState={loginState}/>
  );
}

function mapStateToProps({mainLawyerList,login,fhome}) {
  return {mainLawyerList,login,fhome};
}

export default connect(mapStateToProps)(MainLawyersList);
