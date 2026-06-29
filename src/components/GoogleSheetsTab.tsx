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
  AlertTriangle
} from 'lucide-react';
import { 
  getGoogleSheetsConfig, 
  saveGoogleSheetsConfig, 
  getFormSubmissions, 
  submitToGoogleSheetsWebhook, 
  deleteSubmission, 
  clearAllSubmissions, 
  convertToCSV, 
  GOOGLE_APPS_SCRIPT_CODE,
  GoogleSheetSubmission,
  GoogleSheetsConfig
} from '../utils/googleSheets';

export default function GoogleSheetsTab() {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    spreadsheetId: '',
    sheetName: '',
    webhookUrl: '',
    autoSync: true
  });
  const [submissions, setSubmissions] = useState<GoogleSheetSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<GoogleSheetSubmission | null>(null);

  // Load configuration and submissions on mount
  useEffect(() => {
    setConfig(getGoogleSheetsConfig());
    setSubmissions(getFormSubmissions());
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleSheetsConfig(config);
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
    if (!config.webhookUrl) {
      alert('Please configure a valid Google Apps Script Webhook URL first in the Settings panel!');
      return;
    }
    setSyncingId(submission.id);
    const result = await submitToGoogleSheetsWebhook(config, submission);
    
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
              <div className={`w-2 h-2 rounded-full ${config.webhookUrl ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs font-mono font-bold text-white">
                {config.webhookUrl ? 'Live Apps Script' : 'Simulated (Offline)'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${config.webhookUrl ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
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
                              {config.webhookUrl && (
                                <button
                                  onClick={() => handleTriggerSync(sub)}
                                  disabled={syncingId === sub.id}
                                  className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
                                  title="Repush to Google Sheet Webhook"
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
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Target Spreadsheet ID</label>
                <input
                  type="text"
                  value={config.spreadsheetId}
                  onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
                  placeholder="1BxiMVs...U"
                  className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                  required
                />
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

              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Apps Script Webhook URL</label>
                <input
                  type="url"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                />
                <span className="text-[9px] text-gray-500 mt-1 block">Leave empty to run in simulated cache mode.</span>
              </div>

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
                className="w-full py-2.5 rounded-xl bg-[#00C2FF] text-black font-black text-xs font-mono flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
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
              {config.webhookUrl && (
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
