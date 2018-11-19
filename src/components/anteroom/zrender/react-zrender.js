/**
 * Created by mel on 2017/3/19.
 */
import React, {Component} from 'react';
import {Button,Input, message,Modal} from 'antd';
import zrender from 'zrender/lib/zrender';
import '../Canvas.less';

var ZPolyline = require('zrender/lib/graphic/shape/Polyline')
var ZText = require('zrender/lib/graphic/Text')
var ZLine = require('zrender/lib/graphic/shape/Line')
var ZRect = require('zrender/lib/graphic/shape/Rect')
var ZEllipse = require('zrender/lib/graphic/shape/Ellipse')
var ZImage = require('zrender/lib/graphic/Image')
var textContain = require('zrender/lib/contain/text')
// TODO: 缩放及旋转处理
// var BoundingRect = require('zrender/lib/core/BoundingRect');
// var matrix = require('zrender/lib/core/matrix')

class Zrender extends Component{

  constructor(props){
    super(props);
    this.channelId = props.channelId || 0;
    this.userFileId = props.userFileId || 0;
    this.channelFileId = props.channelFileId || 0;
    this.selfUserId = props.selfUserId || 0;
    this.lastShapeId = props.lastShapeId || 0;
    this.drawing = false;
    this.shapeDrawingObj = null;
    this.pageImage = null;
    this.sendShape = props.sendShape;
    this.sharingfile = props.sharingfile;
    this.rateChanged = false;
    this.shapeFilter = false;
    this.drawRate = 1.0;
    this.caret = new ZLine({
      shape:{ x1: -100, y1: -100, x2: -100, y2: -100},
      style:{
        lineWidth: 1,
        stroke: this.props.strokeColor || '#FF0000'
      }
    })
    this.state = {
      renderclass: 'render-page',
      strokeColor: '#FF0000',
      drawRate: 1.0 // this.props.zoomRate
    }
  }

  clearCaret = function(){

    if(this.caretInterval){
      clearInterval(this.caretInterval);
      this.caret.setShape({
        x1: -100,  y1: -100, x2: -100, y2:-100
      })
    }
  }

  genShapeId = function(){
    this.lastShapeId++;
    return this.selfUserId + "-"　+ this.lastShapeId;
  }


