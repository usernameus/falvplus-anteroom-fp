import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip,Dropdown,Menu} from 'antd';
import styles from './LawyersList.less';
const Cookie = require('js-cookie')
let token = Cookie.get('token');
function LawyersList(props) {
  const {lawyerList, pagination, onPageChange,productsHref,loginState,headerData} = props;

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
          window.location.href = 'https://' + domainName +"?value=true&" + "token=" + token;
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
  return (
    <div className={styles.normalRoww}>
      <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.lawyerListTitle.Name:''}
      </div>
      <hr className={styles.serviceHr}/>
      <Row gutter={16} className={styles.row_padding}>
        {lawyerList && lawyerList.length > 0? lawyerList.map((data,index) =>{
          const {id,userId,name,duty,phone, email,webmajors, picture,fparWebBusinessDomainLawyers,domainName,room} = data;
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
            <div key={index}>
            <Col lg={12} sm={12} xs={0} className={styles.col_padding}>
                <div className={styles.productss} style={{height: '178px'}}>
                  <Row>
                    <Col lg={14} sm={14}>
                      <div className={styles.lawyerLeft}>
                        <div className={styles.lawyerListDiv}>
                          <p className={styles.lawyerListName}>
                            <span style={{fontSize:'18px',color:'#000000'}}>{name.substring(0, 3)}</span>
                          </p>
                          <p>
                            {room=='false'?'':
                              <span style={{paddingRight:'16px'}}>
                              <i className="fpanticon fpanticon-phone" style={{fontSize:'12px',color:'#0496ff'}}></i>
                                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                                  <Dropdown overlay={menuPhone}>
                                    <a className="ant-dropdown-link">
                                      电话咨询<Icon type="down" />
                                    </a>
                                  </Dropdown>
                                  :<a onClick={()=>hopeOrder({type:'phone'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;电话咨询</a>}
                            </span>}
                            {room=='false'?'':
                              <span style={{paddingRight:'20px'}}><i className="fpanticon fpanticon-consultation" style={{fontSize:'12px',color:'#0496ff'}}></i>
                                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                                  <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link">
                                      在线咨询<Icon type="down" />
                                    </a>
                                  </Dropdown>
                                  :<a onClick={()=>hopeOrder({type:'chat'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;在线咨询</a>}
                              </span>}
                          </p>
                          <p style={{fontSize:'12px',color:'#999999',marginTop:'6px'}}>{duty==null?<span>律师</span>:<span>{duty}</span>} </p>
                          <hr style={{width:'100px',marginTop:'6px',color:'#999999'}}/>
                          {room=='false'?'':
                          <p style={{fontSize:'12px',color:'#666666',marginTop:'4px'}}>
                            我的会客室: <span style={{fontSize:'12px'}}>
                            {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                              <Dropdown overlay={menuRoom}>
                                <a className="ant-dropdown-link">
                                  点击进入我的会客室<Icon type="down" />
                                </a>
                              </Dropdown>
                              :<a onClick={()=>EnteranterRoom(fparWebBusinessDomainLawyers[0].domainName)}>点击进入我的会客室</a>}
                          </span>
                          </p>}
                          {phone==null?'':<p style={{fontSize:'12px',color:'#666666',marginTop:'4px'}}>电话:{phone}</p>}
                          {webmajors==null?'':<p style={{fontSize:'12px',color:'#666666',marginTop:'4px'}}>专业领域: {webmajors.map(p=><span>p.label</span>)}</p>}
                        </div>
                      </div>
                    </Col>
                    <Col lg={10} sm={10}>
                      <div>
                        <a href={'lawyerDetails/'+id}>
                        <img src={picture==null?'//theme.lj110.com/default/index/mrtx.png':picture} alt="" width='100%' height='178'/>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
            </Col>
              <Col lg={0} sm={0} xs={24} className={styles.col_padding}>
                  <div className={styles.productss} style={{height: '178px'}}>
                    <Row>
                      <Col lg={12} sm={12} xs={12}>
                        <div className={styles.lawyerLeft}>
                          <div className={styles.lawyerListDiv}>
                            <p className={styles.lawyerListName}>
                              <span style={{fontSize:'18px',color:'#000000'}}>{name.substring(0, 3)}</span>
                            </p>
                            <hr style={{width:'100px',marginTop:'6px',color:'#999999'}}/>
                            {webmajors==null?'':<p style={{fontSize:'14px',color:'#666666',marginTop:'6px'}}>专业领域:
                              {webmajors.map(p=><span>p.label</span>)}
                              </p>}
                            {room=='false'?'':
                            <p  style={{marginTop:'6px'}}><span style={{paddingRight:'16px'}}>
                              <i className="fpanticon fpanticon-phone" style={{fontSize:'14px',color:'#0496ff'}}></i>
                              {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                                <Dropdown overlay={menuPhone}>
                                  <a className="ant-dropdown-link">
                                    电话咨询<Icon type="down" />
                                  </a>
                                </Dropdown>
                                :<a onClick={()=>hopeOrder({type:'phone'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;电话咨询</a>}
                            </span>
                              <span style={{paddingRight:'20px'}}>
                                <i className="fpanticon fpanticon-consultation" style={{fontSize:'14px',color:'#0496ff'}}></i>
                                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                                  <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link">
                                      在线咨询<Icon type="down" />
                                    </a>
                                  </Dropdown>
                                  :<a onClick={()=>hopeOrder({type:'chat'},fparWebBusinessDomainLawyers[0].domainName)}>&nbsp;在线咨询</a>}
                              </span></p>}
                            {room=='false'?'':<p style={{fontSize:'14px',color:'#666666',marginTop:'6px'}}>
                              <span style={{fontSize:'12px'}}>
                                {fparWebBusinessDomainLawyers&&fparWebBusinessDomainLawyers.length>1?
                                  <Dropdown overlay={menuRoom}>
                                    <a onClick={()=>EnteranterRoom(domainName)} className="ant-dropdown-link">
                                      点击进入我的会客室<Icon type="down" />
                                    </a>
                                  </Dropdown>
                                  :<a onClick={()=>EnteranterRoom(fparWebBusinessDomainLawyers[0].domainName)}>点击进入我的会客室</a>}
                              </span>
                            </p>}
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} sm={12} xs={12}>
                        <div>
                          <a href={'lawyerDetails/'+id}>
                          <img src={picture==null?'//theme.lj110.com/default/index/mrtx.png':picture} alt="" width='100%' height='178'/>
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </div>
              </Col>
            </div>
          )
        }) : ''}
      </Row>
      {location.pathname === '/' ?
        '':
        <Row className={styles.footerpage}>
          {pagination && pagination.total > 1 ?
            <Pagination defaultPageSize={10} defaultCurrent={pagination.current} size="large" total={pagination.total} style={{float:'right'}} onChange={onPageChange}/>
            :''}
        </Row>}
    </div>
  );
}

export default LawyersList;
