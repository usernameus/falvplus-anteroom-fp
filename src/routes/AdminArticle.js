import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import styles from './AdminArticle.css';
import AdminList from '../components/articles/adminList';
import AdminSearch from  '../components/articles/search';
function AdminArticle({dispatch, location, adminArticle}) {
  const { loading, list, pagination, currentItem, modalVisible, modalType } = adminArticle
  const { field, keyword } = location.query
  const adminArticleListProps = {
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
        type: 'adminArticle/delete',
        payload: {
          id:id,
          ...query,
          page: pagination.current,
          pageSize: pagination.pageSize
        }
      })
    },
  }
  const adminArticleSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/articles',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) : dispatch(routerRedux.push({
        pathname: '/admin/articles'
      }))
    },
  }
  return (
    <div className={styles.normal}>
      <AdminSearch {...adminArticleSearchProps}addHref={'/admin/article'}/>
      <AdminList {...adminArticleListProps}editHref={'article/'}/>
    </div>
  );
}

function mapStateToProps({adminArticle}) {
  return {adminArticle};
}

export default connect(mapStateToProps)(AdminArticle);
