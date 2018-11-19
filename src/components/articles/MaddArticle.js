import React, { PropTypes }  from 'react';
import PictureWall from '../upload/PictureWalls';
import {Form, Button, Icon,Input,Col} from 'antd';
import {downdomain,ueditorbase,ueditorconfig, ueditorall} from '../../utils/config';
import styles from '../flayout/fmain.less'
const FormItem = Form.Item;

window.UEDITOR_HOME_URL= ueditorbase;

class AddArticle extends React.Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const {articleTitle,articleCover,articleContent,id,articlePicture} = this.props;
    const fileList = articleCover ? [{
      uid: -1,
      status: 'done',
      name: articleCover,
      url: articleCover
    }] : [];
    const pictureFileList =[];
    articlePicture ?articlePicture.map((item,index)=> pictureFileList.push({
      uid: -index,
      status: 'done',
      name: item,
      url: item
    })): [];
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <h2 style={{width:'100%',textAlign:'center',color:'rgb(4, 150, 255)'}}>{location.pathname.startWith('/addArticle') ?'添加文章':'添加活动'}</h2>
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19}}
          label="内容"
        >
          {getFieldDecorator('articleContent', {
            initialValue: articleContent,
            rules: [
              { required: true, message: '内容不能为空' },
            ],
          })(<Input type="textarea"rows={12} />)}

        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(AddArticle);
