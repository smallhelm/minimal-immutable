var MI = require('./index');
var test = require('tape');
var clone = require('clone');

test("fromJS", function(t){
  var o = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};
  var o_orig = clone(o);

  var i = MI.fromJS(o);
  o.a = 3;

  t.deepEqual(MI.toJS(i), o_orig);
  t.notDeepEqual(o_orig, o);
  t.notDeepEqual(MI.toJS(i), o);
  t.end();
});

test("toJS", function(t){
  var i = MI.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});

  var m = MI.toJS(i);
  delete m.c;
  m.a = 2;
  m.d.e.g = 5;

  t.deepEqual(m, {a: 2, b: 2, d: {e: {f: 4, g: 5}}});
  t.deepEqual(MI.toJS(i), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.end();
});

test("assoc", function(t){
  var i0 = MI.fromJS({a: 1, b: 2});
  var i1 = MI.assoc(i0, 'c', 3);
  var i2 = MI.assoc(i1, 'c', 4);
  var i3 = MI.assoc(i2, 'd', MI.fromJS({e: {f: 5}}));

  t.deepEqual(MI.toJS(i0), {a: 1, b: 2});
  t.deepEqual(MI.toJS(i1), {a: 1, b: 2, c: 3});
  t.deepEqual(MI.toJS(i2), {a: 1, b: 2, c: 4});
  t.deepEqual(MI.toJS(i3), {a: 1, b: 2, c: 4, d: {e: {f: 5}}});
  t.equal(MI.assoc('a', 4), undefined);
  t.end();
});

test("dissoc", function(t){
  var i0 = MI.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var i1 = MI.dissoc(i0, 'c');
  var i2 = MI.dissoc(i0, 'd');
  var i3 = MI.dissoc(i0, 'z');

  t.deepEqual(MI.toJS(i0), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.deepEqual(MI.toJS(i1), {a: 1, b: 2,       d: {e: {f: 4}}});
  t.deepEqual(MI.toJS(i2), {a: 1, b: 2, c: 3                });
  t.deepEqual(MI.toJS(i3), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.equal(MI.dissoc(4, 'a'), undefined);
  t.end();
});

test("get", function(t){
  var i = MI.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var g1 = MI.get(i, 'a');
  var g2 = MI.get(MI.get(i, 'd'), 'e');

  t.deepEqual(MI.toJS(i), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.deepEqual(MI.toJS(g1), 1);
  t.deepEqual(MI.toJS(g2), {f: 4});
  t.end();
});

test("equals", function(t){
  var o0 = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};
  var o1 = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};

  var i0 = MI.fromJS(o0);
  var i1 = MI.fromJS(o1);
  o1.a = '3';
  var i2 = MI.fromJS(o1);


  t.ok(o0 !== o1, 'two different identites');
  t.equal(MI.equals(i0, i1), true);
  t.equal(MI.equals(i0, MI.fromJS(o0)), true);
  t.equal(MI.equals(i1, MI.fromJS(o0)), true);
  t.equal(MI.equals(i2, MI.fromJS(o1)), true);
  t.equal(MI.equals(i0, i2), false);
  t.equal(MI.equals(i1, i2), false);
  t.equal(MI.equals(MI.fromJS(o0), MI.fromJS(o1)), false);

  t.end();
});

test("toIterator", function(t){
  var i = MI.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var iter = MI.toIterator(i);

  var assertKeyVal = function(iter, key, val){
    t.deepEqual(iter.key, key);
    t.equal(MI.equals(iter.value, MI.fromJS(val)), true);
  };

  assertKeyVal(iter, 'a', 1);
  iter = iter.next();
  assertKeyVal(iter, 'b', 2);
  iter = iter.next();
  assertKeyVal(iter, 'c', 3);
  iter = iter.next();
  assertKeyVal(iter, 'd', {e: {f: 4}});
  iter = iter.next();
  t.equal(iter, undefined);

  t.end();
});
