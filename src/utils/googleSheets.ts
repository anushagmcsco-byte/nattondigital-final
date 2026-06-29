import { RoutePath } from '../types';

export interface GoogleSheetSubmission {
  id: string;
  timestamp: string;
  formName: string;
  payload: Record<string, any>;
  syncStatus: 'success' | 'failed' | 'simulated';
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  webhookUrl: string;
  autoSync: boolean;
}

const STORAGE_KEY_CONFIG = 'natton_google_sheets_config';
const STORAGE_KEY_SUBMISSIONS = 'natton_google_sheets_submissions';

const DEFAULT_CONFIG: GoogleSheetsConfig = {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUYq-37ZKVN4GHy4X6U',
  sheetName: 'FormLeads',
  webhookUrl: '',
  autoSync: true
};

const DEFAULT_SUBMISSIONS: GoogleSheetSubmission[] = [
  {
    id: 'lead-001',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    formName: 'Contact & Custom Proposal',
    payload: {
      'Full Name': 'Sarah Jenkins',
      'Corporate Email': 'sjenkins@innovate.tech',
      'Mobile Contact Number': '+1 (555) 019-2834',
      'Your Industry Segment': 'Healthcare',
      'Primary Automation Requirement': 'GHL & CRM Custom Integration',
      'Message': 'Looking to connect our existing GoHighLevel portal with an n8n voice agent sequence. Do you support HIPAA consent logs?'
    },
    syncStatus: 'simulated'
  },
  {
    id: 'lead-002',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    formName: 'AI Readiness Assessment',
    payload: {
      'Contact Name': 'Marcus Vance',
      'Email': 'mvance@apexmanufacturing.co',
      'Phone': '+1 (555) 014-9988',
      'Company Name': 'Apex Manufacturing',
      'Monthly Lead Volume': '1,500 - 5,000',
      'Current CRM': 'HubSpot',
      'Assessment Score': '74%',
      'AI Maturity Grade': 'B (Intermediate Operations)'
    },
    syncStatus: 'simulated'
  },
  {
    id: 'lead-003',
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    formName: '1-on-1 Demo Booking',
    payload: {
      'Full Name': 'Aarav Patel',
      'Corporate Email': 'aarav@solutions.in',
      'Phone': '+91 98765 43210',
      'Organization': 'Aarav Solutions Ltd',
      'Preferred Demo Time': 'Tuesday, 3:00 PM GMT+5.5'
    },
    syncStatus: 'simulated'
  }
];

// Initialize and get configuration
export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  try {
    const config = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!config) {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(config);
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

// Save configuration
export function saveGoogleSheetsConfig(config: GoogleSheetsConfig): void {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
}

// Get all submissions
export function getFormSubmissions(): GoogleSheetSubmission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(DEFAULT_SUBMISSIONS));
      return DEFAULT_SUBMISSIONS;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_SUBMISSIONS;
  }
}

// Trigger Google Sheets custom webhook or simulate the POST request
export async function submitToGoogleSheetsWebhook(config: GoogleSheetsConfig, submission: GoogleSheetSubmission): Promise<'success' | 'failed'> {
  if (!config.webhookUrl) return 'failed';

  try {
    // Structure standard row payload for Google Apps Script
    const payload = {
      id: submission.id,
      timestamp: submission.timestamp,
      formName: submission.formName,
      spreadsheetId: config.spreadsheetId,
      sheetName: config.sheetName,
      ...submission.payload
    };

    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script Web App webhooks to avoid CORS issues
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return 'success';
  } catch (error) {
    console.error('Failed to trigger Google Sheets webhook:', error);
    return 'failed';
  }
}

