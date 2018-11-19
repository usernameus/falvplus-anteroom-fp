import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from './main.less'
import { menu } from '../../utils'
let loactionId = location.pathname.replace(/^\/admin\//,'').split(/[?#\/]/)[1];
let pathSet = []
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.map(item => {
    if (item.child) {
      item.child.map(items => {
        pathSet[(parentPath + items.key).replace(/\//g, '-').hyphenToHump()] = {
          path: parentPath + items.key,
          name: items.name,
          icon: items.icon || '',
          clickable: items.clickable === undefined
        }
      })
    }else{
      pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
        path: parentPath + item.key,
        name: item.name,
        icon: item.icon || '',
        clickable: item.clickable === undefined
      }
    }
  })
}
getPathSet(menu)
function Bread ({ location ,rootPath}) {
  let pathNames = []
  const pathname = location.pathname.slice(rootPath?rootPath.length:0);
  pathname.split('/').map((item, key) => {
    if(loactionId!='' && key > 0){

    }else{
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + '-' + item).hyphenToHump())
    } else {
      pathNames.push(('-' + item).hyphenToHump())
    }}
  })
    const breads = pathNames.map((item, key) => {
      let locationName = location.pathname.replace(/^\/admin\//,'').split(/[?#\/]/)[0];
      let locationId = location.pathname.replace(/^\/admin\//,'').split(/[?#\/]/)[1];
      if(locationName=='article'&&locationId!=undefined){
        item = 'Article'
        pathSet[item].name='修改文章'
      }else if(locationName=='case'&&locationId!=undefined){
        item = 'Case'
        pathSet[item].name='修改案例'
      }else if(locationName=='activity'&&locationId!=undefined){
        item = 'Activities'
        pathSet[item].name='修改活动'
      }
      else if (!(item in pathSet)) {
        item = 'Dashboard'
      }
      return (
        <Breadcrumb.Item
          key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : {href: '/' + pathSet[item].path}}>
          {pathSet[item].icon
            ? <Icon type={pathSet[item].icon}/>
            : ''}
          <span>{pathSet[item].name}</span>
        </Breadcrumb.Item>
      )
    })
  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item href='/admin'><Icon type='home' />
          <span>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}
Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
