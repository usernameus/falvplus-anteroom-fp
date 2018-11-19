import React from 'react';
import { connect } from 'dva';
import {Button,Modal,InputNumber,Input,Tabs} from 'antd';
import styles from './UserDetails.less';
import UserMenus from '../components/userDetails/UserMenus';
import UserProfile from '../components/userDetails/userProfile';
import UserProfiles from '../components/userDetails/userProfiles';
import EditProfile from '../components/userDetails/editProfile';
import EditProfiles from '../components/userDetails/editProfiles';
import CustomerOrder from '../components/userDetails/customerOrder';
import OrderDetails from '../components/userDetails/OrderDetails'
import Finances from '../components/userDetails/MyFinances';
import Deposit from '../components/pay/deposit';
import Search from '../components/myorder/search';
import ConsultationOrder from '../components/userDetails/consultationOrder'
import ConsultationSearch from  '../components/consultationOrder/search';
import FinanceListUser from '../components/userDetails/financeListUser'
import BillingDetails from '../components/userDetails/billingDetails'
import FinancesSearch from  '../components/financeList/search';
import Login from './login'
const TabPane = Tabs.TabPane;
function UserDetails({userDetails,dispatch,MyFinances,login}) {
  const {editVisible,orderDetailVisible, modalVisible,modalVisibles,baseinforVisible,payforVisible,coutmonVisible,phoneConsultation,FinanceVisible,runorderVisible,userprofilesVisible,name,avatar,usernameVisible,useremailVisible,userphoneeditVisible,id,mobile,remainAmountY,errorPrompt,changefalVisible, logincodeVisible,userrunorderVisible,basesorceVisible,loading,keyword, OrderList, phoneList,pagination,types} = userDetails;
  const avatarQn = avatar + '?imageMogr2/thumbnail/200x/size-limit/$(fsize)!';
  const {MyFinancesList,Pagination,Loading}=MyFinances;
  const {user}=login
  const userProfile = {
    ...userDetails,
    onEditprofile () {
      dispatch({
        type: 'userDetails/editProfile',
      })
    },
    onEditusername(){
      dispatch({
        type: 'userDetails/usernameplay',
      })
    },
    onEditemail(){
      dispatch({
        type: 'userDetails/useremailplay',
      })
    },
    onEditphone(){
      dispatch({
        type: 'userDetails/userphoneplay',
      })
    }
  }
  const usermenusprops={
    role: user ? user.r : '0',
    onEditsignout(){
      dispatch({
        type: 'login/logout',
      })
      window.location.pathname="/"
    },
    onQueryPhone (){
      dispatch({
        type: 'userDetails/queryPhoneOrder',
        payload: {
          orderType: '1',
          page: 1
        }
      })
    },
    onEdituserprofiles(){
      dispatch({
        type: 'userDetails/editbasesorce',
      })
    },
    onEditruningorder(){
      dispatch({
        type: 'userDetails/userrunordertates',
      })
    },
  }
  const editProfile = {
    ...userDetails,
    onSubmit:(values) => {
       let {oldPassword,newPassword,} = values;
      dispatch({
        type:editVisible? 'userDetails/updater':userphoneeditVisible?'userDetails/handlephoneedit':logincodeVisible?'userDetails/handlesub':'userDetails/update',
        payload: editVisible?{oldPassword,newPassword,id}:userphoneeditVisible?{password:values.password,mobile:values.mobile,verificationCode:values.verificationCode}:values
      })
    },
    onFaulttip:()=>{
      dispatch({
        type: 'userDetails/editFault',
      })
    },
    getVerifyCode(phone){
      dispatch({
        type:'userDetails/getVerifyCode',
        payload:{phone: phone}
      })
    },
  }
  const MyorderListProps = {
    keyword:keyword,
    list:OrderList,
    loading,
    pagination: pagination,
    onPageChange (page, pageSize) {
      dispatch({
        type: 'userDetails/queryorderr',
        payload: {
          keyword:keyword,
          pageNo: page,
          pageSize: pageSize
        }
      })
    },
    onSeeDetail (id) {
      dispatch({
        type: 'userDetails/orders',
        payload:{id: id}
      })
    },
  }
  const orderdetailsprops = {
    ...userDetails,
  }
  const MyFinancesListProps = {
    MyFinancesList: MyFinancesList,
    Loading,
    Pagination: Pagination,
  }
  const depositProps = {
    onOk (data) {
      dispatch({
        type: 'userDetails/hideDeposit'
      })
      dispatch({
        type: `bill/bcPayBtn`,
        payload:{
          title: '客户充值',
          amount: (data.recharge)*100,
          returnurl: window.location.href.replace(/[\?#].*$/,''),
          optional: {
            type: 'deposit',
          }
        }
      })
    },
  }
  const showBaseinfor=()=> {
    dispatch({
      type: 'userDetails/showbaseinfor',
    })
  }
  const showModal = ()=>{
    dispatch({
      type: 'userDetails/showDeposit'
    })
  }
  const showModals= ()=>{
    dispatch({
      type: 'userDetails/showDeposits'
    })
  }
  const hideModal = () =>{
    dispatch({
      type: 'userDetails/hideDeposit'
    })
  }
  const onEditprofiles= ()=> {
    dispatch({
      type: 'userDetails/editProfile',
    })
  }
  const showLoginCode = () =>{
    dispatch({
      type: 'userDetails/showlogincode'
    })
  }
  const cancelorderModal =()=> {
    dispatch({
      type: 'userDetails/hideDetailsModal'
    })
  }

  const ModalGen =() => (
    <Modal title="充值" visible={modalVisible}  onCancel={hideModal} footer={null}>
      <Deposit {...depositProps}/>
    </Modal>
  )
  //电话咨询
  const PanoramaProps = {
    loading,
    list:phoneList,
    pagination: pagination,
    onPageChange (page, pageSize) {
      dispatch({
        type: 'userDetails/queryPhoneOrder',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
  }
  const onQueryPhone = () =>{
    dispatch({
      type: 'userDetails/queryPhoneOrder',
      payload: {
        orderType: '1',
        page: 1
      }
    })
  }
  const onChangeTab=(activeKey)=>{
    dispatch({
      type: 'userDetails/queryPhoneOrder',
      payload: {
        orderType: activeKey,
        page: 1
      }
    })
  }
  //财务记录
  const FinanceListUserProps = {
    loading,
    list:phoneList,
    pagination: pagination,
    onPageChange (page, pageSize) {
      dispatch({
        type: 'userDetails/queryPhoneOrder',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
  }
  const BillingDetailsProps = {
    loading,
    list:phoneList,
    pagination: pagination,
    onChangeBillTab(activeKey){
    dispatch({
      type: 'userDetails/queryFinanceList',
      payload: {
        orderType: activeKey,
        page: 1
      }
    })
  },
    onPageChange (page, pageSize) {
      dispatch({
        type: 'userDetails/queryFinanceList',
        payload: {
          orderType:types,
          page: page,
          pageSize: pageSize
        }
      })
    },
  }
  const onQueryFinance = () =>{
    dispatch({
      type: 'userDetails/queryFinanceList',
      payload: {
        orderType: '0',
        page: 1
      }
    })
  }
  const onChangeFinanceTab=(activeKey)=>{
    dispatch({
      type: 'userDetails/queryFinanceList',
      payload: {
        orderType: activeKey,
        page: 1
      }
    })
  }

  const onChangeOrderTab=(activeKey)=>{
    dispatch({
      type: 'userDetails/showrunorders',
      payload: {
        keyword: activeKey,
        pageNo: 1,
        pageSize:10
      }
    })
  }
  const consultationSearchProps = {
    onSearch(values)  {
      dispatch({
        type: 'userDetails/queryPhoneOrder',
        payload: {
          values:values,
          orderType:types,
        },
      })},
  }
  const financesSearchProps = {
    onSearch(values)  {
      dispatch({
        type: 'userDetails/queryFinanceList',
        payload: {
          values:values,
          orderType:types,
        },
      })},
    onTimeSearch(values){
      dispatch({
        type: 'userDetails/queryFinanceList',
        payload: {
          values:{
            timeType:values
          },
          orderType:types,
        },
      })},
  }
  const orderSearchProps = {
    onSearch (values) {
      dispatch({
        type: 'userDetails/queryorderr',
        payload: {
          keyword:runorderVisible ? 0 :1,
          phone: values.phone,
          startTime: values.startTime,
          endTime: values.endTime,
          productName:values.productName,
          orderSn:values.orderSn
        },
      })},
  }
  const panes = [
    {title: '未完成', content: '', key: '1'},
    {title: '已完成', content: '', key: '3'},
    {title: '已评价', content: '', key: '4'},
  ]
  const panesF = [
    {title: '账单', content: '', key: '0'},
    {title: '余额明细', content: '', key: '1'},
  ]
  const orderpane = [
    {title: '全部订单', content: '', key: '50'},
    {title: '未付款', content: '', key: '0'},
    {title: '已付款', content: '', key: '1'},
    {title: '已结案', content: '', key: '3'},
    {title: '已评价', content: '', key: '4'},
  ]
  const ModalGens = () =>
    <Modal title="订单详情" visible={orderDetailVisible} onCancel={cancelorderModal} footer={null} >
      <div>
        <OrderDetails {...orderdetailsprops}/>
      </div>
    </Modal>

  if(login.loginState){
    return (
      <div>
      <div className={styles.user_detail}>
        <div className={styles.use_picborder}>
          <img src={avatarQn} alt="" className={styles.user_detail_picture}/>
        </div>
        <div className={styles.user_profile_top}>
          <p className={styles.user_profile_name}>{name?name:mobile}</p>
          <span className={styles.remaincount}>账户余额:&nbsp;&#165;{remainAmountY}</span>
          <a onClick={showModal} className={styles.user_paybut}>充值</a>
        </div>
        <div className={styles.clearfix}></div>
        <div className={styles.user_myaccount}>
          <div className={styles.user_myaccount_theme}>
            <img src="//theme.lj110.com/default/profile/userheaduserhead.png" alt=""/>
            我的账户
          </div>
          <p onClick={showBaseinfor} className={baseinforVisible?styles.leftborder_show:''}>账户设置</p>
          { login.user.r != '9' ?<p onClick={() => onChangeOrderTab(0)} className={runorderVisible||payforVisible?styles.leftborder_show:''}>我的订单</p>:''}
          { login.user.r != '9' ?<p onClick={onQueryPhone} className={phoneConsultation?styles.leftborder_show:''}>电话咨询</p>:''}
          { login.user.r != '9' ?<p onClick={onQueryFinance} className={FinanceVisible?styles.leftborder_show:''}>财务列表</p>:''}
        </div>
        <div className={styles.mycountright}>
          {phoneConsultation?
            <div>
              <ConsultationSearch {...consultationSearchProps}/>
          <Tabs onChange={onChangeTab}>
            {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
          </Tabs>
              <ConsultationOrder {...PanoramaProps}/>
            </div>:''}
          {/*财务列表*/}
          {FinanceVisible?
            <div>
              <FinancesSearch {...financesSearchProps}/>
              <Tabs onChange={onChangeFinanceTab}>
                {panesF.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
              </Tabs>
              {types&&types=='0'?
              <FinanceListUser {...FinanceListUserProps}/>
                : <BillingDetails {...BillingDetailsProps}/>}
            </div>:''}
          {editVisible?
            <div>
              <p className={styles.user_count_theme}><a onClick={onEditprofiles} className={editVisible?styles.runing:''}>通过旧密码修改</a><a onClick={showLoginCode}  className={ logincodeVisible?styles.runing:''}>通过验证码修改</a></p>
              <EditProfile {...editProfile}/>
            </div>
            :''
          }
          {logincodeVisible?
            <div>
              <p className={styles.user_count_theme}><a onClick={onEditprofiles} className={editVisible?styles.runing:''}>通过旧密码修改</a><a onClick={showLoginCode}  className={ logincodeVisible?styles.runing:''}>通过验证码修改</a></p>
              <EditProfile {...editProfile}/>
            </div>
            :''
          }
          {usernameVisible?
            <div>
              <p className={styles.user_count_theme}>用户名修改</p>
              <EditProfile {...editProfile}/>
            </div>
            :''
          }
          {userphoneeditVisible?
            <div>
              <p className={styles.user_count_theme}>手机号修改</p>
              <EditProfile {...editProfile}/>
            </div>
            :''
          }
          {useremailVisible?
            <div>
              <p className={styles.user_count_theme}>邮箱修改</p>
              <EditProfile {...editProfile}/>
            </div>
            :''
          }
          {baseinforVisible?
            <div>
              <p className={styles.user_count_theme}>账户设置</p>
              <UserProfile {...userProfile}/>
            </div>
            :''
          }
          {changefalVisible?
            <p className={styles.fault_tip}>{errorPrompt}</p>
            :''
          }
          {runorderVisible?
            <div>
              <Search {...orderSearchProps}/>
             <Tabs onChange={onChangeOrderTab}>
             {orderpane.map(orderpane => <TabPane tab={orderpane.title} key={orderpane.key}></TabPane>)}
             </Tabs>
              <CustomerOrder {...MyorderListProps}/>
            </div>
            :''
          }
          {coutmonVisible?<div>
            <p className={styles.user_count_theme}>账户财务</p>
            <Finances {...MyFinancesListProps}/>
          </div>:''}
        </div>
        <div className={styles.clearfix}></div>
        <ModalGen/>
        <ModalGens/>
      </div>

        <div className={styles.user_details}>
          <div className={styles.use_picborder}>
            <img src={avatarQn} alt="" className={styles.user_detail_picture}/>
          </div>
          <div className={styles.user_profile_top}>
            <p className={styles.user_profile_name}>{name?name:mobile}</p>
          </div>
          <div className={styles.clearfix}></div>
          {userprofilesVisible?
            <table className={styles.countremain}>
              <tbody>
              <tr>
                <td className={styles.remaincount}>账户余额:&nbsp;&#165;{remainAmountY}</td>
                <td className={styles.td_last}><a onClick={showModal} className={styles.user_paybut}>充值</a></td>
                <td className={styles.td_lasts}><a onClick={showModals} className={styles.user_paybut}>充值</a></td>
              </tr>
              </tbody>
            </table>:''}
          <div className={styles.clearfix}></div>
          {userprofilesVisible?
            <UserMenus {...usermenusprops}/>:''}
          {basesorceVisible?
            <div className={styles.user_top_theme}>基本资料</div>:'' }
          {basesorceVisible?
            <div className={styles.mycountright}>
              {editVisible?
                <div>
                  <EditProfiles {...editProfile}/>
                  <p className={styles.user_count_theme}><a onClick={onEditprofiles} className={editVisible?styles.runing:''}>通过旧密码修改</a><a onClick={showLoginCode}  className={ logincodeVisible?styles.runing:''}>通过验证码修改</a></p>
                </div>
                :''
              }
              {logincodeVisible?
                <div>
                  <EditProfiles {...editProfile}/>
                  <p className={styles.user_count_theme}><a onClick={onEditprofiles} className={editVisible?styles.runing:''}>通过旧密码修改</a><a onClick={showLoginCode}  className={ logincodeVisible?styles.runing:''}>通过验证码修改</a></p>
                </div>
                :''
              }
              {usernameVisible?
                <div>
                  <EditProfiles {...editProfile}/>
                </div>
                :''
              }
              {useremailVisible?
                <div>
                  <EditProfile {...editProfile}/>
                </div>
                :''
              }
              {baseinforVisible?
                <div>
                  <UserProfiles {...userProfile}/>
                </div>
                :''
              }
              {changefalVisible?
                <p className={styles.fault_tip}>{errorPrompt}</p>
                :''
              }
            </div>:'' }
          {modalVisibles ?
            <div className={styles.user_top_theme}>金额充值</div>:''}
          {modalVisibles ?<div>
            <Deposit {...depositProps}/>
          </div>:''}
          {runorderVisible?
            <div style={{marginTop:'30px'}}>
              <Search {...orderSearchProps}/>
              <CustomerOrder {...MyorderListProps}/>
            </div>
            :''
          }
          {phoneConsultation?
            <div style={{marginTop:'30px'}}>
              <ConsultationSearch {...consultationSearchProps}/>
              <Tabs onChange={onChangeTab}>
                {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
              </Tabs>
              <ConsultationOrder {...PanoramaProps}/>
            </div>:''}
        </div>
        </div>);
  }
  else{
    return (<Login />);
  }

}

function mapStateToProps({userDetails,MyFinances,login,fhome,myorder}) {
  return {userDetails,MyFinances,login,fhome,myorder};
}

export default connect(mapStateToProps)(UserDetails);
