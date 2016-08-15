var expect      = require('chai').expect;
var proxyquire  = require('proxyquire');
var phantomMock = require('./phantom-mock');


var phantomProvider = proxyquire('../lib/index', { 'phantom': phantomMock });


describe('[API] API Tests', function () {
    it('Should not be a multibrowser provider', function () {
        expect(phantomProvider.isMultiBrowser).to.be.false;
    });

    it('Should create phantomjs instance on init', function () {
        return phantomProvider
            .init()
            .then(function () {
                expect(phantomMock.createCalled).to.be.true;
            });
    });

    it('Should open phantomjs page on openBrowser', function () {
        return phantomProvider
            .openBrowser('id-1', '', 'https://testcafe.devexpress.com')
            .then(function () {
                expect(phantomMock.createPageCalled).to.be.true;
                expect(phantomMock.page.url).to.equals('https://testcafe.devexpress.com');
            });
    });

    it('Should set page.viewportSize property on resize', function () {
        return phantomProvider
            .resizeWindow('id-1', {}, 123, 456)
            .then(function () {
                expect(phantomMock.page.viewportSize).to.deep.equals({ width: 123, height: 456 });
            });
    });

    it('Should call page.render() when taking screenshot', function () {
        return phantomProvider
            .takeScreenshot('id-1', {}, '/dev/null')
            .then(function () {
                expect(phantomMock.page.screenshotPath).to.equals('/dev/null');
            });
    });

    it('Should call page.close() on closeBrowser', function () {
        return phantomProvider
            .closeBrowser('id-1', {})
            .then(function () {
                expect(phantomMock.page.closeCalled).to.be.true;
            });
    });

    it('Should call exit() on dispose', function () {
        return phantomProvider
            .dispose()
            .then(function () {
                expect(phantomMock.exitCalled).to.be.true;
            });
    });
});