  canvasMouseDown = function(event){
    if(!this.drawing && event.event.button == 0){
      this.drawing = true;
      this.clearCaret();

      if(this.shapeDrawing == 'rect'){
        this.shapeDrawingObj = new ZRect({
          id: this.genShapeId(),
          shape:{
            x: event.offsetX,
            y: event.offsetY,
            width: 0,
            height: 0
          },
          style:{
            // fillOpacity: 0.5,
            fill: 'rgba(255,0,0,0)',
            stroke: 'red',
            lineWidth: 3
          },
        });
      }else if(this.shapeDrawing == 'line'){
        this.shapeDrawingObj = new ZLine({
          id: this.genShapeId(),
          shape:{
            x1: event.offsetX,
            y1: event.offsetY,
            x2: event.offsetX,
            y2: event.offsetY
          },
          style:{
            stroke: 'red',
            lineWidth: 3
          }
        });
      }else if(this.shapeDrawing == 'ellipse'){
        this.shapeDrawingObj = new ZEllipse({
          id: this.genShapeId(),
          shape:{
            cx: event.offsetX,
            cy: event.offsetY,
            rx: 0,
            ry: 0
          },
          style: {
            stroke: 'red',
            lineWidth: 3,
            fill: 'rgba(255,0,0,0)'
          }
        });
      }else if(this.shapeDrawing == 'pencil') {
        this.shapeDrawingObj = new ZPolyline({
          id: this.genShapeId(),
          shape: {
            points: [
              [event.offsetX, event.offsetY],
            ],
            smooth: true,
            smoothConstraint: null
          },
          style:{
            stroke: 'red',
            lineWidth: 3
          }
        })
      }else if(this.shapeDrawing == 'text'){
        this.shapeDrawingObj = new ZText({
          id: this.genShapeId(),
          style:{
            x: event.offsetX / this.drawRate,
            y: event.offsetY / this.drawRate,
            text: '',
            txtFont: '32px Simsun',
            font: '32px Simsun',
            stroke: '#FF0000' ,
            fill: '#FF0000' ,
            lineWidth: 1
          },
          scale: [this.drawRate, this.drawRate]
        });
        const textObj = this.shapeDrawingObj;
        const textRect = textObj.getBoundingRect();
        this.node.add(this.caret);
        const lineHeight = this.drawRate * textContain.measureText('国',this.shapeDrawingObj.style.txtFont || this.shapeDrawingObj.style.font).width;
        this.caret.setShape({
            x1: textRect.x,
            y1: textRect.y - lineHeight,
            x2: textRect.x,
            y2: textRect.y
        });
        this.caret.setShape({
          stroke: this.state.strokeColor
        });
        var caretObj = this.caret;
        caretObj['scale'] = [this.drawRate, this.drawRate];

        this.caretInterval = setInterval(function(){
          caretObj.setShape({
            y2: caretObj.shape.y2 == caretObj.shape.y1 ? caretObj.shape.y1 + lineHeight : caretObj.shape.y1
          });
        }, 500);

        document.getElementById('caretHelper').value = '';

      }else{
        // 图形不正确,取消绘画状态
        this.drawing = false;
      }
      if(this.shapeDrawingObj != null){
        this.shapeDrawingObj['hoverable'] = true;
        this.shapeDrawingObj['draggable'] = false;
        this.shapeDrawingObj['clickable'] = true;

        this.node.add(this.shapeDrawingObj);
        this.node.setCursorStyle('crosshair');
        console.log('After:');
        console.log(this.shapeDrawingObj);
        if(this.shapeDrawing != 'text'){
          this.shapeDrawingObj.on('mousemove',this.canvasMouseMove, this);
        }
      }
    }
  }
  canvasMouseMove = function(event){
    if(this.drawing && event.event.button == 0){
      this.node.setCursorStyle('crosshair');
      // console.log(this.shapeDrawingObj);
      this.shapeDrawingObj && this.shapeDrawingObj.setStyle({
        stroke: this.state.strokeColor
      });
      if(this.shapeDrawing == 'rect'){
        const x = this.shapeDrawingObj.shape.x;
        const y = this.shapeDrawingObj.shape.y;
        this.shapeDrawingObj.setShape({
          x: x,
          y: y,
          width: event.offsetX - x,
          height: event.offsetY - y
        });
      }else if(this.shapeDrawing == 'line'){
        this.shapeDrawingObj.setShape({
          x2: event.offsetX,
          y2: event.offsetY
        });
      }else if(this.shapeDrawing == 'ellipse'){
        const originCx = this.shapeDrawingObj.shape.cx - this.shapeDrawingObj.shape.rx;
        const originCy = this.shapeDrawingObj.shape.cy - this.shapeDrawingObj.shape.ry;
        const cx = (event.offsetX + originCx) / 2;
        const cy = (event.offsetY + originCy) / 2;
        const rx = Math.abs(event.offsetX - originCx) / 2;
        const ry = Math.abs(event.offsetY - originCy) / 2;

        this.shapeDrawingObj.setShape({
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry
        });
      }else if(this.shapeDrawing == 'pencil'){
        let points = this.shapeDrawingObj.shape.points;
        points.push([event.offsetX, event.offsetY]);
        this.shapeDrawingObj.setShape({
          points: points
        });
      }
    }
  }

  canvasMouseUp = function(event){
    if(this.drawing && event.event.button == 0){
      this.drawing = false;
      if(this.shapeDrawingObj != null && this.shapeDrawing != 'text'){
        this.shapeDrawingObj.off('mousemove');
        this.sendShape(this.shapeDrawing, this.shapeDrawingObj, this.props.channelId,this.props.userFileId,this.props.channelFileId, this.props.sharingfile, this.drawRate);
        this.shapeDrawingObj = null;

      }
    }
    if(this.shapeDrawing == 'text'){
      var textCmp = document.getElementById('caretHelper');
      if(textCmp){
        // textCmp.style.top = event.offsetY + 'px';
        textCmp.focus();
      }
    }
  }
  canvasClick = function(event){
    if(this.shapeDrawing == 'rubber' && event.target){
      if(!(event.target instanceof ZImage)){
        const that = this;
        Modal.confirm({
          title: '确认删除',
          content: '确定删除此标注吗?',
          onOk(){
            that.props.removeShape(that.props.channelId, that.props.userFileId, that.props.channelFileId,event.target.id);
            that.node.remove(event.target);
          },
          onCancel(){

          }
        })

      }
    }
  }
  canvasMouseOver = function(event){
    if(this.shapeDrawing == 'rubber' && event.target){
      // this.node.addHover(event.target, {lineWidth: 5});
      if(!(event.target instanceof ZImage)){
        event.target.setStyle({opacity: 0.5});
      }
    }
  }
  canvasMouseOut = function(event){
    if(this.shapeDrawing == 'rubber' && event.target){
      // this.node.addHover(event.target, {lineWidth: 5});
      event.target.setStyle({opacity: 1});
    }
  }
  componentDidMount(){
    this.updateCanvas();
  }

