import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Search, 
  ChevronRight, 
  User, 
  Building, 
  Mail, 
  BookOpen, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  Zap, 
  BarChart, 
  ArrowUpRight, 
  Sliders, 
  X, 
  FileText, 
  Database, 
  Clock, 
  Info, 
  Globe, 
  Terminal, 
  Lock, 
  Share2, 
  Copy, 
  Workflow, 
  Monitor, 
  Phone, 
  Shield, 
  ShieldCheck, 
  MessageSquare, 
  Compass, 
  Activity, 
  Code, 
  CreditCard, 
  ShoppingBag, 
  Server, 
  Settings, 
  Key, 
  Network, 
  Briefcase, 
  Users, 
  CheckSquare, 
  RefreshCw, 
  SlidersHorizontal
} from 'lucide-react';
import { RoutePath } from '../types';

interface IntegrationsProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

interface IntegrationItem {
  name: string;
  category: 'CRM' | 'Communication' | 'AI Platforms' | 'Payments' | 'ERP' | 'Marketing' | 'Analytics' | 'Ecommerce' | 'Productivity' | 'Databases' | 'Cloud Platforms' | 'Custom APIs';
  description: string;
  popularity: 'High' | 'Medium' | 'Enterprise';
  status: 'Active' | 'Beta' | 'Certified';
  latency: string;
  color: string;
}

