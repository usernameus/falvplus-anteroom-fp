/**
 * Created by zhihangjishu on 17/3/1.
 */
const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('products', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      lawyerUserId: '@county(true)',
      productName: '@csentence(6)',
      productBrief: '@csentence(30)',
      productThumb: 'https://gd3.alicdn.com/imgextra/i3/2752294408/TB29P9Zal8kpuFjSspeXXc7IpXa_!!2752294408.gif_400x400.jpg',
      'shopPriceY|10000-100000': 30000,
      'dealNumber|1-1000': 288,
      serviceType:1,
      'productNumber|1-1000': 288,
      isOnsale:'@boolean',
      Unit:1,

      //productName:'@long',
      //service_type: '@long',
      //product_type_id:'@integer',
      //product_brief:'@text',
      //product_desc:'@text',
      //shop_price:'@Long',
      //product_number:'@integer',
      //product_onsale:1,
      //operation:1,
      //phone: /^1[34578]\d{9}$/,
      //'age|11-99': 1,
      //address: '@county(true)',
      //isMale: '@boolean',
      //email: '@email',
      //createTime: '@datetime',
      avatar: function () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.productName.substr(0, 1))
      }
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let MyproductsListData = global[dataKey]


function searchPageData(pageSize, currentPage, searchField, keyword){
  let data
  let newPage
  let newData = MyproductsListData.data.concat()
  if (searchField) {
    const d = newData.filter(function (item) {
      return typeof item[searchField] === 'string' ?  item[searchField].indexOf(decodeURI(keyword)) > -1 : item[searchField] == keyword
    })

    data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    newPage = {
      current: currentPage * 1,
      total: d.length
    }
  } else {
    data = MyproductsListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    MyproductsListData.page.current = currentPage * 1
    newPage = MyproductsListData.page
  }

  return {data: data, newPage: newPage};
}

module.exports = {
  'GET /api/products/\\d+' (req, res){
    var productId = req.url.getVarFromPath(3);
    var result = searchPageData(1, 1, 'id', productId);
    res.json({success: true, data: result.data})
  },
  'GET /api/products' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    var result = searchPageData(pageSize,currentPage,page.field, page.keyword)
    const {data, newPage} = result;

    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/products' (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.productName.substr(0, 1))

    newData.id = MyproductsListData.data.length + 1
    MyproductsListData.data.unshift(newData)

    MyproductsListData.page.total = MyproductsListData.data.length
    MyproductsListData.page.current = 1

    global[dataKey] = MyproductsListData

    res.json({success: true, data: MyproductsListData.data, page: MyproductsListData.page})
  },

  'DELETE /api/products' (req, res) {
    const deleteItem = req.body

    MyproductsListData.data = MyproductsListData.data.filter(function (item) {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    MyproductsListData.page.total = MyproductsListData.data.length

    global[dataKey] = MyproductsListData

    res.json({success: true, data: MyproductsListData.data, page: MyproductsListData.page})
  },

  'PUT /api/products' (req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.productName.substr(0, 1))

    MyproductsListData.data = MyproductsListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return itemßßß
    })

    global[dataKey] = MyproductsListData
    res.json({success: true, data: MyproductsListData.data, page: MyproductsListData.page})
  }

}
