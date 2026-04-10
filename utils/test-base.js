const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
   testDataForOrder: 
{

username : "sagar@pw1.com",
password : "Sagar@123",
productName : "ADIDAS ORIGINAL"
}
}
)       