/**
 * Created by fapu on 17-4-21.
 */
import React from 'react';
import {Row, Col,Card,Icon,Button,Pagination} from 'antd';
import styles from './MainIndex.less';
const Cookie = require('js-cookie')
let token = Cookie.get('token');
function MainBusiness(props) {
  const {data,loginState,headerData} = props;
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
  return (
    <div className={styles.normalBusiness}>
    <div className={styles.normalBus}>
      <div className={styles.serviceDiv} style={{height:'50px',marginTop:'20px'}}>{headerData.AllTitle?headerData.AllTitle.businessTitle.Name:''}
      </div>
      <hr className={styles.serviceHr}/>
      <div className={styles.serviceH3} style={{marginBottom:'10px'}}>{headerData.AllTitle?headerData.AllTitle.businessTitle.EName:''}</div>
      <Row gutter={16}>
        {data && (data.length > 5||data.length==3)? data.slice(0,6).map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
          return (
            <Col key={index} lg={8} sm={8} xs={12}>
                <div className={styles.business_boxS} style={{height: '320px',overflow:'hidden'}}>
                  <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                    <img src={backImg} width='100%' height='220px'style={{marginTop:'20px'}}/></a>
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
        {data && (data.length ==2||data.length ==4)?
          <div>
            <Col lg={12} sm={12}>
                <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                  <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[0].id)}>
                  <img src={data[0].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[0].businessImg} width='100%' height='220px'/>
                  </a>
                  <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                    <div style={{width: '100%',margin:'0 auto'}}>
                      <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{data[0].businessStr}</p>
                      <p className={styles.hrefRoom}>
                        {data[0].domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[0].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                          <a onClick={redirect.bind(null,'/businessArea/' + data[0].id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                      </p>
                    </div>
                  </div>
                </div>
            </Col>
            <Col lg={12} sm={12}>
              <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[1].id)}>
                  <img src={data[1].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[1].businessImg} width='100%' height='220px'/>
                </a>
                <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                  <div style={{width: '100%',margin:'0 auto'}}>
                    <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{data[1].businessStr}</p>
                    <p className={styles.hrefRoom}>
                      {data[1].domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[1].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                        <a onClick={redirect.bind(null,'/businessArea/' + data[1].id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            {/*<Col lg={16} sm={16}>*/}
              {/*<div style={{padding:'20px',height:'320px'}}>*/}
                {/*<div style={{width:'100%',height:'100%',backgroundColor:'white'}}>*/}
                  {/*<Row>*/}
                    {/*<Col lg={12} md={12}>*/}
                      {/*<a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[1].id)}>*/}
                      {/*<div style={{height:'100%'}}>*/}
                        {/*<img src={data[1].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[1].businessImg} width='100%' height='220px'/>*/}
                        {/*<p style={{lineHeight:'50px',fontSize:'20px',color:'#333333',textAlign:'center',backgroundColor:'white',marginTop:'-5px'}}>{data[1].businessStr}</p>*/}
                      {/*</div></a>*/}
                    {/*</Col>*/}
                    {/*<Col  lg={11} md={11} offset={1}>*/}
                        {/*<div style={{width: '100%'}}>*/}
                          {/*<p style={{lineHeight:'30px',fontSize:'20px',color:'#333333',height:'220px'}}>*/}
                            {/*{data[1].briefIntroduction.slice(0,100)}{data[1].briefIntroduction.length > 100 ? '...' : ''}*/}
                            {/*</p>*/}
                          {/*<p style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>*/}
                            {/*<a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[1].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>*/}
                              {/*进入会客室*/}
                            {/*</a>*/}
                          {/*</p>*/}
                        {/*</div>*/}
                    {/*</Col>*/}
                  {/*</Row>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</Col>*/}
            {data && data.length ==4?
            <Col lg={12} sm={12}>
                <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                  <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[2].id)}>
                  <img src={data[2].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[2].businessImg} width='100%' height='220px'/>
                  </a>
                  <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                    <div style={{width: '100%',margin:'0 auto'}}>
                      <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{data[2].businessStr}</p>
                      <p className={styles.hrefRoom}>
                        {data[2].domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[2].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                          <a onClick={redirect.bind(null,'/businessArea/' + data[2].id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                      </p>
                    </div>
                  </div>
                </div>
            </Col>:''
            }
            {data && data.length ==4?
            <Col lg={12} sm={12}>
              <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[0].id)}>
                  <img src={data[0].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[0].businessImg} width='100%' height='220px'/>
                </a>
                <div style={{textAlign:'center',width:'100%',marginTop:'-10px'}} className={styles.hidebottom}>
                  <div style={{width: '100%',margin:'0 auto'}}>
                    <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333'}}>{data[0].businessStr}</p>
                    <p className={styles.hrefRoom}>
                      {data[0].domainName?<a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[0].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>:
                        <a onClick={redirect.bind(null,'/businessArea/' + data[0].id)} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>查看详情</a>}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
              :''}
          </div>
          : ''}
        {data && data.length ==1? data.map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
          return (
            <Col key={index} lg={12} sm={12} xs={12}>
                <div className={styles.business_box} style={{height: '360px',overflow:'hidden'}}>
                  <a key={index} style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                  <img src={backImg} width='100%' height='260px'/></a>
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
        {data && data.length == 5?
        <div>
          {data.slice(0,3).map((datas,index) =>{
          const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
          let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
          return (
            <div key={index}>
            <Col lg={8} sm={8} xs={12}>
                <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                  <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                  <img src={backImg} width='100%' height='220px'/></a>
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
          {data.slice(3,5).map((datas,index) =>{
            const {businessImg,businessStr,briefIntroduction,businessDetails,id,domainId,domainName} = datas;
            let backImg=businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':businessImg
            return (
              <div key={index}>
                <Col lg={12} sm={12} xs={12}>
                  <div className={styles.business_box} style={{height: '320px',overflow:'hidden'}}>
                    <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + id)}>
                      <img src={backImg} width='100%' height='220px'/></a>
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
          /*<Col lg={16} sm={16}>
            <div style={{padding:'20px',height:'320px'}}>
              <div style={{width:'100%',backgroundColor:'white'}}>
                <Row>
                  <Col lg={12} md={12}>
                    <a style={{color:'black'}} onClick={redirect.bind(null,'/businessArea/' + data[4].id)}>
                    <div style={{height:'100%'}}>
                      <img src={data[4].businessImg==null?'//theme.lj110.com/default/index/yewulingyu.jpg':data[4].businessImg} width='100%' height='220px'/>
                      <p style={{lineHeight:'50px',fontSize:'20px',color:'#333333',textAlign:'center',backgroundColor:'white',marginTop:'-5px'}}>{data[4].businessStr}</p>
                    </div></a>
                  </Col>
                  <Col  lg={11} md={11} offset={1}>
                    <div style={{width: '100%'}}>
                      <p style={{lineHeight:'30px',fontSize:'20px',color:'#333333',height:'220px'}}>
                        {data[4].briefIntroduction.slice(0,100)}{data[4].briefIntroduction.length > 100 ? '...' : ''}
                        </p>
                      <p style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>
                        <a onClick={(event)=>{event.stopPropagation(); hopeOrder(data[4].domainName)}} style={{padding:'5px 10px',border:'1px solid #0496ff',fontSize:'16px'}}>进入会客室</a>
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>*/
        </div>:''}
      </Row>
    </div>
    </div>
  );
}
export default MainBusiness;