// Save new form submission
export async function registerFormSubmission(formName: string, rawPayload: Record<string, any>): Promise<GoogleSheetSubmission> {
  const config = getGoogleSheetsConfig();
  const submissions = getFormSubmissions();

  // Create clean formatted payload
  const cleanPayload: Record<string, any> = {};
  Object.entries(rawPayload).forEach(([key, val]) => {
    // Exclude react synthetic event elements, secrets or consent checkboxes if needed, or clean up key names
    const cleanKey = key.replace(/[:*]/g, '').trim();
    if (cleanKey && cleanKey !== 'consent' && cleanKey !== 'password' && typeof val !== 'function') {
      cleanPayload[cleanKey] = typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val;
    }
  });

  const newSubmission: GoogleSheetSubmission = {
    id: 'lead-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    formName: formName,
    payload: cleanPayload,
    syncStatus: config.webhookUrl ? 'failed' : 'simulated'
  };

  if (config.webhookUrl) {
    const status = await submitToGoogleSheetsWebhook(config, newSubmission);
    newSubmission.syncStatus = status;
  }

  const updatedSubmissions = [newSubmission, ...submissions];
  localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updatedSubmissions));

  // Dispatch custom event to notify UI (like floating alerts/toasts)
  window.dispatchEvent(new CustomEvent('natton_google_sheet_sync', {
    detail: newSubmission
  }));

  return newSubmission;
}

// Delete submission
export function deleteSubmission(id: string): GoogleSheetSubmission[] {
  const submissions = getFormSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(filtered));
  return filtered;
}

// Clear all submissions
export function clearAllSubmissions(): void {
  localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify([]));
}

// Helper to convert form data to rows for CSV downloads
export function convertToCSV(submissions: GoogleSheetSubmission[]): string {
  if (submissions.length === 0) return '';

  // Collect unique headers across all submissions
  const headersSet = new Set<string>();
  headersSet.add('ID');
  headersSet.add('Timestamp');
  headersSet.add('Form Source');

  submissions.forEach(s => {
    Object.keys(s.payload).forEach(k => headersSet.add(k));
  });

  const headers = Array.from(headersSet);
  const rows = [headers.join(',')];

  submissions.forEach(s => {
    const row = headers.map(header => {
      let val = '';
      if (header === 'ID') val = s.id;
      else if (header === 'Timestamp') val = s.timestamp;
      else if (header === 'Form Source') val = s.formName;
      else val = s.payload[header] || '';

      // Escape quotes and commas
      const escapedVal = String(val).replace(/"/g, '""');
      return `"${escapedVal}"`;
    });
    rows.push(row.join(','));
  });

  return rows.join('\n');
}

// Google Apps Script template code
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Google Apps Script Webhook receiver
 * Deploys as a "Web App" to capture and write all form leads from your Natton Digital site in real time!
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Open the spreadsheet using the ID provided or default
    var spreadsheetId = data.spreadsheetId || SpreadsheetApp.getActiveSpreadsheet().getId();
    var sheetName = data.sheetName || "FormLeads";
    
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);
    
    // If the sheet doesn't exist, create it with nice headers
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(["ID", "Timestamp", "Form Source", "Field Data"]);
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setBackground("#110B33");
      headerRange.setFontColor("#00C2FF");
      headerRange.setFontWeight("bold");
    }

    // 2. Map payload keys to dynamic column headers to build a professional relational grid
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = new Array(headers.length).fill("");
    
    // Ensure "ID", "Timestamp", "Form Source" exist as standard columns
    rowData[headers.indexOf("ID")] = data.id || "";
    rowData[headers.indexOf("Timestamp")] = data.timestamp || new Date().toISOString();
    rowData[headers.indexOf("Form Source")] = data.formName || "General Form";

    // Loop through additional payload fields and add them dynamically
    var payloadFields = [];
    for (var key in data) {
      if (key !== "id" && key !== "timestamp" && key !== "formName" && key !== "spreadsheetId" && key !== "sheetName") {
        var colIndex = headers.indexOf(key);
        if (colIndex === -1) {
          // Add a new column to the spreadsheet if it does not exist yet!
          sheet.insertColumnAfter(sheet.getLastColumn());
          sheet.getRange(1, sheet.getLastColumn() + 1).setValue(key)
               .setBackground("#110B33").setFontColor("#00C2FF").setFontWeight("bold");
          headers.push(key);
          rowData.push(data[key]);
        } else {
          rowData[colIndex] = data[key];
        }
      }
    }

    // Append completed row
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Lead written to Google Sheet successfully!" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}`;
