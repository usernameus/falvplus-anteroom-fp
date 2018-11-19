/**
 * Created by zhihangjishu on 17/4/8.
 */
const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('profile', Mock.mock());


module.exports = {
  'GET /api/profileaaaa' (req, res){
    res.json({success: true, data: global[dataKey]});
  }
}
