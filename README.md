# minimal-immutable

Minimal api for immutable datastructures (maps) in javascript.

# Functions

```js
var MI = require('minimal-immutable');
```

## var i = MI.fromJS(js)

Create an immutable value from a mutable js object.

## var js = MI.toJS(i)

Create a mutable js object from an immutable value.

## var i1 = MI.assoc(i0, key, value)

Returns a new version of i0 with key associated to value.

## var i1 = MI.dissoc(i0, key)

Returns a new version of i0 with key dissociated.

## var value = MI.get(i, key)

Get the value associated with key.

## var tf = MI.equals(i0, i1)

Value not identity, equality.

## var iter = MI.toIterator(i)

Create an iterator for i. 

***iter.key*** the current key

***iter.value*** the current value

***iter.next()*** get the next iter, or undefined if it's the last one


# License

The MIT License (MIT)

Copyright (c) 2015 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
