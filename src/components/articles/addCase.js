/**
 * Created by fapu on 17-3-13.
 */
import React, { PropTypes }  from 'react';
import UEditor from 'simple-react-ui/dist/ueditor/index';
import PictureWall from '../upload/PictureWalls';
import {Form, Button, Icon,Input,Col,Row} from 'antd';
import {ueditorbase,downdomain, ueditorconfig, ueditorall} from '../../utils/config';

window.UEDITOR_HOME_URL= ueditorbase;

const FormItem = Form.Item;

class AddCase extends React.Component {
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
    if(getFieldsValue()['articleContent'] && ue.getContent() != getFieldsValue()['articleContent']){
      ue.setContent(getFieldsValue()['articleContent']);
    }
    // ue.setContent(getFieldsValue()['articleContent']);
    ue.addListener('contentChange', function(){
      const fieldsValue = getFieldsValue();
      const newFieldsValue = {...fieldsValue, 'articleContent': ue.getContent()};
      setFieldsValue(newFieldsValue);
      validateFields();
    });
  }

  render() {
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
      uid: -index,
      status: 'done',
      name: item.pictureName,
      url: item.pictureImg
    })): [];

    const formItemLayout = {
      labelCol: { lg: 2,sm:3,md:3},
      wrapperCol: { lg: 10 ,sm:10,md:10},
    };
    const FormItemLayout = {
      labelCol: { lg: 2,sm:3,md:3},
      wrapperCol: { lg: 22 ,sm:21,md:21},
    };
    return (
      <Form onSubmit={this.handleSubmit}>

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
          {...FormItemLayout}
          label="案例图片"
        >
          {getFieldDecorator('articlePicture', {
            initialValue: articlePicture,
            rules: [
            ],
          })(<Input type="hidden"/>)}
          <PictureWall maxFile={5} defaultFileList={pictureFileList} fileList={pictureFileList} onListChange={this.onListChange} />
        </FormItem>
        <Row><Col lg={24}md={24}xs={0}>
          <FormItem
            label="案例说明"
            {...FormItemLayout}
          >
            {getFieldDecorator('articleContent', {
              initialValue: articleContent,
              rules: [
                { required: true, message: '内容不能为空' },
              ],
            })(<Input type="hidden"/>
            )}

            <UEditor id="content" name="content" width={'100%'}  height={500} initialContent={articleContent}
                     afterInit={this.ueAfterInit}
                     uconfigSrc={ueditorconfig}
                     ueditorSrc={ueditorall} />
          </FormItem></Col>
          <Col lg={0}md={0}xs={24}>
            <FormItem
              label="案例说明"
              {...FormItemLayout}
            >
              {getFieldDecorator('articleContent', {
                initialValue: articleContent,
                rules: [
                  { required: true, message: '内容不能为空' },
                ],
              })(<Input type="textarea"rows={12}/>
              )}
            </FormItem>
          </Col></Row>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(AddCase);
