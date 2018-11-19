import React, {Component} from 'react';
import {Modal, Button,Card,Row,Col,Icon} from 'antd';
import Deposit from '../pay/deposit';
import styles from './FinanceDash.css';
import WithdrawalsModal from '../pay/withdrawalsModal';
import Pie from '../pay/pie'
class FinanceDash extends Component{
  constructor(props){
    super(props);
    this.state = {
      depositVisible: false,
    }
  }

  clickDeposit = (data) => {
    this.setState({
      depositVisible: false
    });
    this.props.clickDeposit(data);
  }
  clickWithdrawals=(data)=>{
    this.props.clickWithdrawals(data);
  }
  hideDeposit = () => {
    this.setState({
      depositVisible: false
    })
  }

  showDeposit = () => {
    this.setState({
      depositVisible: true
    })
  }
  showWithdrawals=()=>{
    this.props.showWithdrawals()
  }
  hideWithdrawals=()=>{
    this.props.hideWithdrawals()
  }
  render(){
    // const data = [
    //   {value: 2/5, name: "JavaScript"},
    //   {value: 1/5, name: "Java"},
    //   {value: 2/5, name: "HTML/CSS"}
    // ];
    const {remainAmount,ApplySuccess,financeData} = this.props;
    const depositProps = {
      onOk: this.clickDeposit
    }
    const withdrawalsProps={
      ApplySuccess:ApplySuccess,
      remainAmount:remainAmount,
      onCancel:this.hideWithdrawals,
      onCashOk: this.clickWithdrawals
    }
    return (
      <div className={styles.normal}>
        {financeData?
          <Card title="账务总览" style={{ overflow:'hidden'}}>
            <Row gutter={5}>
              <Col lg={9} sm={7} md={7} xs={24}><p style={{fontSize:'14px',lineHeight:'25px'}}>当前余额:￥{Number(financeData.remain).formatCurrency()}元</p></Col>
              <Col lg={9} sm={9} md={9} xs={24}><p style={{fontSize:'14px',lineHeight:'25px'}}>提现中的金额:￥{Number(financeData.lockedAmount).formatCurrency()}元</p></Col>
              <Col lg={6} sm={8} md={8} xs={24}><span>
                    <Button type="primary" onClick={this.showDeposit}>充值</Button>
                    <Button type="primary" onClick={this.showWithdrawals}style={{marginLeft:'5px'}}>提现</Button>
                  </span></Col>

            </Row>
            <Row gutter={16}style={{marginTop:'15px'}}>
              <Col lg={8}>
                <Card title="今日收入" extra={<a href='/admin/financeList?0'>详情</a>} >
                  <h1>￥{Number(financeData.times).formatCurrency()}元</h1>
                </Card>
              </Col>
              <Col lg={8}>
                <Card title="本周收入" extra={<a href='/admin/financeList?2'>详情</a>} >
                  <h1>￥{Number(financeData.timesWeek).formatCurrency()}元</h1>
                </Card>
              </Col>
              <Col lg={8}>
                <Card title="本月收入" extra={<a href='/admin/financeList?3'>详情</a>} >
                  <h1>￥{Number(financeData.timeMoth).formatCurrency()}元</h1>
                </Card>
              </Col>
            </Row>
            <Row gutter={16} >
              <Col lg={12}md={12}sm={12}>
                <div style={{height:'70px',marginTop:'15px'}}>
                  <div style={{backgroundColor:'#ff8761',float:'left',width:'30%',height:'70px',borderRadius:'5px 0 0 5px ',textAlign:'center'}}>
                    <Icon type="pay-circle-o" style={{fontSize:'30px',color:'white',lineHeight:'70px'}}/>
                  </div>
                  <div style={{border:'1px solid #f4f4f4',height:'70px'}}>
                    <p style={{marginLeft:'32%',lineHeight:'25px',fontSize:'18px',color:'#999999'}}>累计收入金额</p>
                    <p style={{marginLeft:'32%',lineHeight:'45px',color:'#ff8761',fontSize:'18px'}}>￥{Number(financeData.totalNumber).formatCurrency()}元</p>
                  </div>
                </div>
              </Col>
              <Col lg={12}md={12}sm={12}>
                <div style={{height:'70px',marginTop:'15px'}}>
                  <div style={{backgroundColor:'#ffc400',float:'left',width:'30%',height:'70px',borderRadius:'5px 0 0 5px ',textAlign:'center'}}>
                    <Icon type="bank" style={{fontSize:'30px',color:'white',lineHeight:'70px'}}/>
                  </div>
                  <div style={{border:'1px solid #f4f4f4',height:'70px'}}>
                    <p style={{marginLeft:'32%',lineHeight:'25px',fontSize:'18px',color:'#999999'}}>已提现的金额</p>
                    <p style={{marginLeft:'32%',lineHeight:'45px',color:'#ffc400',fontSize:'18px'}}>￥{Number(financeData.withdrawals).formatCurrency()}元</p>
                  </div>
                </div>
              </Col>
              <Col lg={12}md={12}sm={12}>
                <div style={{height:'70px',marginTop:'15px'}}>
                  <div style={{backgroundColor:'#57bdde',float:'left',width:'30%',height:'70px',borderRadius:'5px 0 0 5px ',textAlign:'center'}}>
                    <Icon type="shopping-cart" style={{fontSize:'30px',color:'white',lineHeight:'70px'}}/>
                  </div>
                  <div style={{border:'1px solid #f4f4f4',height:'70px'}}>
                    <p style={{marginLeft:'32%',lineHeight:'25px',fontSize:'18px',color:'#999999'}}>累计订单数</p>
                    <p style={{marginLeft:'32%',lineHeight:'45px',color:'#57bdde',fontSize:'18px'}}>{financeData.totalOrder}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12}md={12}sm={12}>
                <div style={{height:'70px',marginTop:'15px'}}>
                  <div style={{backgroundColor:'#6dc7be',float:'left',width:'30%',height:'70px',borderRadius:'5px 0 0 5px ',textAlign:'center'}}>
                    <Icon type="shopping-cart" style={{fontSize:'30px',color:'white',lineHeight:'70px'}}/>
                  </div>
                  <div style={{border:'1px solid #f4f4f4',height:'70px'}}>
                    <p style={{marginLeft:'32%',lineHeight:'25px',fontSize:'18px',color:'#999999'}}>交易中的订单</p>
                    <p style={{marginLeft:'32%',lineHeight:'45px',color:'#6dc7be',fontSize:'18px'}}>{financeData.unfinishedOrder}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>:''}
        <Modal title="申请提现" footer={null} visible={this.props.withdrawalsVisible} onCancel={this.hideWithdrawals}>
          <WithdrawalsModal {...withdrawalsProps} />
        </Modal>
        <Modal title="账户充值" footer={null} visible={this.state.depositVisible} onCancel={this.hideDeposit}>
          <Deposit {...depositProps} />
        </Modal>
      </div>
    );
  }
}

export default FinanceDash;