  drawPage = function(width, height){
    // TODO: 图片放大缩小及自适应屏幕
    // const maxWidth = document.body.clientWidth;
    // if(width > maxWidth - 100){
    //   const rate = height / width;
    //   width = maxWidth - 100;
    //   height = width * rate;
    // }
    // 防止手机端图片过大超出 Canvas 最大值无法显示
    // 电脑端也不处理大于2048的图片
    if(width * height > 2048 * 2048){
      const rate = width / height;
      width = Math.sqrt(rate * 2048 * 2048);
      height = width / rate;
    }

    var maxWidth = document.querySelector('#canvasCard .ant-card-body').clientWidth - 120;
    var drawRate = this.props.zoomRate == 1.0 ? 1.0 : this.drawRate * (this.rateChanged ? (this.props.zoomRate > 1.0 ? 1.1 : 0.9) : 1);
    if(width > maxWidth && this.props.zoomRate == 1.0){
      drawRate = maxWidth / width;
      // width = maxWidth;
      // height = height * drawRate;
    }
    // this.setState({drawRate: drawRate});
    this.drawRate = drawRate;

    var image = new ZImage({
      position: [0, 0],
      scale: [drawRate, drawRate],
      style:{
        image: this.props.pageImage,
        width: width,
        height:height,
        x: 5, y:5
      },
    });

    if(this.node != null){
      this.node.clear();
      this.node.off();
    }
    // if(this.node == null){
      this.node = zrender.init(document.getElementById(this.props.id), {width: width*drawRate + 10, height: height*drawRate+ 10});
      this.node.on('mousedown', this.canvasMouseDown, this);
      this.node.on('mousemove', this.canvasMouseMove,this);
      this.node.on('mouseup', this.canvasMouseUp,this);
      this.node.on('mouseover', this.canvasMouseOver, this);
      this.node.on('mouseout', this.canvasMouseOut, this);
      this.node.on('click', this.canvasClick, this);
    // }else{
    //   this.node.clear();
    // }
    this.node.add(image);

    const drawnShapes = typeof this.props.drawnShapes == 'string' ? eval("(" + this.props.drawnShapes + ")") : this.props.drawnShapes;
    drawnShapes.filter((item,index)=>index == drawnShapes.length - 1 || item.shapeDesc.id != drawnShapes[index+1].shapeDesc.id)
      .map((shapeJson,index)=>{
        shapeJson.shapeDesc['scale'] = [drawRate, drawRate];
        this.drawShape(shapeJson);
      });

    this.node.resize({
      width: width * drawRate + 10,
      height: height * drawRate + 10
    })

  }
  drawShape = function(shapeJson){
    const rootNode = this.node;
    if(shapeJson.shapeType == 'pencil'){
      const pencil = new ZPolyline(shapeJson.shapeDesc);
      rootNode.add(pencil);
    }else if(shapeJson.shapeType == 'line'){
      const line = new ZLine(shapeJson.shapeDesc);
      rootNode.add(line);
    }else if(shapeJson.shapeType == 'rect'){
      const rect = new ZRect(shapeJson.shapeDesc);
      rootNode.add(rect);
    }else if(shapeJson.shapeType == 'ellipse'){
      const ellipse = new ZEllipse(shapeJson.shapeDesc);
      rootNode.add(ellipse);
    }else if(shapeJson.shapeType == 'text'){
      const txtId = shapeJson.shapeDesc.id;
      let shapeDesc = shapeJson.shapeDesc;
      if('stroke' in shapeDesc.style){
        shapeDesc.style['fill'] = shapeDesc.style.stroke;
      }
      if(rootNode.storage.get(txtId)){
        const txt = rootNode.storage.get(txtId);
        txt.setStyle(shapeDesc.style);
      }else{
        const txt = new ZText(shapeDesc);
        rootNode.add(txt);
      }
    }
  }
  drawRemoteShapes = function(){
    // if(this.rateChanged){
      if(this.props.remoteShapes && this.props.remoteShapes.length > 0){
        // const drawRate =  this.props.zoomRate == 1.0 ? this.drawRate : (this.props.zoomRate > 1.0 ? 1.1 : 0.9) * this.drawRate;
        const drawRate = this.drawRate;
        this.props.remoteShapes.map((shapeJson, index) => {
          shapeJson.shapeDesc['scale'] = [drawRate,drawRate];
          this.drawShape(shapeJson);
        })
      }
    // }else{
      if(this.props.remoteShape && !this.props.remoteShape.shapeId.startWith(this.selfUserId + '-')){
        var shapeJson = this.props.remoteShape;
        shapeJson.shapeDesc['scale'] = [this.drawRate, this.drawRate];
        // if(shapeJson.shapeType === 'text'){
        //   shapeJson.shapeDesc.style.x *= this.state.drawRate;
        //   shapeJson.shapeDesc.style.y *= this.state.drawRate;
        // }
        // scroll
        var startX = 0;
        var startY = 0;
        if(shapeJson.shapeType == 'rect'){
          startX = shapeJson.shapeDesc.shape['x'];
          startY = shapeJson.shapeDesc.shape['y'];
        }else if(shapeJson.shapeType == 'line'){
          startX = shapeJson.shapeDesc.shape['x1'];
          startY = shapeJson.shapeDesc.shape['y1'];
        }else if(shapeJson.shapeType == 'ellipse'){
          startX = shapeJson.shapeDesc.shape['cx'];
          startY = shapeJson.shapeDesc.shape['cy'];
        }else if(shapeJson.shapeType == 'pencil'){
          startX = shapeJson.shapeDesc.shape['points'][0][0];
          startY = shapeJson.shapeDesc.shape['points'][0][1];
        }else if(shapeJson.shapeType == 'text'){
          startX = shapeJson.shapeDesc.style['x'];
          startY = shapeJson.shapeDesc.style['y'];
        }
        var cardBody = document.querySelector('#canvasCard .ant-card-body');
        if(cardBody && cardBody.scrollWidth > cardBody.clientWidth){
          cardBody.scrollLeft = Math.max(startX * this.drawRate - cardBody.clientWidth / 2, 0);
        }
        if(cardBody && cardBody.scrollHeight > cardBody.clientHeight){
          cardBody.scrollTop = Math.max(startY * this.drawRate - cardBody.clientHeight / 2, 0);
        }
        this.drawShape(this.props.remoteShape);
      }
    // }
  }
  removeRemoteShape = function(){
    if(this.props.removeShapeId){
      this.node.remove(this.props.removeShapeId);
    }
  }

