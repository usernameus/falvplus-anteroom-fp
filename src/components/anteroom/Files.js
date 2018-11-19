import React,{Component} from 'react';
import {Upload, Button,message, Icon,Tooltip, Progress} from 'antd';
import {uploadurl, filetypeview} from '../../utils/config';
import styles from './Files.css';

const Cookie = require('js-cookie');

class Files extends Component{
  constructor(props){
    super(props);
    this.state = {
      uploading: false
    }
  }

  render() {
    const that = this;
    const {channelId, fileList, changeFiles, beforeFileUpload, onUploadingFile,openFilePage, downloadFile} = this.props;
    const token = Cookie.get('token');
    const uploadProps = {
      name: 'file',
      disabled: this.state.uploading,
      showUploadList: false,
      action: uploadurl,
      xhrFields:{
        withCredentials:token
      },
      headers: {
        'Authorization': `Bearer ` + token
      },
      data:{
        channelId: channelId
      },
      beforeUpload(file, fileList){
        if(beforeFileUpload && typeof beforeFileUpload == 'function'){
          return beforeFileUpload(file, fileList);
        }
      },
      onChange(info){
        const {file,fileList, event} = info;
        const {name, response, size, status, type,percent, error} = file;
        // console.log(file);
        if(file.status !== 'uploading'){
          // console.log(info.file, info.fileList);
          if(response){
            const jsonUploadContent = JSON.parse(response.uploadContent);
            const jsonContent = JSON.parse(jsonUploadContent['content']);
            const uc = {
              msgType: jsonUploadContent['msgType'],
              content: jsonContent
            }
            const newFile = {
              fileName:response.fileName,
              originPathName:response.url,
              fileId: response.fileId,
              hash: response.hash,
              size: size,
              status: status,
              fileType: type,
              percent: 100,
              error: error,
              uid: file.uid,
              uploadContent: uc
            };
            changeFiles(newFile);
            that.setState({uploading: false})
          }
        }else{
          // console.log(info.file);
          that.setState({
            uploading: true
          })
          if(onUploadingFile && typeof onUploadingFile === 'function'){
            const uploadingFile = {
              fileName: file.name,
              size: file.size,
              status: file.status,
              fileType: file.type,
              percent: file.percent * 0.8,
              error: file.error,
              uid: file.uid
            };
            onUploadingFile(uploadingFile);
          }
        }
      },
      defaultFileList:[]
    };

    function openfile(fileType,fileId, page){
      openFilePage(fileType,fileId,page);
    }

    function downloadfile(fileId){
      downloadFile(fileId);
    }

    let uploadButtonState = {
      loading: this.state.uploading
    }
    if(this.state.uploading){
      uploadButtonState['disabled'] = 'disabled';
    }

    return (
      <div className={styles.normal}>
        {!this.props.hideUpload ?
          <Upload {...uploadProps}>
            <Button type="primary"  style={{marginBottom: 10}} {...uploadButtonState}><Icon type="upload"/>上传文件</Button>
          </Upload>
        :''}
        <ul>
          {fileList.map((item, index)=>{
            const {fileName,percent,originPathName,fileId, fileType,error,status} = item;
            if(!error){
              const fileExt = fileName.slice(fileName.lastIndexOf('\.'));
              const displayName = fileName.length > 30 ? fileName.slice(0,20) + '...' + fileExt : fileName;
              const tipDownload = <div style={{width:'5em'}}>下载文件</div>;
              const tipOpen = <div style={{width:'5em'}}>打开文件</div>;
              return (
                <li key={index}>
                  <Tooltip placement="topLeft" title={tipDownload}>
                      <Button icon="download" onClick={downloadfile.bind(null, fileId)}></Button>
                  </Tooltip>
                  {fileType.toLowerCase().in_array(filetypeview) ?
                    <Tooltip placement="top" title={tipOpen}>
                      <Button icon="edit" style={{color:'#3393eF'}} onClick={openfile.bind(null,fileType,fileId, 1)}>{displayName}</Button>
                      { status == 'uploading' || percent > 0 && percent < 100 ?
                        <Progress type="circle" percent={percent} width={20} />
                        :''}
                    </Tooltip>
                  :<span style={{paddingLeft: '1em'}}>{displayName}</span>}
                </li>
              )
            }else{
              return <li>文件上传出错</li>
            }
          })}
        </ul>
      </div>
    );

  }
}

export default Files;
