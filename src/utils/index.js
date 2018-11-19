import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import {color} from './theme'
import common from './common'
// require('./mock.js')

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 占位符
String.prototype.format = function(){
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
    function(m, i){
      return args[i];
    });
}

String.prototype.trim = function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}

String.prototype.startWith=function(str){
  var reg=new RegExp("^"+str);
  return reg.test(this);
}
String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}
String.prototype.parsePath = function (){
  if(this.startWith('/m/')){
    return this.substring('/m'.length);
  }
  return this;
}
/**
 * 从path路径中获取参数
 * @param index 在path中的位置,从1开始,如: /order/product/xxx xxx位置为3
 */
String.prototype.getVarFromPath = function(index){
  var str = this.slice(1);
  if(str.indexOf("?") >= 0){
    str = str.slice(0, str.indexOf('?'));
  }
  if(str.indexOf('#') >= 0){
    str = str.slice(0, str.indexOf('#'));
  }
  var arr = str.split('/');
  if(arr.length < index){
    return '';
  }else{
    return arr[index - 1];
  }

}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

Number.prototype.formatCurrency = function() {
  var num = this.toString().replace(/\$|\,/g,'');
  if(isNaN(num))
    num = "0";
  var sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  var cents = num%100;
  num = Math.floor(num/100).toString();
  if(cents<10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
      num.substring(num.length-(4*i+3));
  return (((sign)?'':'-') + num + '.' + cents);
}

// 定义一个判断函数
var in_array = function(arr){
// 判断参数是不是数组
//   var isArr = arr && console.log(
//       typeof arr==='object' ? arr.constructor===Array ? arr.length ? arr.length===1 ? arr[0]:arr.join(','):'an empty array': arr.constructor: typeof arr
//     );
  var isArr = arr && (typeof arr==='object' ? arr.constructor === Array : false);
  // 不是数组则抛出异常
  if(!isArr){
    throw "arguments is not Array";
  }
// 遍历是否在数组中
  for(var i=0,k=arr.length;i<k;i++){
    if(this==arr[i]){
      return true;
    }
  }
// 如果不在数组中就会返回false
  return false;
}

String.prototype.in_array = in_array;
Number.prototype.in_array = in_array;

Image.prototype.getImgNaturalDimensions = function(img, callback) {
  var nWidth, nHeight
  if (img.naturalWidth) { // 现代浏览器
    nWidth = img.naturalWidth
    nHeight = img.naturalHeight
  } else { // IE6/7/8
    var image = new Image()
    image.src = img.src
    image.onload = function() {
      callback(image.width, image.height)
    }
  }
  return [nWidth, nHeight]
}


module.exports = {
  config,
  common,
  menu,
  request,
  color,
  classnames
}
