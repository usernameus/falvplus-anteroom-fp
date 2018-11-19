import React,{Component} from 'react';
import { Card, Col, Row ,Icon,Button,Timeline} from 'antd';
import styles from './customersProfile.less'
class Panorama extends Component {
  constructor(props){
    super(props);

  }

  getTimelineDot = (followType) => {
    let iconType = "";
    if(followType == 1){
      iconType = "phone";
    }else if(followType == 2){
      iconType = "message";
    }else if(followType == 3){
      iconType = "message";
    }else if(followType == 4){
      iconType = "car";
    }else if(followType == 5){
      iconType = "mail";
    }else if(followType == 6){
      iconType = "message";
    }
    if(iconType == ""){
      return {};
    }else{
      return {
        dot: <Icon type={iconType} />
      }
    }

  }

  render(){
    const {
      customerInfo,
      contactsList,
      followlogs,
      onAddcontact,
      onAddfollowup
      } = this.props;

    return (
      <div className={styles.panorama}>
        <Row>
          <Col span="12">
            <Card title="基本资料" bordered={false}>
              <div>
                <p>客户类型:{customerInfo ? customerInfo.customerTypeText :''}</p>
                <p>电话:{customerInfo ? customerInfo.tel : ''}</p>
              </div>
            </Card>
            <Card title="联系人" bordered={false}extra={<Button onClick={onAddcontact}><Icon type="plus" /></Button>}>
                {contactsList && contactsList.length>0 ? contactsList.map((data,index) =>{
                    const {id,contactName,email,depart,jobTitle,phone,tel} = data;
                    return(
                      <Card key={index}>
                        <p><a href={'/admin/contactsProfile/' +id}>{contactName}</a></p>
                        <p>部门:{depart}</p>
                        <p>职位:{jobTitle}</p>
                        <p>电话:{tel}</p>
                        <p>手机:{phone}</p>
                        <p>邮箱:{email}</p>
                      </Card>)
                  })
                  :''}
            </Card>
          </Col>
          <Col span="12">
            <Card title="跟进记录" bordered={false}extra={<Button href=""onClick={onAddfollowup}>+写跟进</Button>}style={{ marginLeft: 8 }}>
              <Timeline>
                {followlogs.map((item,index) => {
                  return <Timeline.Item key={index} {...this.getTimelineDot(item.followType)}>
                    <div>
                      {new Date(parseInt(item.followTime)).format('MM-dd HH:mm')} {item.contactName} {item.followStatusText}
                    </div>
                    <div>
                      {item.content}
                    </div>
                    </Timeline.Item>
                })}
              </Timeline>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Panorama;
