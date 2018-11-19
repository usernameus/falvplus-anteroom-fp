import React from 'react';
import styles from './Tips.css';
import {Row, Col,Button} from 'antd';

function Tips(props) {
  const {fireFox,google} = props
  const isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  const Discriminant_Goo = function(){
    if (isMac){
      window.location.href=google[1].text
    }else if(isWin){
      window.location.href=google[0].text
    }else{
       return;
    }
  }
  const Discriminant_Fir = function(){
    if (isMac){
      window.location.href=fireFox[1].text
    }else if(isWin){
      window.location.href=fireFox[0].text
    }else{
        return;
    }
  }
  return (
    <div className={styles.normal}>
      <div>
        <Row style={{paddingBottom:80}}>
          <span style={{color:'red'}}>尊敬的用户:</span>
          <span>由于浏览器兼容性问题,本站部分功能可能无法正常使用,请您使用下方浏览器以达到最好的体验效果</span>
        </Row>
        <Row>
          <Col offset={4} lg={8} md={8} xs={9} sm={8}>
            <img src="http://om563lzqk.bkt.clouddn.com/guge_tubiao.jpg"/>
            <p>谷歌浏览器</p>
            <a onClick={Discriminant_Goo}>本地下载</a>
          </Col>
          <Col lg={8} md={8} xs={9} sm={8}>
            <img src="http://om563lzqk.bkt.clouddn.com/huohu_tubiao.jpg"/>
            <p>火狐浏览器</p>
            <a onClick={Discriminant_Fir}>官网下载</a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Tips;
