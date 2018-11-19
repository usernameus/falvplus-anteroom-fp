/**
 * Created by mel on 2017/2/21.
 */
const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('profile', Mock.mock({
    name: '@cname',
    orgName: '济南法仆网络律师事务所',
    major: '民事刑事辩护',
    avatar: '@image(80x100)',
    lawyerDesc: "<h2 style='margin: 0px; padding: 0px; overflow: hidden; list-style: none; font-size: 12px; height: 29px; float: left; line-height: 29px; text-indent: 25px; color: rgb(0, 83, 145); '>律师资料</h2><p><img src='http://img.110.com/tmp/lawyer/201102/120_150_80_181625511064.jpg'/></p><p>常路律师</p><p>专长领域：</p><p>拆迁安置 债务追讨 合同纠纷 婚姻家庭 遗产继承 工程建筑 房产纠纷 刑事辩护 常年顾问 私人律师</p><p>电话：</p><p>15901128689 15901128689 (电话咨询律师请说明来自<span style='color:red'>110法律咨询网</span>)</p><p>Email：</p><p>changlulawyer\\@163.com</p><p>执业机构：</p><p>北京市国振律师事务所</p><p>执业证号：</p><p>11101200910139985</p><p>地址：</p><p>北京市朝阳区安慧里中国五矿大厦11层</p><p>积分：<span style='color: rgb(255, 0, 0);'>225330</span></p><p>奖章：<span style='color: rgb(255, 0, 0);'>36</span></p><p>点击量：<span style='color: rgb(255, 0, 0);'>402357</span></p><p><img src='http://img.110.com/tall/offonline.gif'/>&nbsp;&nbsp;<a href='http://lawyer.110.com/395120/###' style='text-decoration: none; color: rgb(51, 51, 51);'><img src='http://images.110.com/lawyer/blue/omt/l0011.gif'/></a>&nbsp;&nbsp;<a href='http://lawyer.110.com/395120/###' style='text-decoration: none; color: rgb(51, 51, 51);'><img src='http://images.110.com/lawyer/blue/omt/l1008.gif'/></a></p><h2 style='margin: 0px; padding: 0px; overflow: hidden; list-style: none; font-size: 12px; height: 29px; float: left; line-height: 29px; text-indent: 25px; color: rgb(0, 83, 145); background: url(&quot;../omt/l0005.gif&quot;) 10px 10px no-repeat;'>律师简介</h2><p style='text-indent: 2em; word-break: break-all;'>常路，北京市国振律师事务所合伙人律师，毕业于北京大学，中华全国律师协会会员，全国企业法律顾问协会会员，北京律师协会会员。《北京电视台》《中国青年报》等多家媒体曾经报道过常路律师代理纠纷案件。常路律师为中央电视台《喜乐街》、《聂荣臻》；浙江卫视《中国喜剧星》；江苏卫视《最强天团》、《我们相爱吧》、《看见你的声音》等大型节目提供法律服务。</p><p style='text-indent: 2em; word-break: break-all;'>专业领域</p><p style='text-indent: 2em; word-break: break-all;'>刑事辩护、行政诉讼、影视产业、艺人维权、著作权纠纷、拆迁安置、债务追讨、婚姻家庭、遗产继承、工程建筑、房产纠纷、常年法律顾问。</p><p style='text-indent: 2em; word-break: break-all;'>相关资格</p><p style='text-indent: 2em; word-break: break-all;'>中华全国律师协......&nbsp;<a href='http://lawyer.110.com/395120/link/index/' style='text-decoration: none; color: blue;'>[详细资料]</a></p><p><br/></p>"
}));


module.exports = {
  'GET /api/profile' (req, res){
    res.json({success: true, data: global[dataKey]});
  }
}
