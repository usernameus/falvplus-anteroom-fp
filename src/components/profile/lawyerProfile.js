/**
 * Created by fapu on 17-4-11.
 */
import React,{Component} from 'react';
import {Row, Col,Form, Input,Button,Tag,Modal} from 'antd';
import styles from './lawyerProfile.less';
import EditLawyerProfile from './editLawyerProfile'
const FormItem = Form.Item;
const Cookie = require('js-cookie');
class LawyerProfile extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount = ()=>{

  }
  render(){
    const {firmId,firm, picUrl, realName, address, certificate, mobile, email, majors,onSubmit,LawyerprofileEdit,lawyerDesc,onChanel,webTypes} = this.props;
    const profileProps = {
      onChanel,
      firmId,
      firm,
      picUrl,
      realName,
      address,
      certificate,
      mobile,
      email,
      lawyerDesc,
      onSubmit,
      webTypes
    }

    return (
      <div className={styles.normal}>
        {/*<Button onClick={this.props.editLawyerProfileClick.bind(this)}>{LawyerprofileEdit ? '取消修改' : '修改资料'}</Button>*/}
          <div  className={styles.lawyerProfile} >
            {/*<h3><span>律师简介</span></h3>*/}
            <div className={styles.profileEdit}>
              <span dangerouslySetInnerHTML={{__html: lawyerDesc}}></span>
            </div>
          </div>
        <Modal title={webTypes==0?"修改律师简介":"修改律所简介"} footer={null} visible={LawyerprofileEdit} onCancel={onChanel} width={1500}>
          <EditLawyerProfile {...profileProps} ></EditLawyerProfile>
        </Modal>
      </div>
    );
  }
}

export default LawyerProfile;
