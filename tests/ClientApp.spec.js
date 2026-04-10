const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');




test('@Web Login testcase Playwright test', async ({ page }) => 
{
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

    await useremail.fill(email);
    await userPassword.fill(password);
    await register.click();
    await producttitle.first().waitFor();
    //await page.waitForLoadState('networkidle'); // wait till all network call completed then take action
   //console.log(await producttitle.first().textContent()); // go get first text and then perform all text
    console.log(await producttitle.allTextContents());

    // End to end case 

    const count = await producttitle.count();
    for (let i=0; i<count; ++i)
    {
      if(await producttitle.nth(i).locator("b").textContent() === productName)
      {
        await producttitle.nth(i).locator("text=  Add To Cart").click();
        break;
      }
    }
    

    //cart 
    await page.locator("[routerlink*='/cart']").click();
    await page.locator("div li").first().waitFor();  // so wait before next line
    const cartproduct = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // no wait for this method 
    expect(bool).toBeTruthy();

    //checkout button
    await page.locator("text=Checkout").click();

    //checkout page

    //fill personal info
    await page.locator("input.input.txt").nth(1).fill("777");
    await page.locator("input.input.txt").nth(2).fill("sagar vasavada");
    await page.locator("input.input.txt").nth(3).fill("playwright007");

    //handle Autosuggest dropdown

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const Autosuggestdropdown = page.locator(".ta-results");
    await Autosuggestdropdown.waitFor();
    const optioncount = await Autosuggestdropdown.locator("button").count();
    for (let i=0; i<optioncount; ++i)
    {
       const text = await Autosuggestdropdown.locator("button").nth(i).textContent();
        if(text == " India")
        {
            await Autosuggestdropdown.locator("button").nth(i).click();
            break;
        }
    }

    //Asersion to validate email id
        await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
        await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderid);

        //orderstab
        await page.locator("button:has-text('ORDERS')").click();

        await page.locator("tbody").waitFor();

        const orderrows= page.locator("tbody tr");

        //const orderlist = await page.locator(orderresult).count();
        for(let i=0; i< await orderrows.count(); ++i)
        {
            const orderno = await  orderrows.nth(i).locator("th").textContent();
            if(orderid.includes(orderno))
            {
                await orderrows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderdetailid = await page.locator(".col-text").textContent();
        expect(orderid.includes(orderdetailid)).toBeTruthy();

        const pname = await page.locator(".title").textContent();
        expect(pname.trim()).toBe(productName);








    //await page.pause();
    


});




