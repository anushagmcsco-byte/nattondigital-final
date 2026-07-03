import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Settings, 
  Code, 
  Trash2, 
  Download, 
  RefreshCw, 
  Play, 
  CheckCircle, 
  FileSpreadsheet, 
  Search,
  Check,
  Copy,
  Info,
  Server,
  X,
  AlertTriangle,
  LogIn,
  LogOut,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  getGoogleSheetsConfig, 
  saveGoogleSheetsConfig, 
  getFormSubmissions, 
  submitToGoogleSheetsWebhook, 
  submitToSheetDB,
  submitToFirebaseFirestore,
  submitToAirtable,
  deleteSubmission, 
  clearAllSubmissions, 
  convertToCSV, 
  GOOGLE_APPS_SCRIPT_CODE,
  GoogleSheetSubmission,
  GoogleSheetsConfig,
  submitToGoogleSheetsDirectly,
  extractSpreadsheetId
} from '../utils/googleSheets';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  db
} from '../utils/googleAuth';
import { User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export default function GoogleSheetsTab() {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    spreadsheetId: '',
    sheetName: '',
    webhookUrl: '',
    autoSync: true,
    manualToken: ''
  });
  const [submissions, setSubmissions] = useState<GoogleSheetSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<GoogleSheetSubmission | null>(null);

  // Sync Connection Strategy: 'webhook' | 'oauth' | 'sheetdb' | 'manual-token' | 'firebase' | 'airtable'
  const [syncMethod, setSyncMethod] = useState<'oauth' | 'webhook' | 'sheetdb' | 'manual-token' | 'firebase' | 'airtable'>('sheetdb');

  // Google OAuth States
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [spreadsheetTitle, setSpreadsheetTitle] = useState<string | null>(null);
  const [isFetchingTitle, setIsFetchingTitle] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // Load configuration and submissions on mount, and initialize Auth
  useEffect(() => {
    const savedConfig = getGoogleSheetsConfig();
    setConfig(savedConfig);
    setSubmissions(getFormSubmissions());

    // Auto-detect best active sync method based on saved configuration
    if (savedConfig.syncMethod) {
      setSyncMethod(savedConfig.syncMethod);
      if (savedConfig.syncMethod === 'manual-token' && savedConfig.manualToken) {
        setToken(savedConfig.manualToken);
      }
    } else if (savedConfig.sheetdbUrl) {
      setSyncMethod('sheetdb');
    } else if (savedConfig.manualToken) {
      setSyncMethod('manual-token');
      setToken(savedConfig.manualToken);
    } else if (savedConfig.webhookUrl) {
      if (savedConfig.webhookUrl.includes('sheetdb.io') || savedConfig.webhookUrl.includes('sheetdb')) {
        setSyncMethod('sheetdb');
      } else {
        setSyncMethod('webhook');
      }
    } else {
      setSyncMethod('oauth');
    }

    const unsubscribe = initAuth(
      async (firebaseUser, cachedToken) => {
        setUser(firebaseUser);
        if (cachedToken) {
          setToken(cachedToken);
        } else if (savedConfig.manualToken) {
          setToken(savedConfig.manualToken);
        }
      },
      () => {
        setUser(null);
        if (savedConfig.manualToken) {
          setToken(savedConfig.manualToken);
        } else {
          setToken(null);
          setSpreadsheetTitle(null);
        }
      }
    );

    // Try to pre-load access token if user is signed in but token was not loaded yet
    getAccessToken().then(cachedToken => {
      if (cachedToken) {
        setToken(cachedToken);
      } else if (savedConfig.manualToken) {
        setToken(savedConfig.manualToken);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Fetch the actual Google Spreadsheet Title from Google Sheets API when token is active
  useEffect(() => {
    const activeToken = syncMethod === 'manual-token' ? config.manualToken : token;
    if (!activeToken || !config.spreadsheetId) {
      setSpreadsheetTitle(null);
      setTokenError(null);
      return;
    }

    const fetchSheetTitle = async () => {
      setIsFetchingTitle(true);
      try {
        const sheetId = extractSpreadsheetId(config.spreadsheetId);
        if (!sheetId) {
          setSpreadsheetTitle(null);
          setTokenError(null);
          return;
        }
        const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}?fields=properties.title`, {
          headers: { Authorization: `Bearer ${activeToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.properties?.title) {
            setSpreadsheetTitle(data.properties.title);
            setTokenError(null);
          } else {
            setSpreadsheetTitle(null);
          }
        } else {
          setSpreadsheetTitle(null);
          if (res.status === 401) {
            setTokenError("session_expired");
          } else if (res.status === 403) {
            setTokenError("forbidden");
          } else if (res.status === 404) {
            setTokenError("not_found");
          } else {
            setTokenError("invalid");
          }
        }
      } catch (err) {
        console.error('Error fetching spreadsheet title:', err);
        setSpreadsheetTitle(null);
        setTokenError("invalid");
      } finally {
        setIsFetchingTitle(false);
      }
    };

    fetchSheetTitle();
  }, [token, config.spreadsheetId, config.manualToken, syncMethod]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setLoginError(null);
      }
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      setLoginError({
        code: err?.code || 'unknown',
        message: err?.message || String(err)
      });
      setShowTroubleshoot(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleSetSyncMethod = (method: 'oauth' | 'webhook' | 'sheetdb' | 'manual-token' | 'firebase' | 'airtable') => {
    setSyncMethod(method);
    setConfig(prev => ({ ...prev, syncMethod: method }));
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const configToSave = { ...config, syncMethod };
    saveGoogleSheetsConfig(configToSave);
    setConfig(getGoogleSheetsConfig()); // Refresh local state to show the cleanly extracted spreadsheetId!
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteRow = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission record?')) {
      const updated = deleteSubmission(id);
      setSubmissions(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('CRITICAL: Are you sure you want to permanently clear all form submission logs? This cannot be undone.')) {
      clearAllSubmissions();
      setSubmissions([]);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleTriggerSync = async (submission: GoogleSheetSubmission) => {
    let result: 'success' | 'failed' = 'failed';
    setSyncingId(submission.id);

    const activeToken = syncMethod === 'manual-token' ? config.manualToken : token;

    if (syncMethod === 'firebase') {
      result = await submitToFirebaseFirestore(config, submission);
    } else if (syncMethod === 'airtable') {
      if (!config.airtableApiKey || !config.airtableBaseId || !config.airtableTableName) {
        alert('Please configure your Airtable API settings first!');
        setSyncingId(null);
        return;
      }
      result = await submitToAirtable(config, submission);
    } else if (syncMethod === 'sheetdb') {
      if (!config.sheetdbUrl && !config.webhookUrl) {
        alert('Please configure your SheetDB API URL in the configuration form first!');
        setSyncingId(null);
        return;
      }
      result = await submitToSheetDB(config, submission);
    } else if (syncMethod === 'webhook') {
      if (!config.webhookUrl) {
        alert('Please configure a valid Google Apps Script Webhook URL first!');
        setSyncingId(null);
        return;
      }
      result = await submitToGoogleSheetsWebhook(config, submission);
    } else {
      if (!activeToken) {
        alert(
          syncMethod === 'manual-token'
            ? 'Please enter your Google Sheets Manual Access Token in the configuration form!'
            : 'Please connect your Google Account or select an alternative sync method!'
        );
        setSyncingId(null);
        return;
      }
      if (!config.spreadsheetId) {
        alert('Please configure your Target Spreadsheet ID first!');
        setSyncingId(null);
        return;
      }
      result = await submitToGoogleSheetsDirectly(config, submission, activeToken);
    }
    
    // Update local state to reflect new sync status
    const updated = submissions.map(s => {
      if (s.id === submission.id) {
        return { ...s, syncStatus: result };
      }
      return s;
    });
    setSubmissions(updated);
    localStorage.setItem('natton_google_sheets_submissions', JSON.stringify(updated));
    setSyncingId(null);
  };

  const handleBulkSync = async () => {
    const activeToken = syncMethod === 'manual-token' ? config.manualToken : token;

    if (syncMethod === 'firebase') {
      // Firestore needs no credentials check as it uses the active Firebase project context!
    } else if (syncMethod === 'airtable') {
      if (!config.airtableApiKey || !config.airtableBaseId || !config.airtableTableName) {
        alert('Please configure your Airtable API credentials in the parameters form first!');
        return;
      }
    } else if (syncMethod === 'sheetdb' && !config.sheetdbUrl && !config.webhookUrl) {
      alert('Please configure your SheetDB API URL in the configuration form first!');
      return;
    } else if (syncMethod === 'webhook' && !config.webhookUrl) {
      alert('Please configure a Google Apps Script Webhook URL first!');
      return;
    } else if (syncMethod !== 'webhook' && syncMethod !== 'sheetdb' && syncMethod !== 'firebase' && syncMethod !== 'airtable' && !activeToken) {
      alert(
        syncMethod === 'manual-token'
          ? 'Please enter your Google Sheets Manual Access Token in the configuration form first!'
          : 'Please connect your Google Account first!'
      );
      return;
    } else if (syncMethod !== 'webhook' && syncMethod !== 'sheetdb' && syncMethod !== 'firebase' && syncMethod !== 'airtable' && !config.spreadsheetId) {
      alert('Please enter a Target Spreadsheet ID in the parameters card first!');
      return;
    }
    const unsynced = submissions.filter(s => s.syncStatus !== 'success');
    if (unsynced.length === 0) {
      alert('All submissions in the logs are already successfully synced!');
      return;
    }

    const modeText = syncMethod === 'firebase'
      ? 'directly to your Firebase Firestore cloud database'
      : syncMethod === 'airtable'
        ? 'directly to your Airtable table'
        : syncMethod === 'webhook' 
          ? 'via Google Apps Script Webhook' 
          : syncMethod === 'sheetdb'
            ? 'directly via SheetDB API'
            : syncMethod === 'manual-token'
              ? 'directly via Sheets API using Manual Token'
              : 'directly via Google Sheets API';
    const destText = syncMethod === 'firebase'
      ? `Firestore collection: "${config.firebaseCollection || 'leads'}"`
      : syncMethod === 'airtable'
        ? `Airtable Table: "${config.airtableTableName || 'Leads'}"`
        : syncMethod === 'webhook' 
          ? 'your configured Webhook' 
          : syncMethod === 'sheetdb'
            ? 'your configured SheetDB Google Sheet'
            : `Google Sheet: "${config.sheetName || 'FormLeads'}"`;

    if (window.confirm(`Do you want to bulk-write ${unsynced.length} unsynced form submissions ${modeText} into ${destText}?`)) {
      setIsBulkSyncing(true);
      let successCount = 0;
      let failedCount = 0;

      let currentSubmissions = [...submissions];

      for (const sub of unsynced) {
        setSyncingId(sub.id);
        let result: 'success' | 'failed' = 'failed';
        
        if (syncMethod === 'firebase') {
          result = await submitToFirebaseFirestore(config, sub);
        } else if (syncMethod === 'airtable') {
          result = await submitToAirtable(config, sub);
        } else if (syncMethod === 'sheetdb') {
          result = await submitToSheetDB(config, sub);
        } else if (syncMethod === 'webhook') {
          result = await submitToGoogleSheetsWebhook(config, sub);
        } else if (activeToken) {
          result = await submitToGoogleSheetsDirectly(config, sub, activeToken);
        }

        if (result === 'success') {
          successCount++;
        } else {
          failedCount++;
        }

        currentSubmissions = currentSubmissions.map(s => {
          if (s.id === sub.id) {
            return { ...s, syncStatus: result };
          }
          return s;
        });
        setSubmissions(currentSubmissions);
        localStorage.setItem('natton_google_sheets_submissions', JSON.stringify(currentSubmissions));
      }

      setSyncingId(null);
      setIsBulkSyncing(false);
      alert(`Bulk sync completed successfully! ${successCount} row(s) added, ${failedCount} row(s) failed.`);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(submissions);
    if (!csvContent) return;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `natton_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(s => {
    const term = searchQuery.toLowerCase();
    const formMatch = s.formName.toLowerCase().includes(term);
    const payloadMatch = Object.entries(s.payload).some(([key, val]) => 
      String(key).toLowerCase().includes(term) || String(val).toLowerCase().includes(term)
    );
    return formMatch || payloadMatch;
  });

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* ALTERNATIVE CONNECTION NOTIFICATION */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-lg">
        <AlertTriangle className="h-5.5 w-5.5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-amber-400 font-bold">Can't log in to Google? (auth/unauthorized-domain error)</strong> — When testing on <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">localhost</code> or in the preview, browser restrictions block Google's OAuth popup. Bypassing is easy: use the <strong className="text-white">Google Apps Script Webhook</strong> (fully free, zero logins) or <strong className="text-white">Manual Token</strong> method! Setup guide is on the right side card.
        </div>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0721]/30 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Synced Submissions</span>
            <h4 className="text-2xl font-black text-white">{submissions.length}</h4>
          </div>
          <div className="p-3 rounded-xl bg-[#00C2FF]/10 text-[#00C2FF]">
            <Database className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0721]/30 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Automation Status</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-2 h-2 rounded-full ${user || config.webhookUrl ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs font-mono font-bold text-white">
                {user ? 'Real-time API Sync' : config.webhookUrl ? 'Live Webhook Sync' : 'Simulated (Offline)'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${user || config.webhookUrl ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            <Server className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0B0721]/30 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Dynamic Fields</span>
            <h4 className="text-2xl font-black text-white">Auto-Schema</h4>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Google Account Authentication Panel */}
      <div className="p-5 rounded-3xl border border-[#00C2FF]/20 bg-gradient-to-r from-blue-950/20 via-[#0B0721]/50 to-purple-950/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-left">
          {user ? (
            <div className="relative shrink-0">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Google User'} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 border-emerald-500" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg uppercase border-2 border-emerald-400">
                  {user.displayName?.slice(0, 2) || 'GU'}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0B0721] animate-pulse" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#110B33] border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-[#00C2FF]" />
            </div>
          )}
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {user ? 'Google Workspace Connection Active' : 'Enable Real-time Direct Google Sheets Sync'}
              {user && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono">
                  OAuth Active
                </span>
              )}
            </h3>
            <p className="text-xs text-gray-400 max-w-xl">
              {user 
                ? `Successfully connected as ${user.displayName} (${user.email}). All incoming forms write directly to Google Sheets using the Sheets REST API.`
                : 'Connect your Google account via secure Google OAuth. Once linked, all form submissions will append directly to your target Spreadsheet in real time, bypassing webhooks!'}
            </p>
            {!user && (
              <button
                type="button"
                onClick={() => setShowTroubleshoot(!showTroubleshoot)}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 transition-colors mt-1 underline cursor-pointer"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                {showTroubleshoot ? 'Hide Localhost Auth Setup Guide' : 'Unable to sign in on localhost? See Setup Guide'}
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Disconnect Account
            </button>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="font-mono text-xs font-bold bg-white text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <RefreshCw className="h-4 w-4 animate-spin text-gray-600" />
              ) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4 shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              {isLoggingIn ? 'Connecting...' : 'Connect Google Sheets'}
            </button>
          )}
        </div>
      </div>

      {/* Localhost & OAuth Sign-In Troubleshooting Diagnostics Panel */}
      {showTroubleshoot && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl border border-amber-500/20 bg-amber-950/10 backdrop-blur-md space-y-4 text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <h4 className="font-bold text-sm">Localhost & Google OAuth Troubleshooting Console</h4>
            </div>
            <button 
              type="button"
              onClick={() => setShowTroubleshoot(false)} 
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-gray-300 space-y-1">
              <div className="text-rose-400 font-bold">Captured Firebase Auth Error:</div>
              <div><span className="text-gray-500">Error Code:</span> {loginError.code}</div>
              <div className="break-all"><span className="text-gray-500">Message:</span> {loginError.message}</div>
            </div>
          )}

          <div className="text-xs text-gray-300 space-y-3 font-sans">
            <p>
              When testing Google Authentication on a local machine (<code className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-amber-300">localhost</code>), several browser security features and Firebase configurations must be set up properly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Step 1: Authorized Domains */}
              <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3 col-span-1 md:col-span-2">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Step 1: Add Authorized Domains</span>
                <p className="text-[11px] leading-relaxed text-gray-300">
                  By default, Firebase restricts Google sign-in popups to specific domains for security. When testing on localhost or a local IP (like <code className="text-white font-mono">{window.location.hostname}</code>), you must register this host. Here are two ways to do this:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Method A */}
                  <div className="p-3 rounded-xl bg-white/5 space-y-1.5 border border-white/5">
                    <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase">Method A: Via Firebase Console</span>
                    <ol className="list-decimal pl-4 text-[10px] text-gray-400 space-y-1">
                      <li>Go to the <a href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`} target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-bold inline-flex items-center gap-0.5">Firebase Auth Settings <ExternalLink className="h-2.5 w-2.5" /></a></li>
                      <li>At the top, click on the <strong className="text-white">Settings</strong> tab (next to <em>Users</em> and <em>Sign-in method</em>).</li>
                      <li>In the left-hand sub-menu of the Settings tab, click <strong className="text-white">Authorized domains</strong>.</li>
                      <li>Click the <strong className="text-white font-mono bg-emerald-500/20 text-emerald-300 px-1 rounded">Add domain</strong> button on the right, type your host/IP, and click Add.</li>
                    </ol>
                  </div>

                  {/* Method B */}
                  <div className="p-3 rounded-xl bg-white/5 space-y-1.5 border border-white/5">
                    <span className="text-[10px] font-bold text-amber-400 font-mono uppercase">Method B: Via Google Cloud Console (Alternative)</span>
                    <ol className="list-decimal pl-4 text-[10px] text-gray-400 space-y-1">
                      <li>Go to the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-bold inline-flex items-center gap-0.5">GCP Credentials page <ExternalLink className="h-2.5 w-2.5" /></a> (select project <code className="text-emerald-400">{firebaseConfig.projectId}</code>).</li>
                      <li>Under "OAuth 2.0 Client IDs", click your <strong className="text-white">Web Client</strong>.</li>
                      <li>Scroll to <strong className="text-white">Authorized JavaScript origins</strong> and add: <code className="text-white block font-mono text-[9px] bg-black/40 p-1 rounded mt-0.5">http://{window.location.hostname === 'localhost' ? 'localhost:3000' : `${window.location.hostname}:3000`}</code></li>
                      <li>Scroll to <strong className="text-white">Authorized redirect URIs</strong> and add: <code className="text-white block font-mono text-[9px] bg-black/40 p-1 rounded mt-0.5">https://{firebaseConfig.projectId}.firebaseapp.com/__/auth/handler</code></li>
                    </ol>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/10 flex flex-col gap-1">
                  <div className="text-[10px] uppercase font-mono font-bold text-amber-400">Values to register in your Console:</div>
                  <div className="flex flex-wrap gap-2 mt-1 font-mono text-[10.5px]">
                    <span className="text-gray-500 text-[9px] uppercase self-center">Current Domain:</span>
                    <code className="px-1.5 py-0.5 rounded bg-rose-950/40 border border-rose-500/20 text-rose-300 font-bold select-all" title="Click to select and copy">
                      {window.location.hostname}
                    </code>
                    <span className="text-gray-500 text-[9px] uppercase self-center">Standard Fallbacks:</span>
                    <code className="px-1.5 py-0.5 rounded bg-black/40 text-gray-400 select-all">localhost</code>
                    <code className="px-1.5 py-0.5 rounded bg-black/40 text-gray-400 select-all">127.0.0.1</code>
                  </div>
                </div>
              </div>

              {/* Step 2: Third-Party Cookies & Brave Shields */}
              <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Step 2: Browser Blockers & Cookies</span>
                <p className="text-[11px] leading-relaxed">
                  If you are using **Brave**, **Safari**, or Chrome with strict privacy settings, the Google login popups are often blocked, or Firebase is blocked from writing connection state cookies.
                </p>
                <ul className="list-disc pl-4 text-[10px] text-gray-400 space-y-1">
                  <li>Disable **Brave Shields** or ad-blockers for <code className="text-white font-mono">localhost</code>.</li>
                  <li>Enable third-party cookies or cross-site tracking in your browser's settings page.</li>
                  <li>Verify that your browser address bar is not showing a "Pop-up Blocked" icon.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-gray-400 flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0 text-[#00C2FF]" />
              <span>
                <strong>Offline Webhook Fallback:</strong> You can also use the <strong>Google Apps Script Webhook</strong> method on the right side card to sync forms entirely local/offline without Google Sign-In!
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Submissions Table - 8 cols */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2">
              <div className="space-y-1">
                <h3 className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-[#00C2FF]" />
                  Interactive Google Sheet Row Console
                </h3>
                <p className="text-xs text-gray-400">Every single form submission on the site is captured, structured, and synced to Google Sheets here.</p>
              </div>

              <div className="flex gap-2">
                {(token || config.webhookUrl || config.sheetdbUrl || config.manualToken) && (
                  <button
                    onClick={handleBulkSync}
                    disabled={isBulkSyncing || submissions.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  >
                    {isBulkSyncing ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                    )}
                    Bulk Sync Unsynced
                  </button>
                )}
                <button
                  onClick={handleDownloadCSV}
                  disabled={submissions.length === 0}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  <Download className="h-3 w-3 text-[#00C2FF]" /> Export CSV
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={submissions.length === 0}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-[10px] font-mono flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-3 w-3" /> Clear Logs
                </button>
              </div>
            </div>

            {/* Filter Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search leads by name, email, phone, form name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:border-[#00C2FF] focus:outline-none"
              />
            </div>

            {/* Submissions Grid */}
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[9px] tracking-wider uppercase">
                    <th className="p-3">Source Form</th>
                    <th className="p-3">Primary Contact</th>
                    <th className="p-3">Details Summary</th>
                    <th className="p-3">Date Submitted</th>
                    <th className="p-3">Sync State</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500 font-mono">
                        No submissions recorded matching query. Test any form on the site!
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => {
                      // Extract name, email, or placeholder summary
                      const p = sub.payload;
                      const contactName = p['Full Name'] || p['Contact Name'] || p['Name'] || 'Anonymous User';
                      const contactEmail = p['Corporate Email'] || p['Email'] || p['User Email'] || '';
                      
                      // Filter keys for summary
                      const summaryFields = Object.entries(p)
                        .filter(([k]) => !['Full Name', 'Contact Name', 'Name', 'Corporate Email', 'Email', 'User Email', 'Phone', 'Mobile Contact Number'].includes(k))
                        .slice(0, 2)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' | ');

                      return (
                        <tr key={sub.id} className="hover:bg-white/[0.01] transition-all cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                          <td className="p-3 font-bold text-white shrink-0">
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/15 text-[9px] font-mono">
                              {sub.formName}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-gray-200">{contactName}</div>
                            <div className="text-gray-500 text-[9px] font-mono">{contactEmail}</div>
                          </td>
                          <td className="p-3 max-w-xs truncate text-gray-400">
                            {summaryFields || <span className="text-gray-600 italic">No extra attributes</span>}
                          </td>
                          <td className="p-3 text-gray-500 font-mono">
                            {new Date(sub.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td className="p-3">
                            {sub.syncStatus === 'success' ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono flex items-center w-max gap-1">
                                <CheckCircle className="h-2.5 w-2.5" /> Google Sheets Synced
                              </span>
                            ) : sub.syncStatus === 'simulated' ? (
                              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono flex items-center w-max gap-1">
                                <Info className="h-2.5 w-2.5" /> Simulated Cache
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-mono flex items-center w-max gap-1">
                                <AlertTriangle className="h-2.5 w-2.5" /> Sync Failed
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end gap-1.5">
                              {(config.webhookUrl || config.sheetdbUrl || config.manualToken || token) && (
                                <button
                                  onClick={() => handleTriggerSync(sub)}
                                  disabled={syncingId === sub.id}
                                  className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
                                  title={syncMethod === 'sheetdb' ? "Push to SheetDB" : token ? "Push to Google Sheets directly" : "Repush to Webhook"}
                                >
                                  {syncingId === sub.id ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Play className="h-3 w-3" />
                                  )}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteRow(sub.id)}
                                className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                                title="Delete submission log"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Webhook Setup & Google sheet settings - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* Settings panel */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#00C2FF]" />
              Sync Setup Parameters
            </h3>
            
            <form onSubmit={handleSaveConfig} className="space-y-4">
              {/* Connection Strategy Tabs */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Sync Connection Method</label>
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/40 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('firebase')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'firebase' 
                        ? 'bg-emerald-500 text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    🔥 Firebase DB
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('airtable')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'airtable' 
                        ? 'bg-[#00C2FF] text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ⚡ Airtable CRM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('sheetdb')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'sheetdb' 
                        ? 'bg-[#00C2FF] text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    SheetDB API
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('webhook')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'webhook' 
                        ? 'bg-[#00C2FF] text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Apps Script
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('oauth')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'oauth' 
                        ? 'bg-[#00C2FF] text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    OAuth Login
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetSyncMethod('manual-token')}
                    className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      syncMethod === 'manual-token' 
                        ? 'bg-[#00C2FF] text-black shadow font-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Manual Token
                  </button>
                </div>
              </div>

              {syncMethod !== 'firebase' && syncMethod !== 'airtable' && (
                <>
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
                      Target Spreadsheet ID {syncMethod === 'sheetdb' && <span className="text-[9px] text-gray-500 lowercase">(optional for SheetDB)</span>}
                    </label>
                    <input
                      type="text"
                      value={config.spreadsheetId}
                      onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
                      placeholder="1BxiMVs...U"
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                      required={syncMethod !== 'sheetdb'}
                    />
                    {isFetchingTitle ? (
                      <span className="text-[9px] text-gray-500 mt-1 block animate-pulse">Loading spreadsheet properties...</span>
                    ) : spreadsheetTitle ? (
                      <span className="text-[10px] text-emerald-400 font-medium mt-1 block">Live Spreadsheet: <strong className="font-bold font-mono text-xs">"{spreadsheetTitle}"</strong></span>
                    ) : null}
                    {tokenError === "session_expired" && (syncMethod === 'oauth' || syncMethod === 'manual-token') && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] leading-normal font-sans">
                        <strong>⚠️ Google Session Expired:</strong> Your authorization has expired (Google access tokens last 1 hour). Please click <strong>"OAuth Login"</strong> above to refresh access and ensure form data stores.
                      </div>
                    )}
                    {tokenError === "forbidden" && (syncMethod === 'oauth' || syncMethod === 'manual-token') && (
                      <div className="mt-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] leading-normal font-sans">
                        <strong>⚠️ Permission Denied:</strong> This Google account doesn't have read/write access to this Spreadsheet. Check if you shared it or have correct permissions.
                      </div>
                    )}
                    {tokenError === "not_found" && (syncMethod === 'oauth' || syncMethod === 'manual-token') && (
                      <div className="mt-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] leading-normal font-sans">
                        <strong>⚠️ Spreadsheet Not Found:</strong> The Spreadsheet ID could not be found. Double check your sheet ID or sheet URL.
                      </div>
                    )}
                    {tokenError === "invalid" && (syncMethod === 'oauth' || syncMethod === 'manual-token') && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] leading-normal font-sans">
                        <strong>⚠️ Connection Error:</strong> Unable to retrieve spreadsheet title. Please verify your credentials or try clicking <strong>"OAuth Login"</strong>.
                      </div>
                    )}
                    {config.spreadsheetId && (
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${extractSpreadsheetId(config.spreadsheetId)}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#00C2FF] hover:underline mt-1.5 flex items-center gap-1 font-mono"
                      >
                        <span>↗ Open sheet in Google Sheets</span>
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Target Worksheet Name</label>
                    <input
                      type="text"
                      value={config.sheetName}
                      onChange={(e) => setConfig({ ...config, sheetName: e.target.value })}
                      placeholder="FormLeads"
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                      required
                    />
                  </div>
                </>
              )}

              {syncMethod === 'firebase' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Firestore Collection Name</label>
                    <input
                      type="text"
                      value={config.firebaseCollection || 'leads'}
                      onChange={(e) => setConfig({ ...config, firebaseCollection: e.target.value })}
                      placeholder="leads"
                      className="w-full p-2.5 bg-black/40 border border-[#00C2FF] rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                      required
                    />
                    <span className="text-[9px] text-gray-500 mt-1 block">
                      Saved directly in your active Firebase database. Requires <strong>ZERO setup</strong> or external API keys!
                    </span>
                  </div>

                  {!db ? (
                    <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-[10px] leading-relaxed text-gray-300 space-y-2 font-sans text-left">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono uppercase font-bold text-[9px] tracking-wider">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400" /> Firestore Database Not Enabled
                      </div>
                      <p className="text-[10.5px]">
                        The Firestore database service is not yet enabled in this Firebase project (<code>{firebaseConfig.projectId}</code>).
                      </p>
                      <p className="text-[9.5px] text-gray-400">
                        💡 To use this, please enable Firestore in your project console or choose one of our other zero-setup methods: <strong>⚡ Airtable CRM</strong>, <strong>SheetDB API</strong>, or <strong>Apps Script Webhook</strong>.
                      </p>
                      <a
                        href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00C2FF] hover:underline font-mono text-[9.5px] font-semibold mt-1 block flex items-center gap-0.5"
                      >
                        ↗ Open Firebase Console to enable Firestore
                      </a>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-[10px] leading-relaxed text-gray-300 space-y-2 font-sans text-left">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono uppercase font-bold text-[9px] tracking-wider">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> Zero-Config Cloud Storage Activated!
                      </div>
                      <p className="text-[10.5px]">
                        Your form submissions will be stored securely in the cloud under collection: <code className="text-emerald-400">"{config.firebaseCollection || 'leads'}"</code>.
                      </p>
                      <p className="text-[9.5px] text-gray-400">
                        💡 <em>This acts as a solid database backup. You can also view and query the logs below, or download them as a CSV format anytime!</em>
                      </p>
                      <a
                        href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00C2FF] hover:underline font-mono text-[9.5px] font-semibold mt-1 block flex items-center gap-0.5"
                      >
                        ↗ Open live Firestore database console
                      </a>
                    </div>
                  )}
                </div>
              )}

              {syncMethod === 'airtable' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Airtable Personal Access Token (API Key)</label>
                    <input
                      type="password"
                      value={config.airtableApiKey || ''}
                      onChange={(e) => setConfig({ ...config, airtableApiKey: e.target.value })}
                      placeholder="pat..."
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Airtable Base ID</label>
                    <input
                      type="text"
                      value={config.airtableBaseId || ''}
                      onChange={(e) => setConfig({ ...config, airtableBaseId: e.target.value })}
                      placeholder="app..."
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Airtable Table Name</label>
                    <input
                      type="text"
                      value={config.airtableTableName || 'Leads'}
                      onChange={(e) => setConfig({ ...config, airtableTableName: e.target.value })}
                      placeholder="Leads"
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#00C2FF]/5 border border-[#00C2FF]/15 text-[10px] leading-relaxed text-gray-300 space-y-1 font-sans text-left">
                    <div className="flex items-center gap-1.5 text-[#00C2FF] font-mono uppercase font-bold text-[9px] tracking-wider">
                      <Info className="h-3.5 w-3.5 shrink-0 text-[#00C2FF]" /> Airtable Sync Guide:
                    </div>
                    <p className="text-[10px]">
                      Make sure your Airtable Table has columns matching your payload names (e.g. <strong>ID</strong>, <strong>Timestamp</strong>, <strong>Form Source</strong>, etc.) as Airtable requires columns to exist.
                    </p>
                  </div>
                </div>
              )}

              {syncMethod === 'sheetdb' && (
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">SheetDB API URL</label>
                    <input
                      type="url"
                      value={config.sheetdbUrl || ''}
                      onChange={(e) => setConfig({ ...config, sheetdbUrl: e.target.value })}
                      placeholder="https://sheetdb.io/api/v1/your_api_id"
                      className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                      required
                    />
                    <span className="text-[9px] text-gray-500 mt-1 block">
                      Zero login required! Paste the SheetDB API URL here. It will write straight to your sheet (defaults to worksheet: <strong>{config.sheetName || 'FormLeads'}</strong>).
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#00C2FF]/5 border border-[#00C2FF]/15 text-[10px] leading-relaxed text-gray-300 space-y-2 font-sans text-left">
                    <div className="flex items-center gap-1.5 text-[#00C2FF] font-mono uppercase font-bold text-[9px] tracking-wider">
                      <Info className="h-3.5 w-3.5 shrink-0" /> SheetDB Sync Requirements:
                    </div>
                    <p className="text-[10.5px]">
                      SheetDB is <strong>case-sensitive</strong> and maps form values directly to existing headers. If your Google Sheet is completely blank, SheetDB will return success but <strong>store nothing</strong>.
                    </p>
                    <div className="space-y-1">
                      <span className="font-semibold text-white block text-[9.5px]">Make sure Row 1 of your sheet contains these exact headers:</span>
                      <div className="p-2 rounded bg-black/60 font-mono text-[9px] text-[#00C2FF] flex flex-wrap gap-x-1.5 gap-y-1 border border-white/5 select-all">
                        <span>ID</span> • <span>Timestamp</span> • <span>Form Source</span> • <span>Full Name</span> • <span>Corporate Email</span> • <span>Mobile Contact Number</span> • <span>Organization</span> • <span>Message</span> • <span>Page Header</span> • <span>Page URL</span>
                      </div>
                    </div>
                    <p className="text-[9.5px] text-gray-400">
                      💡 <em>Our system dynamically matches any casing variations in your existing columns to ensure high-fidelity delivery.</em>
                    </p>
                  </div>
                </div>
              )}

              {syncMethod === 'webhook' && (
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Apps Script Webhook URL</label>
                  <input
                    type="url"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                    required
                  />
                  <span className="text-[9px] text-gray-500 mt-1 block">
                    Zero login required. Runs entirely on your own Google Script!
                  </span>
                </div>
              )}

              {syncMethod === 'manual-token' && (
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Google Sheets OAuth Access Token</label>
                  <input
                    type="text"
                    value={config.manualToken || ''}
                    onChange={(e) => setConfig({ ...config, manualToken: e.target.value })}
                    placeholder="Paste Bearer Token (ya29.a0Ax...)"
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                    required
                  />
                  <span className="text-[9px] text-gray-500 mt-1 block">
                    Paste a temporary Sheets API token to bypass Google popups entirely.
                  </span>
                </div>
              )}

              {syncMethod === 'oauth' && (
                <div className="py-1">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1.5">Connection State</label>
                  {user ? (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>Logged in as <strong>{user.email}</strong></span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>Google Account is not connected</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className="w-full py-1.5 bg-white hover:bg-gray-100 text-black text-[10px] font-black font-mono rounded-lg cursor-pointer transition-colors"
                      >
                        {isLoggingIn ? 'Connecting...' : 'Connect Google Sheets'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase">Automatic Background Sync</span>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, autoSync: !config.autoSync })}
                  className={`w-10 h-5 rounded-full transition-all flex items-center p-0.5 ${config.autoSync ? 'bg-[#00C2FF]' : 'bg-gray-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${config.autoSync ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00C2FF] text-black font-black text-xs font-mono flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Check className="h-4 w-4" /> Save Configuration
              </button>
            </form>

            {saveSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono text-center">
                ✓ Sync settings successfully saved!
              </div>
            )}
          </div>

          {/* Quick instructions panel */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Code className="h-4 w-4 text-purple-400" />
              1-Minute Sheets Setup Guide
            </h3>
            
            <div className="text-[10px] leading-relaxed text-gray-400 space-y-3 font-sans">
              <p>Connect any Google Sheet to this live application completely free in 4 simple steps:</p>
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>Create a <strong>Google Sheet</strong> and copy its URL ID.</li>
                <li>Go to <strong>Extensions &gt; Apps Script</strong>.</li>
                <li>Paste the copyable integration macro script block below.</li>
                <li>Click <strong>Deploy &gt; New Deployment</strong>, choose <strong>Web App</strong>, set Access to <strong>"Anyone"</strong>, then copy the web app URL and paste it in the webhook box above!</li>
              </ol>

              <button
                onClick={handleCopyScript}
                className="w-full mt-2 py-2 rounded-xl bg-purple-500/15 border border-purple-500/20 hover:bg-purple-500/20 text-purple-300 font-bold text-[10px] font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedScript ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" /> Script Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy Deployment Script
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSION ROW DETAILS MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedSubmission(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0F0A30] p-6 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase">Lead Metadata Detail Log</span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/15 text-[10px] font-mono">
                  {selectedSubmission.formName}
                </span>
                Submission ID: {selectedSubmission.id}
              </h3>
              <p className="text-[10px] font-mono text-gray-500">
                Logged on {new Date(selectedSubmission.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="border-t border-b border-white/10 py-4 max-h-[300px] overflow-y-auto space-y-3">
              {Object.entries(selectedSubmission.payload).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-[10px] font-mono text-[#00C2FF] uppercase sm:col-span-1">{key}</span>
                  <span className="text-xs text-gray-200 sm:col-span-2 bg-black/30 p-2 rounded-lg font-sans border border-white/[0.02]">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                Close Details
              </button>
              {(config.webhookUrl || token) && (
                <button
                  onClick={() => {
                    handleTriggerSync(selectedSubmission);
                    setSelectedSubmission(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-95 transition-opacity"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Re-sync with Sheets
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
