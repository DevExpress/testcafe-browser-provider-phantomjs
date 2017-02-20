# testcafe-browser-provider-phantomjs
[![Build Status](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs.svg)](https://travis-ci.org/DevExpress/testcafe-browser-provider-phantomjs)

This is the [TestCafe](http://devexpress.github.io/testcafe) browser provider plugin for integration with [PhantomJS](http://phantomjs.org/). Supports `node >= 0.12`.

**DEPRECATED** Due to the outdated WebKit and numerous issues in PhantomJS, it's highly recommended to use 
[testcafe-browser-provider-nightmare](https://www.npmjs.com/package/testcafe-browser-provider-nightmare) for headless browser testing.

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
