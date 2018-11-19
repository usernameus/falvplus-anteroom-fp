module.exports = {
  name: 'Falvplus',
  prefix: 'falvplus',
  footerText: '技术支持 法仆网 © 2017',
  logoSrc: 'https://theme.lj110.com/default/Logo/biaoqianlogo.png',
  logoText: '专属会客室',
  ExpirationDate:'您的网站已过期！',
  ExpirationDateText:func,
  subdomain: true,
  subfolder: false,
  needLogin: true,
  qntoken: 'https://www.falvplus.com/sectoken/qn',
  bcAppId: isDev() ? 'e58642be-7b48-42b5-91bf-9a4f612ec58d' : 'f59fee6e-4dce-4a5c-99c8-8f829763a583',
  billtoken: isDev() ? 'https://www.falvplus.com/sectoken/bill' : 'https://www.falvplus.com/sectoken/antbill',
  uploadaction: location.protocol == 'https:' ? 'https://upload.qbox.me' :  'http://upload.qiniu.com',
  downdomain: '//fpimg.lj110.com/',
  // wsUris: 'wss://fapu.f3322.net:8109/room',
  // wsUris: 'wss://falvplus.tpddns.cn/room',
  wsUris: getWssUri(),
  // hosturl: 'https://falvplus.tpddns.cn:8000/',
  // hosturl: 'https://fapu.f3322.net:8109/',
  uploadurl: getRoomHost() + '/uploadfile', //https://falvplus.tpddns.cn:8443/uploadfile',
  // uploadurl: 'https://localhost:8443/uploadfile',
  filetypeview: ['doc','docx','pdf','xls','xlsx','png','jpg','bmp','jpeg','png','gif','ppt','pptx'],
  roomhost: getRoomHost(),
  apisource: getApiSource(),
  ueditorbase: getUeditorBase(),
  ueditorconfig: getUeditorBase() + 'ueditor.config.js',
  ueditorall: getUeditorBase() + 'ueditor.all.min.js',
  avatarcolors: ['#006e54','#00a381','#38b48b','#00a497','#80aba9','#5c9291','#478384','#43676b','#80989b',
    '#2c4f54','#1f3134','#19448e','#164a84','#165e83','#274a78','#2a4073','#223a70','#192f60','#1c305c',
    '#0f2350','#17184b','#0d0015','#bbc8e6','#bbbcde','#8491c3','#8491c3','#4d5aaf','#4d5aaf','#4a488e',
    '#4d4398','#5654a2','#706caa','#68699b','#7058a3','#92b5a9','#7ebea5','#7ebeab','#028760','#3b7960',
    '#2f5d50'],

}
function getUeditorBase(){
  // return  'https://www.la4u.cn/ueditor/';
  return getApiSource() + '/js/ueditor/';
}
function getWssUri(){
  return 'wss://' + location.hostname + '/room';
  // return 'wss://www.la4u.cn/room'
}
function func(str){
  return '您的网站还有不到三十天到期，有效期到' + str;
}
function getRoomHost(){
  return location.protocol + '//' + location.hostname + '/roomctl';
  // return 'https://www.la4u.cn/roomctl';
}
function getApiSource(){
  return location.protocol + '//' + location.hostname + '/roomctl';
  // return 'https://www.la4u.cn/roomctl';
}

function isDev(){
  // 测试环境配置为 true, 发布时改为 false
  return true;
}
