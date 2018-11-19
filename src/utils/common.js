/**
 * Created by mel on 2017/5/19.
 */

module.exports = {
  inArray: inArray,
  clone: clone,
  distinct: distinct
}

function inArray(val , arr){
  for(var i in arr){
    if(arr[i] == val){
      return true;
    }
  }
  return false;
}

function clone(obj)
{
  var objClone;
  if (obj.constructor == Object ) objClone = new obj.constructor(); //判断构造器是否为Object，因为还可能是String、Boolean等
  else objClone = new obj.constructor(obj.valueOf());
  for ( var key in obj )
  {
    if ( objClone[key] != obj[key] )
    {
      if ( typeof(obj[key]) == 'object' )//如果是对象，就递归循环
      {
        objClone[key] = clone(obj[key]);
      }
      else
      {
        objClone[key] = obj[key];
      }
    }
  }
  objClone.toString = obj.toString;
  objClone.valueOf = obj.valueOf;
  return objClone;
}

function distinct(arr){
  var result = [], hash = {};
  for(var i = 0, elem; (elem = arr[i]) != null; i++){
    if(!hash[elem]){
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}
