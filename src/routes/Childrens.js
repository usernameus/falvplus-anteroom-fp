import React from 'react';
import { connect } from 'dva';
import {Row, Col} from 'antd';
import styles from './Childrens.css';
import List from '../components/articles/List';
import HomeList from '../components/product/Homelist';
import MainActivity from '../components/indexContent/MainActivity';
import FMainActivity from '../components/indexContent/FMainActivity';
import MainCases from '../components/indexContent/MainCases';
import MainLawyer from '../components/indexContent/MainLawyer';
import MainBusiness from '../components/indexContent/MainBusiness';
import M_MainActivity from '../components/MindexContent/M_MainActivity';
import M_MainCases from '../components/MindexContent/M_MainCases';
import M_MainLawyer from '../components/MindexContent/M_MainLawyer';
import M_MainBusiness from '../components/MindexContent/M_MainBusiness';
import FM_MainActivity from '../components/MindexContent/FM_MainActivity';
function Childrens({products,cases,fhome,dispatch,activities,mainLawyerList,businessarea,login}) {
  const {page}=cases;
  const {pageactivity}=activities;
  const {ownerInfo, header,headerData} = fhome;
  const {webTypes}=headerData;
  const {loginState}=login;
  const {pagination,productsHref,product} = products;
  const onNextCase = function(){
    dispatch({
      type: 'cases/queryIndex',
      payload:{
        pagecase: page.current&&page.current<page.total?page.current+1:page.total,
      }
    })
  }
  const onLastCase = function(){
    dispatch({
      type: 'cases/queryIndex',
      payload:{
        pagecase: page.current&&page.current>1?page.current-1:1,
      }
    })
  }
  const onNextActivity = function(){
    dispatch({
      type: 'activities/queryIndex',
      payload:{
        pagecase: pageactivity.current&&pageactivity.current<pageactivity.total?pageactivity.current+1:pageactivity.total,
      }
    })
  }
  const onLastActivity = function(){
    dispatch({
      type: 'activities/queryIndex',
      payload:{
        pagecase: pageactivity.current&&pageactivity.current>1?pageactivity.current-1:1,
      }
    })
  }
  const productsprops={
    loginState:loginState,
    product:product,
    pagination:pagination,
    productsHref:productsHref,
  }
  return (
    <div className={styles.normal}>
        <div>
          {products && products.hasOwnProperty('product') && products.product.length > 0 ?
          <HomeList {...productsprops} productsHref={'/product/'} headerData={headerData}/>
          :''}
          {activities && activities.hasOwnProperty('list') && activities.list.length > 0&&webTypes==0 ?
            <div>
              <Row>
                <Col sm={24} xs={0}>
                  <MainActivity {...activities} onNextActivity={onNextActivity} headerData={headerData} onLastActivity={onLastActivity} activityHref={'/activity/'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={0} xs={24}>
                  <M_MainActivity {...activities} onNextActivity={onNextActivity} headerData={headerData} onLastActivity={onLastActivity} activityHref={'/activity/'}/>
                </Col>
              </Row>
            </div>
          :''}
          {mainLawyerList && mainLawyerList.hasOwnProperty('lawyerList') && mainLawyerList.lawyerList.length > 0&&webTypes==1 ?
            <div>
              <Row>
                <Col sm={24} xs={0}>
                  <MainLawyer {...mainLawyerList} headerData={headerData} lawyerhref={'/lawyerList/'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={0} xs={24}>
                  <M_MainLawyer {...mainLawyerList} headerData={headerData} lawyerhref={'/lawyerList/'}/>
                </Col>
              </Row>
            </div>
            :''}
          {businessarea && businessarea.hasOwnProperty('data') && businessarea.data.length > 0&&webTypes==1 ?
            <div>
              <Row>
                <Col sm={24} xs={0}>
                  <MainBusiness {...businessarea} headerData={headerData} loginState={loginState} lawyerhref={'/businessAreas/'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={0} xs={24}>
                  <M_MainBusiness {...businessarea} headerData={headerData} loginState={loginState} lawyerhref={'/businessAreas/'}/>
                </Col>
              </Row>
            </div>
            :''}
          {activities && activities.hasOwnProperty('list') && activities.list.length > 0&&webTypes==1 ?
            <div>
              <Row>
                <Col sm={24} xs={0}>
                  <FMainActivity {...activities} headerData={headerData} activityHref={'/activity/'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={0} xs={24}>
                  <FM_MainActivity {...activities} headerData={headerData} activityHref={'/activity/'}/>
                </Col>
              </Row>
            </div>
            :''}
          {cases && cases.hasOwnProperty('list') && cases.list.length > 0 ?
            <div>
              <Row>
                <Col sm={24} xs={0}>
                  <MainCases {...cases} onNextCase={onNextCase} headerData={headerData} onLastCase={onLastCase} caseHref={'/case/'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={0} xs={24}>
                  <M_MainCases {...cases} onNextCase={onNextCase} headerData={headerData} onLastCase={onLastCase} caseHref={'/case/'}/>
                </Col>
              </Row>
            </div>
            :''}
        </div>
    </div>
  );
}
function mapStateToProps({cases,products,fhome,activities,mainLawyerList,businessarea,login}) {
  return {cases,products,fhome,activities,mainLawyerList,businessarea,login};
}

export default connect(mapStateToProps)(Childrens);
