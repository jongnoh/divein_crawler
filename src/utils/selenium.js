const chrome = require('selenium-webdriver/chrome');

class Option {
    constructor() {
    this.options = new chrome.Options();
    this.options.addArguments('--window-size=1920,1080');
    this.options.addArguments('--no-sandbox');
    // this.options.addArguments('--headless'); // Uncomment this line to run in headless mode
    // this.options.addArguments('--disable-gpu');
    // this.options.addArguments('--disable-dev-shm-usage');
    }

}

module.exports = Option;