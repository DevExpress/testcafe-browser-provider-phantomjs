# testcafe-browser-provider-phantomjs
[![Build Status](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs.svg)](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs)

This is the **phantomjs** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install -g testcafe-browser-provider-phantomjs
```

## Usage

When you run tests from the command line, use the provider name when specifying the browsers:

```
testcafe chrome,phantomjs 'path/to/test/file.js'
```


When you use API, pass the provider name to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome', 'phantomjs')
    .run();
```

## Author
Developer Express Inc. (https://devexpress.com)
