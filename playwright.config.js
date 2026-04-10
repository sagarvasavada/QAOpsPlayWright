// @ts-check
  import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries : 1,
 timeout: 30*1000,
 expect:{
  timeout: 5000,
 },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects :
  [
    {
    name : 'Chrome',
    use: {
          browserName : "chromium",
          headless : false,
          screenshot: 'on',
          trace: 'on',
         // ...devices['iPhone 15 Pro Max']
          //viewport : {width : 720, height:720}
         // ignoreHTTPSErrors:true,
         // permissions:['geolocaton']
    }
    },
  {
    name: "Firefox",
    use:{
        browserName : "chromium",
          headless : true,
          screenshot: 'on',
          trace: 'on',
  }
  }
  ]
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  

});

module.exports = config
