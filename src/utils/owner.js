/**
 * Created by mel on 2017/2/25.
 */
import config from './config';
import {parse} from 'qs';

export default function ownerFromUrl(){
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const query = window.location.search.slice(1);
  return hostname;
  // 不再获取子域名
  // let subdomain = "";
  // if(hostname != 'localhost'
  //   && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)
  //   && /([^\.]+)+\.[^\.]+\.[^\.]+$/.test(hostname)
  // ){
  //   subdomain = hostname.slice(0, hostname.indexOf('\.')) ;
  // }
  // if(config.subdomain && subdomain != ""){
  //   return subdomain;
  // }else{
  //   if(parse(query)['owner']){
  //     return parse(query)['owner'];
  //   }else{
  //     if(config.subfolder && pathname.replace(/\//g, '').length > 0){
  //       return pathname.slice(1).slice(0,pathname.slice(1).indexOf('/'));
  //     }else{
  //       return "";
  //     }
  //   }
  // }

}
