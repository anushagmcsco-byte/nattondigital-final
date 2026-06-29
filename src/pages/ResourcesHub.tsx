import React, { useState, useEffect } from 'react';
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
  Video, 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle, 
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
  BookMarked,
  Info,
  Globe,
  Terminal,
  Lock,
  Share2,
  Bookmark,
  Copy,
  Workflow,
  Monitor,
  Phone,
  ShieldCheck,
  MessageSquare,
  Compass
} from 'lucide-react';
import { RoutePath } from '../types';

interface ResourcesHubProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

// Technical resource interfaces
interface ResourceItem {
  id: string;
  title: string;
  type: 'eBook' | 'Template' | 'Prompt Library' | 'SOP' | 'Checklist' | 'Playbook' | 'Workflow' | 'Industry Guide' | 'Toolkit';
  category: string;
  desc: string;
  size?: string;
  isPremium: boolean;
  tags: string[];
}

export default function ResourcesHub({ setPath, darkMode }: ResourcesHubProps) {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Interactive Recommender State
  const [recommendedIndustry, setRecommendedIndustry] = useState<string>('healthcare');

  // Gated Download Form Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [activeDownloadResource, setActiveDownloadResource] = useState<ResourceItem | null>(null);
  
  // Lead Capture Fields
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    companyName: '',
    industry: 'Healthcare',
    country: 'United States',
    email: '',
    phone: '',
  });
  
  const [leadFormLoading, setLeadFormLoading] = useState(false);
  const [leadFormStep, setLeadFormStep] = useState<'form' | 'terminal' | 'success'>('form');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Prompt Library Interactive States
  const [activePromptTab, setActivePromptTab] = useState<'Marketing' | 'SEO' | 'WhatsApp' | 'Sales' | 'Automation'>('Marketing');
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>([]);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // n8n Interactive State (Visual Flow vs. JSON Schema)
  const [activeN8nView, setActiveN8nView] = useState<Record<string, 'visual' | 'json'>>({});
  const [copiedN8nId, setCopiedN8nId] = useState<string | null>(null);

  // Agent Ecosystem state
  const [selectedAgentNode, setSelectedAgentNode] = useState<string>('sales');

  // Video tutorial state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeVideoCategory, setActiveVideoCategory] = useState('AI Marketing');

  // FAQ Expand State
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);

  // Master Categories List for browser pill bar
  const categoriesList = [
    "All",
    "eBooks",
    "Templates",
    "Prompt Libraries",
    "SOPs",
    "Checklists",
    "Playbooks",
    "Workflow Templates",
    "Industry Guides",
    "Toolkits"
  ];

  // Complete list of resource items (representing books, templates, playbooks)
  const allResources: ResourceItem[] = [
    // Featured Resources
    {
      id: 'res-1',
      title: 'AI Marketing Playbook',
      type: 'Playbook',
      category: 'AI Marketing',
      desc: 'The complete programmatic playbook on deploying autonomous lead-generation cycles and multi-stage ad templates with unified conversion tracking.',
      size: '4.8 MB PDF',
      isPremium: true,
      tags: ['AI Marketing', 'Lead Generation', 'Automation']
    },
    {
      id: 'res-2',
      title: 'WhatsApp Automation Blueprint',
      type: 'Playbook',
      category: 'WhatsApp',
      desc: 'A structural deployment layout connecting official Meta Cloud APIs to custom database pipelines to trigger automated clinical or invoice messages.',
      size: '2.5 MB PDF',
      isPremium: true,
      tags: ['WhatsApp', 'Meta API', 'Healthcare', 'Retail']
    },
    {
      id: 'res-3',
      title: 'AI Calling Setup Guide',
      type: 'Playbook',
      category: 'AI Calling',
      desc: 'How to bind ultra-low latency Twilio trunk lines with cached text-to-speech engines to achieve pre-qualification loops under 1.2 seconds.',
      size: '3.1 MB PDF',
      isPremium: true,
      tags: ['AI Calling', 'Telephony', 'Twilio', 'Education']
    },
    {
      id: 'res-4',
      title: 'CRM Implementation Checklist',
      type: 'Checklist',
      category: 'CRM',
      desc: 'A comprehensive 45-point setup parameter audit list for GoHighLevel, mapping custom field arrays, tags, and stage-change triggers.',
      size: '1.2 MB XLSX',
      isPremium: false,
      tags: ['CRM', 'GoHighLevel', 'Audit', 'SOP']
    },
    {
      id: 'res-5',
      title: 'n8n Workflow Templates',
      type: 'Workflow',
      category: 'Automation',
      desc: 'Exportable JSON files mapping self-healing webhook queues that intercept Facebook lead ads and synchronize contacts instantly.',
      size: '640 KB JSON',
      isPremium: true,
      tags: ['n8n', 'Workflow', 'Webhooks', 'CRM']
    },
    {
      id: 'res-6',
      title: 'AI Agent Blueprints',
      type: 'Playbook',
      category: 'AI Agents',
      desc: 'Structural specifications for multi-agent cognitive loops using AgenticOS. Includes Sales, Support, and Audit consensus setups.',
      size: '5.2 MB PDF',
      isPremium: true,
      tags: ['AI Agents', 'AgenticOS', 'Consensus']
    },
    // Template Library
    {
      id: 'res-7',
      title: 'CRM Template',
      type: 'Template',
      category: 'CRM',
      desc: 'Custom pre-configured CRM pipeline schema ready to import, featuring structured columns for deal velocity and contact routing.',
      size: '1.4 MB ZIP',
      isPremium: false,
      tags: ['CRM', 'Template', 'Structure']
    },
    {
      id: 'res-8',
      title: 'Lead Pipeline Template',
      type: 'Template',
      category: 'CRM',
      desc: 'Visual flow sheet mapping outbound and inbound lead touchpoints, auto-categorized by business value.',
      size: '980 KB PDF',
      isPremium: false,
      tags: ['CRM', 'Lead Flow', 'Template']
    },
    {
      id: 'res-9',
      title: 'Sales SOP',
      type: 'SOP',
      category: 'Sales',
      desc: 'Standard operating procedures for converting inbound voice bot inquiries into qualified sales meetings.',
      size: '1.8 MB DOCX',
      isPremium: false,
      tags: ['Sales', 'SOP', 'Playbook']
    },
    {
      id: 'res-10',
      title: 'Marketing Calendar',
      type: 'Template',
      category: 'AI Marketing',
      desc: 'An AI-optimized editorial planning template mapping AEO (Answer Engine Optimization) tags and content schedules.',
      size: '2.1 MB XLSX',
      isPremium: false,
      tags: ['AI Marketing', 'Template', 'AEO']
    },
    {
      id: 'res-11',
      title: 'Customer Journey Map',
      type: 'Template',
      category: 'CRM',
      desc: 'Mapping omnichannel contact points (SMS, Email, WhatsApp, Calls) to ensure 0% lead dropoff.',
      size: '1.5 MB PDF',
      isPremium: false,
      tags: ['CRM', 'Map', 'Structure']
    },
    {
      id: 'res-12',
      title: 'KPI Dashboard',
      type: 'Template',
      category: 'Toolkit',
      desc: 'A robust performance tracking spreadsheet model measuring conversation response rates, booking ratios, and ROI margins.',
      size: '3.0 MB XLSX',
      isPremium: false,
      tags: ['Toolkit', 'Dashboard', 'KPI']
    },
    // Industry Playbooks (Specific)
    {
      id: 'res-13',
      title: 'Healthcare Playbook',
      type: 'Industry Guide',
      category: 'Healthcare',
      desc: 'Establishing HIPAA-compliant voice qualifiers and patient database synchronization workflows.',
      size: '4.2 MB PDF',
      isPremium: true,
      tags: ['Healthcare', 'HIPAA', 'Compliance']
    },
    {
      id: 'res-14',
      title: 'Admission CRM Blueprint',
      type: 'Industry Guide',
      category: 'Education',
      desc: 'Omnichannel lead nurturing flow charts designed specifically for universities and edtech platforms.',
      size: '3.9 MB PDF',
      isPremium: true,
      tags: ['Education', 'CRM', 'WhatsApp']
    },
    {
      id: 'res-15',
      title: 'Lead Funnel Playbook',
      type: 'Industry Guide',
      category: 'Real Estate',
      desc: 'Automating instant property tour bookings and agent assignments through geo-triggered SMS bots.',
      size: '3.5 MB PDF',
      isPremium: true,
      tags: ['Real Estate', 'Funnel', 'SOP']
    }
  ];

  // Prompts array
  const promptLibrary = [
    {
      id: 'prompt-1',
      category: 'Marketing',
      title: 'AEO Semantic Structure Prompt',
      prompt: 'Act as a professional Answer Engine Optimization (AEO) copywriter. Analyze the following business landing page content and generate 10 highly structured, concise FAQ JSON schemas. Ensure the answers are direct (under 60 words), use active voice, contain structured list-items if applicable, and are optimized for direct extraction and citations by LLM agents like ChatGPT and Google Gemini.',
      useCase: 'Generate high-authority schemas to maximize organic references by search engines.'
    },
    {
      id: 'prompt-2',
      category: 'SEO',
      title: 'Programmatic City Page Planner',
      prompt: 'Design a structured CSV programmatic page skeleton for a [BUSINESS_TYPE] operating in [CITY_LIST]. Generate variables for: {{City_Name}}, {{Local_Neighborhood_Painpoint}}, {{Localized_Service_Feature}}, and {{Regional_Compliance_ID}}. Ensure each generated row contains unique, context-accurate metadata descriptions that load under 1.5 seconds when parsed through HTML scripts.',
      useCase: 'Scale regional search pages dynamically with zero duplicates.'
    },
    {
      id: 'prompt-3',
      category: 'WhatsApp',
      title: 'Meta Catalog Sales Conversational Agent',
      prompt: 'You are a warm, helpful virtual concierge for [BRAND_NAME]. A user has queried about [PRODUCT_CATEGORY] from our catalog. Respond in a highly engaging, friendly tone using under 3 paragraphs. Highlight 2 unique product features. Format the output to use emojis logically and integrate a clear call-to-action urging them to click the direct "Complete Checkout" Meta trigger button.',
      useCase: 'Deploy on automated WhatsApp pipelines to drive checkout clicks.'
    },
    {
      id: 'prompt-4',
      category: 'Sales',
      title: 'Low-Latency Telephone Pre-Qualifier',
      prompt: 'You are an incoming phone voice advisor for Natton Digital. Your core objective is to qualify leads under 2 minutes. Adopt a professional, supportive, and objective tone. Ask exactly three logical questions: 1. Their current monthly transaction bottleneck. 2. If they have used n8n or Zapier webhooks. 3. Their estimated monthly automation budget. Do not hallucinate price estimates. If they ask, state a specialist will quote after scheduling.',
      useCase: 'Configure on Twilio-connected conversational voice bots.'
    },
    {
      id: 'prompt-5',
      category: 'Automation',
      title: 'Self-Healing Webhook Error Handler',
      prompt: 'Create an automated system alert payload for an n8n webhook error. Read the incoming error code {{error.status}} and API endpoint {{error.url}}. Structure an elegant, markdown-formatted Slack notification alert block listing: The active node name, exact timestamp in UTC, specific request parameters that failed, and the next automated retry sequence attempt.',
      useCase: 'Configure inside visual n8n exception blocks.'
    }
  ];

  // n8n Workflows array
  const n8nWorkflows = [
    {
      id: 'n8n-1',
      title: 'Lead Qualification Workflow',
      desc: 'Intercepts incoming Meta Lead Ads, passes them through a Gemini API text classification node to measure lead score, and branches high-value deals into GHL.',
      nodesCount: 5,
      latency: '< 450ms',
      jsonSchema: `{
  "nodes": [
    { "type": "n8n-nodes-base.webhook", "name": "Meta Lead Ad Webhook", "position": [100, 200] },
    { "type": "n8n-nodes-base.google-genai", "name": "Lead Scorer Agent", "position": [300, 200] },
    { "type": "n8n-nodes-base.if", "name": "Score > 80?", "position": [500, 200] },
    { "type": "n8n-nodes-base.gohighlevel", "name": "Push VIP Lead to CRM", "position": [700, 100] },
    { "type": "n8n-nodes-base.resend", "name": "Send Nurturing Email", "position": [700, 300] }
  ]
}`
    },
    {
      id: 'n8n-2',
      title: 'WhatsApp Checkout & Meta Pay Sync',
      desc: 'Listens for customer catalog selections in WhatsApp, triggers a secure payment checkout link via Stripe/Meta Pay, and writes successful bookings to database ledgers.',
      nodesCount: 7,
      latency: '< 600ms',
      jsonSchema: `{
  "nodes": [
    { "type": "n8n-nodes-base.whatsappCloud", "name": "Catalog Query In", "position": [50, 250] },
    { "type": "n8n-nodes-base.stripe", "name": "Create Checkout Link", "position": [250, 250] },
    { "type": "n8n-nodes-base.whatsappCloud", "name": "Send Payment Button", "position": [450, 250] },
    { "type": "n8n-nodes-base.postgres", "name": "Log Cart State", "position": [650, 400] }
  ]
}`
    },
    {
      id: 'n8n-3',
      title: 'AI Calling Voicemail & Call-Back Loop',
      desc: 'When an outbound dialer gets sent to voicemail, n8n captures the transcription, structures key request points, and queues an automated follow-up calendar event.',
      nodesCount: 6,
      latency: '< 800ms',
      jsonSchema: `{
  "nodes": [
    { "type": "n8n-nodes-base.twilio", "name": "Outbound Call End", "position": [100, 150] },
    { "type": "n8n-nodes-base.openAi", "name": "Transcribe Voicemail", "position": [300, 150] },
    { "type": "n8n-nodes-base.gohighlevel", "name": "Add Contact Note", "position": [500, 150] }
  ]
}`
    }
  ];

  // Agent nodes definitions
  const agentEcosystemNodes = [
    {
      id: 'sales',
      name: 'Sales Agent',
      desc: 'Continuously monitors inbound CRM pipelines. Qualifies prospect leads using structured parameters, generates custom PDF pricing quotations, and locks calendar bookings.',
      cognitiveSpeed: 'Sub-150ms reasoning',
      tools: ['GHL Contact Writer', 'Resend Email API', 'Google Calendar Schedule'],
      consensusWeight: '94% compliance'
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      desc: 'Drives programmatic SEO and AEO generation loops. Monitors crawler indexes, parses customer search queries, and writes keyword-optimized landing page templates.',
      cognitiveSpeed: 'Automated batch updates',
      tools: ['Google Search Indexer', 'Sitemap Generator', 'AI Meta Tag Creator'],
      consensusWeight: '98% compliance'
    },
    {
      id: 'support',
      name: 'Customer Support Agent',
      desc: 'Retrieves answers from company PDFs, vector tables, and historic Slack structures. Automatically resolves 82% of incoming level-1 billing and setup tickets.',
      cognitiveSpeed: 'Sub-900ms response',
      tools: ['Vector DB Search (RAG)', 'Freshdesk API', 'WhatsApp Business Node'],
      consensusWeight: '99% compliance'
    },
    {
      id: 'audit',
      name: 'Consensus Auditor Agent',
      desc: 'Ensures absolute alignment and zero hallucination. Audits financial quotations, purchase orders, and legal contracts generated by other agents before dispatch.',
      cognitiveSpeed: 'Deep Audit Verification',
      tools: ['Stripe Ledgers', 'SOC2 Log Auditor', 'JSON Structure Validator'],
      consensusWeight: '100% compliance verification'
    }
  ];

  // Video guides
  const videoTutorials = [
    { id: 'v-1', title: "Deploying GHL Lead Capture under 45 seconds", duration: "12:45", views: "3.4K views", cat: "AI Marketing" },
    { id: 'v-2', title: "Writing structured FAQ schemas for Google AEO ranking", duration: "08:12", views: "1.9K views", cat: "n8n" },
    { id: 'v-3', title: "Twilio & low-latency voice bot configurations", duration: "15:30", views: "2.8K views", cat: "AI Calling" },
    { id: 'v-4', title: "Meta Cloud API checklist for SOC2 & HIPAA audits", duration: "10:15", views: "4.1K views", cat: "WhatsApp Automation" }
  ];

  // Interactive Recommender Logic
  const getRecommendedResources = (ind: string) => {
    switch (ind.toLowerCase()) {
      case 'healthcare':
        return [
          { title: 'Healthcare Playbook', desc: 'Clinical intake optimization, SOC2/HIPAA compliance metrics, and secure patient contact routing workflows.', icon: ShieldCheckIcon },
          { title: 'WhatsApp Automation Blueprint', desc: 'Secure encryption parameters for routing messages to patients without violating raw medical data policies.', icon: MessageSquareIcon }
        ];
      case 'education':
        return [
          { title: 'Admission CRM Blueprint', desc: 'Multi-stage student onboarding flows designed to nurture prospects across email, SMS, and telephone pipelines.', icon: BookOpenIcon },
          { title: 'AI Calling Setup Guide', desc: 'Low-latency regional language calling prompts to verify student admission readiness on autopilot.', icon: PhoneIcon }
        ];
      case 'real_estate':
        return [
          { title: 'Lead Funnel Playbook', desc: 'Instant geographic property alerts and coordinate templates connected straight to tour calendars.', icon: CompassIcon },
          { title: 'CRM Implementation Checklist', desc: 'GoHighLevel property-pipeline mapping schemas with automated agent-routing rules.', icon: CheckCircleIcon }
        ];
      default:
        return [
          { title: 'AI Marketing Playbook', desc: 'Universal lead acquisition templates, workflow structures, and programmatic scaling principles.', icon: SparklesIcon },
          { title: 'n8n Workflow Templates', desc: 'Instant drag-and-drop webhooks to synchronize contact records and trigger sales alerts.', icon: WorkflowIcon }
        ];
    }
  };

  // Custom icons for recommendations to avoid layout issues
  function ShieldCheckIcon() { return <ShieldCheck className="h-6 w-6 text-emerald-400" />; }
  function MessageSquareIcon() { return <MessageSquare className="h-6 w-6 text-blue-400" />; }
  function BookOpenIcon() { return <BookOpen className="h-6 w-6 text-purple-400" />; }
  function PhoneIcon() { return <Phone className="h-6 w-6 text-cyan-400" />; }
  function CompassIcon() { return <Compass className="h-6 w-6 text-emerald-400" />; }
  function CheckCircleIcon() { return <CheckCircle className="h-6 w-6 text-blue-400" />; }
  function SparklesIcon() { return <Sparkles className="h-6 w-6 text-purple-400" />; }
  function WorkflowIcon() { return <Workflow className="h-6 w-6 text-cyan-400" />; }

  // Search Filter algorithm
  const filteredResources = allResources.filter(res => {
    const matchesCategory = selectedCategory === 'All' || 
                            res.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                            res.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'All' || 
                             res.tags.some(t => t.toLowerCase() === selectedIndustry.toLowerCase());

    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesIndustry && matchesSearch;
  });

  // Action: Open Download / Lead Capture Gated Drawer
  const openDownloadModal = (resource: ResourceItem) => {
    setActiveDownloadResource(resource);
    setLeadForm(prev => ({
      ...prev,
      interestedResource: resource.title
    }));
    setLeadFormStep('form');
    setTerminalLogs([]);
    setIsDownloadModalOpen(true);
  };

  // Action: Submit Lead Capture Form (Simulating HubSpot & GHL & n8n pipeline)
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormLoading(true);
    setLeadFormStep('terminal');

    // Simulate real-time API provisioning logs
    const logs = [
      "⚡ Intercepting lead submission payload...",
      "📡 Parsing parameters to GHL Contact Schema (Name, Email, Industry)...",
      "🔄 Initializing n8n workflow webhook trigger (Node #811)...",
      "🔐 Validating corporate domain reputation and phone format...",
      "✉️ Authenticating Resend transaction route (TLS 1.3)...",
      "📦 Bundling custom resource pack " + activeDownloadResource?.title + "...",
      "🚀 Contact successfully created in GoHighLevel CRM. Delivery complete!"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setLeadFormLoading(false);
        setLeadFormStep('success');
      }
    }, 600);
  };

  // Action: Copy Prompt to Clipboard
  const copyPromptText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    });
  };

  // Action: Save Prompt
  const toggleSavePrompt = (id: string) => {
    if (savedPromptIds.includes(id)) {
      setSavedPromptIds(prev => prev.filter(pId => pId !== id));
    } else {
      setSavedPromptIds(prev => [...prev, id]);
    }
  };

  // Action: Copy n8n Workflow JSON
  const copyN8nJson = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedN8nId(id);
      setTimeout(() => setCopiedN8nId(null), 2000);
    });
  };

  // Action: Toggle FAQ indexes
  const toggleFaq = (index: number) => {
    if (openFaqIndexes.includes(index)) {
      setOpenFaqIndexes(prev => prev.filter(i => i !== index));
    } else {
      setOpenFaqIndexes(prev => [...prev, index]);
    }
  };

  // Detailed technical FAQs (20 items requested)
  const technicalFaqs = [
    {
      q: "How are the n8n workflows integrated into local customer databases?",
      a: "Our visual n8n blueprints leverage standard Postgres, MySQL, or Mongo nodes alongside visual HTTP webhooks. This lets you bind state changes (like paid checkout completions) directly into internal client records on-premise or securely in the cloud."
    },
    {
      q: "What variables does the GoHighLevel webhook require for automated triggers?",
      a: "At a baseline, GHL webhooks require Name, Email, Corporate Phone (capable of receiving SMS or WhatsApp templates), and Company Name. We map these parameters straight into custom field structures inside GHL contacts cards."
    },
    {
      q: "Are these templates and checklists optimized for Answer Engine Optimization (AEO)?",
      a: "Yes. All checklist schemas and document guidelines are formatted with micro-data, explicit question-and-answer headlines, and highly structured list formatting to guarantee Gemini, ChatGPT, and Perplexity crawlers parse and cite your brand."
    },
    {
      q: "How does the AI Calling Setup Guide reduce voice latency below 1.2 seconds?",
      a: "The guide outlines the exact caching methodology and low-latency streaming endpoints using custom-configured regional trunk paths. This ensures the voice bot initiates conversation loops without clunky 2+ second delays."
    },
    {
      q: "Can the WhatsApp blueprints be used for SOC2 and HIPAA compliant industries?",
      a: "Absolutely. Our HIPAA blueprint utilizes encrypted AES-256 tokens and TLS 1.3 transport tunnels. Private client or health records are kept sandboxed locally; WhatsApp is used strictly to trigger login alerts or secure portal redirects."
    },
    {
      q: "What is the cognitive consensus matrix in the Agent Ecosystem?",
      a: "A cognitive consensus matrix is a structure where multiple specialized agents (Sales, Support, Audit) verify outputs before taking action. For instance, the Auditor Agent must validate any quote generated by the Sales Agent before n8n releases the webhook."
    },
    {
      q: "Do I need a paid Sanity CMS or Algolia account to run these search panels?",
      a: "Our templates are fully self-contained and run locally using client-side indexing and lightweight key-value stores. For large programmatic libraries, we include step-by-step setup parameters to connect to Algolia's free tier."
    },
    {
      q: "How does Resend guarantee 99.98% transactional email delivery rates?",
      a: "Resend maps clean, high-reputation IP networks and enforces DKIM, SPF, and DMARC alignments natively. Our workflow blueprints include exception-handling loops to bypass spam filters entirely."
    },
    {
      q: "Can we integrate these prompts directly into custom web applications?",
      a: "Yes. The prompt templates are structured to serve as system guidelines for conversational LLM APIs (like Google Gemini or GPT-4o), ensuring outputs remain clean, safe, and hallucination-free."
    },
    {
      q: "What support is provided for custom n8n workspace setups?",
      a: "In addition to exportable JSON structures, we offer dedicated technical onboarding. If you need custom integration, you can book a strategy call using our calendar CTA widget."
    },
    {
      q: "How does the lead capture form process multiple regional phone numbers?",
      a: "The lead capture pipeline utilizes automated regex telephone mapping based on selected country variables, ensuring formatting matches Twilio or WhatsApp API structures perfectly."
    },
    {
      q: "Are the playbooks updated to reflect Google's 2026 Core Algorithm updates?",
      a: "Yes, our resources are updated continuously to reflect the transition from classic blue-link organic search into Answer Engine conversational responses."
    },
    {
      q: "How are CRM contact duplicates prevented across multi-channel campaigns?",
      a: "The n8n workflow routes search CRM indexes by Email and Phone before creating new files. If a match is found, the webhook simply merges new conversion tags and historical activity logs onto the existing profile."
    },
    {
      q: "Is there an export limit to the prompt libraries?",
      a: "There are no programmatic limits. You can copy, save, or download PDF prompt structures to use across any generative AI platform or team terminal."
    },
    {
      q: "How do I configure the visual node map in self-hosted n8n instances?",
      a: "Simply download the JSON workflow template, open your n8n workspace, click 'Import from File', and the visual graph is constructed automatically with all parameters intact."
    },
    {
      q: "What is the recommended average token limit for voice calling scripts?",
      a: "To keep latency low, system prompts should remain under 1,500 tokens. Our calling guidelines outline compression techniques to keep parameters light without losing critical brand knowledge."
    },
    {
      q: "How does the industry recommender module calculate custom guides?",
      a: "The logic matches selected pain points (HIPAA for Healthcare, student logs for Education, geo-alerts for Real Estate) to specific operational templates, reducing selection fatigue."
    },
    {
      q: "Do your templates support multi-lingual checkouts on WhatsApp?",
      a: "Yes. Our Meta templates utilize localization parameters that dynamically fetch translations from regional database tables based on the sender's phone country prefix."
    },
    {
      q: "How can we calculate our exact ROI prior to booking a strategy session?",
      a: "You can navigate to our native ROI Growth Calculator page to measure monthly admin hour savings, lead conversion lifts, and operational cost reductions."
    },
    {
      q: "What security features protect downloaded digital resources?",
      a: "Resource links are dispatched via encrypted, single-use secure URLs generated by our Resend email integration. These URLs expire after 48 hours to prevent raw link sharing."
    }
  ];

  return (
    <div className="bg-[#0B0721] text-white min-h-screen font-sans antialiased text-left relative selection:bg-emerald-500/30 selection:text-white pb-20">
      
      {/* Immersive Background Nodes & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      {/* Micro-grid background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Hero Section */}
      <section id="resources-hero" className="relative pt-32 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="mb-6 text-xs font-mono text-gray-400 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-cyan-400 transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-cyan-400 font-bold">RESOURCES HUB</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
                <Sparkles className="h-3 w-3 animate-pulse" /> FREE & PREMIUM RESOURCES
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                AI Growth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Resource Library</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Unlock proven playbooks, n8n workflow JSON blueprints, high-converting prompt matrices, and HIPAA-compliant checklist SOPs designed to automate sales pipelines and capture high-intent AEO leads.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#resources-library"
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  Explore Resources <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#prompt-library-section"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
                >
                  AI Prompt Library <Zap className="h-4 w-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Right: Immersive Animated Knowledge Galaxy */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden group backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-emerald-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                    <Database className="h-3.5 w-3.5 text-cyan-400" /> KNOWLEDGE GALAXY
                  </span>
                  <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">ACTIVE NODE SCHEMA</span>
                </div>

                {/* Simulated Floating document network */}
                <div className="relative h-56 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-cyan-400/10 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute w-36 h-36 rounded-full border border-dashed border-purple-500/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

                  {/* Connected floating notes */}
                  <div className="absolute top-2 left-4 p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-cyan-400/20 text-[9px] font-mono flex items-center gap-1.5 shadow-sm">
                    <FileText className="h-3 w-3 text-cyan-400" />
                    <span>Marketing SOP</span>
                  </div>

                  <div className="absolute top-14 right-2 p-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/20 text-[9px] font-mono flex items-center gap-1.5 shadow-sm">
                    <Workflow className="h-3 w-3 text-purple-400" />
                    <span>n8n Webhook</span>
                  </div>

                  <div className="absolute bottom-10 left-1 p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20 text-[9px] font-mono flex items-center gap-1.5 shadow-sm">
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                    <span>CRM Schema</span>
                  </div>

                  <div className="absolute bottom-2 right-4 p-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-lg border border-pink-500/20 text-[9px] font-mono flex items-center gap-1.5 shadow-sm">
                    <Cpu className="h-3 w-3 text-pink-400" />
                    <span>Agent Blueprint</span>
                  </div>

                  {/* Dynamic Core */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-400 p-[1px] animate-pulse">
                    <div className="w-full h-full bg-[#0B0721] rounded-full flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>SEMANTIC GRAPH ACTIVE</span>
                  <span>15 TECHNICAL DIRECTORIES LOADED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Downloads - Bento Grid */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">PRE-AUDITED BLUEPRINTS</span>
            <h2 className="text-3xl font-black font-display text-white">Featured Downloads</h2>
            <p className="text-xs text-gray-400 max-w-xl">Deep-dive technical toolkits designed to eliminate operations friction. Click to unlock immediate secure file dispatches.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {allResources.slice(0, 6).map((res, idx) => {
              // Create bento-like sizing based on index
              const colSpan = idx === 0 || idx === 1 ? 'md:col-span-3' : 'md:col-span-2';
              const gradientBorder = idx % 3 === 0 
                ? 'hover:border-cyan-400/40' 
                : idx % 3 === 1 
                  ? 'hover:border-purple-500/40' 
                  : 'hover:border-emerald-400/40';

              return (
                <div 
                  key={res.id}
                  onClick={() => openDownloadModal(res)}
                  className={`group relative rounded-2xl border border-white/10 bg-white/[0.01] p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:bg-white/[0.02] cursor-pointer ${colSpan} ${gradientBorder}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-black tracking-wider ${
                        res.isPremium 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {res.isPremium ? '★ Premium Blueprint' : '✓ Free Document'}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{res.size || '3.5 MB PDF'}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {res.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span className="uppercase text-[9px] tracking-wider text-gray-400">CATEGORY: <strong className="text-white">{res.category}</strong></span>
                    <span className="text-cyan-400 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                      <Download className="h-3.5 w-3.5" /> UNLOCK NOW
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended For You Logic Panel */}
      <section className="py-20 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-4">
            <Sliders className="h-3.5 w-3.5" /> PERSONALIZED SYSTEM SUGGESTIONS
          </div>
          <h2 className="text-3xl font-black font-display text-white mb-3">Recommended For You</h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto mb-8">
            Select your specific industry domain below. Our cognitive scoring matrices dynamically filter, prioritize, and surface the exact templates relevant to your pipeline setup.
          </p>

          {/* Industry selector pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['healthcare', 'education', 'real_estate', 'other'].map((ind) => (
              <button
                key={ind}
                onClick={() => setRecommendedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  recommendedIndustry === ind
                    ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white border-cyan-400 font-bold shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0B0721]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {ind.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Rendered Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {getRecommendedResources(recommendedIndustry).map((rec, idx) => {
              const CustomIcon = rec.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    const matchedRes = allResources.find(r => r.title.toLowerCase().includes(rec.title.toLowerCase())) || allResources[0];
                    openDownloadModal(matchedRes);
                  }}
                  className="p-6 rounded-2xl bg-[#0B0721] border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer flex gap-4 items-start group"
                >
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                    <CustomIcon />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{rec.title}</h4>
                      <span className="text-[8px] font-mono bg-purple-500/20 text-purple-400 px-1 py-0.2 rounded uppercase">HIGH COMPATIBILITY</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{rec.desc}</p>
                    <span className="text-[10px] font-mono text-cyan-400 group-hover:underline flex items-center gap-1 pt-1 font-bold">
                      Download File <Download className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Browse Library Grid & Semantic Search */}
      <section id="resources-library" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div className="space-y-3 text-left">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">SEMANTIC INDEX</span>
              <h2 className="text-3xl font-black font-display text-white">Browse Complete Library</h2>
              <p className="text-xs text-gray-400 max-w-xl">Search and sort our unified directory of templates, playbooks, guidelines and workflow schemas.</p>
            </div>

            {/* Live Search & Filter Counter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Semantic Search (e.g. n8n, HIPAA, SOP)..."
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
                <span>Result: <strong className="text-white">{filteredResources.length}</strong> matches</span>
              </div>
            </div>
          </div>

          {/* Bento Category Pill Bar */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
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

          {/* Resources Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-full p-12 text-center border border-dashed border-white/10 rounded-2xl space-y-3 bg-white/[0.01]">
                <Info className="h-8 w-8 text-gray-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No assets match your search parameters</h4>
                <p className="text-xs text-gray-400">Try cleaning your text query or switching bento categorizations above.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedIndustry('All');
                  }}
                  className="px-4 py-2 bg-white/5 text-xs font-mono rounded border border-white/10 hover:bg-white/10"
                >
                  Reset Library Filters
                </button>
              </div>
            ) : (
              filteredResources.map((res) => (
                <div 
                  key={res.id}
                  onClick={() => openDownloadModal(res)}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.01] p-6 hover:border-cyan-400/30 hover:bg-white/[0.02] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-black tracking-wider bg-white/5 text-gray-300 border border-white/10">
                        {res.type}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{res.size || '2.0 MB'}</span>
                    </div>

                    <div className="space-y-2 text-left">
                      <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {res.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/5 mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>#{res.category}</span>
                    <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      GET FILE <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Interactive Prompt Library Section */}
      <section id="prompt-library-section" className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">SYSTEM CONTROLLER KEYS</span>
            <h2 className="text-3xl font-black font-display text-white">AI Prompt Library</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Copy-paste our production system guidelines directly into your LLM structures. Tested extensively across GPT-4o and Gemini models.
            </p>
          </div>

          {/* Prompt Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Marketing', 'SEO', 'WhatsApp', 'Sales', 'Automation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePromptTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  activePromptTab === tab
                    ? 'bg-purple-500/15 border-purple-400 text-purple-400 font-bold'
                    : 'bg-[#0B0721]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tab} Prompts
              </button>
            ))}
          </div>

          {/* Prompts Cards */}
          <div className="space-y-6">
            {promptLibrary
              .filter(p => p.category === activePromptTab)
              .map((p) => {
                const isSaved = savedPromptIds.includes(p.id);
                return (
                  <div key={p.id} className="p-6 sm:p-8 rounded-2xl bg-[#0B0721] border border-white/10 space-y-4 text-left relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-indigo-500" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-black block">SYSTEM GUIDELINE PROMPT</span>
                        <h3 className="text-base font-bold font-display text-white">{p.title}</h3>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => copyPromptText(p.prompt, p.id)}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                        >
                          {copiedPromptId === p.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" /> COPIED!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" /> COPY PROMPT
                            </>
                          )}
                        </button>

                        <button 
                          onClick={() => toggleSavePrompt(p.id)}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'text-purple-400 fill-purple-400' : ''}`} />
                        </button>

                        <button 
                          onClick={() => openDownloadModal({ id: p.id, title: p.title, type: 'Prompt Library', category: p.category, desc: p.useCase, isPremium: false, tags: [p.category] })}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                          title="Download PDF version"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-gray-300 whitespace-pre-line select-all cursor-pointer hover:border-purple-500/20 transition-colors">
                      {p.prompt}
                    </div>

                    <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5 pt-2">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>USE CASE: <strong className="text-white">{p.useCase}</strong></span>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* n8n Workflow Templates (Interactive JSON vs Visual Switcher) */}
      <section id="n8n-library-section" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">WORKFLOW ENGINE NODES</span>
            <h2 className="text-3xl font-black font-display text-white">n8n Workflow Blueprints</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Ready-to-import n8n visual flow schemes. Click visual node paths or copy raw JSON blueprints straight into your system parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {n8nWorkflows.map((flow) => {
              const currentView = activeN8nView[flow.id] || 'visual';
              return (
                <div key={flow.id} className="p-6 rounded-2xl bg-white/[0.01] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Workflow className="h-4 w-4 text-cyan-400" />
                        <span className="text-[10px] font-mono text-gray-400 font-bold">n8n FLOW</span>
                      </div>

                      {/* Visual vs JSON switcher */}
                      <div className="flex bg-[#0B0721] p-0.5 rounded-lg border border-white/10 text-[9px] font-mono">
                        <button
                          onClick={() => setActiveN8nView(prev => ({ ...prev, [flow.id]: 'visual' }))}
                          className={`px-2 py-1 rounded-md transition-colors ${currentView === 'visual' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-gray-500 hover:text-white'}`}
                        >
                          Visual
                        </button>
                        <button
                          onClick={() => setActiveN8nView(prev => ({ ...prev, [flow.id]: 'json' }))}
                          className={`px-2 py-1 rounded-md transition-colors ${currentView === 'json' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-gray-500 hover:text-white'}`}
                        >
                          JSON
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold font-display text-white">{flow.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed min-h-16">{flow.desc}</p>
                    </div>

                    {/* Interactive Frame Box */}
                    <div className="h-40 rounded-xl bg-black/40 border border-white/5 p-4 flex flex-col justify-center overflow-auto font-mono text-[10px]">
                      {currentView === 'visual' ? (
                        // Simulated Visual Nodes Mapping
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400/80 border-b border-white/5 pb-1">
                            <span>NODES: {flow.nodesCount}</span>
                            <span>LATENCY: {flow.latency}</span>
                          </div>
                          
                          {/* visual nodes path */}
                          <div className="flex items-center gap-2 justify-center py-4">
                            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-400/20 text-white" title="Webhook Trigger">
                              ⚡ Webhook
                            </div>
                            <span className="text-cyan-400 animate-pulse">⟶</span>
                            <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-white" title="Processing AI">
                              ⚙ AI Parse
                            </div>
                            <span className="text-purple-400 animate-pulse">⟶</span>
                            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-white" title="GHL Integration">
                              📥 CRM Node
                            </div>
                          </div>
                        </div>
                      ) : (
                        // JSON Scheme code block
                        <pre className="text-gray-400 leading-normal scrollbar-none select-all cursor-pointer">
                          {flow.jsonSchema}
                        </pre>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-6 flex gap-2">
                    <button
                      onClick={() => copyN8nJson(flow.jsonSchema, flow.id)}
                      className="flex-grow py-2.5 bg-[#0B0721] border border-white/10 hover:border-cyan-400/20 text-[10px] font-mono font-bold rounded-xl text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      {copiedN8nId === flow.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" /> COPIED BLUEPRINT!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-cyan-400" /> COPY WORKFLOW JSON
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openDownloadModal({ id: flow.id, title: flow.title + ' JSON', type: 'Workflow Templates' as any, category: 'n8n', desc: flow.desc, isPremium: true, tags: ['n8n', 'JSON'] })}
                      className="p-2 bg-[#0B0721] border border-white/10 hover:border-cyan-400/20 rounded-xl text-gray-400 hover:text-white"
                      title="Download JSON Workflow asset"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-xs font-mono text-gray-500">
            *Includes visual screen recordings inside our premium gated files.
          </div>
        </div>
      </section>

      {/* AI Agent Blueprints & 3D Ecosystem Visualizer */}
      <section id="agent-library-section" className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Interactive Visualizer representation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-emerald-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-2">
                  <span className="text-[8px] font-mono text-gray-400 tracking-widest uppercase">🧠 AGENT ECOSYSTEM</span>
                  <span className="text-[8px] font-mono text-[#00C2FF] font-bold">3D SPHERE MOCK</span>
                </div>

                {/* Cognitive node mesh representation */}
                <div className="relative h-56 flex items-center justify-center">
                  <div className="absolute w-40 h-40 rounded-full border border-purple-500/10 animate-pulse" />
                  
                  {/* Mesh lines mapped */}
                  <svg className="absolute inset-0 w-full h-full text-white/5 pointer-events-none">
                    <line x1="50%" y1="20%" x2="20%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    <line x1="80%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                  </svg>

                  {/* Active node triggers */}
                  <button 
                    onClick={() => setSelectedAgentNode('sales')}
                    className={`absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-[9px] font-mono border transition-all ${selectedAgentNode === 'sales' ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/15 font-bold' : 'bg-[#0B0721]/80 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Sales Node
                  </button>

                  <button 
                    onClick={() => setSelectedAgentNode('marketing')}
                    className={`absolute top-1/2 -translate-y-1/2 left-2 px-3 py-1.5 rounded-lg text-[9px] font-mono border transition-all ${selectedAgentNode === 'marketing' ? 'bg-purple-500/10 border-purple-400 text-white shadow-md shadow-purple-500/15 font-bold' : 'bg-[#0B0721]/80 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Marketing Node
                  </button>

                  <button 
                    onClick={() => setSelectedAgentNode('support')}
                    className={`absolute top-1/2 -translate-y-1/2 right-2 px-3 py-1.5 rounded-lg text-[9px] font-mono border transition-all ${selectedAgentNode === 'support' ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-md shadow-emerald-500/15 font-bold' : 'bg-[#0B0721]/80 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Support Node
                  </button>

                  <button 
                    onClick={() => setSelectedAgentNode('audit')}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-[9px] font-mono border transition-all ${selectedAgentNode === 'audit' ? 'bg-pink-500/10 border-pink-400 text-white shadow-md shadow-pink-500/15 font-bold' : 'bg-[#0B0721]/80 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Auditor Node
                  </button>

                  {/* Dynamic Core */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 blur-sm" />
                </div>

                <div className="text-center text-[9px] font-mono text-gray-400 border-t border-white/5 pt-2">
                  CLICK NODES TO RUN COGNITIVE ANALYSIS
                </div>
              </div>
            </div>

            {/* Right: Selected Node Detailed Specifications */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold block">AGENT COGNITIVE Blueprints</span>
              <h2 className="text-3xl font-black font-display text-white">AI Agent Blueprints</h2>
              <p className="text-xs text-gray-400">
                Explore structural cognitive guidelines mapping our AgenticOS framework parameters. Check how we orchestrate multi-agent consensus matrices.
              </p>

              {/* Node specifications container */}
              {agentEcosystemNodes.map((node) => {
                if (node.id !== selectedAgentNode) return null;
                return (
                  <motion.div 
                    key={node.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-2xl bg-white/[0.01] border border-cyan-400/30 space-y-4"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <h3 className="text-lg font-black text-white font-display flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-cyan-400" /> {node.name} Specifications
                      </h3>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">{node.cognitiveSpeed}</span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{node.desc}</p>

                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">INTEGRATED TOOLS:</span>
                      <div className="flex flex-wrap gap-2">
                        {node.tools.map(tool => (
                          <span key={tool} className="text-[9px] font-mono px-2 py-1 rounded bg-[#0B0721] border border-white/10 text-white">
                            ⚙ {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-gray-500">
                      <span>AUDIT ALIGNMENT: <strong className="text-emerald-400">{node.consensusWeight}</strong></span>
                      <button
                        onClick={() => openDownloadModal({ id: 'agent-' + node.id, title: node.name + ' Blueprint Schema', type: 'Playbook', category: 'AI Agents', desc: node.desc, isPremium: true, tags: ['AgenticOS', node.name] })}
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        Download Detailed Blueprint <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Industry Guides Playbook list */}
      <section id="industry-guides-section" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">VERTICAL PLAYBOOKS</span>
            <h2 className="text-3xl font-black font-display text-white">Industry Playbooks</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Compliance-vetted checklists, database integrations and custom triggers tailored specifically for vertical domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allResources
              .filter(r => r.type === 'Industry Guide')
              .map((res) => (
                <div 
                  key={res.id}
                  onClick={() => openDownloadModal(res)}
                  className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-purple-400/40 transition-all cursor-pointer text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-black">
                        {res.category} Guide
                      </span>
                      <span className="text-xs font-mono text-gray-500">{res.size}</span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold font-display text-white">{res.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{res.desc}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-6 flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>SOC2 & HIPAA SECURE</span>
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      GET GUIDE <Download className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials Carousel / Switcher */}
      <section id="video-library-section" className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">SCREEN REPLAY GUIDES</span>
            <h2 className="text-3xl font-black font-display text-white">Video Tutorials & Webinars</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Visual walkthroughs detailing how to configure secure n8n loops, GHL webhooks, and Answer Engine Optimization indexing schemas.
            </p>
          </div>

          {/* Categories for Video Library */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['AI Marketing', 'n8n', 'WhatsApp Automation', 'AI Calling'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveVideoCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  activeVideoCategory === category
                    ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400 font-bold'
                    : 'bg-[#0B0721]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials
              .filter(v => v.cat === activeVideoCategory)
              .map((v) => (
                <div 
                  key={v.id}
                  onClick={() => {
                    setActiveVideoTitle(v.title);
                    setActiveVideoUrl("https://example.com/embed");
                  }}
                  className="p-5 rounded-2xl bg-[#0B0721] border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer flex gap-4 items-center text-left group"
                >
                  <div className="relative shrink-0 w-24 aspect-video rounded-lg bg-black flex items-center justify-center overflow-hidden border border-white/5">
                    <Play className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-1.5 flex-grow">
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-relaxed">{v.title}</h3>
                    <div className="flex items-center gap-3 text-[9px] font-mono text-gray-500">
                      <span>DURATION: {v.duration}</span>
                      <span>•</span>
                      <span>{v.views}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* AI Growth Community & Newsletter */}
      <section className="py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/20 via-[#0B0721] to-emerald-950/20 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold block">GLOBAL NETWORK</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Join The AI Growth Community</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Connect with operational builders, Chief AI Officers, and automation specialists. Get immediate notifications on new playbooks, weekly webinar schedules, and private checkout scripts.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Weekly premium playbooks direct to inbox</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Access to private WhatsApp builder community</span>
                </div>
              </div>
            </div>

            {/* Newsletter input card */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Subscribe to GrowthOS Newsletter</h3>
              <p className="text-[11px] text-gray-400">Join 3,500+ builders scaling business pipelines with zero manual templates.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing! Webhook Triggered."); }} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your corporate email address"
                  className="w-full px-4 py-3 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none transition-all placeholder:text-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Join Community Webhook
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (20 Expandable accordions requested) */}
      <section id="faq-section" className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">FAQ DIRECTORY</span>
            <h2 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Answers to technical queries regarding prompt architecture, database synchronization limits, HIPAA rules, and custom workflow imports.
            </p>
          </div>

          <div className="space-y-4">
            {technicalFaqs.map((faq, idx) => {
              const isOpen = openFaqIndexes.includes(idx);
              return (
                <div key={idx} className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden transition-all hover:border-white/10 text-left">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex justify-between items-center gap-4 text-sm font-bold text-white hover:text-cyan-400 transition-colors text-left"
                  >
                    <span>{idx + 1}. {faq.q}</span>
                    <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-90 text-cyan-400' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/5 bg-black/20">
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

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden text-center">
        {/* Animated matrix dots */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold block">IMMEDIATE IMPLEMENTATION</span>
          <h2 className="text-4xl font-black font-display text-white">Accelerate Growth With Proven Frameworks</h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Stop losing leads in fragmented inboxes and delayed responses. Deploy our vetted n8n webhooks, configure low-latency Twilio dialers, and dominate conversational search engines today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#resources-library"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Resources Hub
            </a>
            <button
              onClick={() => setPath('book-demo')}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
            >
              Book Strategy Session
            </button>
          </div>
        </div>
      </section>

      {/* Immersive Video Player Overlay Drawer */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-[#0B0721] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0B0721]">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">REPLAY TUTORIAL</span>
                </div>
                <button onClick={() => setActiveVideoUrl(null)} className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Video representation screen */}
              <div className="aspect-video bg-black flex items-center justify-center p-6 text-center border-b border-white/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <Play className="h-16 w-16 text-emerald-400 animate-pulse z-10 group-hover:scale-110 transition-transform cursor-pointer" />
                <div className="absolute bottom-6 left-6 text-left z-20">
                  <h3 className="text-base font-bold text-white font-display">{activeVideoTitle}</h3>
                  <p className="text-[10px] text-gray-400 font-mono">STATUS: SIMULATING STREAM OVERLAY</p>
                </div>
              </div>

              {/* Specs description */}
              <div className="p-6 bg-[#0B0721] space-y-4 text-left">
                <p className="text-xs text-gray-300 leading-relaxed">
                  This screening covers our exact deployment sequence inside self-hosted environments. Learn to configure exception alert Slack channels and set SPF parameters to maximize mailbox landing ratios.
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] font-mono text-gray-500">
                  <span>CATEGORY: <strong className="text-white">{activeVideoCategory}</strong></span>
                  <span>•</span>
                  <span>STATUS: SECURED ACCESS</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gated Lead Capture Form Slide-Up Modal */}
      <AnimatePresence>
        {isDownloadModalOpen && activeDownloadResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-lg bg-[#0B0721] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative text-left"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 bg-gradient-to-r from-blue-950/20 via-[#0B0721] to-emerald-950/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Gated File Provisioning</span>
                </div>
                <button onClick={() => setIsDownloadModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Step Router */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {leadFormStep === 'form' && (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="space-y-1.5 mb-2">
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-black">SELECTED RESOURCE</span>
                      <h3 className="text-base font-black text-white font-display flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-cyan-400" /> {activeDownloadResource.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{activeDownloadResource.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <input
                            type="text"
                            required
                            placeholder="Arjun Mehta"
                            value={leadForm.fullName}
                            onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Company Name *</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <input
                            type="text"
                            required
                            placeholder="Acme Operations"
                            value={leadForm.companyName}
                            onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none placeholder:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Industry */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Industry Domain *</label>
                        <select
                          value={leadForm.industry}
                          onChange={(e) => setLeadForm({ ...leadForm, industry: e.target.value })}
                          className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail & Ecommerce">Retail & Ecommerce</option>
                          <option value="Professional Services">Professional Services</option>
                        </select>
                      </div>

                      {/* Country */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Country *</label>
                        <select
                          value={leadForm.country}
                          onChange={(e) => setLeadForm({ ...leadForm, country: e.target.value })}
                          className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="United States">United States</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Australia">Australia</option>
                          <option value="Singapore">Singapore</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <input
                            type="email"
                            required
                            placeholder="arjun@acme.com"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 019-2834"
                            value={leadForm.phone}
                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none placeholder:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={leadFormLoading}
                      className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/15"
                    >
                      <Lock className="h-4 w-4" /> SECURE DEPLOYMENT PROTOCOL
                    </button>
                  </form>
                )}

                {leadFormStep === 'terminal' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                      <Terminal className="h-4 w-4 animate-pulse" />
                      <span>PROVISIONING SECURE API PIPELINE...</span>
                    </div>

                    <div className="bg-black/80 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-emerald-400 h-64 overflow-y-auto space-y-1.5 scrollbar-none">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-gray-600">[{i+1}]</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {leadFormLoading && (
                        <div className="flex gap-2 text-white animate-pulse">
                          <span>▸</span>
                          <span>processing packet transfers...</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-gray-500 text-center">
                      *Connecting to GoHighLevel webhook indices under SOC2 parameters.
                    </p>
                  </div>
                )}

                {leadFormStep === 'success' && (
                  <div className="text-center space-y-6 py-6">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black font-display text-white">Resource Unlocked Successfully!</h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                        The n8n webhook has successfully synchronized your contact logs with GoHighLevel. We have fired an encrypted download dispatch token via Resend to <strong className="text-white">{leadForm.email}</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 max-w-sm mx-auto">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">DIRECT SECURE LINK GENERATED</span>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert("Mock download started for unlocked asset."); }}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Download className="h-4 w-4" /> Download File Now ({activeDownloadResource.size || '3.5 MB'})
                      </a>
                    </div>

                    <button
                      onClick={() => setIsDownloadModalOpen(false)}
                      className="text-xs font-mono text-gray-500 hover:text-white underline transition-colors"
                    >
                      Return to Resources Hub
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
