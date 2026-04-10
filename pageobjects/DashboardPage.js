class DashboardPage
{
    constructor(page)
    {
        this.producttitle = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='/cart']");
        this.myorder =  page.locator("button:has-text('ORDERS')")
    }

async searchProduct(productName)
{
    const title = await this.productText.allTextContents();
    console.log(title);
    

        const count = await this.producttitle.count();
        for (let i=0; i<count; ++i)
        {
          if(await this.producttitle.nth(i).locator("b").textContent() === productName)
          {
            await this.producttitle.nth(i).locator("text=  Add To Cart").click();
            break;
          }
        }
}

async navigateToCart()
{
     await this.cart.click();
}

async navigateToOrders()
{
     await this.myorder.click();
}
}
module.exports={DashboardPage};