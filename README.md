# Relaxa Cash on Delivery Funnel

A Next.js + Tailwind CSS sales funnel for the Relaxa Heated Back & Neck Massager. It includes a product landing page, checkout, thank-you page, Google Sheets order storage, and Gmail SMTP notifications.

## Recommended stack and order flow

- **Next.js App Router** delivers the storefront and the server-only `POST /api/order` endpoint.
- **Tailwind CSS** provides the responsive visual design.
- The landing page sends selected quantity and offer price to checkout in the URL. Checkout calculates the delivery fee (free inside Kathmandu Valley; Rs. 150 outside) and posts the customer data to the API.
- The API validates values again, creates an Order ID, appends it to Google Sheets, then sends the business and customer HTML emails. It only responds with success once all those steps complete.
- Google Sheets uses a service account with the Google Sheets API. Nodemailer uses Gmail SMTP (normally a Gmail App Password), so no private credential is exposed in browser code.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`. The site will display before credentials are set, but submitting an order requires the environment variables below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in every value. `EMAIL_SERVICE_API_KEY` is reserved for switching to an API email provider later; the included implementation uses SMTP.

For Gmail SMTP, set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER` to the Gmail account, and `SMTP_PASS` to a [Google App Password](https://myaccount.google.com/apppasswords), not your usual Gmail password. Use the same Gmail address in `EMAIL_FROM` unless you have an authorized sending identity.

## Google Spreadsheet setup

1. Create a Google Spreadsheet and optionally rename its first tab to `sheet` (or set `GOOGLE_SHEET_TAB_NAME` to the tab's actual name).
2. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit` and set it as `GOOGLE_SHEET_ID`.
3. In Google Cloud, create a service account, enable the **Google Sheets API**, and create a JSON key. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` to `client_email` and `GOOGLE_PRIVATE_KEY` to `private_key`. Keep the quote marks; escaped `\n` characters are handled automatically.
4. Share the spreadsheet with the service account email as an **Editor**.
5. The API writes the header row automatically if the tab is blank. The columns are: Order ID, Date & Time, Customer Name, Phone Number, Email Address, Exact Location, Product Name, Quantity, Price Per Piece, Total Price, Payment Method, Order Status, Notes.
6. In Sheets, select the header row and choose **Data → Create a filter**. For order status, select the `Order Status` column and choose **Data → Data validation → Dropdown**, then add: `New Order`, `Order Confirmed`, `Order Ongoing`, `Delivered`, and `Cancelled`.

## Testing an order

1. Complete `.env.local` with a test spreadsheet and SMTP credentials.
2. Run `npm run dev`, select a quantity, and submit an order using an inbox you can check.
3. Confirm one new row appears in Sheets, the business inbox receives the notification, the customer inbox receives the confirmation, and the browser reaches `/thank-you`.
4. If an integration fails, the API returns an error and the checkout stays on screen. Check the terminal logs for the service-specific error. Test outside-Valley delivery as well to verify the Rs. 150 total.

## Deploy to Vercel

1. Push this repository to GitHub and import it in [Vercel](https://vercel.com/new).
2. Add all `.env.example` keys under **Settings → Environment Variables** (use your production domain for `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL`).
3. Redeploy after adding variables. Do not commit `.env.local` or the service-account JSON key.
4. Perform one real test order after deployment. Make sure the Google Sheet is shared with the configured service account and that the Gmail account accepts SMTP through its App Password.

## Editing content

Product pricing, benefits, phone number, and image paths live in `lib/product.ts`. Product image crops are in `public/images`. Site content on the landing page is in `app/page.tsx`.
