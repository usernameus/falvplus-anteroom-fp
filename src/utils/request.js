import {apisource, billtoken} from './config';
const Ajax = require('robe-ajax')
const Cookie = require('js-cookie')

export default function request (url, options, failcallback, donecallback) {

  if (options.cross) {
    console.log('cross:' + url)
    return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
      q: "select * from json where url='" + url + '?' + Ajax.param(options.data) + "'",
      format: 'json'
    })
  } else {
    // console.log('call:' + url)
    var processData = true;
    if(url.startWith(apisource + '/api')){
      processData = (options.method.toLowerCase() === 'get');
    }

    var settings = {
      url:url,
      method: options.method || 'get',
      data: options.method != 'get' ? JSON.stringify(options.data) : (options.data || {}),
      contentType: options.contentType || 'application/json;charset=utf-8',
      processData: processData,
      crossDomain: true,
      dataType: 'JSON'
    };

    if(!url.startWith(billtoken)){
      // let token = localStorage.getItem('token');
      // if(token == undefined){
      let token = Cookie.get('token');
      let expires = Cookie.get('expires');
      // }
      if(token !== undefined && expires != undefined && new Date(expires) >= new Date()){
        settings = {
          ...settings,
          xhrFields:{
            withCredentials:token
          },
          headers: {
            'Authorization': `Bearer ` + token
          }
        }
      }
    }

    return Ajax.ajax(settings).done((data) => {
      if(donecallback && typeof donecallback === 'function'){
        donecallback(data);
      }
      return data
    }).fail((result)=>{
      if(result.readyState == 4 && result.status == 200){
        // 正常返回
        return result.responseText;
      }
      if(failcallback && typeof failcallback === 'function'){
        failcallback(result);
      }else{
        console.error(result);
      }
      return result;
    })
  }
}
