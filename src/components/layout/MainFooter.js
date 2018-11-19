import React from 'react'
import styles from './MainFooter.less'
import { config } from '../../utils'

const MainFooter = ({copyright,hideData,menuList}) =>
  <div className={styles.footer} style={{textAlign: 'center'}}>
    <div className={styles.footerTop}>
      <ul className={styles.footerUl}>
        {menuList&&menuList.map((item,index)=>{return<li key={item.Key}>
          <a href={item.Href} key={index}>
            {item.Name}
          </a>
        </li>
        })}
      </ul>
    </div>
    <div className={styles.footerTop}>
        <hr className={styles.footerHr}/>
    </div>
    <br/>
    <br/>
    <div className={styles.footerBottom}><span>{copyright}</span></div>
  </div>

export default MainFooter
