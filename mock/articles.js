const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('articles', Mock.mock({
  'data|100':[
    {
      'articleId|+1': 1,
      'authorName': '@cname',
      'articleTitle': '@csentence(10,50)',
      'articleContent': '@cparagraph(2,50)',
      'articleCover': '@image(100x70)',
      'publishTime': '@date'
    }
  ],
  page:{
    total: 100,
    current: 1
  }
}));

let articleList = global[dataKey];

module.exports = {
  'GET /api/articles/\\d+' (req, res){

    let newData = articleList.data.concat()
    let articleId = req.url.slice(1).split(/[\/?]/)[2];
    const d = newData.filter(function (item) {
      return item.articleId == articleId;
    })

    res.json({success: true, article: d[0]})
  },
  // 'GET /api/articles' (req, res) {
  //   const page = qs.parse(req.query)
  //   const pageSize = page.pageSize || 10
  //   const currentPage = page.page || 1
  //
  //   let data
  //   let newPage
  //
  //   let newData = articleList.data.concat()
  //
  //   if (page.field) {
  //     const d = newData.filter(function (item) {
  //       return item[page.field].indexOf(decodeURI(page.keyword)) > -1
  //     })
  //
  //     data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  //
  //     newPage = {
  //       current: currentPage * 1,
  //       total: d.length
  //     }
  //   } else {
  //     data = articleList.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  //     articleList.page.current = currentPage * 1
  //     newPage = articleList.page
  //   }
  //   res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  // },

  'POST /api/articles' (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.articleId = articleList.data.length + 1
    articleList.data.unshift(newData)
    articleList.page.total = articleList.data.length
    articleList.page.current = 1

    global[dataKey] = articleList

    res.json({success: true, data: articleList.data, page: articleList.page})
  },

  'DELETE /api/articles/\\d+' (req, res) {
    const deleteItem = req.body

    articleList.data = articleList.data.filter(function (item) {
      if (item.articleId === deleteItem.articleId) {
        return false
      }
      return true
    })


    articleList.page.total = articleList.data.length

    global[dataKey] = articleList

    res.json({success: true, data: articleList.data, page: articleList.page})
  },

  'PUT /api/articles' (req, res) {
    const editItem = req.body

    editItem.publishTime = Mock.mock('@now')

    articleList.data = articleList.data.map(function (item) {
      if (item.articleId === editItem.articleId) {
        return editItem
      }
      return item
    })

    global[dataKey] = articleList
    res.json({success: true, data: articleList.data, page: articleList.page})
  },

  'GET /api/articles/page/\\d+/\\d+' (req, res){
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data;
    let newPage;
    let newData = articleList.data.concat();
    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = articleList.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      articleList.page.current = currentPage * 1
      newPage = articleList.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})

  },
  // 'GET /api/articles/\\d+' (req, res){
  //
  //   let articleId = req.url.slice(1).split(/[\/?]/)[2];
  //
  //   res.json({success: true, article: articleList.data[articleId-1]})
  // }
}
