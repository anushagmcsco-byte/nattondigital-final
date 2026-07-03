import { RoutePath } from '../types';
import { getAccessToken, db } from './googleAuth';
import { collection, addDoc } from 'firebase/firestore';

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
  manualToken?: string;
  sheetdbUrl?: string;
  firebaseCollection?: string;
  airtableApiKey?: string;
  airtableBaseId?: string;
  airtableTableName?: string;
  syncMethod?: 'oauth' | 'webhook' | 'sheetdb' | 'manual-token' | 'firebase' | 'airtable';
}

const STORAGE_KEY_CONFIG = 'natton_google_sheets_config';
const STORAGE_KEY_SUBMISSIONS = 'natton_google_sheets_submissions';

const DEFAULT_CONFIG: GoogleSheetsConfig = {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUYq-37ZKVN4GHy4X6U',
  sheetName: 'FormLeads',
  webhookUrl: '',
  autoSync: true,
  manualToken: '',
  sheetdbUrl: '',
  firebaseCollection: 'leads',
  airtableApiKey: '',
  airtableBaseId: '',
  airtableTableName: 'Leads',
  syncMethod: 'sheetdb'
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

// Helper to extract clean spreadsheet ID from full URLs or raw IDs
export function extractSpreadsheetId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  // Matches typical Google Sheets URLs (e.g. /spreadsheets/d/SPREADSHEET_ID/edit)
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

// Normalizes field names to match standard spreadsheet headers precisely
export function normalizePayloadKeys(payload: Record<string, any>): Record<string, any> {
  const normalized: Record<string, any> = {};
  
  Object.entries(payload).forEach(([key, val]) => {
    const k = key.trim().toLowerCase();
    
    if (
      k === 'name' || 
      k === 'full name' || 
      k === 'contact name' || 
      k === 'your name' || 
      k === 'customer name' || 
      k.includes('name')
    ) {
      normalized['Full Name'] = val;
    } else if (
      k === 'email' || 
      k === 'corporate email' || 
      k === 'email address' || 
      k === 'company email' || 
      k === 'work email' ||
      k.includes('email')
    ) {
      normalized['Corporate Email'] = val;
    } else if (
      k === 'phone' || 
      k === 'mobile contact number' || 
      k === 'contact number' || 
      k === 'phone number' || 
      k === 'mobile' || 
      k === 'telephone' || 
      k.includes('phone') || 
      k.includes('tel') || 
      k.includes('mobile') || 
      k.includes('contact')
    ) {
      normalized['Mobile Contact Number'] = val;
    } else if (
      k === 'organization' || 
      k === 'company name' || 
      k === 'company' || 
      k === 'firm' || 
      k === 'enterprise' || 
      k === 'business name' ||
      k.includes('company') || 
      k.includes('organization') || 
      k.includes('business') || 
      k.includes('industry') ||
      k.includes('firm')
    ) {
      normalized['Organization'] = val;
    } else if (
      k === 'message' || 
      k === 'strategic message' || 
      k === 'your message' || 
      k === 'requirement description' || 
      k === 'enquiry' || 
      k.includes('message') || 
      k.includes('enquiry') || 
      k.includes('requirement')
    ) {
      normalized['Message'] = val;
    } else {
      // Keep other custom fields as they are, stripping colons or asterisks
      const cleanKey = key.replace(/[:*]/g, '').trim();
      normalized[cleanKey] = val;
    }
  });
  
  return normalized;
}

// Initialize and get configuration
export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  try {
    const config = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!config) {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    const parsed = JSON.parse(config);
    const merged = { ...DEFAULT_CONFIG, ...parsed };
    // Ensure spreadsheet ID is cleaned up
    merged.spreadsheetId = extractSpreadsheetId(merged.spreadsheetId);
    return merged;
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

// Save configuration
export function saveGoogleSheetsConfig(config: GoogleSheetsConfig): void {
  const cleanedConfig = {
    ...config,
    spreadsheetId: extractSpreadsheetId(config.spreadsheetId)
  };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cleanedConfig));
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
      spreadsheetId: extractSpreadsheetId(config.spreadsheetId),
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

// Trigger SheetDB POST request
export async function submitToSheetDB(config: GoogleSheetsConfig, submission: GoogleSheetSubmission): Promise<'success' | 'failed'> {
  const rawUrl = config.sheetdbUrl || config.webhookUrl;
  if (!rawUrl) return 'failed';

  try {
    let targetUrl = rawUrl.trim();
    
    // Auto-append sheet name parameter if sheet name is configured and not already specified in the URL query string
    const sheetName = config.sheetName || 'FormLeads';
    if (sheetName && !targetUrl.includes('sheet=')) {
      const separator = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${separator}sheet=${encodeURIComponent(sheetName)}`;
    }

    // Fetch existing column keys from SheetDB to perform smart case-insensitive header mapping
    let sheetdbKeys: string[] = [];
    try {
      const baseApiUrl = targetUrl.split('?')[0];
      const keysRes = await fetch(`${baseApiUrl}/keys`, {
        headers: { 'Accept': 'application/json' }
      });
      if (keysRes.ok) {
        sheetdbKeys = await keysRes.json() as string[];
      }
    } catch (e) {
      console.warn('Failed to fetch keys from SheetDB, falling back to standard mapping:', e);
    }

    // SheetDB expects an object array in this format:
    // { "data": [ { "ID": "lead-...", "Timestamp": "...", "Form Source": "...", "Full Name": "...", ... } ] }
    const row: Record<string, any> = {};

    if (sheetdbKeys && sheetdbKeys.length > 0) {
      const keysLower = sheetdbKeys.map(k => String(k).trim().toLowerCase());
      
      const setMatchedVal = (targetName: string, value: any) => {
        const lowerName = targetName.toLowerCase();
        const idx = keysLower.indexOf(lowerName);
        if (idx !== -1) {
          row[sheetdbKeys[idx]] = value;
        } else {
          row[targetName] = value;
        }
      };

      setMatchedVal('ID', submission.id);
      setMatchedVal('Timestamp', submission.timestamp);
      
      let fsIdx = keysLower.indexOf('form source');
      if (fsIdx === -1) fsIdx = keysLower.indexOf('formname');
      if (fsIdx !== -1) {
        row[sheetdbKeys[fsIdx]] = submission.formName;
      } else {
        row['Form Source'] = submission.formName;
      }

      Object.entries(submission.payload).forEach(([key, val]) => {
        const cleanKey = key.trim();
        const lowerKey = cleanKey.toLowerCase();
        const idx = keysLower.indexOf(lowerKey);
        if (idx !== -1) {
          row[sheetdbKeys[idx]] = typeof val === 'object' ? JSON.stringify(val) : val;
        } else {
          row[cleanKey] = typeof val === 'object' ? JSON.stringify(val) : val;
        }
      });
    } else {
      // Fallback exact mapping
      row['ID'] = submission.id;
      row['Timestamp'] = submission.timestamp;
      row['Form Source'] = submission.formName;
      Object.entries(submission.payload).forEach(([key, val]) => {
        row[key] = typeof val === 'object' ? JSON.stringify(val) : val;
      });
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ data: [row] })
    });

    if (response.ok) {
      return 'success';
    }
    return 'failed';
  } catch (error) {
    console.error('Failed to submit to SheetDB:', error);
    return 'failed';
  }
}

// Submit lead directly to Firebase Firestore
export async function submitToFirebaseFirestore(config: GoogleSheetsConfig, submission: GoogleSheetSubmission): Promise<'success' | 'failed'> {
  try {
    if (!db) {
      console.error('Firebase Firestore database is not enabled or available in your Firebase console. Please ensure Firestore is created for this project.');
      return 'failed';
    }
    const collName = config.firebaseCollection || 'leads';
    const leadDoc = {
      id: submission.id,
      timestamp: submission.timestamp,
      formName: submission.formName,
      ...submission.payload
    };
    await addDoc(collection(db, collName), leadDoc);
    return 'success';
  } catch (error) {
    console.error('Failed to submit to Firebase Firestore:', error);
    return 'failed';
  }
}

// Submit lead directly to Airtable
export async function submitToAirtable(config: GoogleSheetsConfig, submission: GoogleSheetSubmission): Promise<'success' | 'failed'> {
  if (!config.airtableApiKey || !config.airtableBaseId || !config.airtableTableName) {
    return 'failed';
  }
  try {
    const fields: Record<string, any> = {
      'ID': submission.id,
      'Timestamp': submission.timestamp,
      'Form Source': submission.formName,
    };
    Object.entries(submission.payload).forEach(([key, val]) => {
      fields[key] = typeof val === 'object' ? JSON.stringify(val) : val;
    });

    const url = `https://api.airtable.com/v0/${config.airtableBaseId}/${encodeURIComponent(config.airtableTableName)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.airtableApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records: [{ fields }] })
    });

    if (response.ok) {
      return 'success';
    }
    const errData = await response.json().catch(() => ({}));
    console.error('Airtable API error response:', errData);
    return 'failed';
  } catch (error) {
    console.error('Failed to submit to Airtable:', error);
    return 'failed';
  }
}

