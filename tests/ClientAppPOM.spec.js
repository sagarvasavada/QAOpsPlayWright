 const {test, expect} = require('@playwright/test');
 const {customtest} = require('../utils/test-base'); // custom feature file
 const {POManager} = require('../pageobjects/POManager');  // POmanager file
 //JSON-> string-> JS obj

//Drive data from external file (3 types)


 // 1. read Json data
 const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json"))); //dataset


 //2. Parameterised custom data

 for(const data of dataset)
 {
 test(`@Web Client App login ${data.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProduct(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });
}


//3. Custom feature data
  customtest.only(`@Web Clients App login`, async ({page, testDataForOrder})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProduct(testDataForOrder.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
 });




 

 



 

