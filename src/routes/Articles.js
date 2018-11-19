import React from 'react';
import { connect } from 'dva';
import styles from './Profile.less';
import ArticlesList from '../components/MainArticles/articlesList'

function Articles({dispatch, location, articles,fhome}) {
  const {list,pagination,url}=articles
  const {headerData}=fhome
  let leftList=[];
  let rightList=[];
  let j=0;
  let k=0;
  for (let i=0;i<list.length;i++){
    if(i%2==0||i==0){
      leftList[j]=list[i];
      j++
    }else{
      rightList[k]=list[i];
      k++
    }
  }
  const Articles={
      leftlist:leftList,
      rightlist:rightList,
    pagination:pagination,
    list:list,
    url:url,
    loadMore:()=>{
        dispatch({
          type: 'articles/queryMore',
          payload:{
            page: pagination.current+1
          }
        })
    }
  }
  const onPageChange = function(page,pageSize){
    dispatch({
      type: 'articles/query',
      payload:{
        page: page,
        pageSize: pageSize
      }
    })
  }
  return (
    <div style={{marginBottom:'-15px'}}>
      <ArticlesList {...Articles} headerData={headerData} onPageChange={onPageChange} articleHref={'/article/' +
      ''}/>
    </div>
  );
}

export default connect(({articles,fhome}) => ({articles,fhome}))(Articles);
