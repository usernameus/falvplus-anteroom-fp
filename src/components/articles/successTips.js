import React from 'react';
import {Card,Row, Col,Button} from 'antd';
function SuccessTips(props) {
  const {moreData,moreHref,returnHref,returnData} = props;
  return (
    <div style={{textAlign:'center',backgroundColor:'white',width:'100%',height:'500px'}}>
        <h1 style={{ textAlign: 'center',marginTop:'200px',fontSize:'50px',color:'black'}}>保存成功</h1>
      <div style={{marginTop:'250px'}}>
        <Button type="primary" style={{marginRight: 8 }}><a href={moreHref}>{moreData}</a></Button>
        <Button type="primary"><a href={returnHref}>{returnData}</a></Button>
      </div>
    </div>
  );
}

export default SuccessTips;
