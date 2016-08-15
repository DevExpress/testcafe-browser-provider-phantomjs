var phantomPage = {
    url:            '',
    viewportSize:   {},
    screenshotPath: '',
    closeCalled:    false,

    open: function (url) {
        return new Promise(function (resolve) {
            phantomPage.url = url;

            resolve();
        });
    },

    property: function (prop, value) {
        return new Promise(function (resolve) {
            if (prop === 'viewportSize') {
                phantomPage.viewportSize.width  = value.width;
                phantomPage.viewportSize.height = value.height;
            }

            resolve();
        });
    },

    render: function (path) {
        return new Promise(function (resolve) {
            phantomPage.screenshotPath = path;

            resolve();
        });
    },

    close: function () {
        return new Promise(function (resolve) {
            phantomPage.closeCalled = true;

            resolve();
        });
    }
};

var phantomMock = {
    createCalled:     false,
    createPageCalled: false,
    exitCalled:       false,

    page: phantomPage,

    create: function () {
        return new Promise(function (resolve) {
            phantomMock.createCalled = true;

            resolve(phantomMock);
        });
    },

    createPage: function () {
        return new Promise(function (resolve) {
            phantomMock.createPageCalled = true;

            resolve(phantomMock.page);
        });
    },

    exit: function () {
        return new Promise(function (resolve) {
            phantomMock.exitCalled = true;

            resolve();
        });
    }
};

module.exports = phantomMock;
