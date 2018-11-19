/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination,Tooltip} from 'antd';
import styles from './MainIndex.less';
const Cookie = require('js-cookie')
let token = Cookie.get('token');
function M_MainBusiness(props) {
  const {data,lawyerhref,loginState,headerData} = props;
  function redirect(url){
    window.location.href = url;
  }
  function hopeOrder(domainName){
    let domaincrmhref='https://'+domainName+'/anteroom'+"?token="+token
    let crmhref = 'https://'+domainName
    if(loginState){
      window.location.href = domaincrmhref
    }else {
      window.location.href = crmhref
    }
  }
let Bdata=data&&data.length>4?data.slice(0,4):data
  return (
    <div className={styles.MnormalLawyerList}>
        <div className={styles.serviceDiv}>{headerData.AllTitle?headerData.AllTitle.businessTitle.Name:''}
          <div className={styles.TOPHerf}><a href="/cases"><Icon  style={{float:'left',lineHeight:'24px',color:'white',fontWeight:'bold',marginLeft:'5px'}} type="right"/></a></div>
        </div>
      <Row gutter={16}>
        {Bdata && (Bdata.length==2||Bdata.length==4)? Bdata.map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
          return (
            <Col key={index} xs={12}>
                <div className={styles.business_box} style={{height: '250px',overflow:'hidden'}}>
                  <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                  <img src={backImg} width='100%' height='150px'/>
                  </a>
                  <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                    <div style={{width: '100%',margin:'0 auto'}}>
                      <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{businessStr}</p>
                      <p className={styles.hrefRoom}>
                        {domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                          <a onClick={redirect.bind(null,'/businessArea/' + id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                      </p>
                    </div>
                  </div>
                </div>
            </Col>
          )
        }) : ''}
        {Bdata && (Bdata.length==1)? Bdata.map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg;
          return (
            <Col key={index} xs={24}>
              <div style={{padding:'20px',height:'220px'}}>
                  <Row>
                    <Col lg={12} md={12} xs={12}>
                      <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                      <div style={{height:'100%'}}>
                        <img src={businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg} width='100%' height='150px'/>
                        <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333',textAlign:'center',backgroundColor:'white',marginTop:'-5px'}}>{businessStr}</p>
                      </div></a>
                    </Col>
                    <Col  lg={11} md={11} xs={11} offset={1}>
                      <div style={{width: '100%'}}>
                        <p style={{lineHeight:'25px',fontSize:'16px',color:'#333333',height:'150px'}}>
                          {briefIntroduction.slice(0,50)}{briefIntroduction.length > 50 ? '...' : ''}
                          </p>
                        <p style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>
                          {domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                            <a onClick={redirect.bind(null,'/businessArea/' + id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                        </p>
                      </div>
                    </Col>
                  </Row>

                </div>
              </Col>
              )
        }) : ''}
        {Bdata && Bdata.length == 3?
          <div>
            {Bdata.slice(0,2).map((datas,index) =>{
              const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
              let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
              return (
                <div>
                  <Col key={index} xs={12}>
                      <div className={styles.business_box} style={{height: '250px',overflow:'hidden'}}>
                        <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                        <img src={backImg} width='100%' height='150px'/></a>
                        <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                          <div style={{width: '100%',margin:'0 auto'}}>
                            <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{businessStr}</p>
                            <p className={styles.hrefRoom}>
                              {domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                                <a onClick={redirect.bind(null,'/businessArea/' + id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Col>
                </div>
              )
            })}
            <Col xs={24}>
              <div style={{padding:'20px',height:'220px'}}>
                  <Row>
                    <Col lg={12} md={12} xs={12}>
                      <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + Bdata[2].id)}>
                      <div style={{height:'100%'}}>
                        <img src={Bdata[2].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':Bdata[2].businessImg} width='100%' height='150px'/>
                        <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333',textAlign:'center',backgroundColor:'white',marginTop:'-5px'}}>{Bdata[2].businessStr}</p>
                      </div> </a>
                    </Col>
                    <Col  lg={11} md={11} xs={11} offset={1}>
                      <div style={{width: '100%'}}>
                        <p style={{lineHeight:'25px',fontSize:'16px',color:'#333333',height:'150px'}}>
                          {Bdata[2].briefIntroduction.slice(0,50)}{Bdata[2].briefIntroduction.length > 50 ? '...' : ''}
                          </p>
                        <p style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>
                          {Bdata[2].domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(Bdata[2].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                            <a onClick={redirect.bind(null,'/businessArea/' + Bdata[2].id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                        </p>
                      </div>
                    </Col>
                  </Row>
              </div>
            </Col>
          </div>:''}
      </Row>
    </div>
  );
}

export default M_MainBusiness;
