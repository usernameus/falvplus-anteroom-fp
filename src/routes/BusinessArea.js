import React from 'react';
import { connect } from 'dva';
import styles from './BusinessArea.css';
import BusinessArea from '../components/businessArea/BusinessArea';

function businessArea({ dispatch,businessarea,login,fhome}) {
  const {data,pagination} = businessarea
  const {loginState} =  login
  const {headerData}=fhome
  const BusinessAreaProp={
    data:data,
    pagination:pagination,
    loginState:loginState,
    onPageChange (page,pageSize) {
      dispatch({
        type: 'businessarea/businesslist',
        payload: {
          page: page,
          pageSize: pageSize
        }
      })
    },
    EnteranterRoom(domainId,domainName) {
      dispatch({
        type: 'businessarea/enteranterRoom',
        payload:{domainId:domainId,domainName:domainName}
      })
    },
  }
  return (
    <div className={styles.normal}>
      <BusinessArea {...BusinessAreaProp} headerData={headerData}/>
    </div>
  );
}

function mapStateToProps({businessarea,login,fhome}) {
  return {businessarea,login,fhome};
}

export default connect(mapStateToProps)(businessArea);
