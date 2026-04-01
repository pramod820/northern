# Google Apps Script Setup — Northern Tree Solutions Contact Form

This guide walks you through connecting the website contact form to a Google Sheet so every enquiry is automatically recorded and you receive an email notification.

---

## Overview

When a visitor submits the contact form on the website, the form data is sent via a POST request to a **Google Apps Script Web App**. The script appends the submission as a new row in a **Google Sheet** and sends you a formatted notification email.

| Field Captured | Example |
|---|---|
| Timestamp | 26/03/2026, 9:14 AM |
| Name | John Smith |
| Email | john@example.com |
| Phone | 0412 345 678 |
| Property Address | 12 Oak St, Kilmore VIC 3764 |
| Service Type | Tree Removal |
| Message | I have a large gum tree... |
| Submitted At | 26/03/2026, 9:14:05 AM AEDT |
| Source | Website Contact Form |

---

## Step 1 — Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a **new blank spreadsheet**.
2. Name it something like `Northern Tree Solutions — Enquiries`.
3. Copy the **Spreadsheet ID** from the URL bar. It looks like this:

   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          This is your SHEET_ID
   ```

4. Keep this tab open — you'll need the Sheet ID in Step 3.

---

## Step 2 — Open Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**.
2. This opens the Apps Script editor in a new tab.
3. Delete all the default code in the editor (the `function myFunction() {}` placeholder).

---

## Step 3 — Paste the Script

1. Open the file `google-apps-script/Code.gs` from this repository.
2. Copy the **entire contents** and paste it into the Apps Script editor.
3. At the top of the script, update the two configuration values:

   ```javascript
   var SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";  // <- Paste your Sheet ID from Step 1
   var NOTIFICATION_EMAIL = "deanhibbert21@gmail.com";  // <- Already set correctly
   ```

4. Click the **floppy disk icon** (or press `Ctrl+S` / `Cmd+S`) to save. Name the project `NTS Contact Form Handler`.

---

## Step 4 — Deploy as a Web App

1. Click the blue **Deploy** button (top right) and select **New deployment**.
2. Click the gear icon next to "Type" and select **Web app**.
3. Configure the deployment settings:

   | Setting | Value |
   |---|---|
   | Description | Northern Tree Solutions Contact Form |
   | Execute as | **Me** (your Google account) |
   | Who has access | **Anyone** |

4. Click **Deploy**.
5. Google will ask you to **authorise** the script — click **Authorise access**, select your Google account, and click **Allow** on the permissions screen.
6. After deployment, you'll see a **Web app URL** that looks like:

   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

7. **Copy this URL** — you'll need it in Step 5.

---

## Step 5 — Add the URL to the Website

1. Open `client/src/components/Contact.tsx` in the repository.
2. Find this line near the top of the file:

   ```typescript
   const APPS_SCRIPT_URL =
     "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
   ```

3. Replace `YOUR_SCRIPT_ID_HERE` with the actual script ID from your Web App URL. For example:

   ```typescript
   const APPS_SCRIPT_URL =
     "https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec";
   ```

4. Save the file and push the change to GitHub (the site will auto-redeploy).

---

## Step 6 — Test the Integration

1. Visit the live website and fill out the contact form with test data.
2. Click **Send Enquiry**.
3. You should see a green success screen on the website.
4. Check your Google Sheet — a new row should appear with the test submission.
5. Check your email (`deanhibbert21@gmail.com`) — you should receive a formatted notification email.

> **Note:** Because the form uses `mode: "no-cors"` (required for cross-origin requests to Google Apps Script), the website cannot read the response body. The form will show a success state as long as the request completes without a network error. If data is not appearing in the sheet, double-check that the Web App is deployed with **Who has access: Anyone**.

---

## Troubleshooting

**Submissions not appearing in the sheet**
- Verify the `SHEET_ID` in `Code.gs` is correct (no extra spaces).
- Confirm the Web App is deployed with **Who has access: Anyone** (not "Anyone with Google account").
- Check the Apps Script execution log: in the editor, go to **Executions** in the left sidebar.

**Not receiving notification emails**
- Check your spam folder.
- Verify `NOTIFICATION_EMAIL` in `Code.gs` is correct.
- Make sure you authorised the script with the correct Google account.

**Re-deploying after changes**
- If you edit `Code.gs`, you must create a **new deployment** (not update the existing one) for the changes to take effect. Go to **Deploy > New deployment** and repeat Step 4.

---

## Security Notes

- The Apps Script URL is public (required for cross-origin form submissions from the website). This is standard practice for this type of integration.
- The script only writes data — it cannot read or modify other Google Drive files.
- If you want to restrict access, you can add a secret token check in `doPost()` and pass it from the frontend.

---

*Setup instructions prepared for Northern Tree Solutions. For questions, contact your web developer.*
