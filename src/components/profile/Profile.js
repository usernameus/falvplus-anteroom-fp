import React,{Component} from 'react';
import {Row, Col,Form, Input,Button,Tag} from 'antd';
import styles from './Profile.less';
import EditProfile from './editProfile'
import {ExpirationDateText,ExpirationDate} from '../../utils/config';


const FormItem = Form.Item;

class Profile extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount = ()=>{

  }

  render(){
    const {firmId,firm, picUrl, realName, address,callPrice, certificate, mobile, email, majors,onSubmit,profileEdit,Expired,webTypes,contacts,contactsPhone} = this.props;
    const profileProps = {
      firmId,
      firm,
      picUrl,
      realName,
      address,
      callPrice,
      certificate,
      mobile,
      email,
      majors,
      Expired,
      cancelChange: this.props.editProfileClick,
      onSubmit,
      webTypes,
      contacts,
      contactsPhone
    }

    return (
      <div className={styles.normal}>
        {/*<Button onClick={this.props.editProfileClick.bind(this)}>{profileEdit ? '取消修改' : '修改资料'}</Button>*/}
        {profileEdit ?
          <EditProfile {...profileProps} ></EditProfile>
        :
          <div>
            <Row className={styles.row}>
              <Col span={6}>{webTypes==0?<span>姓    名:</span>: <span>律    所:</span>}</Col>
              <Col span={18}>{realName}</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={6}>{webTypes==0?<span>律师照片:</span>: <span>头像
                :</span>}</Col>
              <Col span={18}>
                <img src={picUrl?picUrl:'' +
                ''+'?imageMogr2/thumbnail/200x/size-limit/$(fsize)!'}style={{maxHeight:40, maxWidth:80}}/>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={6}>电话咨询价格:</Col>
              <Col span={18}>￥{callPrice}元/次</Col>
            </Row>
            <Row className={styles.row}>
              <Col span={6}>专业领域:</Col>
              <Col span={18}>
                 {majors &&majors.map((item,index)=>{
                  return (
                    <Tag key={index}>{item.values}</Tag>
                  )
                })}
              </Col>
            </Row>
            {webTypes==0?
              <Row className={styles.row}>
                <Col span={6}>执业机构:</Col>
                <Col span={18}>{firm}</Col>
              </Row>:<Row className={styles.row}>
              <Col span={6}>联系人:</Col>
              <Col span={18}>{contacts}</Col>
            </Row>}
            {webTypes==0?
            <Row className={styles.row}>
              <Col span={6}>执业证号:</Col>
              <Col span={18}>{certificate}</Col>
            </Row>:<Row className={styles.row}>
              <Col span={6}>联系电话:</Col>
              <Col span={18}>{contactsPhone}</Col>
            </Row>}
            <Row className={styles.row}>
              <Col span={6}>联系地址:</Col>
              <Col span={18}>{address}</Col>
            </Row>
            {Expired&&Expired.success?'':
            <Row className={styles.row}>
              {Expired&&Expired.code<30&&Expired.code>0?
                <Col span={12} style={{color:'red',fontSize:'17px'}}>{ExpirationDateText(Expired.name)}</Col>:''}
              {Expired&&Expired.code<0?
                <Col span={12} ><span style={{color:'red',fontSize:'17px'}}>{ExpirationDate}</span></Col>:''}
              {Expired&&Expired.code>30?
                '':''}
            </Row>
            }
          </div>
        }
      </div>
    );
  }
}

export default Profile;
