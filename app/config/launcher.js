const homedir = require('os').homedir();
require('dotenv').config();

module.exports = {
    PUPPETEER_OPTIONS : {
        "product": "chrome",
        "headless": false,
        "defaultViewport": null,
        "executablePath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "userDataDir": `${homedir}\\AppData\\Local\\Google\\Chrome\\User Data`,
        "args": [
            `--profile-directory=Profile ${process.env.PUPPETEER_PROFILE}`,
            "--enable-features=NetworkService",
            "--no-sandbox"
        ],
        "ignoreHTTPSErrors": true
    }
};