  updateCanvas = function(){
    this.shapeDrawing = this.props.shapeDrawing;
    if(this.pageImage != this.props.pageImage || this.rateChanged || this.shapeFilter){
      // || this.state.drawRate * this.props.zoomRate != this.state.drawRate
      // || (this.state.drawRate != 1.0 && this.props.zoomRate == 1.0)){
      // this.setState({drawRate: this.props.zoomRate == 1.0 ? 1.0 : (this.props.zoomRate > 1.0 ? 1.1 : 0.9) * this.state.drawRate}, function(){
      //   console.log('draw' + this.state.drawRate);
      // });
      this.drawRate = this.props.zoomRate == 1.0 ? 1.0 : (this.rateChanged ? ((this.props.zoomRate > 1.0 ? 1.1 : 0.9) * this.drawRate) : this.drawRate);
      this.pageImage = this.props.pageImage;
      const backImg = new Image();
      backImg.src = this.props.pageImage;
      const that = this;
      const [imgWidth,imgHeight] =  backImg.getImgNaturalDimensions(backImg,function(width, height){
         that.drawPage(width, height);
      });
      if(imgWidth > 0 && imgHeight > 0){
        this.drawPage(imgWidth, imgHeight);
      }
    }else{
      if(!this.shapeDrawing || this.shapeDrawing != 'text'){
        this.clearCaret();
      }else{
        this.updateCaret();
        document.getElementById('caretHelper').focus();
      }
    }
    this.drawRemoteShapes();
    this.removeRemoteShape();

  }

