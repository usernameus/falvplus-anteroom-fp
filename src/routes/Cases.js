import React from 'react';
import { connect } from 'dva';
import CasesList from '../components/MainCases/casesList';

function Cases({dispatch, cases,fhome}) {
  const {headerData}=fhome
  const onPageChange = function(page,pageSize){
    dispatch({
      type: 'cases/query',
      payload:{
        page: page,
        pageSize: pageSize
      }
    })
  }
  return (
    <div style={{marginBottom:'-15px'}}>
      <CasesList {...cases} onPageChange={onPageChange} headerData={headerData} caseHref={'/case/'}/>
    </div>
  );
}

export default connect(({cases,fhome}) => ({cases,fhome}))(Cases);
