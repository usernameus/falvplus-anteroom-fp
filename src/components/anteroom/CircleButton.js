import React, {Component} from 'react';
import {Button} from 'antd';

class CircleButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      style: this.props.style,
      iconClass: this.props.iconClass,
      switch: false
    }
  }

  // {/*switch = ()=>{*/}
  //   {/*this.state.switch = !this.state.switch;*/}
  //   {/*if(this.state.switch){*/}
  //     {/*const newStyle = {*/}
  //       {/*...this.state.style,*/}
  //       {/*color: 'rgba(255,255,255,0.7)',*/}
  //       {/*background:'#108ee9'*/}
  //     {/*}*/}
  //     {/*this.setState({*/}
  //       {/*style:newStyle*/}
  //     {/*})*/}
  //   {/*}else{*/}
  //     {/*const newStyle = {*/}
  //       {/*...this.state.style,*/}
  //       color: 'rgba(255,255,255,0.7)',
  //       background: 'rgba(0,0,0,0.5)'
  //     }
  //     this.setState({
  //       style:newStyle
  //     })
  //   }
  //   if(typeof this.props.onClick === 'function'){
  //     this.props.onClick();
  //   }
  // }

  render(){
    return (
      <Button type="circle" style={this.props.style} className={this.props.className}
              onClick={this.props.onClick}>
        <i className={this.props.iconClass} style={{lineHeight:'50px'}}></i>
      </Button>
    );
  }
}

export default CircleButton;
