const { test, expect, request } = require("@playwright/test");
const loginPayLoad = { userEmail: "sagar@pw1.com", userPassword: "Sagar@123" };
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;


test.beforeAll(async () => {

    //login API

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

        {
            data: loginPayLoad
        })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //Order API

   const orderRespoanse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayLoad,
        headers : {
                        'Authorization' : token,
                        'Content-Type'  : 'Application/json'
                  },
    })

    const orderresjson = await orderRespoanse.json();
    console.log(orderresjson);
    orderId =  orderresjson.orders[0];

});



test('@API Login testcase Playwright test', async ({ page }) => {

    //bypass the login to add token
    

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // url must write after the token add
    await page.goto("https://rahulshettyacademy.com/client/");


    // variables 

    const email = "sagar@pw1.com";
    const password = "Sagar@123";
    const useremail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const register = page.locator("#login");
  

    //orderstab
    await page.locator("button:has-text('ORDERS')").click();

    await page.locator("tbody").waitFor();

    const orderrows = page.locator("tbody tr");

    //const orderlist = await page.locator(orderresult).count();
    for (let i = 0; i < await orderrows.count(); ++i) {
        const orderno = await orderrows.nth(i).locator("th").textContent();
        if (orderId.includes(orderno)) {
            await orderrows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderdetailid = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderdetailid)).toBeTruthy();

    const pname = await page.locator(".title").textContent();
   // expect(pname.trim()).toBe(productName);


});




