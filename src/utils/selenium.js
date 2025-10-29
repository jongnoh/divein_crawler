const { chrome }    = require('selenium-webdriver/chrome');

let options = new chrome.Options();
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--no-sandbox');
    options.addArguments('--headless'); // Uncomment this line to run in headless mode
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-dev-shm-usage');

module.exports = options;