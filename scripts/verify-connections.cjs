const fs = require("fs");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const separator = line.indexOf("=");
  if (separator < 1) continue;
  let value = line.slice(separator + 1);
  if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
  process.env[line.slice(0, separator)] = value;
}

async function verify() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    fields: "properties.title,sheets.properties.title",
  });
  const smtp = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const tabExists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === process.env.GOOGLE_SHEET_TAB_NAME);
  if (!tabExists) throw new Error(`Google Sheet tab "${process.env.GOOGLE_SHEET_TAB_NAME}" was not found. Available tabs: ${spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title).join(", ")}`);
  await smtp.verify();
  console.log(`Google Sheets: connected (${spreadsheet.data.properties.title})`);
  console.log("Gmail SMTP: authenticated and ready");
}

verify().catch((error) => { console.error(`Connection check failed: ${error.message}`); process.exit(1); });
