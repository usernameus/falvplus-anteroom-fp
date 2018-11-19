import React from 'react';
import { connect } from 'dva';
import styles from './BusinessAreaDetails.css';
import BusinessAreaDetails from '../components/businessArea/BusinessAreaDetails'

function BusinessAreaDetail({dispatch,location, businessareadetails,login,fhome}) {
  const {selectOption,fparWebBusinessDomain,fparWebBusinessDomains}=businessareadetails
  const {loginState,user} = login;
  const BusinessAreaDetailsProps = {
    selectOption:selectOption,
    fparWebBusinessDomain:fparWebBusinessDomain,
    fparWebBusinessDomains:fparWebBusinessDomains,
    loginState:loginState,
    onSelectOption(data){
      dispatch({
        type: 'businessareadetails/onselectOption',
        payload: data
      })
    },
    onConsultClick(){
      if(loginState){
        if(user.r == '9'){
          window.location.href='/anteroom';
        }else{
          dispatch({
            type: 'fhome/consult',
            payload: loginState
          })
        }
      }else{
        dispatch({
          type: 'login/showConsoleModal',
          payload: {
            consultClick: true
          }
        })
      }
    }
  }
  return (
    <div className={styles.normal}>
      <BusinessAreaDetails {...BusinessAreaDetailsProps}/>
    </div>
  );
}

function mapStateToProps({businessareadetails,fhome, login}) {
  return {businessareadetails,fhome, login};
}

export default connect(mapStateToProps)(BusinessAreaDetail);
