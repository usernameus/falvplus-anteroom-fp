/**
 * Created by zhihangjishu on 17/5/23.
 */
import React from 'react';
import {Carousel,Button} from 'antd';
import styles from './UserDetails.less';


function UserProfiles(props) {
  const {
    onEditprofile,
    address,
    email,
    mobile,
    remainAmount,
    name,
    password,
    id,
    onEditusername,
    onEditemail
    } = props
  return (
    <div className={styles.userdetailtab_div}>
      <table className={styles.userdetailtab}>
        <tbody>
        <tr>
          <td className={styles.count_tdfirst}>用户名</td>
          <td>{name?name:mobile}</td>
          <td className={styles.count_tdlast}><Button  type="primary" onClick={onEditusername}>修改</Button></td>
        </tr>
        </tbody>
      </table>
      <table className={styles.userdetailtab}>
        <tbody>
        <tr  className={styles.signpassword}>
          <td className={styles.count_tdfirst}>登录密码</td>
          <td>......</td>
          <td className={styles.count_tdlast}><Button  type="primary" onClick={onEditprofile}>修改</Button></td>
        </tr>
        </tbody>
      </table>
      <table className={styles.userdetailtab}>
        <tbody>
        <tr>
          <td className={styles.count_tdfirst}>绑定手机号</td>
          <td>{mobile}</td>
          <td className={styles.count_tdlast}></td>
        </tr>
        </tbody>
      </table>
      <table className={styles.userdetailtab}>
        <tbody>
        <tr className={styles.band_emails}>
          <td className={styles.count_tdfirst}>绑定邮箱</td>
          <td>{email?email:'未绑定'}</td>
          <td className={styles.count_tdlast}>{email?<Button  type="primary" onClick={onEditemail}>修改</Button>:<a className={styles.count_rightband} onClick={onEditemail}>立即绑定</a>}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfiles;
