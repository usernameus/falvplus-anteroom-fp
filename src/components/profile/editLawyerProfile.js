/**
 * Created by fapu on 17-4-11.
 */
import React, { PropTypes }  from 'react';
import UEditor from 'simple-react-ui/dist/ueditor/index';
import {Form, Button, Icon,Input,Col,Row} from 'antd';
import {  ueditorbase,ueditorconfig, ueditorall} from '../../utils/config';
import ReactDOM from 'react-dom';
import hmacsha1 from "hmacsha1";
import {Base64} from "js-base64";
import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'

const FormItem = Form.Item;
window.UEDITOR_HOME_URL= ueditorbase;

class EditLawyerProfile extends React.Component {
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
          lawyerDesc: values.lawyerDesc,
        }
        this.props.onSubmit(params)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {lawyerDesc,id,onChanel} = this.props;
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 10 },
    };
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          wrapperCol={{span:22}}
          label=""
        >
          {getFieldDecorator('lawyerDesc', {
            rules: [
              { required: true, message: '内容不能为空' },
            ],
          })(<LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button onClick={onChanel}>取消</Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(EditLawyerProfile);
