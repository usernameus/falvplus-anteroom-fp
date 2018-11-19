/**
 * Created by mel on 2017/2/21.
 */
const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

// let dataKey = mockStorge('profile', Mock.mock({
//   user: {
//     name: '@cname',
//     firm: '济南法仆网络律师事务所',
//     major: '民事刑事辩护',
//     email: '@email',
//     sales: 3241,
//     sold: 3556,
//     avatar: 'http://tva4.sinaimg.cn/crop.0.0.996.996.180/6ee6a3a3jw8f0ks5pk7btj20ro0rodi0.jpg',
//     topimg:'http://www.phpweb.net/down/pics/20100707/201007071278488362975.jpg',
//     slider: [
//       'https://img.alicdn.com/tps/TB1QBgCPpXXXXc6XXXXXXXXXXXX-2880-1120.jpg',
//       'https://img.alicdn.com/tps/TB1otDJPpXXXXc4apXXXXXXXXXX-1600-1120.png'
//     ]
//   },
// }));

let dataKey = mockStorge('ownersettings', Mock.mock({
  'ownerInfo':{
    'banners':[
      'url(//theme.lj110.com/default/m/index/indexBanner.png)',
      'url(//theme.lj110.com/default/m/index/indexBanner2.png)',
      'url(//theme.lj110.com/default/m/index/indexBanner3.png)',
      'url(//theme.lj110.com/default/m/index/indexBanner4.png)',
    ],
    'headerTitle':[
      '庭上十分钟，庭下十年功',
      '明德崇法，笃行致知',
      '以法治为基础，建和谐大厦',
      '专业、专心、专注'
    ],
    'headerContent':[
      '为避免庭上仓促行事，出现纰漏与疏忽，我们详细掌握事实写好文案',
      '法律有效力，国民便昌盛',
      '庭上十分钟，庭下十年功',
      '以法治为基础，建和谐大厦'
    ],
    'HeaderTitle':'×××律师专属会客室',
  },

}));

module.exports = {
  'GET /api/ownersetting' (req, res){
      res.json(global[dataKey])
  }
}
