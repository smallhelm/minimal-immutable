var m = require('./index');
var test = require('tape');
var clone = require('clone');

test("fromJS", function(t){
  var o = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};
  var o_orig = clone(o);

  var i = m.fromJS(o);
  o.a = 3;

  t.deepEqual(m.toJS(i), o_orig);
  t.notDeepEqual(o_orig, o);
  t.notDeepEqual(m.toJS(i), o);
  t.end();
});

test("toJS", function(t){
  var i = m.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});

  var o = m.toJS(i);
  delete o.c;
  o.a = 2;
  o.d.e.g = 5;

  t.deepEqual(o, {a: 2, b: 2, d: {e: {f: 4, g: 5}}});
  t.deepEqual(m.toJS(i), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.end();
});

test("assoc", function(t){
  var i0 = m.fromJS({a: 1, b: 2});
  var i1 = m.assoc(i0, 'c', 3);
  var i2 = m.assoc(i1, 'c', 4);
  var i3 = m.assoc(i2, 'd', m.fromJS({e: {f: 5}}));

  t.deepEqual(m.toJS(i0), {a: 1, b: 2});
  t.deepEqual(m.toJS(i1), {a: 1, b: 2, c: 3});
  t.deepEqual(m.toJS(i2), {a: 1, b: 2, c: 4});
  t.deepEqual(m.toJS(i3), {a: 1, b: 2, c: 4, d: {e: {f: 5}}});
  t.equal(m.assoc('a', 4), undefined);
  t.end();
});

test("dissoc", function(t){
  var i0 = m.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var i1 = m.dissoc(i0, 'c');
  var i2 = m.dissoc(i0, 'd');
  var i3 = m.dissoc(i0, 'z');

  t.deepEqual(m.toJS(i0), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.deepEqual(m.toJS(i1), {a: 1, b: 2,       d: {e: {f: 4}}});
  t.deepEqual(m.toJS(i2), {a: 1, b: 2, c: 3                });
  t.deepEqual(m.toJS(i3), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.equal(m.dissoc(4, 'a'), undefined);
  t.end();
});

test("get", function(t){
  var i = m.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var g1 = m.get(i, 'a');
  var g2 = m.get(m.get(i, 'd'), 'e');

  t.deepEqual(m.toJS(i), {a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  t.deepEqual(m.toJS(g1), 1);
  t.deepEqual(m.toJS(g2), {f: 4});
  t.end();
});

test("equals", function(t){
  var o0 = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};
  var o1 = {a: 1, b: 2, c: 3, d: {e: {f: 4}}};

  var i0 = m.fromJS(o0);
  var i1 = m.fromJS(o1);
  o1.a = '3';
  var i2 = m.fromJS(o1);


  t.ok(o0 !== o1, 'two different identites');
  t.equal(m.equals(i0, i1), true);
  t.equal(m.equals(i0, m.fromJS(o0)), true);
  t.equal(m.equals(i1, m.fromJS(o0)), true);
  t.equal(m.equals(i2, m.fromJS(o1)), true);
  t.equal(m.equals(i0, i2), false);
  t.equal(m.equals(i1, i2), false);
  t.equal(m.equals(m.fromJS(o0), m.fromJS(o1)), false);

  t.end();
});

test("toIterator", function(t){
  var i = m.fromJS({a: 1, b: 2, c: 3, d: {e: {f: 4}}});
  var iter = m.toIterator(i);

  var assertKeyVal = function(iter, key, val){
    t.deepEqual(iter.key, key);
    t.equal(m.equals(iter.value, m.fromJS(val)), true);
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
