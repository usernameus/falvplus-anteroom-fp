import React from 'react';
import {Row, Col} from 'antd';
import styles from './fmain.less';
function Funcs(props) {
  const {menuImgList}=props;
  return (
      <Row className="contentcol">
        {menuImgList&&menuImgList.map((item,index)=>{return<Col lg={6}sm={6}xs={6}key={index}>
          <a href={item.Href} id={item.styleId} className='funcs'></a>
        </Col>
        })}
      </Row>
  );
}
export default Funcs;