export default function Integrations({ setPath, darkMode }: IntegrationsProps) {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPopularity, setSelectedPopularity] = useState<string>('All');

  // Interactive node graph / flow path selected
  const [activeArchStep, setActiveArchStep] = useState<number>(0);

  // Workflow builder state
  const [workflowNodes, setWorkflowNodes] = useState<Array<{ id: string; name: string; type: string; status: 'waiting' | 'success' | 'active' }>>([
    { id: 'wn-1', name: 'Web Booking Trigger', type: 'Trigger', status: 'success' },
    { id: 'wn-2', name: 'HubSpot Sync', type: 'Action', status: 'success' },
    { id: 'wn-3', name: 'Gemini AI Qualifier', type: 'Agent', status: 'active' },
    { id: 'wn-4', name: 'Twilio SMS Dispatch', type: 'Action', status: 'waiting' },
  ]);
  const [isSimulatingWorkflow, setIsSimulatingWorkflow] = useState(false);
  const [workflowLogs, setWorkflowLogs] = useState<string[]>([]);

  // Developer tab code switcher
  const [devLang, setDevLang] = useState<'curl' | 'node' | 'python'>('node');

  // Gated Custom Integration request state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formLogs, setFormLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    currentSoftware: '',
    requiredIntegration: '',
    country: 'United States',
    email: '',
    phone: '',
    message: '',
    acceptTerms: true
  });

  // Smart Recommender module
  const [recommendationTarget, setRecommendationTarget] = useState<string>('ecommerce');

  // FAQ collapse indexes
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]);

  // Clipboard copy feedbacks
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);

  // 100+ Integrations Array mapping Zapier, n8n, HubSpot, Stripe etc
  const allIntegrations: IntegrationItem[] = [
    // CRM
    { name: 'GoHighLevel', category: 'CRM', description: 'Two-way lead capture, webhook triggers, pipeline stage automations, and contact tracking.', popularity: 'Enterprise', status: 'Certified', latency: '< 150ms', color: 'from-blue-600 to-indigo-600' },
    { name: 'HubSpot', category: 'CRM', description: 'Synchronize contact logs, custom lifecycle pipelines, engagement events, and company properties.', popularity: 'High', status: 'Certified', latency: '< 180ms', color: 'from-orange-500 to-red-500' },
    { name: 'Salesforce', category: 'CRM', description: 'Enterprise lead ingestion, custom object matching, and high-frequency bulk records streaming.', popularity: 'Enterprise', status: 'Certified', latency: '< 220ms', color: 'from-sky-500 to-blue-500' },
    { name: 'Zoho CRM', category: 'CRM', description: 'Sync deals, accounts, and tasks triggered directly from client messaging applications.', popularity: 'Medium', status: 'Active', latency: '< 240ms', color: 'from-red-600 to-yellow-600' },
    { name: 'Pipedrive', category: 'CRM', description: 'Deals automation, custom activities triggers, and multi-currency value tracking.', popularity: 'Medium', status: 'Active', latency: '< 190ms', color: 'from-green-600 to-teal-600' },
    { name: 'Freshsales', category: 'CRM', description: 'Automate sales pipeline alerts and logs synced with unified support channels.', popularity: 'Medium', status: 'Active', latency: '< 250ms', color: 'from-cyan-500 to-blue-600' },
    { name: 'Capsule CRM', category: 'CRM', description: 'Simple contact relationships mapping and activity reminders automation.', popularity: 'Medium', status: 'Beta', latency: '< 300ms', color: 'from-slate-600 to-indigo-500' },
    { name: 'ActiveCampaign', category: 'CRM', description: 'Unified customer experience automation, email tags, and predictive deal logging.', popularity: 'High', status: 'Certified', latency: '< 170ms', color: 'from-blue-700 to-sky-600' },
    { name: 'Copper CRM', category: 'CRM', description: 'Native Google Workspace relationships mapping and task generation on deal changes.', popularity: 'Medium', status: 'Active', latency: '< 210ms', color: 'from-purple-600 to-indigo-500' },
    { name: 'Keap Infusionsoft', category: 'CRM', description: 'Automated CRM, email campaigns, and client billing checkpoints synchronization.', popularity: 'Medium', status: 'Active', latency: '< 280ms', color: 'from-emerald-600 to-green-600' },

    // Communication
    { name: 'WhatsApp', category: 'Communication', description: 'Meta Cloud API nodes to dispatch catalog triggers, transaction statements, and instant support chats.', popularity: 'High', status: 'Certified', latency: '< 100ms', color: 'from-green-500 to-emerald-600' },
    { name: 'MCube', category: 'Communication', description: 'Virtual cloud telephony numbers mapping inbound calls with recording transcription relays.', popularity: 'Enterprise', status: 'Certified', latency: '< 200ms', color: 'from-cyan-600 to-indigo-600' },
    { name: 'Twilio', category: 'Communication', description: 'SMS gateways, outbound calling trunks, and real-time Interactive Voice Response (IVR) maps.', popularity: 'High', status: 'Certified', latency: '< 120ms', color: 'from-red-500 to-rose-600' },
    { name: 'Exotel', category: 'Communication', description: 'Outbound cloud dialer arrays capturing response timestamps and routing successful call loops.', popularity: 'Enterprise', status: 'Certified', latency: '< 230ms', color: 'from-indigo-600 to-blue-500' },
    { name: 'Telegram', category: 'Communication', description: 'Direct bot channels, customer support group streams, and fast document payload transfers.', popularity: 'Medium', status: 'Active', latency: '< 90ms', color: 'from-sky-400 to-blue-500' },
    { name: 'Slack', category: 'Communication', description: 'Instant notification channels, webhook payloads, slash commands, and internal workflow warnings.', popularity: 'High', status: 'Certified', latency: '< 80ms', color: 'from-purple-500 to-pink-500' },
    { name: 'Microsoft Teams', category: 'Communication', description: 'Corporate workspace channels, meeting hooks, and security alert reports routing.', popularity: 'High', status: 'Certified', latency: '< 160ms', color: 'from-blue-600 to-indigo-500' },
    { name: 'Transactional Email', category: 'Communication', description: 'High-reputation SMTP routes ensuring 99.9% inbox placement with deep engagement logs.', popularity: 'High', status: 'Certified', latency: '< 130ms', color: 'from-slate-500 to-slate-700' },
    { name: 'Zoom', category: 'Communication', description: 'Auto-schedule rooms on demo booking, create webinars, and ingest participant lists.', popularity: 'High', status: 'Certified', latency: '< 150ms', color: 'from-blue-500 to-cyan-500' },
    { name: 'Discord', category: 'Communication', description: 'Community support webhooks, role tracking, and activity logging.', popularity: 'Medium', status: 'Active', latency: '< 95ms', color: 'from-indigo-500 to-purple-600' },

    // AI Platforms
    { name: 'OpenAI API', category: 'AI Platforms', description: 'Trigger GPT-4o context parsing, custom assistant instructions, and semantic evaluation.', popularity: 'High', status: 'Certified', latency: '< 400ms', color: 'from-green-600 to-emerald-700' },
    { name: 'Anthropic Claude', category: 'AI Platforms', description: 'Deep reasoning, financial quote auditing, and compliance document validation.', popularity: 'High', status: 'Certified', latency: '< 500ms', color: 'from-amber-600 to-orange-700' },
    { name: 'Google Gemini', category: 'AI Platforms', description: 'Native multi-modal evaluations, lightning-fast text streams, and local search grounding.', popularity: 'High', status: 'Certified', latency: '< 300ms', color: 'from-blue-500 to-purple-500' },
    { name: 'Perplexity AI', category: 'AI Platforms', description: 'Search-grounded real-time brand answers, competitive tracking, and intelligence logs.', popularity: 'Medium', status: 'Beta', latency: '< 600ms', color: 'from-teal-600 to-cyan-700' },
    { name: 'DeepSeek', category: 'AI Platforms', description: 'Highly affordable structured code syntax and variable verification nodes.', popularity: 'Medium', status: 'Beta', latency: '< 450ms', color: 'from-blue-700 to-indigo-800' },
    { name: 'Grok xAI', category: 'AI Platforms', description: 'Social analytics, live query parsing, and conversational trends extraction.', popularity: 'Medium', status: 'Beta', latency: '< 550ms', color: 'from-slate-800 to-zinc-900' },
    { name: 'Pinecone DB', category: 'AI Platforms', description: 'High-performance vector memory table lookup for customer context retrieval (RAG).', popularity: 'Enterprise', status: 'Active', latency: '< 50ms', color: 'from-indigo-600 to-purple-600' },
    { name: 'LangChain', category: 'AI Platforms', description: 'Multi-step cognitive chain tracking and localized state memory validation.', popularity: 'Medium', status: 'Active', latency: '< 120ms', color: 'from-emerald-500 to-cyan-500' },
    { name: 'Cohere', category: 'AI Platforms', description: 'Multilingual customer intent classification and semantic routing matrices.', popularity: 'Enterprise', status: 'Active', latency: '< 250ms', color: 'from-purple-700 to-pink-600' },
    { name: 'Hugging Face', category: 'AI Platforms', description: 'Deploy open-source classification, audio transcribing, and custom translation models.', popularity: 'Medium', status: 'Active', latency: '< 350ms', color: 'from-yellow-500 to-orange-500' },

    // Payments
    { name: 'Stripe', category: 'Payments', description: 'Process invoices, check checkout completions, sync refunds, and log recurring subscription events.', popularity: 'High', status: 'Certified', latency: '< 110ms', color: 'from-indigo-500 to-violet-600' },
    { name: 'Razorpay', category: 'Payments', description: 'Inbound checkout triggers, smart routing, payment page links, and Indian UPI states logging.', popularity: 'High', status: 'Certified', latency: '< 140ms', color: 'from-blue-500 to-cyan-600' },
    { name: 'PayPal', category: 'Payments', description: 'Global checkout invoices, transaction disputes alerts, and multi-currency ledger syncing.', popularity: 'High', status: 'Certified', latency: '< 180ms', color: 'from-blue-800 to-blue-600' },
    { name: 'Cashfree Payments', category: 'Payments', description: 'Instant bank transfer nodes, recurring mandate validation, and local checkout routing.', popularity: 'Medium', status: 'Active', latency: '< 150ms', color: 'from-emerald-500 to-teal-600' },
    { name: 'PhonePe PG', category: 'Payments', description: 'Direct checkout flows, QR code triggers, and localized transaction notifications.', popularity: 'Medium', status: 'Active', latency: '< 130ms', color: 'from-purple-600 to-indigo-700' },
    { name: 'Unified UPI', category: 'Payments', description: 'Zero-fee direct bank transfers, dynamic merchant QR generation, and real-time status callbacks.', popularity: 'High', status: 'Certified', latency: '< 80ms', color: 'from-emerald-600 to-cyan-600' },
    { name: 'Square', category: 'Payments', description: 'Point-of-sale inventory synchronizer, terminal charges tracking, and customer profiles updates.', popularity: 'Medium', status: 'Active', latency: '< 160ms', color: 'from-slate-700 to-slate-900' },
    { name: 'Adyen', category: 'Payments', description: 'Enterprise global payment clearing, multi-route logic, and dispute logs.', popularity: 'Enterprise', status: 'Active', latency: '< 200ms', color: 'from-green-600 to-emerald-500' },
    { name: 'Braintree', category: 'Payments', description: 'Secure vaulting, card verification, and automatic transaction webhooks.', popularity: 'Medium', status: 'Active', latency: '< 170ms', color: 'from-cyan-600 to-blue-700' },
    { name: 'Wise Business', category: 'Payments', description: 'Automated international invoice payments, real-time rate quotes, and payout logs.', popularity: 'Medium', status: 'Active', latency: '< 220ms', color: 'from-emerald-400 to-green-500' },

    // ERP & Accounting
    { name: 'Tally Prime', category: 'ERP', description: 'Local XML ledger imports, ledger state syncing, tax data processing, and compliance reporting.', popularity: 'Enterprise', status: 'Certified', latency: '< 300ms', color: 'from-emerald-700 to-green-600' },
    { name: 'ERPNext', category: 'ERP', description: 'Open-source warehouse inventory syncing, purchase order queues, and custom sales receipts.', popularity: 'Enterprise', status: 'Active', latency: '< 210ms', color: 'from-blue-600 to-indigo-600' },
    { name: 'SAP ERP', category: 'ERP', description: 'Legacy system integrations, financial ledger entries, material movements, and client audits.', popularity: 'Enterprise', status: 'Certified', latency: '< 380ms', color: 'from-blue-800 to-blue-900' },
    { name: 'Zoho Books', category: 'ERP', description: 'Automate client invoices, trace payments received, and tax breakdowns storage.', popularity: 'High', status: 'Certified', latency: '< 160ms', color: 'from-red-500 to-yellow-500' },
    { name: 'QuickBooks', category: 'ERP', description: 'Auto-sync paid checkout receipts, update client tax directories, and monitor business metrics.', popularity: 'High', status: 'Certified', latency: '< 170ms', color: 'from-green-500 to-emerald-600' },
    { name: 'Microsoft Dynamics', category: 'ERP', description: 'Enterprise-grade operation flows, supply pipelines, and contract details indexing.', popularity: 'Enterprise', status: 'Certified', latency: '< 290ms', color: 'from-blue-700 to-slate-700' },
    { name: 'Xero Accounting', category: 'ERP', description: 'Cloud reconciliation, bank feed mappings, and automatic invoices synchronization.', popularity: 'High', status: 'Certified', latency: '< 150ms', color: 'from-sky-500 to-blue-600' },
    { name: 'NetSuite Suite', category: 'ERP', description: 'Omnichannel inventory logs, corporate tax planning, and payroll data streaming.', popularity: 'Enterprise', status: 'Certified', latency: '< 340ms', color: 'from-blue-900 to-indigo-950' },
    { name: 'Odoo Enterprise', category: 'ERP', description: 'Modular manufacturing states tracking, pipeline logs, and custom billing links.', popularity: 'Medium', status: 'Active', latency: '< 240ms', color: 'from-purple-600 to-pink-500' },
    { name: 'Wave Financial', category: 'ERP', description: 'Simple transaction records tracking, receipt scanning variables, and free bookkeeping logs.', popularity: 'Medium', status: 'Beta', latency: '< 280ms', color: 'from-cyan-500 to-teal-500' },

    // Marketing
    { name: 'Meta Ads Manager', category: 'Marketing', description: 'Automate Lead Ad retrieval, custom audience matching, and target cost monitoring.', popularity: 'High', status: 'Certified', latency: '< 110ms', color: 'from-blue-600 to-violet-600' },
    { name: 'Google Ads', category: 'Marketing', description: 'Sync conversion events (GCLID), track search CPC, and automate campaign budget pauses.', popularity: 'High', status: 'Certified', latency: '< 130ms', color: 'from-blue-500 to-red-500' },
    { name: 'LinkedIn Campaign', category: 'Marketing', description: 'B2B lead generation forms synchronization, company audience retargeting, and performance logs.', popularity: 'High', status: 'Certified', latency: '< 160ms', color: 'from-blue-700 to-sky-600' },
    { name: 'YouTube Content API', category: 'Marketing', description: 'Publish video transcripts, index dynamic tags, and retrieve engagement comments.', popularity: 'Medium', status: 'Active', latency: '< 220ms', color: 'from-red-600 to-rose-700' },
    { name: 'Mailchimp', category: 'Marketing', description: 'Automate client audience list segments, capture subscription dates, and trigger template emails.', popularity: 'High', status: 'Certified', latency: '< 150ms', color: 'from-yellow-500 to-slate-800' },
    { name: 'Brevo (Sendinblue)', category: 'Marketing', description: 'Outbound transactional news blasts, segment triggers, and client engagement ratios.', popularity: 'Medium', status: 'Active', latency: '< 140ms', color: 'from-blue-600 to-teal-500' },
    { name: 'TikTok Ads', category: 'Marketing', description: 'Ingest user lead submissions, retarget custom profiles, and monitor viral conversion loops.', popularity: 'Medium', status: 'Beta', latency: '< 180ms', color: 'from-pink-500 to-black' },
    { name: 'Buffer Platform', category: 'Marketing', description: 'Queue marketing updates across multiple profiles and monitor unified comment streams.', popularity: 'Medium', status: 'Active', latency: '< 210ms', color: 'from-indigo-600 to-blue-500' },
    { name: 'Hootsuite Core', category: 'Marketing', description: 'Enterprise social listening, scheduled calendars, and customer sentiment analytics.', popularity: 'Medium', status: 'Active', latency: '< 240ms', color: 'from-amber-600 to-yellow-600' },
    { name: 'Customer.io', category: 'Marketing', description: 'Highly personalized lifecycle triggers, in-app updates, and custom SMS flows.', popularity: 'Enterprise', status: 'Active', latency: '< 120ms', color: 'from-orange-600 to-red-600' },

    // Analytics
    { name: 'Google Analytics 4', category: 'Analytics', description: 'Track conversion funnels, e-commerce purchase events, and dynamic user pathways.', popularity: 'High', status: 'Certified', latency: '< 150ms', color: 'from-orange-500 to-amber-500' },
    { name: 'Mixpanel', category: 'Analytics', description: 'Track in-app feature click events, cohorts lifecycle, and retention charts.', popularity: 'High', status: 'Certified', latency: '< 90ms', color: 'from-purple-600 to-indigo-600' },
    { name: 'Amplitude', category: 'Analytics', description: 'Enterprise product analytics, user retention cohorts, and session conversions.', popularity: 'Enterprise', status: 'Active', latency: '< 110ms', color: 'from-indigo-800 to-blue-600' },
    { name: 'Hotjar Recordings', category: 'Analytics', description: 'Capture session recordings, click heatmaps, and funnel dropoff indices.', popularity: 'Medium', status: 'Active', latency: '< 200ms', color: 'from-red-500 to-orange-500' },
    { name: 'Segment IO', category: 'Analytics', description: 'Unified Customer Data Platform (CDP) routing user clicks to 20+ destinations.', popularity: 'High', status: 'Certified', latency: '< 60ms', color: 'from-emerald-500 to-green-600' },
    { name: 'PostHog Platform', category: 'Analytics', description: 'Open-source click tracking, feature flags, and instant user survey metrics.', popularity: 'Medium', status: 'Active', latency: '< 80ms', color: 'from-zinc-800 to-zinc-950' },
    { name: 'Tableau Online', category: 'Analytics', description: 'Enterprise visualization dashboards, scheduled data warehouse syncs, and custom reports.', popularity: 'Enterprise', status: 'Certified', latency: '< 350ms', color: 'from-blue-600 to-slate-700' },
    { name: 'Microsoft PowerBI', category: 'Analytics', description: 'Sync corporate databases, parse metrics logs, and render charts in corporate tools.', popularity: 'Enterprise', status: 'Certified', latency: '< 330ms', color: 'from-yellow-600 to-amber-600' },
    { name: 'Fathom Analytics', category: 'Analytics', description: 'Privacy-focused pageviews counter without using cookies or tracking user IPs.', popularity: 'Medium', status: 'Active', latency: '< 70ms', color: 'from-indigo-500 to-purple-500' },
    { name: 'Plausible', category: 'Analytics', description: 'Lightweight web analytics, goal completions tracker, and custom domain logs.', popularity: 'Medium', status: 'Active', latency: '< 75ms', color: 'from-blue-500 to-indigo-500' },

    // Ecommerce
    { name: 'Shopify Core', category: 'Ecommerce', description: 'Synchronize cart updates, product additions, paid checkout events, and stock levels.', popularity: 'High', status: 'Certified', latency: '< 100ms', color: 'from-green-600 to-emerald-500' },
    { name: 'WooCommerce', category: 'Ecommerce', description: 'Self-hosted store events, customer billing details, and customized invoice webhook integrations.', popularity: 'High', status: 'Certified', latency: '< 160ms', color: 'from-purple-700 to-indigo-600' },
    { name: 'Magento OpenSource', category: 'Ecommerce', description: 'Enterprise high-volume catalogs, order state webhooks, and customer data mapping.', popularity: 'Enterprise', status: 'Active', latency: '< 240ms', color: 'from-orange-500 to-red-500' },
    { name: 'BigCommerce', category: 'Ecommerce', description: 'Multi-store order streams, checkout pipelines, and user profile sync.', popularity: 'Medium', status: 'Active', latency: '< 130ms', color: 'from-blue-500 to-sky-500' },
    { name: 'Squarespace Store', category: 'Ecommerce', description: 'Simple catalog payments triggers, subscriber forms, and digital delivery routing.', popularity: 'Medium', status: 'Active', latency: '< 190ms', color: 'from-black to-slate-800' },
    { name: 'Webflow Commerce', category: 'Ecommerce', description: 'Visual storefront checkout triggers, product stock mappings, and design assets sync.', popularity: 'Medium', status: 'Active', latency: '< 120ms', color: 'from-blue-600 to-indigo-600' },
    { name: 'Stripe Billing', category: 'Ecommerce', description: 'Synchronize customer subscriptions, trial end metrics, and dynamic invoicing workflows.', popularity: 'High', status: 'Certified', latency: '< 90ms', color: 'from-indigo-600 to-violet-500' },
    { name: 'Amazon Seller', category: 'Ecommerce', description: 'Retrieve order logs, manage FBA warehouse inventories, and update listing prices.', popularity: 'Enterprise', status: 'Beta', latency: '< 310ms', color: 'from-yellow-600 to-orange-600' },
    { name: 'Printful Hub', category: 'Ecommerce', description: 'Automatic custom printing orders generation on paid customer checkouts.', popularity: 'Medium', status: 'Active', latency: '< 220ms', color: 'from-slate-700 to-slate-800' },
    { name: 'ShipStation', category: 'Ecommerce', description: 'Sync tracking code, print shipping labels, and verify address details.', popularity: 'Medium', status: 'Active', latency: '< 170ms', color: 'from-blue-500 to-teal-500' },

    // Productivity
    { name: 'Notion Workspace', category: 'Productivity', description: 'Synchronize research databases, custom company docs, task registers, and logs.', popularity: 'High', status: 'Certified', latency: '< 130ms', color: 'from-slate-800 to-zinc-900' },
    { name: 'Google Workspace', category: 'Productivity', description: 'Add Calendar demo meetings, write sheet files, draft Gmail pitches, and search Drive.', popularity: 'High', status: 'Certified', latency: '< 110ms', color: 'from-blue-500 to-red-500' },
    { name: 'Microsoft 365', category: 'Productivity', description: 'Sync Excel records, update Outlook corporate calendars, and create OneDrive folders.', popularity: 'High', status: 'Certified', latency: '< 140ms', color: 'from-blue-600 to-sky-500' },
    { name: 'Airtable Databases', category: 'Productivity', description: 'Visual relational data grids, direct record updates, and webhook callbacks on view changes.', popularity: 'High', status: 'Certified', latency: '< 100ms', color: 'from-blue-500 to-orange-500' },
    { name: 'Asana', category: 'Productivity', description: 'Trigger task updates, add project timelines, and assign team boards on client conversions.', popularity: 'Medium', status: 'Active', latency: '< 160ms', color: 'from-pink-500 to-red-500' },
    { name: 'Trello Boards', category: 'Productivity', description: 'Create card structures, attach conversion metrics, and move board columns.', popularity: 'Medium', status: 'Active', latency: '< 150ms', color: 'from-blue-600 to-teal-500' },
    { name: 'Monday.com', category: 'Productivity', description: 'Sync enterprise pipeline workflows, track deal stages, and configure team boards.', popularity: 'High', status: 'Certified', latency: '< 140ms', color: 'from-purple-600 to-indigo-500' },
    { name: 'ClickUp', category: 'Productivity', description: 'Add team tasks, update work checklists, and log project duration metrics.', popularity: 'High', status: 'Certified', latency: '< 180ms', color: 'from-indigo-500 to-pink-500' },
    { name: 'Todoist', category: 'Productivity', description: 'Instant task list item insertions on priority customer conversion alerts.', popularity: 'Medium', status: 'Active', latency: '< 110ms', color: 'from-red-500 to-orange-600' },
    { name: 'Linear Platform', category: 'Productivity', description: 'Trace product development issues, generate tickets on customer bugs reports.', popularity: 'Medium', status: 'Active', latency: '< 90ms', color: 'from-slate-700 to-indigo-650' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', description: 'Execute fast relational queries, sync contact rows, and trace transaction records.', popularity: 'High', status: 'Certified', latency: '< 40ms', color: 'from-blue-600 to-cyan-600' },
    { name: 'MongoDB Atlas', category: 'Databases', description: 'Flexible NoSQL JSON documents synchronization, custom log tables, and activity lists.', popularity: 'High', status: 'Certified', latency: '< 50ms', color: 'from-green-600 to-emerald-600' },
    { name: 'MySQL Core', category: 'Databases', description: 'High-speed structured ledger tables, user data updates, and reports generation.', popularity: 'High', status: 'Certified', latency: '< 45ms', color: 'from-blue-500 to-orange-500' },
    { name: 'Redis Cache', category: 'Databases', description: 'Sub-millisecond key-value caching, active user session storage, and rate-limiting loops.', popularity: 'High', status: 'Certified', latency: '< 2ms', color: 'from-red-600 to-rose-700' },
    { name: 'Firebase Firestore', category: 'Databases', description: 'Real-time document syncing, user auth records, and client file metadata tables.', popularity: 'High', status: 'Certified', latency: '< 65ms', color: 'from-amber-500 to-orange-500' },
    { name: 'Supabase Platform', category: 'Databases', description: 'Serverless Postgres database, direct table updates, and user profile state triggers.', popularity: 'Medium', status: 'Active', latency: '< 55ms', color: 'from-emerald-500 to-teal-600' },
    { name: 'Neon Serverless', category: 'Databases', description: 'Scale-to-zero serverless SQL database with immediate branching capabilities.', popularity: 'Medium', status: 'Active', latency: '< 60ms', color: 'from-emerald-600 to-green-500' },
    { name: 'DynamoDB AWS', category: 'Databases', description: 'Ultra-scalable AWS NoSQL tables tracking customer session tokens.', popularity: 'Enterprise', status: 'Certified', latency: '< 15ms', color: 'from-orange-600 to-amber-600' },
    { name: 'Oracle DB', category: 'Databases', description: 'Legacy banking records, transactional ledgers, and secure corporate file records.', popularity: 'Enterprise', status: 'Certified', latency: '< 110ms', color: 'from-red-600 to-slate-700' },
    { name: 'ClickHouse', category: 'Databases', description: 'Columnar analysis database tracking billions of programmatic ad click logs.', popularity: 'Medium', status: 'Active', latency: '< 30ms', color: 'from-yellow-600 to-orange-500' },

    // Cloud Platforms
    { name: 'AWS Lambda', category: 'Cloud Platforms', description: 'Trigger serverless functions on user checkout, image generation, or file uploads.', popularity: 'High', status: 'Certified', latency: '< 80ms', color: 'from-orange-500 to-yellow-600' },
    { name: 'Google Cloud GCP', category: 'Cloud Platforms', description: 'Access BigQuery pipelines, file buckets, and regional container instances.', popularity: 'High', status: 'Certified', latency: '< 90ms', color: 'from-blue-500 to-cyan-500' },
    { name: 'Microsoft Azure', category: 'Cloud Platforms', description: 'Enterprise identity security routing, private SQL databases, and file grids.', popularity: 'Enterprise', status: 'Certified', latency: '< 110ms', color: 'from-sky-600 to-blue-700' },
    { name: 'Vercel Edge', category: 'Cloud Platforms', description: 'Run serverless middleware globally at the nearest point of presence for 0ms lag.', popularity: 'High', status: 'Certified', latency: '< 10ms', color: 'from-black to-zinc-800' },
    { name: 'Netlify Services', category: 'Cloud Platforms', description: 'Trigger web builds, compile static pages, and handle form hooks.', popularity: 'Medium', status: 'Active', latency: '< 100ms', color: 'from-cyan-400 to-teal-500' },
    { name: 'DigitalOcean Spaces', category: 'Cloud Platforms', description: 'Affordable file metadata storage, droplet servers status, and simple APIs.', popularity: 'Medium', status: 'Active', latency: '< 120ms', color: 'from-blue-600 to-indigo-500' },
    { name: 'Heroku Apps', category: 'Cloud Platforms', description: 'Synchronize pipeline deployments, monitor node memory, and restart server nodes.', popularity: 'Medium', status: 'Active', latency: '< 140ms', color: 'from-purple-600 to-indigo-600' },
    { name: 'Cloudflare Workers', category: 'Cloud Platforms', description: 'Run JavaScript triggers on the edge, routing web requests and rewriting variables.', popularity: 'High', status: 'Certified', latency: '< 8ms', color: 'from-orange-500 to-amber-500' },
    { name: 'Render Platform', category: 'Cloud Platforms', description: 'Host backends, handle database clusters, and run automated cron jobs.', popularity: 'Medium', status: 'Beta', latency: '< 150ms', color: 'from-indigo-600 to-purple-500' },
    { name: 'Railway App', category: 'Cloud Platforms', description: 'Instant server provision, automatic GitHub deploy triggers, and config parameters.', popularity: 'Medium', status: 'Beta', latency: '< 130ms', color: 'from-purple-700 to-zinc-900' },

    // Custom APIs
    { name: 'REST Web Engine', category: 'Custom APIs', description: 'Fully customizable JSON endpoints with secure CORS controls and bearer tokens.', popularity: 'High', status: 'Certified', latency: '< 120ms', color: 'from-teal-500 to-cyan-600' },
    { name: 'GraphQL Gateway', category: 'Custom APIs', description: 'Request precisely the data fields needed to avoid server over-fetching payload lag.', popularity: 'Medium', status: 'Active', latency: '< 110ms', color: 'from-pink-600 to-purple-600' },
    { name: 'Webhooks Receiver', category: 'Custom APIs', description: 'Listen for instant automated payloads from any CRM or billing platform.', popularity: 'High', status: 'Certified', latency: '< 40ms', color: 'from-indigo-500 to-blue-600' },
    { name: 'OAuth 2.0 Client', category: 'Custom APIs', description: 'Secure user login credentials synchronization and third-party data scopes approvals.', popularity: 'High', status: 'Certified', latency: '< 90ms', color: 'from-emerald-500 to-cyan-500' },
    { name: 'SDK Engine Integration', category: 'Custom APIs', description: 'Pre-compiled code libraries to bind applications in minutes.', popularity: 'Medium', status: 'Active', latency: '< 140ms', color: 'from-slate-600 to-slate-800' },
    { name: 'Private API Gateway', category: 'Custom APIs', description: 'IP-whitelisted enterprise request-response paths behind private cloud networks.', popularity: 'Enterprise', status: 'Certified', latency: '< 150ms', color: 'from-blue-900 to-indigo-950' },
    { name: 'gRPC Protobufs', category: 'Custom APIs', description: 'High-speed remote procedure calls utilizing binary payloads over HTTP/2.', popularity: 'Enterprise', status: 'Certified', latency: '< 15ms', color: 'from-cyan-600 to-teal-600' },
    { name: 'SOAP Integrator', category: 'Custom APIs', description: 'Secure enterprise XML-based messaging protocols for legacy bank pipelines.', popularity: 'Enterprise', status: 'Certified', latency: '< 290ms', color: 'from-slate-600 to-zinc-700' },
    { name: 'WebSockets Live', category: 'Custom APIs', description: 'Two-way persistent channels streaming chat, coordinates, or live tickers under 5ms.', popularity: 'High', status: 'Certified', latency: '< 5ms', color: 'from-pink-500 to-rose-600' },
    { name: 'JWT Secure Gate', category: 'Custom APIs', description: 'Stateless JSON Web Token verification middleware preventing unauthorized routing.', popularity: 'High', status: 'Certified', latency: '< 10ms', color: 'from-red-600 to-orange-500' },
  ];

  // List of distinct categories for filtering
  const categories: string[] = [
    'All', 'CRM', 'Communication', 'AI Platforms', 'Payments', 'ERP', 'Marketing', 'Analytics', 'Ecommerce', 'Productivity', 'Databases', 'Cloud Platforms', 'Custom APIs'
  ];

  // Filter logic
  const filteredIntegrations = allIntegrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesPopularity = selectedPopularity === 'All' || item.popularity === selectedPopularity;

    return matchesSearch && matchesCategory && matchesStatus && matchesPopularity;
  });

  // Smart recommender generator
  const getRecommendedApps = (segment: string) => {
    switch (segment) {
      case 'ecommerce':
        return [
          { name: 'Shopify Core', reason: 'High-velocity purchase logs & inventory syncing', latency: '< 100ms' },
          { name: 'Stripe', reason: 'Global invoice callbacks & instant card processing', latency: '< 90ms' },
          { name: 'WhatsApp', reason: 'Automated catalog reminders & order tracking text alerts', latency: '< 100ms' }
        ];
      case 'healthcare':
        return [
          { name: 'GoHighLevel', reason: 'Two-way secure contact routing & intake automation', latency: '< 150ms' },
          { name: 'Private API Gateway', reason: 'IP-whitelisted HIPAA secure transaction paths', latency: '< 150ms' },
          { name: 'Transactional Email', reason: 'Encrypted verification alerts & secure portal redirects', latency: '< 130ms' }
        ];
      case 'education':
        return [
          { name: 'Salesforce', reason: 'High-frequency student onboarding lead intakes', latency: '< 220ms' },
          { name: 'Twilio', reason: 'Outbound cloud dialers for enrollment call loops', latency: '< 120ms' },
          { name: 'Google Workspace', reason: 'Schedule Calendar advisor demos and student slots', latency: '< 110ms' }
        ];
      case 'saas':
        return [
          { name: 'Google Gemini', reason: 'Multi-modal evaluations and user behavior classifications', latency: '< 300ms' },
          { name: 'Mixpanel', reason: 'Track lifecycle events and active cohort retentions', latency: '< 90ms' },
          { name: 'Vercel Edge', reason: 'Execute global middleware functions without cold-start lags', latency: '< 10ms' }
        ];
      default:
        return [
          { name: 'Webhooks Receiver', reason: 'Capture trigger notifications from any online source', latency: '< 40ms' },
          { name: 'PostgreSQL', reason: 'Save client profiles securely in high-speed structured tables', latency: '< 40ms' },
          { name: 'Slack', reason: 'Get real-time operational dashboard warnings on Discord or Slack', latency: '< 80ms' }
        ];
    }
  };

  // Architecture flowchart steps
  const architectureSteps = [
    { title: '1. Website / App Event', desc: 'User logs onto store, submits a lead questionnaire, or completes a cart purchase checkout.', icon: Globe },
    { title: '2. Webhooks & REST Receiver', desc: 'Secure web gateway captures payload, parses fields (TLS 1.3), and runs validation.', icon: Network },
    { title: '3. CRM Contact Sync', desc: 'Ingests parameters directly to GoHighLevel or HubSpot CRM, merging duplicates dynamically.', icon: Database },
    { title: '4. AI Agentic Evaluation', desc: 'Gemini reviews client request, grades lead scoring parameters, and drafts custom responses.', icon: Cpu },
    { title: '5. Multi-Channel Triggers', desc: 'Instantly fires Twilio SMS, WhatsApp template alerts, or routes exotel VoIP queues.', icon: Phone },
    { title: '6. ERP & Ledger Ledger', desc: 'Passes transaction logs directly to Tally, SAP, or QuickBooks ledgers for accounting.', icon: FileText },
    { title: '7. Analytics & Dashboard Reports', desc: 'Funnels conversion variables directly into Segment or Google Analytics charts.', icon: BarChart }
  ];

  // Code Playground switcher snippets
  const codeSnippets = {
    node: `// Node.js Express - Trigger Natton Digital Webhook Integration
const axios = require('axios');

async function triggerSync(leadData) {
  const WEBHOOK_URL = 'https://api.natton.digital/v1/integrations/trigger';
  const API_KEY = process.env.NATTON_API_KEY;

  try {
    const response = await axios.post(WEBHOOK_URL, {
      event: 'lead.created',
      timestamp: new Date().toISOString(),
      payload: {
        fullName: leadData.fullName,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        system_source: 'website_v4'
      }
    }, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Sync initialized. Task UUID:', response.data.task_id);
    return response.data;
  } catch (error) {
    console.error('Integration pipeline error:', error.message);
    throw error;
  }
}`,
    python: `# Python 3.x - Trigger Natton Digital Webhook Integration
import requests
import datetime
import os

def trigger_sync(lead_data):
    webhook_url = "https://api.natton.digital/v1/integrations/trigger"
    api_key = os.getenv("NATTON_API_KEY")
    
    payload = {
        "event": "lead.created",
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "payload": {
            "fullName": lead_data.get("fullName"),
            "email": lead_data.get("email"),
            "phone": lead_data.get("phone"),
            "company": lead_data.get("company"),
            "system_source": "website_v4"
        }
    }
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(webhook_url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        print(f"Sync initialized. Task UUID: {data.get('task_id')}")
        return data
    except Exception as e:
        print(f"Integration pipeline error: {str(e)}")
        raise e`,
    curl: `# cURL Terminal Command - Trigger Direct Pipeline Integration
curl -X POST "https://api.natton.digital/v1/integrations/trigger" \\
  -H "Authorization: Bearer $NATTON_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "lead.created",
    "timestamp": "2026-06-29T08:22:31Z",
    "payload": {
      "fullName": "Devon Lane",
      "email": "devon@enterprise.com",
      "phone": "+14155552671",
      "company": "Enterprise Corp",
      "system_source": "website_v4"
    }
  }'`
  };

  // Copy code utility
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Trigger Gated Form submission simulation with visual terminal logs
  const handleCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.requiredIntegration) return;

    setFormLoading(true);
    setFormLogs([]);

    const steps = [
      "📡 Intercepting payload submission from domain...",
      "🔑 Authenticating client key permissions (TLS 1.3)...",
      "🔄 Triggering n8n pipeline workflow: Custom Integration Request (ID #941)",
      "🔗 Checking target database schema for GoHighLevel webhook bindings...",
      "🛠️ Provisioning Rest API routing table for current software: " + formData.currentSoftware,
      "⚡ Compiling custom variables for required connection: " + formData.requiredIntegration,
      "📨 Initializing SMTP relay via Resend to alert internal integration experts...",
      "🚀 Webhook successfully deployed! Synchronization logs online."
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < steps.length) {
        setFormLogs(prev => [...prev, steps[count]]);
        count++;
      } else {
        clearInterval(interval);
        setFormLoading(false);
        setFormSubmitted(true);
      }
    }, 500);
  };

  // Drag and drop / node click simulation inside workflow builder
  const runWorkflowSimulation = () => {
    setIsSimulatingWorkflow(true);
    setWorkflowLogs([]);

    const simulationLogs = [
      "🟢 [0.0s] Trigger Node detected: Client submitted Web Booking form.",
      "📡 [0.8s] Webhook captured. Syncing records to HubSpot CRM...",
      "✓ [1.5s] HubSpot CRM contact successfully synchronized (UID: GHL-82194).",
      "🧠 [2.2s] Calling Gemini AI Agent. Classifying client request intent...",
      "✓ [3.5s] Gemini assessment complete: HIGH-VALUE INTENT (Score: 96%). Custom SMS drafted.",
      "📞 [4.2s] Routing text template via Twilio trunk lines...",
      "✓ [5.0s] SMS delivered successfully. Pipeline workflow executed. Uptime 100%."
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < simulationLogs.length) {
        setWorkflowLogs(prev => [...prev, simulationLogs[count]]);
        // Advance highlight active step
        setWorkflowNodes(prev => prev.map((node, idx) => {
          if (idx === count % 4) {
            return { ...node, status: 'active' };
          } else if (idx < count % 4) {
            return { ...node, status: 'success' };
          } else {
            return { ...node, status: 'waiting' };
          }
        }));
        count++;
      } else {
        clearInterval(interval);
        setIsSimulatingWorkflow(false);
        setWorkflowNodes(prev => prev.map(n => ({ ...n, status: 'success' })));
      }
    }, 850);
  };

  // FAQ Expand toggle
  const toggleFaq = (index: number) => {
    if (openFaqIndices.includes(index)) {
      setOpenFaqIndices(prev => prev.filter(i => i !== index));
    } else {
      setOpenFaqIndices(prev => [...prev, index]);
    }
  };

  // 20 technical questions & answers
  const faqs = [
    {
      q: "Does Natton Digital support custom REST APIs and proprietary legacy software?",
      a: "Yes. Our cloud platform provides standard endpoints, secure webhook listeners, and OAuth client setups. For unique on-premise applications (e.g. Tally Prime XML formats or private databases), we build custom bridges with secure, whitelisted IP routing."
    },
    {
      q: "How does the platform ensure HIPAA and SOC2 compliance across third-party communication channels?",
      a: "All data passed through the pipeline is encrypted with AES-256 tokens in transit (TLS 1.3) and at rest. For sensitive healthcare channels, we utilize secure portal notification triggers rather than transmitting raw, unencrypted medical logs directly in SMS or WhatsApp."
    },
    {
      q: "What is the average transaction latency for webhook routing pipelines?",
      a: "Our core Edge networks are routed globally via Cloudflare Edge Functions and Vercel. Standard routing loops to CRMs (like GoHighLevel or HubSpot) resolve under 150ms. Highly cached database reads (via Redis) resolve under 5ms."
    },
    {
      q: "How does the n8n webhook workflow handle server failures or target downtime?",
      a: "We implement self-healing error handler routines with exponential backoff retries. If a target CRM (e.g. Salesforce) experiences high latency, the payload is temporarily held in a Redis queue and retried up to 5 times before alerting your Slack or Discord admin channel."
    },
    {
      q: "Can I connect multiple CRMs and communication platforms simultaneously?",
      a: "Absolutely. Natton Digital is built on a modular routing matrix. A single website trigger event can simultaneously update HubSpot contacts, notify your Slack operations stream, write transaction ledgers in Tally, and launch outbound Twilio calling queues."
    },
    {
      q: "How are contact duplicates avoided when processing customer details across different channels?",
      a: "Our system runs automatic identity indexing. Before routing data, the platform queries your CRM by unique parameters (e.g., Corporate Email or Phone Number). If a match exists, the trigger simply updates the existing client file and appends the new activity log."
    },
    {
      q: "Do I need a paid account on Zapier or Make.com to utilize your workflows?",
      a: "No. Our integration ecosystem is fully self-contained on Natton Digital's proprietary infrastructure, powered by integrated n8n nodes. You can run all connected workflows without subscribing to separate third-party services."
    },
    {
      q: "What variables can I configure in the custom integration request form?",
      a: "The form maps client variables including corporate email, telephone, company name, country, and the specific APIs you intend to bind. This initiates automated sandbox scripts and routes files directly to our enterprise engineers."
    },
    {
      q: "How do Gemini AI Agents evaluate inbound customer intent in real-time?",
      a: "When a contact is captured, their message payload is evaluated by a server-side Google Gemini node. It extracts customer sentiment, classifies their purchase readiness score, drafts customized response logs, and writes structured variables into GoHighLevel tags."
    },
    {
      q: "Are custom billing gateways and local currencies supported?",
      a: "Yes. We support Razorpay, Stripe, Cashfree, and PhonePe PG integrations, facilitating secure payments across global channels (USD, EUR, GBP) and direct Indian UPI interfaces with real-time checkout webhook responses."
    },
    {
      q: "Can we trace detailed execution logs for developer audits?",
      a: "Yes, our Developer Sandbox provides live execution dashboards displaying response headers, JSON payloads, connection health flags, and sub-millisecond execution logs for debugging REST or GraphQL queries."
    },
    {
      q: "How is the AgenticOS framework connected to other business tools?",
      a: "AgenticOS operates as a cognitive layer that connects to your tools via APIs. It monitors activities in your databases or CRMs and triggers actions (like dispatching invoices or scheduling bookings) using specialized autonomous agent nodes."
    },
    {
      q: "What is the consensus weight feature in the multi-agent system?",
      a: "Consensus weight refers to the verification threshold where multiple agents (e.g. Sales and Audit Agents) must agree on generated values (such as quote prices or contract text) before executing the final transactional webhooks."
    },
    {
      q: "Is there any limit to the volume of workflow triggers we can execute monthly?",
      a: "Our standard enterprise setups support up to 500,000 automated workflow executions per month. For high-volume e-commerce or retail platforms, we offer customized server clustering options to handle millions of queries without throttling."
    },
    {
      q: "Can we import exportable JSON workflows straight into self-hosted n8n instances?",
      a: "Yes, all workflow templates and visually mapped pipelines on our platform can be exported as standard JSON schema blocks and imported into any self-hosted n8n workspace with complete parameter retention."
    },
    {
      q: "Do you offer SDKs for native mobile application integrations?",
      a: "Yes, we provide lightweight pre-compiled SDK files for React Native, Swift, Kotlin, and Flutter to stream contact details and capture in-app click behaviors securely."
    },
    {
      q: "How is the REST API token generated and stored safely?",
      a: "Platform API keys are encrypted using secure cryptographic salts. We recommend saving them in server-side environment variables (`process.env.NATTON_API_KEY`) and keeping them hidden from client browsers to prevent leaks."
    },
    {
      q: "What is the recommended structure for Answer Engine Optimization (AEO) FAQs?",
      a: "AEO content should utilize structured question-and-answer headlines under 60 words, direct active voice, and JSON micro-data schemas to ensure crawlers like ChatGPT or Gemini can easily extract and cite your data."
    },
    {
      q: "Are transactional invoice details stored in our cloud databases permanently?",
      a: "Our databases sync records in real-time, but we support customizable storage retention policies. You can set transaction records to clear automatically after successful accounting reconciliation to meet strict data privacy rules."
    },
    {
      q: "How do we get started with custom enterprise cloud setups?",
      a: "Simply submit your requirements via our custom integration form, or book a live strategy session using our strategy calendar CTA. Our engineering team will map out your pipeline sandbox within 24 hours."
    }
  ];

  return (
    <div className="bg-[#0B0721] text-white min-h-screen font-sans antialiased text-left relative selection:bg-cyan-500/30 selection:text-white pb-24">
      
      {/* Visual background grids and ambient spheres */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-2/3 right-10 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb navigation */}
          <div className="mb-6 text-[10px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1.5">
            <button onClick={() => setPath('home')} className="hover:text-cyan-400 transition-colors">HOME</button>
            <span className="text-gray-600 font-bold">/</span>
            <span className="text-cyan-400 font-bold">INTEGRATIONS PLATFORM</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-300" /> 
                Open Ecosystem Platform
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black font-display tracking-tight leading-tight text-white">
                Connect Everything.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Automate Anything.</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Integrate your CRM, proprietary AI models, live chat systems, global payments, and accounting ledgers into one seamless cognitive network. Eliminate manual entries and sync databases under 150ms.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#search-section"
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  Explore 100+ Integrations <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#custom-integration-form"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
                >
                  Consult Integration Expert <HelpCircle className="h-4 w-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Hero Right: 3D Connected Integration Universe */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[430px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden group backdrop-blur-md shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-purple-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                    <Activity className="h-4 w-4 text-cyan-400 animate-pulse" /> Integration Universe
                  </span>
                  <span className="text-[8px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-black">
                    SYSTEM STATUS: 100% ONLINE
                  </span>
                </div>

                {/* Animated Node Connections and Orbit Graph */}
                <div className="relative h-56 flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-400/20 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-32 h-32 rounded-full border border-dashed border-purple-500/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

                  {/* Central Node representing Natton Digital Hub */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-[1.5px] animate-pulse">
                    <div className="w-full h-full bg-[#0B0721] rounded-full flex items-center justify-center">
                      <Cpu className="h-5.5 w-5.5 text-cyan-400" />
                    </div>
                  </div>

                  {/* Connected applications orbits with icons */}
                  <div className="absolute top-4 left-6 p-1.5 rounded-xl bg-white/5 border border-cyan-400/30 text-[9px] font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/5 hover:-translate-y-0.5 transition-all">
                    <Database className="h-3 w-3 text-cyan-400" />
                    <span>CRM Integration</span>
                  </div>

                  <div className="absolute top-16 right-4 p-1.5 rounded-xl bg-white/5 border border-purple-500/30 text-[9px] font-mono flex items-center gap-1.5 shadow-lg shadow-purple-500/5 hover:-translate-y-0.5 transition-all">
                    <Workflow className="h-3 w-3 text-purple-400" />
                    <span>n8n Pipeline</span>
                  </div>

                  <div className="absolute bottom-12 left-2 p-1.5 rounded-xl bg-white/5 border border-emerald-500/30 text-[9px] font-mono flex items-center gap-1.5 shadow-lg shadow-emerald-500/5 hover:-translate-y-0.5 transition-all">
                    <CreditCard className="h-3 w-3 text-emerald-400" />
                    <span>Stripe Gateway</span>
                  </div>

                  <div className="absolute bottom-4 right-10 p-1.5 rounded-xl bg-white/5 border border-pink-500/30 text-[9px] font-mono flex items-center gap-1.5 shadow-lg shadow-pink-500/5 hover:-translate-y-0.5 transition-all">
                    <MessageSquare className="h-3 w-3 text-pink-400" />
                    <span>WhatsApp Node</span>
                  </div>

                  <div className="absolute w-2 h-2 rounded-full bg-cyan-400 top-20 left-16 animate-ping" />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 bottom-16 right-24 animate-ping" />
                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500 font-bold">
                  <span>ACTIVE CONNECTIONS: 10,248</span>
                  <span>99.98% REAL-TIME TRANSACTIONS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ecosystem Statistics (Stats Section) */}
      <section className="py-12 border-b border-white/[0.06] bg-white/[0.003]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">ECOSYSTEM REACH</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">100+</p>
              <p className="text-xs text-gray-400">Pre-Configured Integrations</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase font-bold">ROUTING POTENTIAL</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">1000+</p>
              <p className="text-xs text-gray-400">Automated Workflow Variations</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-bold">COMMUNICATION</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">Multi-Channel</p>
              <p className="text-xs text-gray-400">WhatsApp, Twilio, Cloud Dialer Sync</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">CUSTOM DEVELOPER SUPPORT</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">REST / GraphQL</p>
              <p className="text-xs text-gray-400">Private APIs & Dynamic Webhooks</p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Recommended Integrations Module */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-4">
            <Sliders className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} /> Smart Recommendation Matrix
          </div>
          <h2 className="text-3xl font-black font-display text-white mb-3">Recommended For Your Business Model</h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto mb-8">
            Select your primary operational category. Our semantic mapping algorithm automatically compiles the target integrations needed to remove scaling bottlenecks.
          </p>

          {/* Business Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'ecommerce', label: 'Retail & E-commerce' },
              { id: 'healthcare', label: 'Clinics & Healthcare' },
              { id: 'education', label: 'Schools & EdTech' },
              { id: 'saas', label: 'SaaS & Tech Platforms' },
              { id: 'general', label: 'Other SMBs' }
            ].map((segment) => (
              <button
                key={segment.id}
                onClick={() => setRecommendationTarget(segment.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  recommendationTarget === segment.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400 font-bold shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0B0721]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {segment.label}
              </button>
            ))}
          </div>

          {/* Recommended results container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {getRecommendedApps(recommendationTarget).map((app, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSearchQuery(app.name);
                  const element = document.getElementById('search-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {app.name}
                    </span>
                    <span className="text-[8px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded font-bold uppercase">
                      {app.latency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-12">
                    {app.reason}
                  </p>
                  <span className="text-[9px] font-mono text-cyan-300 group-hover:underline flex items-center gap-1">
                    Inspect API variables <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Browse Library Grid & Semantic Search (Search & Categories Section) */}
      <section id="search-section" className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div className="space-y-3 text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">EXPLORE DIRECTORY</span>
              <h2 className="text-3xl font-black font-display text-white">Search Integrations</h2>
              <p className="text-xs text-gray-400 max-w-xl">
                Locate secure pipelines across 100+ platforms. Use filters to review certified nodes, real-time beta modules, and sub-millisecond databases.
              </p>
            </div>

            {/* Smart Search Filter Counter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Type to search (e.g., Salesforce, n8n, Stripe)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none transition-all placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs font-mono text-gray-400 shrink-0 border border-white/5 bg-white/[0.01] p-3 rounded-xl">
                <span>Result: <strong className="text-white">{filteredIntegrations.length}</strong> matches</span>
              </div>
            </div>
          </div>

          {/* Filters Pill Bar Row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400 font-bold'
                      : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick secondary filters (Beta status, latency etc) */}
          <div className="flex flex-wrap gap-4 items-center justify-between border-t border-b border-white/5 py-4 mb-10 text-xs font-mono text-gray-400">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span>Node Status:</span>
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#0B0721] border border-white/10 text-white rounded px-2 py-0.5 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="Certified">Certified Only</option>
                  <option value="Active">Active Only</option>
                  <option value="Beta">Beta Only</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>SaaS Category Segment:</span>
                <select 
                  value={selectedPopularity} 
                  onChange={(e) => setSelectedPopularity(e.target.value)}
                  className="bg-[#0B0721] border border-white/10 text-white rounded px-2 py-0.5 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Tiers</option>
                  <option value="Enterprise">Enterprise Grade</option>
                  <option value="High">High Demand</option>
                  <option value="Medium">Medium Scale</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSelectedPopularity('All');
              }}
              className="text-cyan-400 hover:underline text-xs flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reset Filters
            </button>
          </div>

          {/* Bento-styled Integrations Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredIntegrations.length === 0 ? (
                <div className="col-span-full p-16 text-center border border-dashed border-white/10 rounded-2xl space-y-4 bg-white/[0.01]">
                  <Info className="h-10 w-10 text-gray-500 mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-white">No integration nodes match your criteria</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Try checking spelling, clearing filters, or requesting a custom integration block. Our engineers build new API nodes in 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedStatus('All');
                      setSelectedPopularity('All');
                    }}
                    className="px-5 py-2.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 text-xs font-mono rounded-xl hover:bg-cyan-400/20 transition-all font-bold"
                  >
                    Reset Directory Filters
                  </button>
                </div>
              ) : (
                filteredIntegrations.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.4) }}
                    className="group relative rounded-2xl border border-white/5 bg-white/[0.01] p-6 hover:border-cyan-400/40 hover:bg-white/[0.02] transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md uppercase font-black bg-white/5 text-gray-300 border border-white/10">
                          {item.category}
                        </span>
                        
                        <div className="flex gap-1.5 items-center">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Certified' ? 'bg-cyan-400' : item.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`} />
                          <span className="text-[9px] font-mono text-gray-500 uppercase font-bold">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>LATENCY: <strong className="text-cyan-400">{item.latency}</strong></span>
                      <span className="text-gray-400 uppercase tracking-widest text-[9px]">
                        {item.popularity} Tier
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Interactive Integration Architecture Flowchart */}
      <section id="architecture" className="py-24 border-b border-white/[0.06] bg-white/[0.003]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">Interactive React Flow Map</span>
            <h2 className="text-3xl font-black font-display text-white">Our Real-Time Data Pipeline Architecture</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Follow a single customer contact payload as it traverses our edge nodes. Click any step below to inspect how encryption, validation, and AI routing execute.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left: Step selectors with glowing state checks */}
            <div className="lg:col-span-5 space-y-4">
              {architectureSteps.map((step, idx) => {
                const isSelected = activeArchStep === idx;
                const CustomIcon = step.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveArchStep(idx)}
                    className={`w-full p-4 rounded-2xl border text-left flex gap-4 items-start transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border-cyan-400/50 shadow-lg shadow-cyan-400/5'
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      isSelected ? 'bg-cyan-500/15 text-cyan-400' : 'bg-white/5 text-gray-500'
                    }`}>
                      <CustomIcon className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold transition-colors ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-normal line-clamp-1">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Immersive Interactive Flow Preview Screen */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#0B0721] p-6 relative flex flex-col justify-between overflow-hidden shadow-xl min-h-[350px]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 to-teal-950/10 pointer-events-none" />
                
                {/* Header info */}
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[10px] font-mono text-white font-bold">PIPELINE MONITOR</span>
                  </div>
                  <span className="text-[8px] font-mono text-gray-500">STAGE {activeArchStep + 1} OF 7 ACTIVE</span>
                </div>

                {/* Display step detailed variables */}
                <div className="relative z-10 my-6 space-y-4">
                  <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    <CheckCircle2 className="h-4 w-4" /> Operational Checkpoint Validated
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-white">
                    {architectureSteps[activeArchStep].title}
                  </h3>
                  
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {architectureSteps[activeArchStep].desc}
                  </p>

                  {/* Schema Variable Playground Box */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-[11px] text-gray-400 space-y-2">
                    <div className="flex justify-between text-[9px] text-gray-500 pb-1 border-b border-white/5">
                      <span>SECURE VARIABLES PARSED</span>
                      <span>UTF-8 ENCODED</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">"headers"</span>: <span className="text-emerald-400">"Authorization: Bearer sha256_aes_encrypted"</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">"latency_metric"</span>: <span className="text-purple-400">"{activeArchStep === 3 ? '250ms (LLM reasoning)' : '18ms (Edge routing)'}"</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">"fail_safe_retry"</span>: <span className="text-emerald-400">true</span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between">
                  <button 
                    disabled={activeArchStep === 0}
                    onClick={() => setActiveArchStep(prev => prev - 1)}
                    className="text-xs font-mono text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" /> PREV STAGE
                  </button>
                  
                  <button 
                    disabled={activeArchStep === architectureSteps.length - 1}
                    onClick={() => setActiveArchStep(prev => prev + 1)}
                    className="text-xs font-mono text-cyan-400 hover:text-white disabled:opacity-30 disabled:hover:text-cyan-400 flex items-center gap-1 font-bold"
                  >
                    NEXT STAGE <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Workflows & Screen-Recording Builder Playground */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Builder description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">DRAG & DRIP SIMULATOR</span>
              <h2 className="text-3xl font-black font-display text-white">Popular Pre-Built Workflows</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Connect channels without deploying a single line of backend code. Launch our pre-configured automation pathways to pre-qualify and close inbound leads on autopilot.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Website Form → CRM → Instant WhatsApp Alerts',
                  'Inbound Lead → AI Calling Outbound Dialer → Calendar Lock',
                  'Checkout Stripe Payment → PDF Receipt Invoicing → GHL Log',
                  'Customer Support Ticket → AI Consensus Agent → Auto Reply'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-xs text-gray-400">
                    <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={runWorkflowSimulation}
                  disabled={isSimulatingWorkflow}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-[#0B0721] text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  {isSimulatingWorkflow ? 'Running Live Simulation...' : 'Run Simulation Pipeline'} <Zap className="h-4 w-4 text-black" />
                </button>
              </div>
            </div>

            {/* Builder Simulator Screen */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden backdrop-blur-md min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 to-indigo-950/10 pointer-events-none" />
                
                {/* Visual flowchart graph of the nodes */}
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">VISUAL WORKFLOW PREVIEW</span>
                    <span className="text-[8px] font-mono bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded uppercase font-bold">100% EXPORTABLE TO n8n</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    {workflowNodes.map((node, idx) => {
                      const isActive = node.status === 'active';
                      const isSuccess = node.status === 'success';

                      return (
                        <React.Fragment key={node.id}>
                          <div className={`p-4 rounded-xl border text-center relative transition-all ${
                            isActive 
                              ? 'bg-cyan-500/10 border-cyan-400 shadow-md scale-105' 
                              : isSuccess 
                                ? 'bg-emerald-500/5 border-emerald-500/40' 
                                : 'bg-white/5 border-white/10 opacity-40'
                          }`}>
                            <div className="text-[8px] font-mono text-gray-500 uppercase">{node.type}</div>
                            <div className={`text-xs font-bold mt-1 ${isActive ? 'text-cyan-400' : isSuccess ? 'text-emerald-400' : 'text-white'}`}>
                              {node.name}
                            </div>
                            
                            {isSuccess && (
                              <CheckCircle className="absolute -top-1.5 -right-1.5 h-4 w-4 text-emerald-400 bg-[#0B0721] rounded-full" />
                            )}
                            {isActive && (
                              <div className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-cyan-400 rounded-full animate-ping" />
                            )}
                          </div>
                          
                          {idx < 3 && (
                            <div className="hidden sm:flex justify-center items-center text-gray-600">
                              <ArrowRight className={`h-4 w-4 ${isSuccess ? 'text-emerald-500' : 'text-gray-700'}`} />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Live simulation logger terminal */}
                <div className="relative z-10 mt-6 p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[10px] text-gray-400 space-y-1.5 min-h-[140px] flex flex-col justify-end">
                  <div className="text-[8px] text-gray-500 border-b border-white/5 pb-1 mb-2 flex justify-between uppercase">
                    <span>LIVE PIPELINE EXECUTION LOGS</span>
                    <span>AUTOMATIC RETRIES: ENABLED</span>
                  </div>
                  {workflowLogs.length === 0 ? (
                    <div className="text-gray-500 italic py-6 text-center">
                      Click "Run Simulation Pipeline" on the left to see live webhook executions.
                    </div>
                  ) : (
                    workflowLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('✓') ? 'text-emerald-400' : log.includes('🧠') ? 'text-cyan-400' : 'text-gray-300'}>
                        {log}
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Developer Resources & Interactive Sandbox */}
      <section id="developer-resources" className="py-24 border-b border-white/[0.06] bg-white/[0.003]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Developer Sandbox description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">DEVELOPER SANDBOX</span>
              <h2 className="text-3xl font-black font-display text-white">Custom API Integrations</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Connect your custom proprietary system or internal databases using our unified REST and GraphQL gateways. Review code payloads and integrate under 10 minutes.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'RESTful API Access', desc: 'Secure endpoints mapped with standard JSON responses and API credentials.' },
                  { title: 'Webhook Receivers', desc: 'Configure instantaneous callbacks on successful client state updates.' },
                  { title: 'GraphQL Gateway Support', desc: 'Streamline data requests and query only targeted contact keys.' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Code className="h-4 w-4 text-cyan-400" /> {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Code Playground switcher */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#07051A] p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl">
                
                {/* Switcher header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3 relative z-10 mb-4">
                  <div className="flex gap-2">
                    {['node', 'python', 'curl'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setDevLang(lang as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                          devLang === lang 
                            ? 'bg-white/10 text-white border-b-2 border-cyan-400 font-bold' 
                            : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {lang === 'node' ? 'NodeJS' : lang === 'python' ? 'Python' : 'cURL'}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleCopyCode(codeSnippets[devLang])}
                    className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" /> {copiedCode ? 'Copied Payload!' : 'Copy Code'}
                  </button>
                </div>

                {/* Displayed snippet */}
                <pre className="relative z-10 font-mono text-[10.5px] text-emerald-400 bg-[#050314] p-4 rounded-xl border border-white/5 overflow-x-auto min-h-[300px] text-left leading-relaxed">
                  <code>{codeSnippets[devLang]}</code>
                </pre>

                {/* Footer security tag */}
                <div className="relative z-10 border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>AES-256 ENCRYPTED TRANSACTION CHANNELS</span>
                  <span>TLS 1.3 COMPLIANT API CREDENTIALS</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* custom integration Request Form with Live Terminal Output */}
      <section id="custom-integration-form" className="py-24 border-b border-white/[0.06] bg-white/[0.003]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Custom request description & Form */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">API DEVELOPMENT ON-DEMAND</span>
                <h2 className="text-3xl font-black font-display text-white">Need A Custom Integration?</h2>
                <p className="text-xs text-gray-400">
                  Can't locate your software within our directory? Submit a request. Our dedicated integration experts build custom webhook connectors and REST APIs within 24 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Request Successfully Dispatched!</h3>
                  <p className="text-xs text-gray-300">
                    Our n8n webhook captured your lead parameters. An integration expert will review your software specifications and email you credentials within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        currentSoftware: '',
                        requiredIntegration: '',
                        country: 'United States',
                        email: '',
                        phone: '',
                        message: '',
                        acceptTerms: true
                      });
                    }}
                    className="px-5 py-2 bg-white/5 text-xs font-mono rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomRequest} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Company Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enterprise Inc."
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Current Software *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. MyProprietaryCRM"
                        value={formData.currentSoftware}
                        onChange={(e) => setFormData({...formData, currentSoftware: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Required Connection *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Stripe checkout or Twilio calls"
                        value={formData.requiredIntegration}
                        onChange={(e) => setFormData({...formData, requiredIntegration: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Country</label>
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      >
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (415) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-bold">Integration Message Specifications</label>
                    <textarea 
                      rows={3}
                      placeholder="Outline data parameters, frequency of syncs, security scopes needed..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#0B0721] border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <input 
                      type="checkbox" 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                      className="mt-1 rounded text-cyan-400 focus:ring-cyan-400 bg-black/40 border-white/10"
                    />
                    <label htmlFor="acceptTerms" className="text-[10px] leading-snug text-gray-400">
                      I authorize Natton Digital to sync submitted parameters into custom developer sandbox models and compile contact profiles via GHL.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xs font-bold rounded-xl hover:opacity-95 transition-all shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2"
                  >
                    {formLoading ? 'Executing n8n Pipeline...' : 'Deploy Webhook Request'} <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Custom request visual terminal logger */}
            <div className="lg:col-span-6 flex flex-col justify-stretch">
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#06031A] p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 to-emerald-950/10 pointer-events-none" />
                
                {/* Terminal Header */}
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3 mb-4">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                    <Terminal className="h-4.5 w-4.5 text-cyan-400 animate-pulse" /> n8n API WEBHOOK SHELL
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                    CONNECTED
                  </span>
                </div>

                {/* Simulated Logs Terminal */}
                <div className="relative z-10 flex-grow flex flex-col justify-center min-h-[300px] text-left">
                  {formLogs.length === 0 ? (
                    <div className="text-gray-500 italic py-12 text-center font-mono text-[11px] max-w-sm mx-auto space-y-3">
                      <Database className="h-8 w-8 mx-auto text-gray-600 animate-pulse" />
                      <p>Awaiting form inputs. Deploy webhook on the left to review real-time API parameter processing logs.</p>
                    </div>
                  ) : (
                    <div className="font-mono text-[10.5px] leading-relaxed space-y-2">
                      {formLogs.map((log, idx) => (
                        <div key={idx} className={
                          log.includes('🚀') ? 'text-cyan-400 font-bold' : log.includes('✓') ? 'text-emerald-400' : 'text-gray-300'
                        }>
                          {log}
                        </div>
                      ))}
                      {formLoading && (
                        <div className="text-cyan-400 font-bold flex items-center gap-1.5 animate-pulse">
                          <span>█</span> Processing triggers...
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer security compliance */}
                <div className="relative z-10 border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>GHL API ENDPOINT SYNC</span>
                  <span>SSL TERMINATED INGRESS GATEWAY</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (20 items) */}
      <section id="faq" className="py-24 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">FAQ DATABASE</span>
            <h2 className="text-3xl font-black font-display text-white">Integration FAQ</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Review our compiled directory of 20 detailed technical questions explaining webhook behaviors, HIPAA protocols, database syncing rules, and system latencies.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-bold text-white pr-4 leading-snug">
                      {idx + 1}. {faq.q}
                    </span>
                    <span className="shrink-0 text-cyan-400">
                      {isOpen ? <X className="h-4.5 w-4.5" /> : <ChevronRight className="h-4.5 w-4.5" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-black/20 text-left">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="relative py-28 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 via-[#0B0721] to-purple-950/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-pulse" /> Deploy Your Connected Business Ecosystem
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight text-white max-w-2xl mx-auto">
            Ready to Build Your Connected Business Ecosystem?
          </h2>
          
          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Configure secure pipeline workflows, connect your current CRMs, and integrate Google Gemini AI agents under 15 minutes with our developer-friendly sandbox.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setPath('book-demo')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:opacity-95 text-[#0B0721] text-xs font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
            >
              Talk To Integration Experts
            </button>
            <button 
              onClick={() => setPath('book-demo')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-black rounded-xl border border-white/10 transition-all uppercase tracking-wider"
            >
              Book Strategy Session
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
