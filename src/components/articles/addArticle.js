import React, { PropTypes,Component }  from 'react';
import UEditor from 'simple-react-ui/dist/ueditor/index';
import PictureWall from '../upload/PictureWalls';
import {Form, Button, Icon,Input,Col,Row} from 'antd';
import {downdomain,ueditorbase,ueditorconfig, ueditorall} from '../../utils/config';
import hmacsha1 from "hmacsha1";
import {Base64} from "js-base64";
import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'
const FormItem = Form.Item;
window.UEDITOR_HOME_URL= ueditorbase;
class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: '',
      responseList: []
    }
    this.receiveHtml = this.receiveHtml.bind(this);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.receiveRaw = this.receiveRaw.bind(this);
    this.onChange = this.onChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.getPolicy = this.getPolicy.bind(this);
  }
  receiveHtml(content) {
    console.log("recieved HTML content", content);
    //清空responseList
    this.setState({responseList:[]});
  }
  componentDidMount() {}
  receiveMarkdown(content) {
    console.log("recieved markdown content", content);
  }
  receiveRaw(content) {
    console.log("recieved Raw content", content);
  }
  onChange(info) {
    let currFileList = info.fileList;
    currFileList = currFileList.filter((f) => (!f.length));
    let url = "http://devopee.b0.upaiyun.com";

    //Read remote address and display.
    //读取远程路径并显示链接
    currFileList = currFileList.map((file) => {
      if (file.response) {
        // concat url
        // 组件会将 file.url 作为链接进行展示
        file.url = url + file.response.url;
      }
      if (!file.length) {
        return file;
      }
    });
    let _this = this;

    // filtering successed files
    //按照服务器返回信息筛选成功上传的文件
    currFileList = currFileList.filter((file) => {
      //multiple uploading?
      //根据多选选项更新添加内容
      let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
      if (hasNoExistCurrFileInUploadedList) {
        if (!!_this.props.isMultiple == true) {
          _this.state.responseList.push(file);
        } else {
          _this.state.responseList = [file];
        }
      }
      return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
    });
    currFileList = uniqBy(currFileList, "name");
    if (!!currFileList && currFileList.length != 0) {
      this.setState({responseList: currFileList});
    }
    _this.forceUpdate();
  }
  beforeUpload(file) {
    console.log("beforeUpload like", file);
  }
  getSignature(fileName) {
    let now = new Date();
    let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
    let Signature = Base64.encode(h);
    return Signature;
  }
  getPolicy(fileName) {
    let now = new Date();
    let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //expiration date time
    let policy = Base64.encode(JSON.stringify({
      "bucket": "devopee",
      "save-key": "/" + fileName,
      "expiration": Math.round(afterHour.getTime() / 1000),
      "date": now
    }));
    return policy;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          articleTitle: values.articleTitle,
          articleCover: values.articleCover,
          articlePicture:values.articlePicture,
          articleContent: values.articleContent,
          id:values.id
        }
        this.props.onSubmit(params)
      }
    });
  }
  onListChange = (fileList) => {
    this.fileList = fileList;
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const fieldsValue = getFieldsValue();
    const articlePicture=[]
      fileList.map((item)=>articlePicture.push({pictureImg:item.response?item.response.key.length>0?downdomain+item.response.key:'':item.url,pictureName:item.name}));
    const newFieldsValue = {...fieldsValue, 'articlePicture': articlePicture};
    setFieldsValue(newFieldsValue);
    validateFields();
  }
  onListCoverChange = (fileList) => {
    this.fileList = fileList;
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    const fieldsValue = getFieldsValue();
    const articleCover = fileList.map((item)=>item.response.key);
    const newFieldsValue = {...fieldsValue, 'articleCover': articleCover.length > 0 ? downdomain + articleCover : ''};
    setFieldsValue(newFieldsValue);
    validateFields();
  }

  ueAfterInit = (ue) => {
    const {getFieldsValue, setFieldsValue, validateFields} = this.props.form;
    if(getFieldsValue()['articleContent'] && getFieldsValue()['articleContent'] != ue.getContent()){
      ue.setContent(getFieldsValue()['articleContent']);
    }
    ue.addListener('contentChange', function(){
      const fieldsValue = getFieldsValue();
      const newFieldsValue = {...fieldsValue, 'articleContent': ue.getContent()};
      setFieldsValue(newFieldsValue);
      validateFields();
    });
  }
  render() {
    let policy = "";

    //uploadProps configration: https://ant.design/components/upload/
    //uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => {
        // customize uploading parameters, code example use UPYUN(https://www.upyun.com/)
        //自定义上传参数，这里使用UPYUN
        return {
          Authorization: "UPYUN reactlzeditor:" + this.getSignature(file.name),
          policy: (() => {
            policy = this.getPolicy(file.name);
            return policy;
          })(),
          signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
        }
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }
    const { editorState } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {articleTitle,articleCover,articleContent,id,articlePicture} = this.props;
    const fileList = articleCover ? [{
      uid:-1,
      status: 'done',
      name: articleCover,
      url: articleCover
    }] : [];
    const pictureFileList =[];
      articlePicture ?articlePicture.map((item,index)=> pictureFileList.push({
      uid: -(index+1),
      status: 'done',
      name: item.pictureName,
      url: item.pictureImg
    })): [];
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    return (
      <Row>
        <Col lg={24}md={24}xs={0}>
          <Form onSubmit={this.handleSubmit} layout="horizontal">

            <FormItem style={{display:'none'}}
                      {...formItemLayout}
                      label="标题"
            >
              {getFieldDecorator('id', {
                initialValue:id,
              })(<Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('articleTitle', {
                initialValue: articleTitle,
                rules: [
                  { required: true, message: '标题不能为空' },
                ],
              })(<Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="封面"
            >
              {getFieldDecorator('articleCover', {
                initialValue: articleCover,
                rules: [
                  { required: true, message: '封面不能为空' },
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={1} defaultFileList={fileList} fileList={fileList} onListChange={this.onListCoverChange}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片"
            >
              {getFieldDecorator('articlePicture', {
                initialValue: articlePicture,
                rules: [
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={5} defaultFileList={pictureFileList} fileList={pictureFileList} onListChange={this.onListChange}/>
            </FormItem>
            <FormItem
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22}}
              label="内容"
            >
              {getFieldDecorator('articleContent', {
                initialValue: articleContent,
                rules: [
                  { required: true, message: '内容不能为空' },
                ],
              })(<Input type="hidden"/>)}
              <div>
                <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}/>
              </div>
              {/*<UEditor id="content" name="content"  width={'100%'} height={500} initialContent={articleContent}*/}
                       {/*afterInit={this.ueAfterInit}*/}
                       {/*uconfigSrc={ueditorconfig}*/}
                       {/*ueditorSrc={ueditorall} />*/}
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Col>
            </FormItem>
          </Form>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <Form onSubmit={this.handleSubmit} layout="horizontal">

            <FormItem style={{display:'none'}}
                      {...formItemLayout}
                      label="标题"
            >
              {getFieldDecorator('id', {
                initialValue:id,
              })(<Input/>
              )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19}}
              label="标题"
            >
              {getFieldDecorator('articleTitle', {
                initialValue: articleTitle,
                rules: [
                  { required: true, message: '标题不能为空' },
                ],
              })(<Input/>
              )}
            </FormItem>

            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19}}
              label="封面"
            >
              {getFieldDecorator('articleCover', {
                initialValue: articleCover,
                rules: [
                  { required: true, message: '封面不能为空' },
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={1} defaultFileList={fileList} fileList={fileList} onListChange={this.onListCoverChange}/>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19}}
              label="图片"
            >
              {getFieldDecorator('articlePicture', {
                initialValue: articlePicture,
                rules: [
                ],
              })(<Input type="hidden"/>)}
              <PictureWall maxFile={5} defaultFileList={pictureFileList} fileList={pictureFileList} onListChange={this.onListChange}/>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19}}
              label="内容"
            >
              {getFieldDecorator('articleContent', {
                initialValue: articleContent,
                rules: [
                  { required: true, message: '内容不能为空' },
                ],
              })(<Input type="textarea" rows={4}/>)}
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Col>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default Form.create()(AddArticle);
