import React, {Component} from 'react';
import {Carousel,Row,Col,Menu,Icon,Button,Popover,Badge} from 'antd';
import Func from './Funcs';
import styles from './fmain.less';
import NewsInfo from '../profile/newsInfo'
const SubMenu = Menu.SubMenu;

function PageHeader(props){

  const Slider = ({IndexHeaderData,index_center_headerImg,Mindex_center_headerImg,onConsultClick})=>{
    return <Carousel className="topslider"  autoplay autoplaySpeed={5000}>
      {IndexHeaderData&&IndexHeaderData.map((item,index)=>{
        const {index_header,content,titleText,phone_index_header,index_animation_name}=item;
        let animationName;
          if(index_animation_name == 'key'){
            animationName=styles.key;
          }
          if(index_animation_name == 'anteroom'){
          }
          if(index_animation_name == 'userdetail'){
          }
          if(index_animation_name == 'logout'){
          }
          if(index_animation_name == 'article'){
          }
          if(index_animation_name == 'consultation'){
          }
        return <div key={index}>
          <Row>
            <Col xs={0} sm={24}>
              <div className="headerImg">
                {index_animation_name?
              <div className="centerImg"><img src={index_center_headerImg} alt=""/></div>:''}
              <div key={index} className={index_animation_name&&index_animation_name!=null?"topbannerAn": "topbanner"}
                   style={{height:640, backgroundImage:'url('+index_header+')',animationName:animationName}}>
                <div className="topbannerTitle">
                  <div className="headertitle">{titleText}</div>
                  <div className="headercontent">{content}</div>
                  <div className="bannerButton">
                    <a onClick={onConsultClick} style={item.style}>
                    </a>
                    <a href="/profile">
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </Col>
            <Col xs={24} sm={0}>
              <div className="headerImg">
                {index_animation_name?
                  <div className="centerImg"><img src={Mindex_center_headerImg} alt="" style={{width:'100%'}}/></div>:''}
              <div key={index} className={index_animation_name&&index_animation_name!=null?"topbannerAn": "topbanner"} style={{height:320,backgroundSize:'100% 100%', backgroundImage:'url('+ phone_index_header+')',animationName:animationName}}>
                <div className="topbannerTitle">
                  <div className="headertitle">{titleText}</div>
                  <div className="headercontent">{content}</div>
                  <div  style={{maxHeight: 30}}>
                    <a onClick={onConsultClick}>
                    </a>
                    <a href="/profile">
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </Col></Row></div>
      })}
    </Carousel>
  }

  const HomeHeader = ({IndexHeaderData,index_center_headerImg,Mindex_center_headerImg,onConsultClick,menuImgList,webTypes}) =>{
    return <div>
      {IndexHeaderData && IndexHeaderData.length > 0 ?
        <Slider IndexHeaderData={IndexHeaderData} onConsultClick={onConsultClick}index_center_headerImg={index_center_headerImg} Mindex_center_headerImg={Mindex_center_headerImg}/>
        :''}
      {webTypes==1?'':
      <Func menuImgList={menuImgList}/>}
    </div>
  }

  const SecondHeader = ({headerImg,phone_headerImg})=>{
    return<div className="secondbanner" style={{backgroundImage: 'url('+headerImg+')'}}>
      <div className="topbannerTitle">
        <div className="headertitle">{headerTitle}</div>
        <div className="headercontent">{headerContent}</div>
      </div>
    </div>
  }
  const ThirdHeader = ({headerImg})=>{
    return <div className="thirdbanner" style={{backgroundImage: 'url('+headerImg+')'}}>
      <div className="topbannerTitle">
        <div className="headertitle" style={{paddingTop:'150px'}}>{headerTitle}</div>
        <div className="headercontent">{headerContent}</div>
      </div>
    </div>
  }
  //律师详情
  const LawyerDetails = ({headerImg,phone_headerImg})=>{
    return <Row>
      <Col lg={24}  md={24} xs={0}>
      <div className="thirdbanner" style={{backgroundImage: 'url('+headerImg+')'}}>
        <div className="topbannerTitle">
        </div>
      </div>
    </Col>
      <Col lg={0}  md={0} xs={24}>
        <div className="thirdbanner" style={{backgroundImage: 'url('+phone_headerImg+')'}}>
        </div>
      </Col>
    </Row>

  }
  const NoimgHeader = ()=>{
    return <div className="noimgspace" style={{background:'#0496ff',height: '62px'}}></div>
  }

  const SwitchHeader = ({headerType, banners, headerImg,picUrl,webTypes}) =>{
    const hType = headerType || 'noimg';

    if(hType == 'index'){
      return <HomeHeader IndexHeaderData={IndexHeaderData} webTypes={webTypes} onConsultClick={onConsultClick} index_center_headerImg={index_center_headerImg} Mindex_center_headerImg={Mindex_center_headerImg}menuImgList={menuImgList}/>
    }else if(hType == 'secondheader'){
      return <SecondHeader headerImg={headerImg} phone_headerImg={phone_headerImg}/>
    }else if(hType == 'thirdheader'){
      return <ThirdHeader headerImg={headerImg} phone_headerImg={phone_headerImg}/>
    }else if(hType == 'lawyerDetails'){
      return <LawyerDetails headerImg={headerImg} phone_headerImg={picUrl}/>
    }else{
      return <NoimgHeader/>
    }


  }

  const {headerType,headerImg,phone_headerImg,handleClick,logout,currentMenu,headerTitle,
    headerContent,IndexHeaderData,loginState,role,onConsultClick,menuVisible,handleMenuVisible,
    index_center_headerImg,Mindex_center_headerImg,menuList,menuImgList, list,
    pagination, onChangeTab, onPageChange,types,loadMore,onShowNews,newsNo,mainLawyerDetails,webTypes} = props;
  const headerClass = "";
  const headerProps = {
    picUrl:mainLawyerDetails&&mainLawyerDetails.picture?mainLawyerDetails.picture:phone_headerImg,
    menuImgList:menuImgList,
    onConsultClick:onConsultClick,
    IndexHeaderData:IndexHeaderData,
    headerType: headerType,
    Mindex_center_headerImg:Mindex_center_headerImg,
    index_center_headerImg:index_center_headerImg,
    headerImg: headerImg,
    phone_headerImg: phone_headerImg,
    webTypes:webTypes,
  };
  const handleClickMenu = (e) => {
    if(e.key == 'admin'){
      window.location.href = '/admin';
    }
    if(e.key == 'anteroom'){
      if(props.role == '9'){
        window.location.href = '/anteroom';
      }else{
        onConsultClick();
      }
    }
    if(e.key == 'userdetail'){
      window.location.href = '/userDetails';
    }
    if(e.key == 'logout'){
      logout();
    }
    if(e.key == 'article'){
      window.location.href = '/admin/article';
    }
    if(e.key == 'consultation'){
      window.location.href = '/admin/consultation';
    }
  }

  const handleClickVerticalMenu = (e) =>{
    handleClickMenu(e);
    handleMenuVisible();
  }

  let topmenubar = "topmenubar minibar";
  if(headerType && (headerType == 'index' || headerType == 'secondheader'||headerType == 'thirdheader')){
    topmenubar = 'topmenubar';
  }
  //新消息提醒
  const NewsInfoProps={
    role,
    list,
    newsNo,
    types,
    pagination,
    loadMore,
    onShowNews,
    onChangeTab,
    onPageChange,
  }
  const {redDotNumber,conRedDotNumber,channelNumber}=newsNo;
  const text = <span>{role&&role==9?'新消息提醒':'会客室消息'}</span>;
  const content = (
    <NewsInfo {...NewsInfoProps}/>
  );
  const verticalMenu = <Menu className="rightMenu" onClick={handleClickVerticalMenu} selectedKeys={[currentMenu]} >
    {menuList&&menuList.map((item,index)=>{return<Menu.Item key={item.Key}>
      <a href={item.Href} key={index}>
        <p>{item.MName}</p>
        <p>{item.EName}</p>
      </a>
    </Menu.Item>
    })}
    <Menu.Divider/>
    {loginState ?
      <Menu.Item key="userDetails">
        <a href="/userDetails">
          <p>个人资料</p>
          <p>MY INFORMATION</p>
        </a>
      </Menu.Item>
      :''}
    {/*{loginState && role == '9' ?*/}
      <Menu.Item key="anteroom">
        <a href="#">
          <p>会客室</p>
          <p>ANTEROOM</p>
        </a>
      </Menu.Item>
      {/*:''}*/}
    {loginState && role == '9' ?
      <Menu.Item key="admin">
        <a href="#">
          <p>后台管理</p>
          <p>MANAGEMENT</p>
        </a>
      </Menu.Item>
      :''}
    {loginState ?
      <Menu.Item key="logout">
        <a>
          <p>退出</p>
          <p>LOGOUT</p>
        </a>
      </Menu.Item>
      : <Menu.Item key="login">
      <a onClick={() =>props.onSignin()}>
        <p>登录</p>
        <p>LOGIN</p>
      </a>
    </Menu.Item>
    }

  </Menu>

  return <div className='headerClass'>
    <div className='topmenubar'>
      <Row>
        <Col sm={0} xs={24}>
          {list?
            <Popover placement="bottomLeft"  title={text} content={content} overlayStyle={{height:'auto',overflow: 'auto'}}>
              <div className={styles.MNewsInfo} style={{
                lineHeight:'40px',position:'absolute',right:'55px'
              }}>
                <Badge count={role&&role==9?redDotNumber+conRedDotNumber+channelNumber:channelNumber}><span style={{fontSize:'14px'}}>消息</span></Badge>
              </div>
            </Popover>
            :''}
          <Popover overlayClassName="verticalMenu" placement="bottomRight" content={verticalMenu} trigger="click" visible={menuVisible} onVisibleChange={handleMenuVisible}>
            <Button icon="bars" style={{float: 'right',fontSize: '2em', border: 'none', color: 'white', fontWeight: 800, background:'transparent'}}></Button>
          </Popover>
        </Col>
        <Col sm={24} xs={0}>
          <div className="contentcol">
            <Menu mode="horizontal" className="topmenu"
                  onClick={handleClick} selectedKeys={[currentMenu]}>
              {menuList&&menuList.map((item,index)=>{return<Menu.Item key={item.Key}>
              <a href={item.Href}key={index}>{item.Name}</a>
              </Menu.Item>
            })}
            </Menu>
            {list?
              <Popover placement="bottom"  title={text} content={content} overlayStyle={{height:'600px',overflow: 'auto'}}>
                <div className={styles.NewsInfo} style={{
                  lineHeight:'60px',position:'absolute',right:'125px',marginTop:'-60px'
                }}>
                  <Badge count={role&&role==9?redDotNumber+conRedDotNumber+channelNumber:channelNumber}><span style={{fontSize:'14px'}}>消息</span></Badge>
                </div>
              </Popover>
              :''}
            {props.loginState ?
              <Menu className='topmenu' style={{position:'absolute',top:0, right:0,width:'125px'}} mode='horizontal' onClick={handleClickMenu}>
                <SubMenu style={{
                  float: 'right'
                }} title={<span> <Icon type='user' />
                  {props.userName} </span>}>
                  {/*{props.role == '9'?*/}
                    <Menu.Item key="anteroom">
                      <a>会客室</a>
                    </Menu.Item>
                    {/*:''}*/}
                  {props.role == '9' ?
                    <Menu.Item key="admin">
                      <a>后台管理</a>
                    </Menu.Item>
                    : ''}
                  {props.role == '9' ?
                  <Menu.Item key="userdetail">
                    <a>账户设置</a>
                  </Menu.Item>:
                    <Menu.Item key="userdetail">
                      <a>我的主页</a>
                    </Menu.Item>}
                  {/*<Menu.Item key='finance'>
                   <a>我的财务</a>
                   </Menu.Item>
                   <Menu.Item key='orders'>
                   <a>我的订单</a>
                   </Menu.Item>*/}
                  {props.role == '9' ?
                    <Menu.Item key='article'>
                      <a>添加文章</a>
                    </Menu.Item>
                    :''}
                  {props.role == '9' ?
                    <Menu.Item key='consultation'>
                      <a>电话咨询</a>
                    </Menu.Item>
                    :''}
                  <Menu.Item key='logout'>
                    <a>退出</a>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              :
              <Menu className="topmenu" mode="horizontal" style={{position:'absolute', top:0, right:0}}>
                <Menu.Item key="register">
                  <a onClick={() =>props.onRegister()}>注册</a>
                </Menu.Item>
                <Menu.Item key="login">
                  <a onClick={() =>props.onSignin()}>登录</a>
                </Menu.Item>
              </Menu>
            }
          </div>
        </Col>
      </Row>
    </div>
    <SwitchHeader {...headerProps}/>
  </div>
}

export default PageHeader;
