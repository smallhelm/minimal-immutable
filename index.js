var getKeys = Object.keys || require('object-keys');
var clone = require('clone');
var isObject = require('x-is-object');
var deepEqual = require('deep-equal');
var Immutable = require('seamless-immutable');

var mkIteratorByKeys = function(i, keys){
  if(keys.length === 0){
    return undefined;
  }
  return {
    key: keys[0],
    value: Immutable(i[keys[0]]),
    next: function(){
      keys.shift();
      return mkIteratorByKeys(i, keys);
    }
  };
};

module.exports = {
  fromJS: function(js){
    return Immutable(clone(js));
  },
  toJS: function(i){
    return clone(i);
  },
  assoc: function(i, key, value){
    key = String(key);
    var i2 = clone(i);

    if(!isObject(i2)){
      return undefined;
    }
    i2[key] = value;

    return Immutable(i2);
  },
  dissoc: function(i, key){
    key = String(key);
    var i2 = clone(i);

    if(!isObject(i2)){
      return undefined;
    }
    if(i2.hasOwnProperty(key)){
      delete i2[key];
    }

    return Immutable(i2);
  },
  get: function(i, key){
    key = String(key);
    if(!isObject(i)){
      return undefined;
    }
    return i[key];
  },
  equals: function(i0, i1){
    return !!deepEqual(i0, i1, {strict: true});
  },
  toIterator: function(i){
    return mkIteratorByKeys(i, getKeys(i));
  }
};
