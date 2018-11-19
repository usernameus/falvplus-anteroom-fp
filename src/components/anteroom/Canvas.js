import React from 'react';
import Zrender from './zrender/react-zrender';
import {Popover,Button,Icon,Input,Tooltip,InputNumber,message} from 'antd';
import {GithubPicker} from 'react-color';
import classname from  './Canvas.less'

class Canvas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayColorPicker: false,
      color: '#FF0000',
      zoomRate: 1.0
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }
  onClickPencil = () => {
    this.props.drawingShape('pencil');
  };
  onClickLine = () => {
    this.props.drawingShape('line');
  };
  onClickRect = () => {
    this.props.drawingShape('rect');
  };
  onClickEllipse = () => {
    this.props.drawingShape('ellipse');
  };
  onClickText = () => {
    this.props.drawingShape('text');
  };
  onClickRubber = () => {
    this.props.drawingShape('rubber');
  }
  onClickZoomOut = () => {
    this.setState({zoomRate: Math.min(1.0,this.state.zoomRate) * 0.9})
  };
  onClickZoomReset = () => {
    this.setState({zoomRate: 1.0})
  };
  onClickZoomIn = () => {
    this.setState({zoomRate:Math.max(1.0,this.state.zoomRate) * 1.1})
  }
  onClickPrevPage = () => {
    const newPage = this.props.pageNo - 1;
    this.changePage(newPage);
  }
  onClickNextPage = () => {
    const newPage = this.props.pageNo + 1;
    this.changePage(newPage);
  }

  onClickRotateLeft = () => {
    let newDeg = (this.props.rotateDeg || 0) - 90;
    if(newDeg < 0){
      newDeg = 270;
    }
    this.props.rotateCanvas(newDeg);
  }

  onClickRotateRight = () => {
    let newDeg = (this.props.rotateDeg || 0) + 90;
    if(newDeg >= 360){
      newDeg = 0;
    }
    this.props.rotateCanvas(newDeg);
  }
  onClickColorPicker = () => {
    this.setState({
      displayColorPicker: !this.props.displayColorPicker
    });
  }

  handleCloseColorPicker = ()=>{
    this.setState({
      displayColorPicker: false
    })
  }
  handleChangeColor = (color)=> {
    this.setState({
      displayColorPicker: false,
      color: color.hex
    })
  }

  changePage = (pageNo) => {
    if(pageNo > 0 && pageNo <= this.props.pageCount){
      this.props.openFilePage(this.props.fileId, pageNo,this.props.sharingfile);
    }
  }

  render(){
    const popover = {
      position: 'absolute',
      zIndex: '2'
    };
    const styleColorPicker = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    };
    const {channelId, selfUserId, lastShapeId, channelFileId, sharingfile,selectedBtn, pageImage, sendShape, fileId,pageNo, pageCount,drawnShapes,canvasUsers,timeFilter,remoteShapes,remoteShape,removeShapeId, rotateDeg} = this.props;
    const typePencil = selectedBtn === 'pencil' ? 'primary' : 'default';
    const typeLine = selectedBtn === 'line' ? 'primary' : 'default';
    const typeRect = selectedBtn === 'rect' ? 'primary' : 'default';
    const typeEllipse = selectedBtn === 'ellipse' ? 'primary' : 'default';
    const typeText = selectedBtn === 'text' ? 'primary' : 'default';
    const typeRubber = selectedBtn === 'rubber' ? 'primary' : 'default';
    const typeZoomOut = selectedBtn === 'zoomout' ? 'primary' : 'default';
    const typeZoomReset = selectedBtn === 'zoomreset' ? 'primary' : 'default';
    const typeZoomIn = selectedBtn === 'zoomin' ? 'primary' : 'default';
    const typeColorPicker = this.state.displayColorPicker ? 'primary' : 'default';

    const drawnShapesObj = typeof drawnShapes == 'string' ? eval('(' + drawnShapes + ')') : drawnShapes;
    let filterShapes =drawnShapesObj.filter((s) => canvasUsers.filter(u=>u == s.shapeDesc.id.split('-')[0]).length > 0)
    if(timeFilter != null){
      filterShapes = filterShapes.filter((s) => s.sendTime == null || s.sendTime < Number(timeFilter) + 60*1000);
    }
    const renderProps = {
      channelId: channelId,
      userFileId: fileId,
      channelFileId: channelFileId,
      selfUserId: selfUserId,
      lastShapeId: lastShapeId,
      sharingfile: sharingfile,
      shapeDrawing: selectedBtn,
      pageImage: pageImage,
      sendShape: sendShape,
      drawnShapes: filterShapes,
      remoteShapes: remoteShapes,
      remoteShape: remoteShape,
      removeShapeId: removeShapeId,
      rotateDeg: rotateDeg || 0,
      zoomRate: this.state.zoomRate,
      strokeColor: this.state.color,
      onClickPrevPage: this.onClickPrevPage,
      onClickNextPage: this.onClickNextPage,
      removeShape: this.props.onRemoveShape
    }

    const renderHeight = document.body.clientHeight - 80;

    return (
      <div style={{width:'100%',height:'100%',width:'fit-content', margin: '0 auto'}}>
        <div style={{width:48,position:'absolute',zIndex:101, top: 60, left:0,bottom:0}}>
          {/*{sharingfile?*/}
            <div style={{marginRight: '10px'}} className="canvas-op-btns">
              <Tooltip title="选择颜色" placement="right">
                <Button type={typeColorPicker} onClick={this.onClickColorPicker}>
                  <i className="fpanticon fpanticon-colors"></i>
                </Button>
              </Tooltip>
              {this.state.displayColorPicker ? <div style={popover}>
                <div style={styleColorPicker} onClick={this.handleCloseColorPicker}/>
                <GithubPicker onChange={this.handleChangeColor}/>
              </div> : ''}
              <Tooltip placement="right" title="随意划线">
                <Button type={typePencil} onClick={this.onClickPencil}>
                  <i className="fpanticon fpanticon-pencil"></i>
                </Button>
              </Tooltip>
              <Tooltip placement="right" title="直线">
                <Button type={typeLine} onClick={this.onClickLine}>
                  <i className="fpanticon fpanticon-line"></i>
                </Button>
              </Tooltip>
              <Tooltip placement="right" title="方框">
                <Button type={typeRect} onClick={this.onClickRect}>
                  <i className="fpanticon fpanticon-rect"></i>
                </Button>
              </Tooltip>
              <Tooltip placement="right" title="圆圈">
                <Button type={typeEllipse} onClick={this.onClickEllipse}>
                  <i className="fpanticon fpanticon-ellipse" style={{marginLeft: '-3px'}}></i>
                </Button>
              </Tooltip>
              <Tooltip placement="right" title="文字">
                <Button type={typeText} onClick={this.onClickText}>
                  <i className="fpanticon fpanticon-wenben"></i>
                </Button>
              </Tooltip>
              <Tooltip placement="right" title="擦除">
                <Button type={typeRubber} onClick={this.onClickRubber}>
                  <i className="fpanticon fpanticon-rubber"></i>
                </Button>
              </Tooltip>
            </div>
            {/*:''}*/}
          <div className="canvas-op-btns" style={{display:'none'}}>
            <Tooltip placement="right" title="左转90度">
              <Button onClick={this.onClickRotateLeft}>
                <i className="fpanticon fpanticon-rotateleft"></i>
              </Button>
            </Tooltip>
            <Tooltip placement="right" title="右转90度">
              <Button onClick={this.onClickRotateRight}>
                <i className="fpanticon fpanticon-rotateright"></i>
              </Button>
            </Tooltip>
          </div>
          <div className="canvas-op-btns">
            <Tooltip placement="right" title="缩小">
              <Button type={typeZoomOut} onClick={this.onClickZoomOut}>
                <i className="fpanticon fpanticon-zoomout"></i>
              </Button>
            </Tooltip>
            <Tooltip placement="right" title="初始大小">
              <Button type={typeZoomReset} onClick={this.onClickZoomReset}>
                <i className="fpanticon fpanticon-zoomreset"></i>
              </Button>
            </Tooltip>
            <Tooltip placement="right" title="放大">
              <Button type={typeZoomIn} onClick={this.onClickZoomIn}>
                <i className="fpanticon fpanticon-zoomin"></i>
              </Button>
            </Tooltip>
          </div>
        </div>
        {pageCount > 1 ?
          <div style={{position:'absolute', left:'50%', bottom: 10,zIndex: 100,fontSize:'1.5em'}}>
            <Icon type="left" onClick={this.onClickPrevPage} disabled={pageNo <= 1} style={{cursor:'pointer',border:0}}></Icon>
            <InputNumber className="pageInput" defaultValue={1} value={pageNo}  min={1} max={pageCount}
                         style={{textAlign:'right'}} onChange={this.changePage} />
            <span>/{pageCount}</span>
            <Icon type="right" onClick={this.onClickNextPage} disabled={pageNo >= pageCount} style={{cursor:'pointer',border:0}}></Icon>
          </div>
          :''}
        <div style={{marginLeft:50, width: 'fit-content'}}>
          {pageImage ?
            <Zrender id="renderpage" {...renderProps} style={{height: renderHeight}} />
            :''}
        </div>
      </div>
    );

  }
}

export default Canvas;
