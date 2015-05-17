var getKeys = Object.keys || require('object-keys');
var clone = require('clone');
var isObject = require('x-is-object');
var deepEqual = require('deep-equal');

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
  assoc: function(i, key, value){
    var i2 = clone(i);

    if(!isObject(i2)){
      return undefined;
    }
    i2[key] = value;

    return i2;
  },
  dissoc: function(i, key){
    var i2 = clone(i);

    if(!isObject(i2)){
      return undefined;
    }
    if(i2.hasOwnProperty(key)){
      delete i2[key];
    }

    return i2;
  },
  get: function(i, key){
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
