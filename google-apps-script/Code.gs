/**
 * Northern Tree Solutions — Contact Form Handler
 * Google Apps Script Web App
 *
 * This script receives POST requests from the website contact form,
 * appends each submission as a new row in a Google Sheet, and
 * optionally sends a notification email.
 *
 * SETUP: See GOOGLE_APPS_SCRIPT_SETUP.md for full deployment instructions.
 */

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

// The ID of the Google Sheet to write submissions into.
// Found in the sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
var SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";

// The name of the sheet tab to write into (default: "Enquiries")
var SHEET_NAME = "Enquiries";

// Set to true to receive an email notification for each new submission.
var SEND_EMAIL_NOTIFICATION = true;

// The email address to send notifications to.
var NOTIFICATION_EMAIL = "deanhibbert21@gmail.com";

// ──────────────────────────────────────────────────────────────────────────────


/**
 * Handles GET requests (used to verify the web app is deployed correctly).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Northern Tree Solutions form handler is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Handles POST requests from the website contact form.
 * Appends submission data to the Google Sheet and sends a notification email.
 */
function doPost(e) {
  try {
    // Parse the incoming JSON body
    var data = JSON.parse(e.postData.contents);

    // Open the spreadsheet and target sheet
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If the sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Property Address",
        "Service Type",
        "Message",
        "Submitted At",
        "Source"
      ]);

      // Style the header row
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground("#1a3a2a");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Append the new submission as a row
    sheet.appendRow([
      new Date(),                          // Timestamp (server time)
      data.name        || "",
      data.email       || "",
      data.phone       || "",
      data.address     || "",
      data.service     || "",
      data.message     || "",
      data.submittedAt || "",              // Client-side Melbourne time
      data.source      || "Website"
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 9);

    // Send notification email if enabled
    if (SEND_EMAIL_NOTIFICATION) {
      sendNotificationEmail(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log the error and return a failure response
    Logger.log("Error in doPost: " + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * Sends an HTML notification email when a new enquiry is received.
 * @param {Object} data - The parsed form submission data.
 */
function sendNotificationEmail(data) {
  var subject = "New Enquiry: " + (data.service || "General Enquiry") + " — " + (data.name || "Unknown");

  var htmlBody = [
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">',
    '  <div style="background: #1a3a2a; padding: 24px 32px; border-radius: 8px 8px 0 0;">',
    '    <h2 style="color: #c8a84b; margin: 0; font-size: 20px;">New Enquiry Received</h2>',
    '    <p style="color: #ffffff; margin: 4px 0 0; font-size: 14px;">Northern Tree Solutions — Website Contact Form</p>',
    '  </div>',
    '  <div style="background: #ffffff; padding: 24px 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">',
    '    <table style="width: 100%; border-collapse: collapse;">',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 140px; vertical-align: top;">Name</td>',
    '          <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">' + (data.name || "—") + '</td></tr>',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Email</td>',
    '          <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:' + data.email + '" style="color: #1a3a2a;">' + (data.email || "—") + '</a></td></tr>',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Phone</td>',
    '          <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="tel:' + data.phone + '" style="color: #1a3a2a;">' + (data.phone || "—") + '</a></td></tr>',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Property Address</td>',
    '          <td style="padding: 8px 0; color: #111827; font-size: 14px;">' + (data.address || "—") + '</td></tr>',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Service</td>',
    '          <td style="padding: 8px 0;"><span style="background: #f0fdf4; color: #166534; padding: 2px 10px; border-radius: 12px; font-size: 13px; font-weight: 600;">' + (data.service || "Not specified") + '</span></td></tr>',
    '      <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Submitted</td>',
    '          <td style="padding: 8px 0; color: #111827; font-size: 13px;">' + (data.submittedAt || new Date().toString()) + '</td></tr>',
    '    </table>',
    data.message ? [
      '    <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-left: 3px solid #c8a84b; border-radius: 4px;">',
      '      <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>',
      '      <p style="color: #111827; font-size: 14px; margin: 0; line-height: 1.6;">' + data.message + '</p>',
      '    </div>'
    ].join("") : "",
    '    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">',
    '      <a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '" style="background: #1a3a2a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">View in Google Sheets</a>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join("\n");

  GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, "", { htmlBody: htmlBody });
}
