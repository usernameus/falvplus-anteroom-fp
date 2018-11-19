import React from 'react';
import {Upload, Modal, Icon, Input,Button,Row,Col} from 'antd';
import config from '../../utils/config';
import './PictureWall.less'
const Ajax = require('robe-ajax')
class PicturesWalls extends React.Component {
  constructor(props){
    super(props);
    const { action,name, fileList,maxFile, onListChange} = props;
    this.state = {
      initStatus: true,
      action: action,
      name: name,
      previewVisible: false,
      previewImage: '',
      maxFile: maxFile || 3,
      fileList: fileList || [],
      onListChange: onListChange,
    };
  }
  handleCancel = () => {this.setState({ previewVisible: false});
  }
  onUpdate=(value)=>{
    if(file.status === 'done' || file.status === 'removed'){
      this.state.onListChange(fileList,value);
    }
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ file, fileList}) => {
    this.setState({ fileList: fileList, initStatus: false})
    if(file.status === 'done' || file.status === 'removed'){
      this.state.onListChange(fileList);
    }
  }
  render() {
    const { action,name,previewVisible, previewImage,maxFile } = this.state;
    let fileList = this.props.fileList;
    if(!this.state.initStatus){
      fileList = this.state.fileList;
    }
    const uploadProps = {
      name: name,
      action: action || config.uploadaction,
      // listType: 'picture-card',
      listType: 'picture',
      defaultFileList: [...fileList],
      fileList: fileList,
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      headers:{
        'Accept': 'application/json',
      },
      beforeUpload(file){
        this.data['token'] =  Ajax.ajax({
          url: config.qntoken,
          method: 'get',
          async: false
        }).responseJSON['token'];
        this.data['file'] = file.name;
        this.data['x:filename'] = file.name;
        this.data['x:size'] = file.size;
      },
    }
    const uploadButton = (
      <div>
        <Button>
          <Icon type="upload" /> upload
        </Button>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload {...uploadProps}>
          {fileList.length >= (maxFile || 3) ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt={previewImage} style={{ width: '100%' ,height:'100%'}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWalls;
