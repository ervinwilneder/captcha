const fs = require('fs');

// Delay function replacing waitFor() deprecated puppeteer function
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}
async function waitForFile(path, timeout) {
    let totalTime = 0; 
    let checkTime = timeout / 10;

    return await new Promise((resolve, reject) => {
        const timer = setInterval(function() {

            totalTime += checkTime;
            let fileExists = fs.existsSync(path);
    
            if (fileExists || totalTime >= timeout) {
                clearInterval(timer);
                resolve(fileExists);
            }
        }, checkTime);
    });
}

module.exports = {
    delay,
    waitForFile
};