/**
 * Created by zhihangjishu on 17/3/16.
 */
import React from 'react';
import styles from './LawyersList.less';
import {Button,Row,Col,Icon,Dropdown,Menu} from 'antd';
const Cookie = require('js-cookie')
let token = Cookie.get('token');
function Details({mainLawyerDetails,loginState}) {
  const {domainName,name,duty,phone, email,webmajors, picture,place,lawyerProfiles,fparWebBusinessDomainLawyers,room} = mainLawyerDetails;
  function hopeOrder(type,domainName){
    if(type.type=='phone'){
      if(loginState){
        window.location.href = 'https://'+domainName +'/phoneOrder?token='+token;
      }else{
        window.location.href = 'https://'+domainName +'/phoneOrder';
      }
    }else
    if(type.type=='chat'){
      if(loginState) {
        window.location.href = 'https://' + domainName + "?value=true&" +"?token=" + token;
      }else{
        window.location.href = 'https://'+domainName +'?value=true';
      }
    }
  }
  function EnteranterRoom(domainName){
    let domaincrmhref='https://'+domainName+"?token="+token
    let crmhref = 'https://'+domainName
    if(loginState){
      window.location.href = domaincrmhref
    }else {
      window.location.href = crmhref
    }
  }
  const menuRoom = (
    <Menu>
      {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?fparWebBusinessDomainLawyers.map((data,index) =>{
        return  <Menu.Item key={index}>
          <a  onClick={()=>EnteranterRoom(data.domainName)}>{data.businessName}</a>
        </Menu.Item>
      }):''}
    </Menu>
  );
  const menuPhone = (
    <Menu>
      {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?fparWebBusinessDomainLawyers.map((data,index) =>{
        return  <Menu.Item key={index}>
          <a  onClick={()=>hopeOrder({type:'phone'},data.domainName)}>{data.businessName}</a>
        </Menu.Item>
      }):''}
    </Menu>
  );
  const menu = (
    <Menu>
      {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?fparWebBusinessDomainLawyers.map((data,index) =>{
        return  <Menu.Item key={index}>
          <a  onClick={()=>hopeOrder({type:'chat'},data.domainName)}>{data.businessName}</a>
        </Menu.Item>
      }):''}
    </Menu>
  );
  return (
    <div className={styles.normalRoww}>
      <Row gutter={16} className={styles.rowDe_padding}>
        <Col lg={24} sm={24} xs={0} className={styles.colDe_padding}>
          <Row>
            <Col lg={8} sm={8} xs={8} offset={1}>
              <div className={styles.lawyerDetailsLeft}>
                <div style={{width:'286px',height:'340px'}}>
                  <img src={picture==null?'//theme.lj110.com/default/index/mrtx.png':picture} alt="" width='100%' height='100%'/>
                </div>
                <div className={styles.imgBottom}>
                  {phone==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
                    <Icon type="phone" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>电话:{phone}
                  </p>}
                  {email==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
                    <Icon type="mail" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>Email:{email}
                  </p>}
                  {place==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
                    <Icon type="environment-o" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>地点:{place}
                  </p>}
                  {room=='false'?'':
                  <div style={{lineHeight:'40px',fontSize:'14px',color:'#666666',marginTop:'4px'}}>
                    {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                      <p>
                      <img src="https://theme.lj110.com/default/index/16x16.png" alt="" style={{marginRight:'5px'}}/>我的会客室:
                      <span style={{fontSize:'14px'}}>
                        <Dropdown overlay={menuRoom}>
                          <a className="ant-dropdown-link">
                          点击进入我的会客室<Icon type="down" />
                        </a>
                        </Dropdown>
                      </span>
                      </p>
                      :  <p><img src="https://theme.lj110.com/default/index/16x16.png" alt="" style={{marginRight:'5px'}}/>我的会客室:
                      <span style={{fontSize:'14px'}}><a onClick={()=>EnteranterRoom(fparWebBusinessDomainLawyers[0].domainName)}>点击进入我的会客室</a></span></p>}
                  </div>}
                  {room=='false'?'':
                  <p style={{lineHeight:'40px'}}>
                    <span style={{marginLeft:'15px',fontSize:'16px'}}>
                      <i className="fpanticon fpanticon-phone" style={{fontSize:'16px',color:'#0496ff'}}></i>
                      {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                        <Dropdown overlay={menuPhone}>
                          <a onClick={()=>hopeOrder({type:'phone'},domainName)} className="ant-dropdown-link">
                            电话咨询<Icon type="down" />
                          </a>
                        </Dropdown>
                        :<a onClick={()=>hopeOrder({type:'phone'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;电话咨询</a>}
                    </span>
                    <span style={{marginLeft:'30px',fontSize:'16px'}}>
                      <i className="fpanticon fpanticon-consultation" style={{fontSize:'16px',color:'#0496ff'}}></i>
                      {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                        <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link">
                            在线咨询<Icon type="down" />
                          </a>
                        </Dropdown>
                        :<a onClick={()=>hopeOrder({type:'chat'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;在线咨询</a>}
                    </span>
                  </p>}
                </div>
              </div>
            </Col>
            <Col lg={15} sm={15} xs={15}>
              <div>
                <span style={{fontSize:'40px',fontWeight:'bold',color:'#000000'}}>{name}</span>
                <span style={{fontSize:'14px',color:'#000000',marginLeft:'10px'}}>
                  {duty==null?<span>律师</span>:<span>{duty}</span>}
                </span>
              </div>
              {webmajors&&webmajors.length>0?<div style={{fontSize:'18px',color:'#0496ff',marginTop:'40px'}}>专业领域
                <div style={{width:'517px',height:'2px',marginTop:'-15px',marginLeft:'77px',backgroundColor:'rgba(4,150,255,0.29)'}}></div>
              </div>:''}
              {webmajors&&webmajors.length>0?<p style={{fontSize:'14px',color:'#666666',marginTop:'20px'}}>{webmajors.map(p=><span>p.label</span>)}</p>:''}
              <div style={{fontSize:'18px',color:'#0496ff',marginTop:'20px'}}>律师简介
                <div style={{width:'517px',height:'2px',marginTop:'-15px',marginLeft:'77px',backgroundColor:'rgba(4,150,255,0.29)'}}></div>
              </div>
              <p style={{fontSize:'14px',color:'#666666',marginTop:'40px'}}>{lawyerProfiles}</p>
            </Col>
          </Row>
        </Col>
        <Col lg={0} sm={0} xs={24} className={styles.colDeM_padding}>
          <div className={styles.serviceDiv}>
            <span style={{fontSize:'20px',fontWeight:'bold',color:'#000000'}}>{name}</span>
            <span style={{fontSize:'14px',color:'#000000',marginLeft:'10px'}}>
                  {duty==null?<span>律师</span>:<span>{duty}</span>}
                </span>
          </div>
          <hr className={styles.serviceHr}/>
          <div className={styles.imgBottom}>
            {phone==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
              <Icon type="phone" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>电话:{phone}
            </p>}
            {email==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
              <Icon type="mail" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>Email:{email}
            </p>}
            {place==null?'':<p style={{fontSize:'14px',color:'#666666',lineHeight:'40px'}}>
              <Icon type="environment-o" style={{fontSize: 16, color: '#0496ff',marginRight:'5px'}}/>地点:{place}
            </p>}
            <div style={{lineHeight:'40px',fontSize:'14px',color:'#666666',marginTop:'4px'}}>
              {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                <p>
                <img src="https://theme.lj110.com/default/index/16x16.png" alt="" style={{marginRight:'5px'}}/>我的会客室:
                <span style={{fontSize:'14px'}}>
                  <Dropdown overlay={menuRoom}>
                    <a className="ant-dropdown-link">
                      点击进入我的会客室<Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
                </p>
                :  <p><img src="https://theme.lj110.com/default/index/16x16.png" alt="" style={{marginRight:'5px'}}/>我的会客室:
                <span style={{fontSize:'14px'}}><a  onClick={()=>EnteranterRoom(fparWebBusinessDomainLawyers[0].domainName)}>点击进入我的会客室</a></span></p>}
            </div>
            <p style={{lineHeight:'40px'}}>
              <span style={{marginLeft:'15px',fontSize:'16px'}}>
                <i className="fpanticon fpanticon-phone" style={{fontSize:'16px',color:'#0496ff'}}></i>
                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                  <Dropdown overlay={menuPhone}>
                    <a className="ant-dropdown-link">
                      电话咨询<Icon type="down" />
                    </a>
                  </Dropdown>
                  :<a onClick={()=>hopeOrder({type:'phone'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;电话咨询</a>}
              </span>
              <span style={{marginLeft:'30px',fontSize:'16px'}}>
                <i className="fpanticon fpanticon-consultation" style={{fontSize:'16px',color:'#0496ff'}}></i>
                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                      在线咨询<Icon type="down" />
                    </a>
                  </Dropdown>
                  :<a onClick={()=>hopeOrder({type:'chat'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;在线咨询</a>}
              </span>
            </p>

            {webmajors&&webmajors.length>0?<div style={{fontSize:'18px',color:'#0496ff',marginTop:'40px'}}>专业领域
              <div style={{width:'70%',height:'2px',marginTop:'-15px',marginLeft:'77px',backgroundColor:'rgba(4,150,255,0.29)'}}></div>
            </div>:''}
            {webmajors&&webmajors.length>0?<p style={{fontSize:'14px',color:'#666666',marginTop:'20px'}}>{webmajors.map(p=><span>p.label</span>)}</p>:''}
            <div style={{fontSize:'18px',color:'#0496ff',marginTop:'20px'}}>律师简介
              <div style={{width:'70%',height:'2px',marginTop:'-15px',marginLeft:'77px',backgroundColor:'rgba(4,150,255,0.29)'}}></div>
            </div>
            <p style={{fontSize:'14px',color:'#666666',marginTop:'40px'}}>{lawyerProfiles}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Details;
