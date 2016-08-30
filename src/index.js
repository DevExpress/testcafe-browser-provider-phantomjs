import { create as createPhantom } from 'phantom';

export default {
    phantom: null,

    openedPages: {},

    isMultiBrowser: false,

    async openBrowser (id, pageUrl) {
        var page = await this.phantom.createPage();

        await page.open(pageUrl);

        this.openedPages[id] = page;
    },

    async closeBrowser (id) {
        var page = this.openedPages[id];

        delete this.openedPages[id];

        await page.close();
    },

    async init () {
        this.phantom = await createPhantom();
    },

    async dispose () {
        await this.phantom.exit();

        this.phantom = null;
    },

    async resizeWindow (id, width, height) {
        var page = this.openedPages[id];

        await page.property('viewportSize', { width, height });
    },

    async takeScreenshot (id, screenshotPath) {
        var page = this.openedPages[id];

        await page.render(screenshotPath);
    }
};
