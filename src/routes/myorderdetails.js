/**
 * Created by falvplus-dev on 17-3-31.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './myorderdetails.css';
import { routerRedux } from 'dva/router';
import MyorderdetailsList from '../components/myorder/Myorderdetails';

function Myorderdetails({dispatch,location,myorderdetails}){
  const {loading, list, pagination} = myorderdetails
  const { field, keyword } = location.query
  const MyorderdetailsListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({//换页
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    }
  }

  return (
    <div className={styles.normal}>
      <MyorderdetailsList {...MyorderdetailsListProps}/>
    </div>
  );
}
function mapStateToProps({myorderdetails}) {
  return {myorderdetails};
}
export default connect(mapStateToProps)(Myorderdetails);
