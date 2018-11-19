
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import styles from './AdminCases.css';
import AdminList from '../components/articles/adminList';
import AdminSearch from  '../components/articles/search';

function AdminCases({dispatch, location, adminCases}) {
  const { loading, list, pagination, currentItem, modalVisible, modalType } = adminCases
  const { field, keyword } = location.query
  const adminCasesListProps = {
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
        type: 'adminCases/delete',
        payload: {
          id:id,
          ...query,
          page: pagination.current,
          pageSize: pagination.pageSize
        }
      })
    },
  }
  const adminCasesSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/cases',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/cases'
      }))
    },
  }
  return (
    <div className={styles.normal}>
      <AdminSearch {...adminCasesSearchProps}addHref={'./case'}/>
      <AdminList {...adminCasesListProps}editHref={'case/'}/>
    </div>
  );
}

function mapStateToProps({adminCases}) {
  return {adminCases};
}

export default connect(mapStateToProps)(AdminCases);
