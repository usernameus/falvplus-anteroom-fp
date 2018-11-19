
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import styles from './AdminCases.css';
import AdminList from '../components/articles/adminList';
import AdminSearch from  '../components/articles/search';

function AdminActivities({dispatch, location, adminActivities}) {
  const { loading, list, pagination, currentItem, modalVisible, modalType } = adminActivities
  const { field, keyword } = location.query
  const adminActivitiesListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      const { query } = location
      dispatch({
        type: 'adminActivities/delete',
        payload: {
          id:id,
          ...query,
          page: pagination.current,
          pageSize: pagination.pageSize
        }
      })
    },
  }
  const adminActivitiesSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/activities',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/activities'
      }))
    },
  }
  return (
    <div className={styles.normal}>
      <AdminSearch {...adminActivitiesSearchProps}addHref={'./activity'}/>
      <AdminList {...adminActivitiesListProps}editHref={'activity/'}/>
    </div>
  );
}

function mapStateToProps({adminActivities}) {
  return {adminActivities};
}

export default connect(mapStateToProps)(AdminActivities);