  textChange = function(text){
    if(this.shapeDrawing == 'text' && this.shapeDrawingObj){
      const txt = document.getElementById('caretHelper').value
      this.shapeDrawingObj.setStyle({
        stroke: this.state.strokeColor,
        text: txt
      });

      this.sendShape(this.shapeDrawing, this.shapeDrawingObj, this.props.channelId, this.props.userFileId, this.props.channelFileId, this.props.sharingfile, this.drawRate);

      this.updateCaret();
    }
  }
  updateCaret = function(){
    const ss = document.getElementById('caretHelper').selectionStart;
    const beforeText = document.getElementById('caretHelper').value.slice(0,ss);
    const rowsText = beforeText.split('\n');
    var font = '32px SimSun';
    if(this.shapeDrawingObj && this.shapeDrawingObj.style && this.shapeDrawingObj.style.txtFont){
      font = this.shapeDrawingObj.style.txtFont;
    }else if(this.shapeDrawingObj && this.shapeDrawingObj.style && this.shapeDrawingObj.style.font){
      font = this.shapeDrawingObj.style.font;
    }

    const left = textContain.measureText(rowsText[rowsText.length - 1], font).width;
    const lineHeight = this.drawRate * textContain.measureText('法',font).width;
    const rect = this.shapeDrawingObj ? this.shapeDrawingObj.getBoundingRect() : {x: 0, y: 0};

    this.caret.setShape({
      x1: rect.x + left,
      x2: rect.x + left,
      y1: rect.y + lineHeight * (rowsText.length - 2) ,
      y2: rect.y + lineHeight * (rowsText.length - 1)
    })
    this.caret.setStyle({
      stroke: this.state.strokeColor
    });
  }
  textOnKeyUp = function(){
    if(this.shapeDrawing == 'text' && this.shapeDrawingObj) {
      this.updateCaret();
    }
  }

  componentDidUpdate(){
    this.updateCanvas();
  }

  shouldComponentUpdate(nextProps,nextState){
    if(JSON.stringify(this.props) == JSON.stringify(nextProps)){
      return false;
    }
    return true;
  }
  componentWillReceiveProps(nextProps){
    const {rotateDeg, strokeColor} = nextProps;
    const renderclass = 'render-page rotate' + rotateDeg;
    this.setState({
      renderclass: renderclass,
      strokeColor: strokeColor || '#FF0000'
    });
    if(this.props.zoomRate == nextProps.zoomRate){
      this.rateChanged = false;
    }else{
      this.rateChanged = true;
    }
    if(this.props.drawnShapes == nextProps.drawnShapes){
      this.shapeFilter = false;
    }else{
      this.shapeFilter = true;
    }
  }


  render(){
    const {renderclass} = this.state;
    return (
      <div style={{position:'relative',height:'100%', width:'fit-content'}}>
        <Input type="textarea" style={{position:'fixed', top: 0, left: -5000,width: 10}} id="caretHelper"
               onChange={this.textChange.bind(this)} onKeyUp={this.textOnKeyUp.bind(this)}/>
        {/*<div style={{background:'white', width: '100%', height:'100%'}}>*/}
          <div id={this.props.id} className={renderclass} style={{margin:'0 15px 15px 0',width:'fit-content',background:'white', border:'solid 1px rgba(0,0,0,.08)',
            boxShadow: '10px 10px 10px rgba(0,0,0,.08)'}} >
        {/*</div>*/}
        </div>
        {/*<Button icon="left" style={{position:'absolute', top: 300, left: 10}} onClick={this.props.onClickPrevPage}></Button>*/}
        {/*<Button icon="right" style={{position:'absolute', top: 300, right: 10}} onClick={this.props.onClickNextPage}></Button>*/}
      </div>
    );
  }
}

export default Zrender;
