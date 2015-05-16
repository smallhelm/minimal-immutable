var getKeys = Object.keys || require('object-keys');
var clone = require('clone');
var isArray = require('x-is-array');
var isObject = require('x-is-object');
var deepEqual = require('deep-equal');

var toPath = function(key_or_path){
  if(!isArray(key_or_path)){
    key_or_path = [key_or_path];
  }
  return key_or_path;
};

var navTo = function(i, path, createIfNotFound){
  var j, key, curr, prev_key;
  for(j=0; j<path.length; j++){
    key = path[j];
    if(j === 0){
      curr = i;
    }else{
      curr = curr[prev_key];
    }
    if(!isObject(curr)){
      return undefined;
    }
    if(!curr.hasOwnProperty(key)){
      if(createIfNotFound){
        curr[key] = {};
      }else{
        return undefined;
      }
    }
    prev_key = key;
  }
  return [curr, key];
};

var mkIteratorByKeys = function(i, keys){
  if(keys.length === 0){
    return undefined;
  }
  return {
    first: [keys[0], i[keys[0]]],
    next: function(){
      keys.shift();
      return mkIteratorByKeys(i, keys);
    }
  };
};

module.exports = {
  fromJS: function(js){
    return clone(js);
  },
  toJS: function(i){
    return clone(i);
  },
  assoc: function(i, key_or_path, value){
    var i2 = clone(i);
    var path = toPath(key_or_path);

    var nav = navTo(i2, path, true);
    if(!nav){
      return undefined;//must have a bad path
    }
    nav[0][nav[1]] = value;
    return i2;
  },
  dissoc: function(i, key_or_path){
    var i2 = clone(i);
    var path = toPath(key_or_path);

    var nav = navTo(i2, path, false);
    if(!nav){
      return i2;//bad path, so we don't care b/c whatever it was, it's gone now
    }
    delete nav[0][nav[1]];
    return i2;
  },
  get: function(i, key_or_path){
    var path = toPath(key_or_path);
    var nav = navTo(i, path, false);
    return nav ? nav[0][nav[1]] : undefined;
  },
  equals: function(i0 /* i1, i2 ... */){
    var i_of_n, n;
    for(n=1; n<arguments.length; n++){
      i_of_n = arguments[n];
      if(!deepEqual(i0, i_of_n, {strict: true})){
        return false;
      }
    }
    return true;
  },
  toIterator: function(i){
    return mkIteratorByKeys(i, getKeys(i));
  }
};
