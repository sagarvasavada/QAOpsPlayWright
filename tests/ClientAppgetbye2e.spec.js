const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');




test('Login testcase Playwright test', async ({ page }) => {
    //registeration form with new user

    //await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    /*const email = `sagar${Date.now()}@pw.com`;
    const newpas = "Sagar@123";
    const firstname = page.locator("#firstName");
    const lastname = page.locator("#lastName");
    const Email = page.locator("#userEmail");
    const mobileno = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmpassword = page.locator("#confirmPassword");
    const register = page.locator("#login");
    const loginpage = page.locator("button:has-text('Login')");
    await firstname.fill("sagar");
    await lastname.fill("vasavada");
    await Email.fill(email);
    await mobileno.fill("9737727676");
    await page.locator("[formcontrolname='occupation']").selectOption("3: Engineer");
    await page.locator("//input[@value='Male']").check();
    await expect (page.locator("//input[@value='Male']")).toBeChecked(); // assertation 
    await password.fill(newpas);
    await confirmpassword.fill(newpas);
    await page.locator("input[type='checkbox']").check();
    await register.click();
    await loginpage.click();
    await Email.fill(email);
    await password.fill(newpas);
    await register.click();*/



    //login with same user
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "sagar@pw1.com";
    const password = "Sagar@123";
    const useremail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const register = page.locator("#login");

    console.log(await page.title());
    const productName = 'ZARA COAT 3';
    //const loginbtn = page.locator("#login");
    const producttitle = page.locator(".card-body");

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", { name: "login" }).click();
    await producttitle.first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();



    //checkout button
    await page.getByRole("button", { name: "Checkout" }).click();

    //checkout page

    //fill personal info
    // await page.getByTitle("CVV Code ").nth(1).fill("777");
    // await page.getByTitle("Name on Card ").nth(2).fill("sagar vasavada");
    // await page.getByTitle("Apply Coupon ").nth(3).fill("playwright007");

    //handle Autosuggest dropdown

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    //orderstab
    await page.getByText("Place Order ").click();

    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();

   








    //await page.pause();



});




