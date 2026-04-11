const { test, expect } = require('@playwright/test');
const { count } = require('node:console');
const { text } = require('node:stream/consumers');




test('Booking Event test', async ({ page }) => {
    const email = 'sagarv@test.com';
    const password = "Sagar@123";
    const loginbtn = ("#login-btn");
    const eventitle = `Test Event ${Date.now()} by SV`;
    const eventdesc = "This is test event for playwright for practise by SV";
    const city = "ahmedabad";
    const venue = "Modi statdium"
    const ticketcount = ("#ticket-count");
    const price = "100";
    const seat = "5";
    const addeventbtn = ("#add-event-btn");

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("password").fill(password);
    await page.locator(loginbtn).click();

    await expect(page.getByText("Browse Events →")).toBeVisible();

    // create new event

    await page.getByText("Admin").click();
    await page.getByRole("link", { name: "Manage Events" }).last().click();
    await page.locator("#event-title-input").fill(eventitle);
    await page.getByPlaceholder("Describe the event…").fill(eventdesc);
    await page.getByLabel("city").fill(city);
    await page.getByLabel("venue").fill(venue);
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    await page.getByLabel("price ($)").fill(price);
    await page.getByLabel("total seats").fill(seat);
    await page.locator(addeventbtn).click();
    console.log(`Created event: "${eventitle}"`);
    await expect(page.getByText("Event created!")).toBeVisible();

    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    const eventcard = page.getByTestId("event-card");
    await expect(eventcard.first()).toBeVisible();
    const targetevent = eventcard.filter({ hasText: eventitle }).first();
    await expect(targetevent).toBeVisible({ timeout: 5000 });
    const seatbooking = parseInt(await targetevent.getByText("seat").first().innerText());
    console.log(`Seats before booking: ${seatbooking}`);

    await targetevent.getByTestId('book-now-btn').click();

    const ticketCount = page.locator('#ticket count');
    // await expect(ticketCount).toHaveText('1');

    // Located by label
    await page.getByLabel('Full Name').fill('Test Student');

    // Located by id
    await page.locator('#customer-email').fill('test.student@example.com');

    // Located by placeholder
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

    // Located by CSS class
    await page.locator('.confirm-booking-btn').click();

    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();

    const bookingRef = (await bookingRefEl.innerText()).trim();
    expect(bookingRef.charAt(0)).toBe(eventitle.trim().charAt(0).toUpperCase());

    console.log(`Booking confirmed. Ref: ${bookingRef}`);


    await page.locator("#nav-bookings").click();

    const bookingcard = page.locator("#booking-card");
    await expect(bookingcard.first()).toBeVisible();

    const matchingCard = bookingcard.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
    await expect(matchingCard).toBeVisible();

    await expect(matchingCard).toContainText(eventitle);

    console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

    await page.locator("#nav-events").click();
    await expect(eventcard.first()).toBeVisible();

    // Find the same event by title
    const updatedCard = eventcard.filter({ hasText: eventitle }).first();
    await expect(updatedCard).toBeVisible();

    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);

    // Booked 1 ticket — count must drop by exactly 1
    expect(seatsAfterBooking).toBe(seatbooking - 1);



});

