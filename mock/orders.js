/**
 * Created by mel on 2017/2/21.
 */
const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('orders', Mock.mock({
  data:[],
  page:{
    total: 0,
    current: 1
  }
}));

let orderListData = global[dataKey]


function searchPageData(pageSize, currentPage, searchField, keyword){
  let data
  let newPage
  let newData = orderListData.data.concat()
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
    data = orderListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    orderListData.page.current = currentPage * 1
    newPage = orderListData.page
  }

  return {data: data, newPage: newPage};
}


module.exports = {
  'GET /api/order/\\d+' (req, res){
    const orderId = req.url.getVarFromPath(3)
    const order = searchPageData(1, 1, "id", orderId)
    let result = null;
    if(order.data.length > 0){
      result = order.data[0];
      result.title = order.data[0].products[0].productId;
    }
    res.json({success: true, data: result})
  },
  'POST /api/order' (req, res){
    const newData = req.body
    newData.id = orderListData.data.length + 1;
    newData.totalamountY = newData.products.reduce((pv, c) => pv + c.amountY * 100, 0)

    orderListData.data.unshift(newData)
    orderListData.page.total = orderListData.data.length
    orderListData.page.current = 1
    global[dataKey] = orderListData
    res.json({success: true, data: {orderId: newData.id}});
  }
}

