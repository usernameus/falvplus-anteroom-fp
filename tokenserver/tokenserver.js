/**
 * Created by mel on 2017/2/28.
 */

var express = require('express');
var qiniu = require('qiniu');
var app = express();

app.get('/bill', function(req, res, next){
  var appid = "e58642be-7b48-42b5-91bf-9a4f612ec58d";
  var secret = "2a3d7b2d-e41d-4dea-bc13-89a0f7e63472";
  var title = req.query.title;
  var amountY = req.query.amountY;
  console.log('title:' + title + ' amountY:' + amountY);

  var uuid = require('node-uuid');
  var outTradeNo = uuid.v4();
  outTradeNo = outTradeNo.replace(/-/g, '');

  var data = appid + title + amountY + outTradeNo + secret;
  var sign = require('crypto');
  var signStr = sign.createHash('md5').update(data, 'utf8').digest("hex");
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.render('index', { title: 'JSButton', OutTradeNo: outTradeNo, Sign: signStr});
  console.log('TradeNo:' + outTradeNo + ' sign:' + signStr);
  res.json({ title: 'JSButton', OutTradeNo: outTradeNo, Sign: signStr});

});

function uptoken(bucket){
  var putPolicy = new qiniu.rs.PutPolicy2({scope:bucket, callbackFetchKey: 0});
  return putPolicy.token();
}

app.get('/qn', function(req, res, next){
  qiniu.conf.ACCESS_KEY = 'saK17hWd8V8bzxQK73P_cZsz3t4e2CRvmIFGE9wg';
  qiniu.conf.SECRET_KEY = '3DVXwl6m0Q4F722c11XuaglbxMg5aGpG0UF38iZf';

  var bucket = 'anteroom';
  var token = uptoken(bucket);
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.json({token: token});

});

app.use(express.static('public'));

var server = app.listen(3050, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

