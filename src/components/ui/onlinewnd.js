import React from 'react';
import {Affix,Button,Card,Icon,BackTop,Tooltip} from 'antd';
import styles from './onlinewnd.less';


function Onlinewnd({onConsultClick,headerData,role}) {
  return (
    <div className='onlinewnd'>
      <div>
        <BackTop>
          <div className={styles.antinner}>UP</div>
        </BackTop>
      </div>
      {role == '9'?'':
      <Affix offsetTop={100}>
        <div className={styles.asideNav}>
          <div className={styles.leftAside}>
            <img src="//theme.lj110.com/default/aside/asideInfo1.png" alt=""/>
          </div>
          <div className={styles.rightAside}>
              <div className={styles.asideOrder}>
                <a onClick={onConsultClick}>
                  <div className={styles.Ordera}></div>
                  <div className={styles.asideTitleTop}>在线咨询</div>
                </a>
              </div>
              <div className={styles.asidePhone}>
                <a href="/phoneOrder">
                  <div className={styles.Phonea}></div>
                  <div className={styles.asideTitleBottom}>电话咨询</div>
                </a>
              </div>
          </div>

        </div>
      </Affix>}

      {/*<Affix offsetTop={400}>
        {role == '9'?
        <div className={styles.asideAdd}>
          <div className={styles.leftAside}>
            <Icon type="plus" style={{color:'white',fontSize:'20px',fontWeight:'bold',lineHeight:'40px'}}/>
          </div>
          <div className={styles.addBottom}>
            <div className={styles.asideArticle}>
              <a href="/addArticle">
                文章
              </a>
            </div>
            <div className={styles.asideActivity}>
              <a href="/addActivity">
                活动
              </a>
            </div>
          </div>

        </div>
          :''}*/}
        {/*<Tooltip placement="topLeft" title="Prompt Text">*/}
          {/*<div className={styles.addMore}><a href="/addArticle">+</a></div>*/}
        {/*</Tooltip>*/}
      {/*</Affix>*/}
    </div>
  );
}

export default Onlinewnd;
