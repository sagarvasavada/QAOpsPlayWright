const {test, expect} =require("@playwright/test");

test("Popup Validation", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


    // BrowserAction (back, forward)

    // await page.goto("https://rahulshettyacademy.com/");
    // await page.goBack();
    // await page.goForward();


    // To show hide element handlling

    // await expect(page.locator("#displayed-text")).toBeVisible();
    // await page.locator("#hide-textbox").click();
    // await expect(page.locator("#displayed-text")).toBeHidden();

    // Handle JS popup
  
    // await page.on("dialog", dialog => dialog.accept());
    // await page.locator("#confirmbtn").click();
    // await page.on("dialog", dialog => dialog.dismiss());

    // Handle Hover

    await page.locator("#mousehover").hover();
    await page.getByText("Reload").click();

    // Handle iFrame 

    const framepage = await page.fr("#courses-iframe");
    await framepage.locator("li a[href*='lifetime-access']:Visible").click();
    const textcheck = await framepage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);




});