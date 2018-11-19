/**
 * Created by fapu on 17-4-5.
 */
import React from 'react';
import {Carousel,Button} from 'antd';
import styles from './UserDetails.less';


function UserProfile(props) {
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
    onEditemail,
    onEditphone
  } = props
  return (
    <table className={styles.user_profile_table}>
      <tbody>
      <tr>
        <td>用户名</td>
        <td>{name?name:mobile}</td>
        <td><a className={styles.count_edit} onClick={onEditusername}>修改</a></td>
      </tr>
      <tr  className={styles.signpassword}>
        <td>登录密码</td>
        <td>......</td>
        <td><a className={styles.count_edit} onClick={onEditprofile}>修改</a></td>
      </tr>
      <tr>
        <td>绑定手机号</td>
        <td>{mobile}</td>
        <td><a className={styles.count_edit} onClick={onEditphone}>修改</a></td>
      </tr>
      <tr className={styles.band_emails}>
        <td>绑定邮箱</td>
        <td>{email?email:'未绑定'}</td>
        <td>{email?<a className={styles.count_edit} onClick={onEditemail}>修改</a>:<a className={styles.count_rightband} onClick={onEditemail}>立即绑定</a>}</td>
      </tr>
      </tbody>
    </table>
  );
}

export default UserProfile;
