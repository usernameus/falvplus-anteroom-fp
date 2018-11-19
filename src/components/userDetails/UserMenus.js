import React from 'react';
import {Carousel,Button} from 'antd';
import styles from './UserDetails.less';


function UserMenus(props) {
  const {
    onEdituserprofiles,
    onQueryPhone,
    onEditruningorder,
    onEditsignout,
    showRunorder
  } = props
  return (
    <table className={styles.user_table}>
      <tbody>
      <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/changeprofile.png"/></td>
        <td onClick={onEdituserprofiles}>修改资料</td>
        <td className={styles.td_last}>&gt;</td>
      </tr>
     <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/myorder.png"/></td>
        <td onClick={showRunorder}>进行中的订单</td>
        <td>&gt;</td>
      </tr>
      {props.role != '9'?
      <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/myorder.png"/></td>
        <td onClick={onQueryPhone}>电话咨询</td>
        <td>&gt;</td>
      </tr>:null}
      {/*<tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/breakorder.png"/></td>
        <td>过往订单</td>
        <td>&gt;</td>
      </tr>
      <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/myfance.png"/></td>
        <td>账户财务</td>
        <td>&gt;</td>
      </tr>*/}
      {props.role == '9'?
        <tr>
          <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/parlor.png"/></td>
          <td><a  href="/anteroom">会客室</a></td>
          <td>&gt;</td>
        </tr>:null}
      {props.role == '9'?
        <tr>
          <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/management.png"/></td>
          <td><a href="/admin">后台管理</a></td>
          <td>&gt;</td>
        </tr>:null}
      {props.role == '9'?
      <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/addarticles.png"/></td>
        <td><a href="/admin/article">添加文章</a></td>
        <td>&gt;</td>
      </tr>:null}
      <tr>
        <td className={styles.td_first}><img src="//theme.lj110.com//default/userdetails/logout.png"/></td>
        <td onClick={onEditsignout}>退出登录</td>
        <td>&gt;</td>
      </tr>
      </tbody>
    </table>
  );
}
export default UserMenus;
