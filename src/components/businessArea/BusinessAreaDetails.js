import React from 'react';
import styles from './BusinessAreaDetails.css';
import {Row, Col,Icon,Card} from 'antd';
const Cookie = require('js-cookie');
let token = Cookie.get('token');

function BusinessAreaDetails(props) {
  const {selectOption,fparWebBusinessDomain,fparWebBusinessDomains,loginState} = props;

  const children = [];
  const childrens = [];
  function redirect(url){
    window.location.href = url;
  }
  function hopeOrder(param){
    if(param.type=='phone'){
      if(loginState){
        window.location.href = 'https://'+param.domainName +'/phoneOrder?token='+token;
      }else{
        window.location.href = 'https://'+param.domainName +'/phoneOrder';
      }
    }else{
      if(param.type=='chat'){
        if(loginState) {
          window.location.href = 'https://' + param.domainName +"?value=true&" + "token=" + token;
        }else{
          window.location.href = 'https://'+ param.domainName +"?value=true";
        }
      }
    }
  }
  function EnteranterRoom(domainName){
    let domaincrmhref='https://'+domainName+"/anteroom?token="+token;
    let crmhref = 'https://'+domainName;
    if(loginState){
      window.location.href = domaincrmhref
    }else {
      window.location.href = crmhref
    }
  }
  fparWebBusinessDomains ? fparWebBusinessDomains.map((data,index) =>{
    children.push(<li key={data.id} style={{width:'240px',textAlign:'center',lineHeight:'46px',fontSize:'18px'}} className={selectOption == data.id ? styles.changeColor : '' } onClick={redirect.bind(null,'/businessArea/' + data.id)}>{data.businessStr}</li>)
  }) : '';
  fparWebBusinessDomain ? fparWebBusinessDomain.domainLawyers.map((data,index) =>{
    childrens.push(<div key={index} className={styles.details_lawyer_list}>
      <div style={{float:'left',padding:'8px'}}>
        <h4>{data.lawyerStr}</h4>
        <p>合伙人</p>
        <p></p>
        <p>业务领域:{data.businessName}</p>
      </div>
      <div style={{float:'right'}}>
        <img src={"https:"+data.avatarPath} style={{width:'145px',height:'120px'}}/>
      </div>
      <div className={styles.clearfix}></div>
    </div>)
  }) : ''

  return (
    <div className={styles.normal}>
      <Row>
        <Col lg={7} sm={24} xs={24}>
            <img className={styles.detailImgSize} src={fparWebBusinessDomain ? fparWebBusinessDomain.businessImg : ''}/>
            <ul style={{width:'240px',marginTop:'50px',border:'1px solid #f5f5f5'}} className={styles.left_list}>
              <li style={{backgroundColor:'#f5f5f5',height:'46px',textAlign:'center',lineHeight:'46px',color:'#333333',fontSize:'20px'}}><h3>专业领域</h3></li>
              {children}
            </ul>
        </Col>
        <Col lg={16} sm={24} xs={24}>
          <Row>
            <Col>
              <h3 className={styles.business_name}>{fparWebBusinessDomain ? fparWebBusinessDomain.businessStr : ''}</h3>
              <div className={styles.business_name_bottom_line}></div>
              <h3 className={styles.business_detail_yewujianjiethem}>业务简介</h3>
              <p className={styles.business_detail_yewujianjiecotent}>{fparWebBusinessDomain ? fparWebBusinessDomain.briefIntroduction : ''}</p>
              <h3 className={styles.business_detail_yewujianjiethem}>业务详情</h3>
              <p className={styles.business_detail_yewujianjiecotent}>{fparWebBusinessDomain ? fparWebBusinessDomain.businessDetails : ''}</p>
            </Col>
          </Row>
          {fparWebBusinessDomain&&fparWebBusinessDomain.domainLawyers.length>0?
          <Row className={styles.topImg_bottom_span}>
            <Col lg={5} sm={12} xs={12}>
              <div className={styles.detail_phoneconsolt_box}>
                <i className="fpanticon fpanticon-phone" style={{marginRight:'10px',color:'#0496ff'}}></i>
                <span style={{color:'#0496ff'}} onClick={()=>hopeOrder({type:'phone',domainName:fparWebBusinessDomain ? fparWebBusinessDomain.domainLawyers[0].domainName : ''})}>电话咨询</span>
              </div>
            </Col>
            <Col lg={5} sm={12} xs={12}>
              <div className={styles.detail_phoneconsolt_box}>
                <i className="fpanticon fpanticon-consultation" style={{marginRight:'10px',color:'#0496ff'}}></i>
                <span style={{color:'#0496ff'}}  onClick={()=>hopeOrder({type:'chat',domainName:fparWebBusinessDomain ? fparWebBusinessDomain.domainLawyers[0].domainName : ''})}>在线咨询</span>
              </div>
            </Col>
            <Col lg={8} sm={24} xs={24}>
              <div className={styles.detail_click_intotheparlourbutton_box}>
                <img src="https://theme.lj110.com/default/index/16x16.png" alt="" style={{marginRight:'5px'}}/>
                <span style={{color:'#333333'}}>我的会客室:</span>
                <a onClick={(event)=>{event.stopPropagation(); EnteranterRoom(fparWebBusinessDomain ? fparWebBusinessDomain.domainLawyers[0].domainName : '')}} >点击进入会客室</a>
              </div>
            </Col>
          </Row>:''}
          <Row>
            <Col>
              <p className={styles.detail_lawyerteam_box}>律师团队</p>
            </Col>
          </Row>
          <Row className={styles.topImg_bottom_span}>
            <Col>
              <h3 className={styles.detail_zhuanyerenyuan}>专业人员:</h3>
              <Row>
                <Col>
                  {childrens}
                  <div className="clearfix"></div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BusinessAreaDetails;
