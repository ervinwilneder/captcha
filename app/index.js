const launcher = require('./config/launcher');
const tools = require('./utils/tools');
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'XXXX' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)

// puppeteer usage as normal
puppeteer.launch(launcher.PUPPETEER_OPTIONS).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.bcra.gob.ar/BCRAyVos/Situacion_Crediticia.asp')

  // That's it, a single line of code to solve reCAPTCHAs 🎉
  await page.solveRecaptchas()

  await Promise.all([
    page.waitForNavigation(),
    page.$eval('input[name="CUIT"]', (el, value) => el.value = value, '20368233715'),
    page.click(`button[type="Submit"]`)
  ])

  await page.screenshot({ path: 'response.png', fullPage: true })
  await tools.delay(50000);
  await browser.close()
})