export function getColLetter(colIndex: number): string {
  let letter = '';
  let temp = colIndex;
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

export async function submitToGoogleSheetsDirectly(
  config: GoogleSheetsConfig,
  submission: GoogleSheetSubmission,
  accessToken: string
): Promise<'success' | 'failed'> {
  const spreadsheetId = extractSpreadsheetId(config.spreadsheetId);
  let sheetName = config.sheetName || 'FormLeads';
  if (!spreadsheetId) return 'failed';

  try {
    let headersRaw = ["ID", "Timestamp", "Form Source", "Full Name", "Corporate Email", "Mobile Contact Number", "Organization", "Message"];
    
    // 1. Fetch spreadsheet metadata to check what sheets/tabs exist
    let existingSheets: string[] = [];
    try {
      const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (metaRes.ok) {
        const metaData = await metaRes.json();
        existingSheets = metaData.sheets?.map((s: any) => s?.properties?.title).filter(Boolean) || [];
      }
    } catch (e) {
      console.warn('Failed to fetch spreadsheet metadata:', e);
    }

    // 2. If our target sheet does not exist, try to create it!
    if (existingSheets.length > 0 && !existingSheets.includes(sheetName)) {
      try {
        const createRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requests: [{ addSheet: { properties: { title: sheetName } } }]
          })
        });
        if (createRes.ok) {
          existingSheets.push(sheetName);
        } else {
          // Fallback to first available sheet if creation fails (highly resilient!)
          console.warn(`Could not create sheet "${sheetName}". Falling back to first sheet: "${existingSheets[0]}"`);
          sheetName = existingSheets[0];
        }
      } catch (err) {
        console.error("Error creating sheet, falling back to first sheet:", err);
        sheetName = existingSheets[0];
      }
    } else if (existingSheets.length === 0) {
      // If metadata failed but we have no existing sheets, fallback to standard sheets check
    }

    // 3. Get the first row (headers) to see if sheet exists and what columns it has
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!1:1`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.values && data.values[0] && data.values[0].length > 0) {
        headersRaw = data.values[0];
      } else {
        // Empty sheet, write default headers first
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1?valueInputOption=USER_ENTERED`, {
          method: 'PUT',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [headersRaw] })
        });
      }
    } else {
      // If reading A1:1 fails (e.g. range error, or sheet is empty), try to write headers
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: [headersRaw] })
      });
    }

    // 4. Identify missing headers and add them dynamically as new columns
    const headersLower = headersRaw.map(h => String(h).trim().toLowerCase());
    const newHeadersToAppend: string[] = [];

    Object.keys(submission.payload).forEach(key => {
      const cleanKey = key.trim();
      const lowerKey = cleanKey.toLowerCase();
      if (headersLower.indexOf(lowerKey) === -1) {
        newHeadersToAppend.push(cleanKey);
      }
    });

    for (const key of newHeadersToAppend) {
      const nextColLetter = getColLetter(headersRaw.length);
      const cellAddress = `${nextColLetter}1`;
      try {
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!${cellAddress}?valueInputOption=USER_ENTERED`, {
          method: 'PUT',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [[key]] })
        });
        headersRaw.push(key);
        headersLower.push(key.toLowerCase());
      } catch (err) {
        console.error(`Failed to append header "${key}":`, err);
      }
    }

    // 5. Build the row to append
    const rowData = new Array(headersRaw.length).fill("");

    const idIndex = headersLower.indexOf("id");
    if (idIndex !== -1) rowData[idIndex] = submission.id;

    const tsIndex = headersLower.indexOf("timestamp");
    if (tsIndex !== -1) rowData[tsIndex] = submission.timestamp;

    let fsIndex = headersLower.indexOf("form source");
    if (fsIndex === -1) fsIndex = headersLower.indexOf("formname");
    if (fsIndex !== -1) rowData[fsIndex] = submission.formName;

    Object.entries(submission.payload).forEach(([key, val]) => {
      const cleanKey = key.trim();
      const lowerKey = cleanKey.toLowerCase();
      const idx = headersLower.indexOf(lowerKey);
      if (idx !== -1) {
        rowData[idx] = typeof val === 'object' ? JSON.stringify(val) : val;
      }
    });

    // 6. Append row
    const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [rowData] })
    });

    if (appendRes.ok) {
      return 'success';
    }
    return 'failed';
  } catch (error) {
    console.error('Direct Google Sheet Sync Error:', error);
    return 'failed';
  }
}

// Save new form submission
export async function registerFormSubmission(formName: string, rawPayload: Record<string, any>): Promise<GoogleSheetSubmission> {
  const config = getGoogleSheetsConfig();
  const submissions = getFormSubmissions();

  // Create clean formatted payload
  const initialClean: Record<string, any> = {};
  Object.entries(rawPayload).forEach(([key, val]) => {
    const cleanKey = key.replace(/[:*]/g, '').trim();
    if (cleanKey && cleanKey !== 'consent' && cleanKey !== 'password' && typeof val !== 'function') {
      initialClean[cleanKey] = typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val;
    }
  });

  // Normalize keys to align precisely with user-defined Google Sheet column headers
  const cleanPayload = normalizePayloadKeys(initialClean);

  // Automatically capture and inject page header/title and page URL path with every submission
  const pageTitle = typeof document !== 'undefined' ? document.title : 'Natton Digital';
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!cleanPayload['Form Source']) {
    cleanPayload['Form Source'] = formName;
  }
  if (!cleanPayload['Page Header']) {
    cleanPayload['Page Header'] = pageTitle.split('|')[0].trim();
  }
  if (!cleanPayload['Page URL']) {
    cleanPayload['Page URL'] = pageUrl || pagePath;
  }

  const newSubmission: GoogleSheetSubmission = {
    id: 'lead-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    formName: formName,
    payload: cleanPayload,
    syncStatus: 'simulated'
  };

  const cachedToken = await getAccessToken();
  const accessToken = cachedToken || config.manualToken;
  
  const isSheetDB = (config.sheetdbUrl && config.sheetdbUrl.trim().length > 0) || 
                    (config.webhookUrl && (config.webhookUrl.includes('sheetdb.io') || config.webhookUrl.includes('sheetdb')));

  // Smart dynamic active method resolution
  let activeMethod = config.syncMethod || 'oauth';
  if (activeMethod === 'firebase' || activeMethod === 'airtable') {
    // Keep as is
  } else if (activeMethod === 'sheetdb' && !isSheetDB) {
    activeMethod = accessToken ? 'oauth' : config.webhookUrl ? 'webhook' : 'oauth';
  } else if (activeMethod === 'webhook' && !config.webhookUrl) {
    activeMethod = isSheetDB ? 'sheetdb' : accessToken ? 'oauth' : 'oauth';
  } else if (activeMethod === 'oauth' && !cachedToken && config.manualToken) {
    activeMethod = 'manual-token';
  } else if (activeMethod === 'oauth' && !cachedToken && !config.manualToken) {
    activeMethod = isSheetDB ? 'sheetdb' : config.webhookUrl ? 'webhook' : 'oauth';
  } else if (activeMethod === 'manual-token' && !config.manualToken) {
    activeMethod = cachedToken ? 'oauth' : isSheetDB ? 'sheetdb' : config.webhookUrl ? 'webhook' : 'oauth';
  }

  if (config.autoSync) {
    if (activeMethod === 'firebase') {
      const status = await submitToFirebaseFirestore(config, newSubmission);
      newSubmission.syncStatus = status;
    } else if (activeMethod === 'airtable') {
      const status = await submitToAirtable(config, newSubmission);
      newSubmission.syncStatus = status;
    } else if (activeMethod === 'sheetdb') {
      const status = await submitToSheetDB(config, newSubmission);
      newSubmission.syncStatus = status;
    } else if (activeMethod === 'webhook') {
      const status = await submitToGoogleSheetsWebhook(config, newSubmission);
      newSubmission.syncStatus = status;
    } else if (activeMethod === 'oauth' && cachedToken) {
      const status = await submitToGoogleSheetsDirectly(config, newSubmission, cachedToken);
      newSubmission.syncStatus = status;
    } else if (activeMethod === 'manual-token' && config.manualToken) {
      const status = await submitToGoogleSheetsDirectly(config, newSubmission, config.manualToken);
      newSubmission.syncStatus = status;
    } else {
      // Last-resort fallback based on whatever is available
      if (isSheetDB) {
        const status = await submitToSheetDB(config, newSubmission);
        newSubmission.syncStatus = status;
      } else if (accessToken) {
        const status = await submitToGoogleSheetsDirectly(config, newSubmission, accessToken);
        newSubmission.syncStatus = status;
      } else if (config.webhookUrl) {
        const status = await submitToGoogleSheetsWebhook(config, newSubmission);
        newSubmission.syncStatus = status;
      }
    }
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
    var rawSpreadsheetId = data.spreadsheetId || SpreadsheetApp.getActiveSpreadsheet().getId();
    
    // In case the full URL was passed in, extract the clean ID
    var spreadsheetId = rawSpreadsheetId;
    var urlMatch = rawSpreadsheetId.match(/\\/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      spreadsheetId = urlMatch[1];
    }
    
    var sheetName = data.sheetName || "FormLeads";
    
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);
    
    // If the sheet doesn't exist, create it with nice headers
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(["ID", "Timestamp", "Form Source", "Full Name", "Corporate Email", "Mobile Contact Number", "Organization", "Message"]);
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#110B33");
      headerRange.setFontColor("#00C2FF");
      headerRange.setFontWeight("bold");
    }

    // 2. Map payload keys to dynamic column headers case-insensitively with trim
    var headersRaw = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var headersLower = headersRaw.map(function(h) {
      return String(h).trim().toLowerCase();
    });
    
    var rowData = new Array(headersRaw.length).fill("");
    
    // Populate Standard Fields
    var idIndex = headersLower.indexOf("id");
    if (idIndex !== -1) rowData[idIndex] = data.id || "";
    
    var tsIndex = headersLower.indexOf("timestamp");
    if (tsIndex !== -1) rowData[tsIndex] = data.timestamp || new Date().toISOString();
    
    var fsIndex = headersLower.indexOf("form source");
    if (fsIndex === -1) fsIndex = headersLower.indexOf("formname");
    if (fsIndex !== -1) rowData[fsIndex] = data.formName || "General Form";

    // Loop through additional payload fields and map them to columns
    for (var key in data) {
      if (key !== "id" && key !== "timestamp" && key !== "formName" && key !== "spreadsheetId" && key !== "sheetName") {
        var cleanKey = key.trim();
        var lowerKey = cleanKey.toLowerCase();
        var colIndex = headersLower.indexOf(lowerKey);
        
        if (colIndex === -1) {
          // If column doesn't exist, append new column dynamically
          sheet.insertColumnAfter(sheet.getLastColumn());
          var newColNum = sheet.getLastColumn() + 1;
          sheet.getRange(1, newColNum).setValue(cleanKey)
               .setBackground("#110B33").setFontColor("#00C2FF").setFontWeight("bold");
          headersLower.push(lowerKey);
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
