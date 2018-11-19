import React from 'react';
import {Card,Row, Col} from 'antd';
import styles from './List.css';

function List(props) {
  const {list,lookHref} = props;
  return (
    <div className={styles.normal}>
      <ul>
       {list && list.length > 0 ?
          list.map((data, index) => {
            const {id, articleTitle, articleCover, author, articleContent, createdAt} = data;
            return (
              <a key={index} href={lookHref + id} style={{color: 'gray', textDecorator: ''}}>
                <Card key={index} style={{background: 'white', margin: '5px 0', padding: '10px'}}>
                  <Row>
                    <Col md={3} xs={24}>
                      <img src={articleCover} alt={articleTitle} style={{width: '100%'}}/>
                    </Col>
                    <Col md={21} xs={24} style={{paddingLeft: '1em'}}>
                      <div style={{fontSize: '1.5em'}}>{articleTitle}</div>
                      <div>{author} {createdAt}</div>
                      <div>{articleContent.slice(0,100)}{articleContent.length > 150 ? '...' : ''}</div>
                    </Col>
                  </Row>
                </Card>
              </a>
            );
          })
        :''}
        </ul>
    </div>
  );
}

export default List;
