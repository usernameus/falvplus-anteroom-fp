import React from 'react';
import {Form, Input, Button, message, Row, Col, Upload,Tooltip} from 'antd';
import {uploadurl} from '../../utils/config';
import classnames from '../anteroom/Canvas.less';

const Cookie = require('js-cookie');

function Sender({
  sendMsg,
  channelId,
  beforeFileUpload,
  changeFiles,
  onUploadingFile,
  form:{
    getFieldDecorator,
    getFieldValue,
    setFieldsValue
  }
}) {


  const FormItem  = Form.Item;

  function onSendMsg(){
    const msgContent = getFieldValue('msgtosend');
    if(!msgContent || msgContent.length == 0){
      message.warning('不能发送空消息');
      return;
    }
    const msg = {
      msgType: 'text',
      content: msgContent
    };
    sendMsg(msg)
    setFieldsValue({'msgtosend':'' });
    document.getElementById('msgtosend').value = '';
  }

  function onPressEnter(e){
    if(e.keyCode != 13){
      return;
    }
    if(e.ctrlKey || e.altKey){
      const msgtosend = document.getElementById('msgtosend');
      const before = msgtosend.value.substring(0,msgtosend.selectionStart);
      const after = msgtosend.value.substring(msgtosend.selectionEnd);
      msgtosend.value = before + '\r\n' + after;
      setFieldsValue({'msgtosend': msgtosend.value})
    }else{
      onSendMsg();
      e.preventDefault();
    }
  }
  const token = Cookie.get('token');
  const uploadProps = {
    name: 'file',
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
      if(beforeFileUpload && typeof beforeFileUpload === 'function'){
        return beforeFileUpload(file, fileList);
      }
    },
    onChange(info){
      const {file,fileList, event} = info;
      const {name, response, size, status, type,percent, error} = file;
      if(file.status !== 'uploading'){
        console.log(info.file, info.fileList);
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
        }
      }else{
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
  return (
    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'4.5rem',padding:'10px'}}>
      <Form>
        <FormItem style={{position:'relative'}}>
          <div style={{position:'absolute', left:0, bottom:0, top:0, right: 120}}>
          {/*<Row type="flex" align="middle">*/}
            {/*<Col span={20}>*/}
              {getFieldDecorator('msgtosend', {
                rules: [{
                  required: true,
                  message: '不能发送空消息'
                }]
              })(
                <Input type="textarea" style={{fontSize:'1rem'}}
                       placeholder="发送消息, 可按回车键直接发送,按 Ctrl+回车键换行" autosize={{ minRows: 2, maxRows: 2 }}
                       onKeyDown={onPressEnter} />
              )}
          </div>
          <div style={{position:'absolute', right: 0, bottom:0, top:0, width: 120, paddingTop: 10}}>
            {/*</Col>*/}
            {/*<Col span={4}>*/}
              <Button onClick={onSendMsg} id="sendBtn" type="primary" style={{margin:'0 10px'}}>发送</Button>
              <Upload {...uploadProps}>
                <Tooltip placement="top" title="上传文件">
                <Button shape="circle">
                  <i className="fpanticon fpanticon-plus" style={{fontSize:'16px', lineHeight:'16px'}}/>
                </Button>
                </Tooltip>
              </Upload>
            </div>
            {/*</Col>*/}
          {/*</Row>*/}
        </FormItem>
      </Form>
    </div>
  );
}

export default Form.create()(Sender);
