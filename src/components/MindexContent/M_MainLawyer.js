/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip} from 'antd';
import styles from './MainIndex.less';
function M_MainLawyer(props) {
  const {lawyerList,lawyerhref,headerData} = props;
let Mproducts=lawyerList&&lawyerList.length>6?lawyerList.slice(0,6):lawyerList
  return (
    <div className={styles.MnormalLawyerList}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.lawyerListTitle.Name:''}
          <div className={styles.TOPHerf}><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></div>
        </div>
        {Mproducts && Mproducts.length > 0? Mproducts.map((data,index) =>{
          const {id,userId,name,duty,phone, email,majors, picUrl,belongs,domainName,lawyerDesc} = data;
          let backImg=picUrl==null?'//theme.lj110.com/default/index/mrtx.png':picUrl
          return(
            <div className={styles.MindexLawyerList} key={index}>
              <a href={'lawyerDetails/'+id}>
              <div className={styles.MindexlawyerImg} style={{backgroundImage: 'url('+backImg+')',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'}}>
                <p className={styles.MindexlawyerName}>{name}{duty==null?<span>律师</span>:<span>{duty}</span>} </p>
              </div>
              </a>
            </div>
            )
        }) : ''}
    </div>
  );
}

export default M_MainLawyer;
