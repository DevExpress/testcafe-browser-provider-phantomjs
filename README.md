# testcafe-browser-provider-phantomjs
[![Build Status](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs.svg)](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs)

This is the [TestCafe](http://devexpress.github.io/testcafe) browser provider plugin for integration with [PhantomJS](http://phantomjs.org/).

## Install

```
npm install testcafe-browser-provider-phantomjs
```

## Usage

When you run tests from the command line, use the provider name when specifying the browsers:

```
testcafe phantomjs 'path/to/test/file.js'
```


When you use API, pass the provider name to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('phantomjs')
    .run();
```

## Author
Developer Express Inc. (https://devexpress.com)
