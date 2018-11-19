/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip} from 'antd';
import styles from './MainIndex.less';
// const Cookie = require('js-cookie')
// let token = Cookie.get('token');
// function hopeOrder(type,domainName){
//   if(type.type=='phone'){
//     if(loginState){
//       window.location.href = 'https://'+domainName +'/phoneOrder?token='+token;
//     }else{
//       window.location.href = 'https://'+domainName +'/phoneOrder';
//     }
//   }else
//   if(type.type=='chat'){
//     if(loginState) {
//       window.location.href = 'https://' + domainName + "?value=true&" +"?token=" + token;
//     }else{
//       window.location.href = 'https://'+domainName +'';
//     }
//   }
// }
function MainLawyer(props) {
  const {lawyerList,lawyerhref,headerData} = props;
  return (
    <div className={styles.normalLawyerList}>
      <div className={styles.ActivityMain}>
        <div className={styles.serviceDiv}style={{color:'white'}}>{headerData.AllTitle?headerData.AllTitle.lawyerListTitle.Name:''}</div>
        <hr className={styles.serviceHr}/>
        <div className={styles.serviceH3}style={{color:'white'}}>{headerData.AllTitle?headerData.AllTitle.lawyerListTitle.EName:''}</div>
        {lawyerList && lawyerList.length > 0? lawyerList.map((data,index) =>{
          const {id,userId,name,duty,phone,webmajors, picture,lawyerProfiles,fparWebBusinessDomainLawyers} = data;
          let backImg=picture==null?'//theme.lj110.com/default/index/mrtx.png':picture
          return(
            <div className={styles.indexLawyerList} key={index}>
              <a href={'lawyerDetails/'+id}>
              <div className={styles.indexlawyerImg} style={{backgroundImage: 'url('+backImg+')',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'}}>
                <p className={styles.indexlawyerName}>{name}{duty==null?<span>律师</span>:<span>{duty}</span>} </p>
                <div className={styles.lawyerTooltip}>
                  <p style={{marginTop:'-10px',marginLeft:'190px'}}><Icon type="caret-up" style={{color:'white'}}/></p>
                  <p style={{marginLeft:'28px',marginTop:'30px'}}><span style={{fontSize:'24px',color:'#333333',fontWeight:'bold'}}>{name}{duty==null?<span>律师</span>:<span>{duty}</span>} </span></p>
                  {phone==null?'':<p style={{fontSize:'24px',color:'#666666',lineHeight:'40px',marginLeft:'28px'}}>电话:
                    <span style={{fontSize:'24px',color:'#f14e0f',fontWeight:'bold'}}>{phone}</span>
                  </p>}
                  {webmajors&&webmajors.length>0?<p style={{fontSize:'24px',color:'#666666',lineHeight:'40px',marginLeft:'28px'}}>擅长:{webmajors.map(p=><span>p.label</span>)}
                  </p>:''}
                  <p style={{fontSize:'24px',color:'#666666',lineHeight:'40px',marginLeft:'28px'}}>简介:{lawyerProfiles.slice(0,50)}{lawyerProfiles.length > 50 ? '...' : ''}</p>
                  </div>
              </div>
                </a>
            </div>
            )
        }) : ''}
      </div>
    </div>
  );
}
export default MainLawyer;
