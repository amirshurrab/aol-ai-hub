/**
 * Academy of Learning — AI Hub survey backend (Google Apps Script).
 * Appends each form submission as a row in a Google Sheet.
 *
 * ONE-TIME SETUP (you do this in the editor — anonymous access can't be set via CLI):
 *   1) Create a Google Sheet, copy its ID from the URL (the long string between /d/ and /edit).
 *   2) In the Sheet: Extensions → Apps Script. Delete any sample code, paste this whole file.
 *   3) Set SHEET_ID below, then Save (disk icon).
 *   4) Deploy → New deployment → type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *      → Deploy → Authorize access → choose your account → Allow.
 *   5) Copy the Web app URL (it ends in /exec).
 *   6) Open AOL-Survey.html and paste that URL into:  var ENDPOINT = "...";
 *      Save, commit, and push. Submit one test response and confirm a row appears.
 *
 * Keep HEADERS identical to the keys the form POSTs.
 */
var SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
var SHEET_NAME = "Responses";

var HEADERS = ["timestamp","seminar_title","date_attended","presenter",
  "q1","q2","q3","q4","q5","nps_recommend","most_valuable","improve","future_topics",
  "name","email","department"];

function doPost(e){
  try{
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) { sheet.appendRow(HEADERS); }
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow(HEADERS.map(function(h){ return (data[h] === undefined ? "" : data[h]); }));
    return ContentService.createTextOutput(JSON.stringify({result:"ok"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err){
    return ContentService.createTextOutput(JSON.stringify({result:"error", error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){ return ContentService.createTextOutput("AOL survey endpoint is live."); }
