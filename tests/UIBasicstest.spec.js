const { test, expect } = require('@playwright/test');
const { log } = require('node:console');
const { request } = require('node:http');

test.only('browser context Playwright test', async ({ browser }) => {
    //chrome - Plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.{jpg,jpeg,png}', route => route.abort()); // to disable css or image to faster excution
    const username = page.locator('#username');
    const signup = page.locator("#signInBtn");
    const cardtitles = page.locator(".card-body a");
    page.on('request', request => console.log(request.url())); // request to print
    page.on('response', response => console.log(response.status(), response.url())); // url and status code print 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signup.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('correct');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signup.click();
    console.log(await cardtitles.first(1).textContent());
    console.log(await cardtitles.allTextContents());

});

test('Login testcase Playwright test', async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    console.log(await page.title());
    const firstname = page.locator("#firstName");
    const lastname = page.locator("#lastName");
    const Email = page.locator("#userEmail");
    const mobileno = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmpassword = page.locator("#confirmPassword");
    const register = page.locator("#login");
    const loginpage = page.locator("button:has-text('Login')");
    //const loginbtn = page.locator("#login");
    const producttitle = page.locator(".card-body");

    await firstname.fill("sagar");
    await lastname.fill("vasavada");
    await Email.fill("sagarv@pw9.com");
    await mobileno.fill("9737727676");
    await page.locator("[formcontrolname='occupation']").selectOption("3: Engineer");
    await page.locator("//input[@value='Male']").check();
    await expect (page.locator("//input[@value='Male']")).toBeChecked(); // assertation 
    await password.fill("Sagar@123");
    await confirmpassword.fill("Sagar@123");
    await page.locator("input[type='checkbox']").check();
    await register.click();
    await loginpage.click();
    await Email.fill("sagarv@pw7.com");
    await password.fill("Sagar@123");
    await register.click();
    await producttitle.first().waitFor();
    //await page.waitForLoadState('networkidle');
   //console.log(await producttitle.first().textContent());
    console.log(await producttitle.allTextContents());




});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })














test('page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});



